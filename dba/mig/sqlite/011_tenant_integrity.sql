-- Tenant-integrity guards for commercial operations.
-- These checks complement service validation and prevent cross-company references
-- even when writes bypass the application layer.

CREATE TRIGGER IF NOT EXISTS trg_commercial_document_tenant_insert
BEFORE INSERT ON commercial_documents
BEGIN
  SELECT CASE WHEN NEW.party_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM business_parties p WHERE p.party_id=NEW.party_id AND p.company_id=NEW.company_id
  ) THEN RAISE(ABORT, 'Document party must belong to the same company') END;
  SELECT CASE WHEN NEW.source_document_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM commercial_documents d WHERE d.document_id=NEW.source_document_id AND d.company_id=NEW.company_id
  ) THEN RAISE(ABORT, 'Source document must belong to the same company') END;
  SELECT CASE WHEN NEW.journal_entry_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM journal_entries j WHERE j.journal_entry_id=NEW.journal_entry_id AND j.company_id=NEW.company_id
  ) THEN RAISE(ABORT, 'Journal entry must belong to the same company') END;
END;
CREATE TRIGGER IF NOT EXISTS trg_commercial_document_tenant_update
BEFORE UPDATE OF company_id, party_id, source_document_id, journal_entry_id ON commercial_documents
BEGIN
  SELECT CASE WHEN NEW.party_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM business_parties p WHERE p.party_id=NEW.party_id AND p.company_id=NEW.company_id
  ) THEN RAISE(ABORT, 'Document party must belong to the same company') END;
  SELECT CASE WHEN NEW.source_document_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM commercial_documents d WHERE d.document_id=NEW.source_document_id AND d.company_id=NEW.company_id
  ) THEN RAISE(ABORT, 'Source document must belong to the same company') END;
  SELECT CASE WHEN NEW.journal_entry_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM journal_entries j WHERE j.journal_entry_id=NEW.journal_entry_id AND j.company_id=NEW.company_id
  ) THEN RAISE(ABORT, 'Journal entry must belong to the same company') END;
END;

CREATE TRIGGER IF NOT EXISTS trg_commercial_line_tenant_insert
BEFORE INSERT ON commercial_document_lines
BEGIN
  SELECT CASE WHEN NOT EXISTS (
    SELECT 1 FROM commercial_documents d WHERE d.document_id=NEW.document_id
  ) THEN RAISE(ABORT, 'Commercial document does not exist') END;
  SELECT CASE WHEN NEW.product_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM products p JOIN commercial_documents d ON d.document_id=NEW.document_id
    WHERE p.product_id=NEW.product_id AND p.company_id=d.company_id
  ) THEN RAISE(ABORT, 'Product must belong to the document company') END;
  SELECT CASE WHEN NEW.warehouse_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM warehouses w JOIN commercial_documents d ON d.document_id=NEW.document_id
    WHERE w.warehouse_id=NEW.warehouse_id AND w.company_id=d.company_id
  ) THEN RAISE(ABORT, 'Warehouse must belong to the document company') END;
  SELECT CASE WHEN NEW.tax_code_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM tax_codes t JOIN commercial_documents d ON d.document_id=NEW.document_id
    WHERE t.tax_code_id=NEW.tax_code_id AND t.company_id=d.company_id
  ) THEN RAISE(ABORT, 'Tax code must belong to the document company') END;
END;
CREATE TRIGGER IF NOT EXISTS trg_commercial_line_tenant_update
BEFORE UPDATE OF document_id, product_id, warehouse_id, tax_code_id ON commercial_document_lines
BEGIN
  SELECT CASE WHEN NEW.product_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM products p JOIN commercial_documents d ON d.document_id=NEW.document_id
    WHERE p.product_id=NEW.product_id AND p.company_id=d.company_id
  ) THEN RAISE(ABORT, 'Product must belong to the document company') END;
  SELECT CASE WHEN NEW.warehouse_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM warehouses w JOIN commercial_documents d ON d.document_id=NEW.document_id
    WHERE w.warehouse_id=NEW.warehouse_id AND w.company_id=d.company_id
  ) THEN RAISE(ABORT, 'Warehouse must belong to the document company') END;
  SELECT CASE WHEN NEW.tax_code_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM tax_codes t JOIN commercial_documents d ON d.document_id=NEW.document_id
    WHERE t.tax_code_id=NEW.tax_code_id AND t.company_id=d.company_id
  ) THEN RAISE(ABORT, 'Tax code must belong to the document company') END;
END;

CREATE TRIGGER IF NOT EXISTS trg_payment_tenant_insert
BEFORE INSERT ON payments
BEGIN
  SELECT CASE WHEN NEW.party_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM business_parties p WHERE p.party_id=NEW.party_id AND p.company_id=NEW.company_id
  ) THEN RAISE(ABORT, 'Payment party must belong to the same company') END;
  SELECT CASE WHEN NEW.journal_entry_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM journal_entries j WHERE j.journal_entry_id=NEW.journal_entry_id AND j.company_id=NEW.company_id
  ) THEN RAISE(ABORT, 'Payment journal must belong to the same company') END;
END;
CREATE TRIGGER IF NOT EXISTS trg_payment_tenant_update
BEFORE UPDATE OF company_id, party_id, journal_entry_id ON payments
BEGIN
  SELECT CASE WHEN NEW.party_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM business_parties p WHERE p.party_id=NEW.party_id AND p.company_id=NEW.company_id
  ) THEN RAISE(ABORT, 'Payment party must belong to the same company') END;
  SELECT CASE WHEN NEW.journal_entry_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM journal_entries j WHERE j.journal_entry_id=NEW.journal_entry_id AND j.company_id=NEW.company_id
  ) THEN RAISE(ABORT, 'Payment journal must belong to the same company') END;
END;

CREATE TRIGGER IF NOT EXISTS trg_payment_allocation_integrity_insert
BEFORE INSERT ON payment_allocations
BEGIN
  SELECT CASE WHEN NOT EXISTS (
    SELECT 1 FROM payments p JOIN commercial_documents d ON d.document_id=NEW.document_id
    WHERE p.payment_id=NEW.payment_id AND p.company_id=NEW.company_id
      AND d.company_id=NEW.company_id AND p.currency_code=d.currency_code
  ) THEN RAISE(ABORT, 'Payment and document must share company and currency') END;
  SELECT CASE WHEN NEW.allocated_amount + COALESCE((
    SELECT sum(a.allocated_amount) FROM payment_allocations a WHERE a.payment_id=NEW.payment_id
  ),0) > (SELECT p.amount FROM payments p WHERE p.payment_id=NEW.payment_id)
    THEN RAISE(ABORT, 'Allocations exceed payment amount') END;
  SELECT CASE WHEN NEW.allocated_amount + COALESCE((
    SELECT sum(a.allocated_amount) FROM payment_allocations a WHERE a.document_id=NEW.document_id
  ),0) > (SELECT d.grand_total FROM commercial_documents d WHERE d.document_id=NEW.document_id)
    THEN RAISE(ABORT, 'Allocations exceed document total') END;
END;

CREATE TRIGGER IF NOT EXISTS trg_stock_ledger_tenant_insert
BEFORE INSERT ON stock_ledger_entries
BEGIN
  SELECT CASE WHEN NOT EXISTS (
    SELECT 1 FROM warehouses w JOIN products p ON p.product_id=NEW.product_id
    WHERE w.warehouse_id=NEW.warehouse_id AND w.company_id=NEW.company_id AND p.company_id=NEW.company_id
  ) THEN RAISE(ABORT, 'Stock product and warehouse must belong to the same company') END;
  SELECT CASE WHEN NEW.reversal_of IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM stock_ledger_entries s WHERE s.stock_ledger_entry_id=NEW.reversal_of AND s.company_id=NEW.company_id
  ) THEN RAISE(ABORT, 'Reversed stock entry must belong to the same company') END;
END;

CREATE TRIGGER IF NOT EXISTS trg_pos_session_company_update
BEFORE UPDATE OF company_id ON pos_sessions
BEGIN
  SELECT CASE WHEN EXISTS (
    SELECT 1 FROM pos_transactions t WHERE t.pos_session_id=OLD.pos_session_id AND t.company_id<>NEW.company_id
  ) THEN RAISE(ABORT, 'Cannot move a POS session across companies') END;
END;
CREATE TRIGGER IF NOT EXISTS trg_pos_transaction_tenant_insert
BEFORE INSERT ON pos_transactions
BEGIN
  SELECT CASE WHEN NOT EXISTS (
    SELECT 1 FROM pos_sessions s WHERE s.pos_session_id=NEW.pos_session_id AND s.company_id=NEW.company_id
  ) THEN RAISE(ABORT, 'POS session must belong to the same company') END;
  SELECT CASE WHEN NEW.document_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM commercial_documents d WHERE d.document_id=NEW.document_id AND d.company_id=NEW.company_id
  ) THEN RAISE(ABORT, 'POS document must belong to the same company') END;
END;
CREATE TRIGGER IF NOT EXISTS trg_pos_payment_tenant_insert
BEFORE INSERT ON pos_transaction_payments
BEGIN
  SELECT CASE WHEN NOT EXISTS (
    SELECT 1 FROM pos_transactions t WHERE t.pos_transaction_id=NEW.pos_transaction_id
  ) THEN RAISE(ABORT, 'POS transaction does not exist') END;
END;

CREATE TRIGGER IF NOT EXISTS trg_order_tenant_insert
BEFORE INSERT ON commercial_orders
BEGIN
  SELECT CASE WHEN NEW.party_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM business_parties p WHERE p.party_id=NEW.party_id AND p.company_id=NEW.company_id
  ) THEN RAISE(ABORT, 'Order party must belong to the same company') END;
  SELECT CASE WHEN NEW.source_document_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM commercial_documents d WHERE d.document_id=NEW.source_document_id AND d.company_id=NEW.company_id
  ) THEN RAISE(ABORT, 'Order source document must belong to the same company') END;
END;
CREATE TRIGGER IF NOT EXISTS trg_order_line_tenant_insert
BEFORE INSERT ON commercial_order_lines
BEGIN
  SELECT CASE WHEN NEW.product_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM products p JOIN commercial_orders o ON o.order_id=NEW.order_id
    WHERE p.product_id=NEW.product_id AND p.company_id=o.company_id
  ) THEN RAISE(ABORT, 'Order product must belong to the order company') END;
END;

CREATE TRIGGER IF NOT EXISTS trg_bank_account_tenant_insert
BEFORE INSERT ON bank_accounts
WHEN NEW.gl_account_id IS NOT NULL
BEGIN
  SELECT CASE WHEN NOT EXISTS (
    SELECT 1 FROM chart_of_accounts a WHERE a.account_id=NEW.gl_account_id AND a.company_id=NEW.company_id
  ) THEN RAISE(ABORT, 'Bank GL account must belong to the same company') END;
END;


-- Apply the same tenant and amount checks when an allocation is edited.
CREATE TRIGGER IF NOT EXISTS trg_payment_allocation_integrity_update
BEFORE UPDATE ON payment_allocations
BEGIN
  SELECT CASE WHEN NOT EXISTS (
    SELECT 1 FROM payments p JOIN commercial_documents d ON d.document_id=NEW.document_id
    WHERE p.payment_id=NEW.payment_id AND p.company_id=NEW.company_id
      AND d.company_id=NEW.company_id AND p.currency_code=d.currency_code
  ) THEN RAISE(ABORT, 'Payment and document must share company and currency') END;
  SELECT CASE WHEN NEW.allocated_amount + COALESCE((
    SELECT sum(a.allocated_amount) FROM payment_allocations a
    WHERE a.payment_id=NEW.payment_id AND a.allocation_id<>OLD.allocation_id
  ),0) > (SELECT p.amount FROM payments p WHERE p.payment_id=NEW.payment_id)
    THEN RAISE(ABORT, 'Allocations exceed payment amount') END;
  SELECT CASE WHEN NEW.allocated_amount + COALESCE((
    SELECT sum(a.allocated_amount) FROM payment_allocations a
    WHERE a.document_id=NEW.document_id AND a.allocation_id<>OLD.allocation_id
  ),0) > (SELECT d.grand_total FROM commercial_documents d WHERE d.document_id=NEW.document_id)
    THEN RAISE(ABORT, 'Allocations exceed document total') END;
END;

CREATE TRIGGER IF NOT EXISTS trg_pos_transaction_tenant_update
BEFORE UPDATE OF company_id, pos_session_id, document_id ON pos_transactions
BEGIN
  SELECT CASE WHEN NOT EXISTS (
    SELECT 1 FROM pos_sessions s WHERE s.pos_session_id=NEW.pos_session_id AND s.company_id=NEW.company_id
  ) THEN RAISE(ABORT, 'POS session must belong to the same company') END;
  SELECT CASE WHEN NEW.document_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM commercial_documents d WHERE d.document_id=NEW.document_id AND d.company_id=NEW.company_id
  ) THEN RAISE(ABORT, 'POS document must belong to the same company') END;
END;

CREATE TRIGGER IF NOT EXISTS trg_order_tenant_update
BEFORE UPDATE OF company_id, party_id, source_document_id ON commercial_orders
BEGIN
  SELECT CASE WHEN NEW.party_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM business_parties p WHERE p.party_id=NEW.party_id AND p.company_id=NEW.company_id
  ) THEN RAISE(ABORT, 'Order party must belong to the same company') END;
  SELECT CASE WHEN NEW.source_document_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM commercial_documents d WHERE d.document_id=NEW.source_document_id AND d.company_id=NEW.company_id
  ) THEN RAISE(ABORT, 'Order source document must belong to the same company') END;
END;

CREATE TRIGGER IF NOT EXISTS trg_order_line_tenant_update
BEFORE UPDATE OF order_id, product_id ON commercial_order_lines
BEGIN
  SELECT CASE WHEN NEW.product_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM products p JOIN commercial_orders o ON o.order_id=NEW.order_id
    WHERE p.product_id=NEW.product_id AND p.company_id=o.company_id
  ) THEN RAISE(ABORT, 'Order product must belong to the order company') END;
END;

CREATE TRIGGER IF NOT EXISTS trg_bank_account_tenant_update
BEFORE UPDATE OF company_id, gl_account_id ON bank_accounts
WHEN NEW.gl_account_id IS NOT NULL
BEGIN
  SELECT CASE WHEN NOT EXISTS (
    SELECT 1 FROM chart_of_accounts a WHERE a.account_id=NEW.gl_account_id AND a.company_id=NEW.company_id
  ) THEN RAISE(ABORT, 'Bank GL account must belong to the same company') END;
END;
