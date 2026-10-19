-- Tenant-integrity guards for commercial operations.
-- Application services must enforce authorization as well; these triggers protect data integrity.

CREATE OR REPLACE FUNCTION shouttech_validate_commercial_tenant() RETURNS trigger AS $$
BEGIN
  IF TG_TABLE_NAME = 'commercial_documents' THEN
    IF NEW.party_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM business_parties p WHERE p.party_id=NEW.party_id AND p.company_id=NEW.company_id) THEN RAISE EXCEPTION 'Document party must belong to the same company'; END IF;
    IF NEW.source_document_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM commercial_documents d WHERE d.document_id=NEW.source_document_id AND d.company_id=NEW.company_id) THEN RAISE EXCEPTION 'Source document must belong to the same company'; END IF;
    IF NEW.journal_entry_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM journal_entries j WHERE j.journal_entry_id=NEW.journal_entry_id AND j.company_id=NEW.company_id) THEN RAISE EXCEPTION 'Journal entry must belong to the same company'; END IF;
  ELSIF TG_TABLE_NAME = 'commercial_document_lines' THEN
    IF NOT EXISTS (SELECT 1 FROM commercial_documents d WHERE d.document_id=NEW.document_id) THEN RAISE EXCEPTION 'Commercial document does not exist'; END IF;
    IF NEW.product_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM products p JOIN commercial_documents d ON d.document_id=NEW.document_id WHERE p.product_id=NEW.product_id AND p.company_id=d.company_id) THEN RAISE EXCEPTION 'Product must belong to the document company'; END IF;
    IF NEW.warehouse_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM warehouses w JOIN commercial_documents d ON d.document_id=NEW.document_id WHERE w.warehouse_id=NEW.warehouse_id AND w.company_id=d.company_id) THEN RAISE EXCEPTION 'Warehouse must belong to the document company'; END IF;
    IF NEW.tax_code_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM tax_codes t JOIN commercial_documents d ON d.document_id=NEW.document_id WHERE t.tax_code_id=NEW.tax_code_id AND t.company_id=d.company_id) THEN RAISE EXCEPTION 'Tax code must belong to the document company'; END IF;
  ELSIF TG_TABLE_NAME = 'payments' THEN
    IF NEW.party_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM business_parties p WHERE p.party_id=NEW.party_id AND p.company_id=NEW.company_id) THEN RAISE EXCEPTION 'Payment party must belong to the same company'; END IF;
    IF NEW.journal_entry_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM journal_entries j WHERE j.journal_entry_id=NEW.journal_entry_id AND j.company_id=NEW.company_id) THEN RAISE EXCEPTION 'Payment journal must belong to the same company'; END IF;
  ELSIF TG_TABLE_NAME = 'payment_allocations' THEN
    IF NOT EXISTS (SELECT 1 FROM payments p JOIN commercial_documents d ON d.document_id=NEW.document_id WHERE p.payment_id=NEW.payment_id AND p.company_id=NEW.company_id AND d.company_id=NEW.company_id AND p.currency_code=d.currency_code) THEN RAISE EXCEPTION 'Payment and document must share company and currency'; END IF;
    IF NEW.allocated_amount + COALESCE((SELECT sum(a.allocated_amount) FROM payment_allocations a WHERE a.payment_id=NEW.payment_id AND a.allocation_id<>NEW.allocation_id),0) > (SELECT p.amount FROM payments p WHERE p.payment_id=NEW.payment_id) THEN RAISE EXCEPTION 'Allocations exceed payment amount'; END IF;
    IF NEW.allocated_amount + COALESCE((SELECT sum(a.allocated_amount) FROM payment_allocations a WHERE a.document_id=NEW.document_id AND a.allocation_id<>NEW.allocation_id),0) > (SELECT d.grand_total FROM commercial_documents d WHERE d.document_id=NEW.document_id) THEN RAISE EXCEPTION 'Allocations exceed document total'; END IF;
  ELSIF TG_TABLE_NAME = 'stock_ledger_entries' THEN
    IF NOT EXISTS (SELECT 1 FROM warehouses w JOIN products p ON p.product_id=NEW.product_id WHERE w.warehouse_id=NEW.warehouse_id AND w.company_id=NEW.company_id AND p.company_id=NEW.company_id) THEN RAISE EXCEPTION 'Stock product and warehouse must belong to the same company'; END IF;
    IF NEW.reversal_of IS NOT NULL AND NOT EXISTS (SELECT 1 FROM stock_ledger_entries s WHERE s.stock_ledger_entry_id=NEW.reversal_of AND s.company_id=NEW.company_id) THEN RAISE EXCEPTION 'Reversed stock entry must belong to the same company'; END IF;
  ELSIF TG_TABLE_NAME = 'pos_transactions' THEN
    IF NOT EXISTS (SELECT 1 FROM pos_sessions s WHERE s.pos_session_id=NEW.pos_session_id AND s.company_id=NEW.company_id) THEN RAISE EXCEPTION 'POS session must belong to the same company'; END IF;
    IF NEW.document_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM commercial_documents d WHERE d.document_id=NEW.document_id AND d.company_id=NEW.company_id) THEN RAISE EXCEPTION 'POS document must belong to the same company'; END IF;
  ELSIF TG_TABLE_NAME = 'commercial_orders' THEN
    IF NEW.party_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM business_parties p WHERE p.party_id=NEW.party_id AND p.company_id=NEW.company_id) THEN RAISE EXCEPTION 'Order party must belong to the same company'; END IF;
    IF NEW.source_document_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM commercial_documents d WHERE d.document_id=NEW.source_document_id AND d.company_id=NEW.company_id) THEN RAISE EXCEPTION 'Order source document must belong to the same company'; END IF;
  ELSIF TG_TABLE_NAME = 'commercial_order_lines' THEN
    IF NEW.product_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM products p JOIN commercial_orders o ON o.order_id=NEW.order_id WHERE p.product_id=NEW.product_id AND p.company_id=o.company_id) THEN RAISE EXCEPTION 'Order product must belong to the order company'; END IF;
  ELSIF TG_TABLE_NAME = 'bank_accounts' THEN
    IF NEW.gl_account_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM chart_of_accounts a WHERE a.account_id=NEW.gl_account_id AND a.company_id=NEW.company_id) THEN RAISE EXCEPTION 'Bank GL account must belong to the same company'; END IF;
  END IF;
  RETURN NEW;
END; $$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_commercial_document_tenant ON commercial_documents;
CREATE TRIGGER trg_commercial_document_tenant BEFORE INSERT OR UPDATE OF company_id, party_id, source_document_id, journal_entry_id ON commercial_documents FOR EACH ROW EXECUTE FUNCTION shouttech_validate_commercial_tenant();
DROP TRIGGER IF EXISTS trg_commercial_line_tenant ON commercial_document_lines;
CREATE TRIGGER trg_commercial_line_tenant BEFORE INSERT OR UPDATE OF document_id, product_id, warehouse_id, tax_code_id ON commercial_document_lines FOR EACH ROW EXECUTE FUNCTION shouttech_validate_commercial_tenant();
DROP TRIGGER IF EXISTS trg_payment_tenant ON payments;
CREATE TRIGGER trg_payment_tenant BEFORE INSERT OR UPDATE OF company_id, party_id, journal_entry_id ON payments FOR EACH ROW EXECUTE FUNCTION shouttech_validate_commercial_tenant();
DROP TRIGGER IF EXISTS trg_payment_allocation_integrity ON payment_allocations;
CREATE TRIGGER trg_payment_allocation_integrity BEFORE INSERT OR UPDATE ON payment_allocations FOR EACH ROW EXECUTE FUNCTION shouttech_validate_commercial_tenant();
DROP TRIGGER IF EXISTS trg_stock_ledger_tenant ON stock_ledger_entries;
CREATE TRIGGER trg_stock_ledger_tenant BEFORE INSERT ON stock_ledger_entries FOR EACH ROW EXECUTE FUNCTION shouttech_validate_commercial_tenant();
DROP TRIGGER IF EXISTS trg_pos_transaction_tenant ON pos_transactions;
CREATE TRIGGER trg_pos_transaction_tenant BEFORE INSERT OR UPDATE OF company_id, pos_session_id, document_id ON pos_transactions FOR EACH ROW EXECUTE FUNCTION shouttech_validate_commercial_tenant();
DROP TRIGGER IF EXISTS trg_order_tenant ON commercial_orders;
CREATE TRIGGER trg_order_tenant BEFORE INSERT OR UPDATE OF company_id, party_id, source_document_id ON commercial_orders FOR EACH ROW EXECUTE FUNCTION shouttech_validate_commercial_tenant();
DROP TRIGGER IF EXISTS trg_order_line_tenant ON commercial_order_lines;
CREATE TRIGGER trg_order_line_tenant BEFORE INSERT OR UPDATE ON commercial_order_lines FOR EACH ROW EXECUTE FUNCTION shouttech_validate_commercial_tenant();
DROP TRIGGER IF EXISTS trg_bank_account_tenant ON bank_accounts;
CREATE TRIGGER trg_bank_account_tenant BEFORE INSERT OR UPDATE OF company_id, gl_account_id ON bank_accounts FOR EACH ROW EXECUTE FUNCTION shouttech_validate_commercial_tenant();
