-- ShouTech ERP commercial operations schema (SQLite).
-- Additive migration: preserves existing records and legacy table contracts.
-- Financial and inventory ledgers are append-only; corrections use reversing records.
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS product_categories (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id),
    category_code TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    name_en TEXT,
    parent_category_id INTEGER REFERENCES product_categories(category_id),
    is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0,1)),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(company_id, category_code)
);
CREATE INDEX IF NOT EXISTS ix_product_categories_parent ON product_categories(company_id, parent_category_id);

CREATE TABLE IF NOT EXISTS warehouses (
    warehouse_id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id),
    warehouse_code TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    name_en TEXT,
    address TEXT,
    is_default INTEGER NOT NULL DEFAULT 0 CHECK (is_default IN (0,1)),
    is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0,1)),
    is_deleted INTEGER NOT NULL DEFAULT 0 CHECK (is_deleted IN (0,1)),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(company_id, warehouse_code)
);
CREATE UNIQUE INDEX IF NOT EXISTS ux_warehouses_default_per_company ON warehouses(company_id) WHERE is_default=1 AND is_deleted=0;

CREATE TABLE IF NOT EXISTS business_parties (
    party_id TEXT NOT NULL PRIMARY KEY,
    company_id TEXT NOT NULL REFERENCES companies(company_id),
    party_code TEXT NOT NULL,
    party_type TEXT NOT NULL CHECK (party_type IN ('CUSTOMER','SUPPLIER','BOTH','EMPLOYEE','OTHER')),
    name_ar TEXT NOT NULL,
    name_en TEXT,
    tax_number TEXT,
    email TEXT,
    phone TEXT,
    mobile TEXT,
    address TEXT,
    credit_limit NUMERIC NOT NULL DEFAULT 0 CHECK (credit_limit >= 0),
    payment_terms_days INTEGER NOT NULL DEFAULT 0 CHECK (payment_terms_days >= 0),
    is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0,1)),
    is_deleted INTEGER NOT NULL DEFAULT 0 CHECK (is_deleted IN (0,1)),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT,
    UNIQUE(company_id, party_code)
);
CREATE INDEX IF NOT EXISTS ix_business_parties_name_ar ON business_parties(company_id, name_ar);
CREATE INDEX IF NOT EXISTS ix_business_parties_tax ON business_parties(company_id, tax_number) WHERE tax_number IS NOT NULL;

CREATE TABLE IF NOT EXISTS currencies (
    currency_code TEXT NOT NULL PRIMARY KEY CHECK (length(currency_code)=3),
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    minor_units INTEGER NOT NULL DEFAULT 2 CHECK (minor_units BETWEEN 0 AND 6),
    is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0,1))
);

-- Seed common ISO currency metadata; company-specific base currency remains configurable.
INSERT OR IGNORE INTO currencies(currency_code, name_ar, name_en, minor_units, is_active) VALUES
    ('AED','الدرهم الإماراتي','UAE Dirham',2,1),
    ('AUD','الدولار الأسترالي','Australian Dollar',2,1),
    ('BHD','الدينار البحريني','Bahraini Dinar',3,1),
    ('BRL','الريال البرازيلي','Brazilian Real',2,1),
    ('CAD','الدولار الكندي','Canadian Dollar',2,1),
    ('CHF','الفرنك السويسري','Swiss Franc',2,1),
    ('CNY','اليوان الصيني','Chinese Yuan',2,1),
    ('DKK','الكرونة الدنماركية','Danish Krone',2,1),
    ('DZD','الدينار الجزائري','Algerian Dinar',2,1),
    ('EGP','الجنيه المصري','Egyptian Pound',2,1),
    ('EUR','اليورو','Euro',2,1),
    ('GBP','الجنيه الإسترليني','Pound Sterling',2,1),
    ('INR','الروبية الهندية','Indian Rupee',2,1),
    ('IQD','الدينار العراقي','Iraqi Dinar',3,1),
    ('ILS','الشيكل الإسرائيلي الجديد','Israeli New Shekel',2,1),
    ('JOD','الدينار الأردني','Jordanian Dinar',3,1),
    ('JPY','الين الياباني','Japanese Yen',0,1),
    ('KWD','الدينار الكويتي','Kuwaiti Dinar',3,1),
    ('LBP','الليرة اللبنانية','Lebanese Pound',2,1),
    ('LYD','الدينار الليبي','Libyan Dinar',3,1),
    ('MAD','الدرهم المغربي','Moroccan Dirham',2,1),
    ('NOK','الكرونة النرويجية','Norwegian Krone',2,1),
    ('OMR','الريال العماني','Omani Rial',3,1),
    ('PKR','الروبية الباكستانية','Pakistani Rupee',2,1),
    ('PLN','الزلوتي البولندي','Polish Zloty',2,1),
    ('QAR','الريال القطري','Qatari Riyal',2,1),
    ('RUB','الروبل الروسي','Russian Ruble',2,1),
    ('SAR','الريال السعودي','Saudi Riyal',2,1),
    ('SEK','الكرونة السويدية','Swedish Krona',2,1),
    ('SYP','الليرة السورية','Syrian Pound',2,1),
    ('TND','الدينار التونسي','Tunisian Dinar',3,1),
    ('TRY','الليرة التركية','Turkish Lira',2,1),
    ('USD','الدولار الأمريكي','US Dollar',2,1),
    ('YER','الريال اليمني','Yemeni Rial',2,1),
    ('ZAR','الراند الجنوب أفريقي','South African Rand',2,1);

CREATE TABLE IF NOT EXISTS company_currencies (
    company_id TEXT NOT NULL REFERENCES companies(company_id),
    currency_code TEXT NOT NULL REFERENCES currencies(currency_code),
    is_base INTEGER NOT NULL DEFAULT 0 CHECK (is_base IN (0,1)),
    is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0,1)),
    PRIMARY KEY(company_id, currency_code)
);
CREATE UNIQUE INDEX IF NOT EXISTS ux_company_base_currency ON company_currencies(company_id) WHERE is_base=1;
INSERT OR IGNORE INTO company_currencies(company_id, currency_code, is_base, is_active)
SELECT c.company_id, c.currency_code, 1, 1 FROM companies c JOIN currencies cur ON cur.currency_code=c.currency_code;

CREATE TABLE IF NOT EXISTS tax_codes (
    tax_code_id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id),
    code TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    name_en TEXT,
    rate NUMERIC NOT NULL CHECK (rate >= 0 AND rate <= 100),
    recoverable INTEGER NOT NULL DEFAULT 1 CHECK (recoverable IN (0,1)),
    is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0,1)),
    UNIQUE(company_id, code)
);

CREATE TABLE IF NOT EXISTS cost_centers (
    cost_center_id TEXT NOT NULL PRIMARY KEY,
    company_id TEXT NOT NULL REFERENCES companies(company_id),
    cost_center_code TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    name_en TEXT,
    parent_cost_center_id TEXT REFERENCES cost_centers(cost_center_id),
    is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0,1)),
    is_deleted INTEGER NOT NULL DEFAULT 0 CHECK (is_deleted IN (0,1)),
    UNIQUE(company_id, cost_center_code)
);
CREATE INDEX IF NOT EXISTS ix_cost_centers_parent ON cost_centers(company_id, parent_cost_center_id);

CREATE TABLE IF NOT EXISTS commercial_documents (
    document_id TEXT NOT NULL PRIMARY KEY,
    company_id TEXT NOT NULL REFERENCES companies(company_id),
    document_type TEXT NOT NULL CHECK (document_type IN ('SALES_INVOICE','PURCHASE_INVOICE','SALES_RETURN','PURCHASE_RETURN','QUOTATION','CREDIT_NOTE','DEBIT_NOTE')),
    document_number TEXT NOT NULL,
    party_id TEXT REFERENCES business_parties(party_id),
    document_date TEXT NOT NULL,
    due_date TEXT,
    currency_code TEXT NOT NULL REFERENCES currencies(currency_code),
    exchange_rate NUMERIC NOT NULL DEFAULT 1 CHECK (exchange_rate > 0),
    status TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT','APPROVED','POSTED','CANCELLED','REVERSED')),
    subtotal NUMERIC NOT NULL DEFAULT 0,
    discount_total NUMERIC NOT NULL DEFAULT 0 CHECK (discount_total >= 0),
    tax_total NUMERIC NOT NULL DEFAULT 0,
    grand_total NUMERIC NOT NULL DEFAULT 0,
    paid_total NUMERIC NOT NULL DEFAULT 0 CHECK (paid_total >= 0),
    notes TEXT,
    source_document_id TEXT REFERENCES commercial_documents(document_id),
    journal_entry_id TEXT REFERENCES journal_entries(journal_entry_id),
    created_by TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by TEXT,
    updated_at TEXT,
    posted_by TEXT,
    posted_at TEXT,
    reversed_by TEXT,
    reversed_at TEXT,
    reversal_reason TEXT,
    UNIQUE(company_id, document_type, document_number),
    CHECK (due_date IS NULL OR due_date >= document_date),
    CHECK (grand_total >= 0)
);
CREATE INDEX IF NOT EXISTS ix_commercial_documents_date ON commercial_documents(company_id, document_type, document_date, status);
CREATE INDEX IF NOT EXISTS ix_commercial_documents_party_due ON commercial_documents(company_id, party_id, due_date, status);
CREATE INDEX IF NOT EXISTS ix_commercial_documents_journal ON commercial_documents(company_id, journal_entry_id) WHERE journal_entry_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS commercial_document_lines (
    line_id TEXT NOT NULL PRIMARY KEY,
    document_id TEXT NOT NULL REFERENCES commercial_documents(document_id),
    line_number INTEGER NOT NULL CHECK (line_number > 0),
    product_id INTEGER REFERENCES products(product_id),
    description TEXT NOT NULL,
    quantity NUMERIC NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC NOT NULL CHECK (unit_price >= 0),
    discount_rate NUMERIC NOT NULL DEFAULT 0 CHECK (discount_rate BETWEEN 0 AND 100),
    discount_amount NUMERIC NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
    tax_code_id INTEGER REFERENCES tax_codes(tax_code_id),
    tax_rate NUMERIC NOT NULL DEFAULT 0 CHECK (tax_rate BETWEEN 0 AND 100),
    tax_amount NUMERIC NOT NULL DEFAULT 0,
    line_total NUMERIC NOT NULL DEFAULT 0,
    warehouse_id INTEGER REFERENCES warehouses(warehouse_id),
    UNIQUE(document_id, line_number)
);
CREATE INDEX IF NOT EXISTS ix_commercial_document_lines_product ON commercial_document_lines(product_id, document_id);

CREATE TABLE IF NOT EXISTS payments (
    payment_id TEXT NOT NULL PRIMARY KEY,
    company_id TEXT NOT NULL REFERENCES companies(company_id),
    payment_number TEXT NOT NULL,
    payment_type TEXT NOT NULL CHECK (payment_type IN ('RECEIPT','DISBURSEMENT','REFUND')),
    party_id TEXT REFERENCES business_parties(party_id),
    payment_date TEXT NOT NULL,
    currency_code TEXT NOT NULL REFERENCES currencies(currency_code),
    exchange_rate NUMERIC NOT NULL DEFAULT 1 CHECK (exchange_rate > 0),
    amount NUMERIC NOT NULL CHECK (amount > 0),
    payment_method TEXT NOT NULL CHECK (payment_method IN ('CASH','BANK','CARD','CHEQUE','TRANSFER','OTHER')),
    reference_number TEXT,
    status TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT','POSTED','CANCELLED','REVERSED')),
    journal_entry_id TEXT REFERENCES journal_entries(journal_entry_id),
    notes TEXT,
    created_by TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    posted_by TEXT,
    posted_at TEXT,
    UNIQUE(company_id, payment_number)
);
CREATE INDEX IF NOT EXISTS ix_payments_party_date ON payments(company_id, party_id, payment_date, status);

CREATE TABLE IF NOT EXISTS payment_allocations (
    allocation_id TEXT NOT NULL PRIMARY KEY,
    company_id TEXT NOT NULL REFERENCES companies(company_id),
    payment_id TEXT NOT NULL REFERENCES payments(payment_id),
    document_id TEXT NOT NULL REFERENCES commercial_documents(document_id),
    allocated_amount NUMERIC NOT NULL CHECK (allocated_amount > 0),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(payment_id, document_id)
);
CREATE INDEX IF NOT EXISTS ix_payment_allocations_document ON payment_allocations(company_id, document_id);

CREATE TABLE IF NOT EXISTS stock_ledger_entries (
    stock_ledger_entry_id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id),
    warehouse_id INTEGER NOT NULL REFERENCES warehouses(warehouse_id),
    product_id INTEGER NOT NULL REFERENCES products(product_id),
    posting_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    quantity_delta NUMERIC NOT NULL CHECK (quantity_delta <> 0),
    unit_cost NUMERIC NOT NULL DEFAULT 0 CHECK (unit_cost >= 0),
    value_delta NUMERIC NOT NULL DEFAULT 0,
    source_type TEXT NOT NULL,
    source_id TEXT NOT NULL,
    source_line_id TEXT,
    reversal_of INTEGER REFERENCES stock_ledger_entries(stock_ledger_entry_id),
    created_by TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(company_id, source_type, source_id, source_line_id, warehouse_id, product_id)
);
CREATE INDEX IF NOT EXISTS ix_stock_ledger_product_date ON stock_ledger_entries(company_id, product_id, warehouse_id, posting_at, stock_ledger_entry_id);
CREATE INDEX IF NOT EXISTS ix_stock_ledger_source ON stock_ledger_entries(company_id, source_type, source_id);

CREATE TABLE IF NOT EXISTS bank_accounts (
    bank_account_id TEXT NOT NULL PRIMARY KEY,
    company_id TEXT NOT NULL REFERENCES companies(company_id),
    bank_code TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    name_en TEXT,
    currency_code TEXT NOT NULL REFERENCES currencies(currency_code),
    account_number_encrypted TEXT,
    iban_encrypted TEXT,
    gl_account_id TEXT REFERENCES chart_of_accounts(account_id),
    is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0,1)),
    UNIQUE(company_id, bank_code)
);
CREATE TABLE IF NOT EXISTS cheques (
    cheque_id TEXT NOT NULL PRIMARY KEY,
    company_id TEXT NOT NULL REFERENCES companies(company_id),
    cheque_number TEXT NOT NULL,
    cheque_type TEXT NOT NULL CHECK (cheque_type IN ('RECEIVABLE','PAYABLE')),
    party_id TEXT REFERENCES business_parties(party_id),
    bank_account_id TEXT REFERENCES bank_accounts(bank_account_id),
    issue_date TEXT,
    due_date TEXT NOT NULL,
    currency_code TEXT NOT NULL REFERENCES currencies(currency_code),
    amount NUMERIC NOT NULL CHECK (amount > 0),
    status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING','DEPOSITED','CLEARED','BOUNCED','CANCELLED')),
    payment_id TEXT REFERENCES payments(payment_id),
    notes TEXT,
    created_by TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(company_id, cheque_type, cheque_number)
);
CREATE INDEX IF NOT EXISTS ix_cheques_due_status ON cheques(company_id, due_date, status);

CREATE TABLE IF NOT EXISTS pos_sessions (
    pos_session_id TEXT NOT NULL PRIMARY KEY,
    company_id TEXT NOT NULL REFERENCES companies(company_id),
    session_number TEXT NOT NULL,
    terminal_code TEXT NOT NULL,
    opened_by TEXT NOT NULL,
    opened_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    opening_cash NUMERIC NOT NULL DEFAULT 0 CHECK (opening_cash >= 0),
    closed_by TEXT,
    closed_at TEXT,
    closing_cash NUMERIC,
    status TEXT NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN','CLOSED','RECONCILED')),
    UNIQUE(company_id, session_number)
);
CREATE TABLE IF NOT EXISTS pos_transactions (
    pos_transaction_id TEXT NOT NULL PRIMARY KEY,
    company_id TEXT NOT NULL REFERENCES companies(company_id),
    pos_session_id TEXT NOT NULL REFERENCES pos_sessions(pos_session_id),
    document_id TEXT REFERENCES commercial_documents(document_id),
    transaction_number TEXT NOT NULL,
    transaction_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT','POSTED','VOIDED','REVERSED')),
    total_amount NUMERIC NOT NULL DEFAULT 0,
    created_by TEXT NOT NULL,
    UNIQUE(company_id, transaction_number)
);
CREATE TABLE IF NOT EXISTS pos_transaction_payments (
    pos_payment_id TEXT NOT NULL PRIMARY KEY,
    pos_transaction_id TEXT NOT NULL REFERENCES pos_transactions(pos_transaction_id),
    payment_method TEXT NOT NULL,
    amount NUMERIC NOT NULL CHECK (amount > 0),
    reference_number TEXT
);

CREATE TABLE IF NOT EXISTS commercial_orders (
    order_id TEXT NOT NULL PRIMARY KEY,
    company_id TEXT NOT NULL REFERENCES companies(company_id),
    order_type TEXT NOT NULL CHECK (order_type IN ('SALES','PURCHASE')),
    order_number TEXT NOT NULL,
    party_id TEXT REFERENCES business_parties(party_id),
    order_date TEXT NOT NULL,
    expected_date TEXT,
    status TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT','CONFIRMED','PARTIAL','COMPLETED','CANCELLED')),
    currency_code TEXT NOT NULL REFERENCES currencies(currency_code),
    total_amount NUMERIC NOT NULL DEFAULT 0,
    source_document_id TEXT REFERENCES commercial_documents(document_id),
    created_by TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(company_id, order_type, order_number),
    CHECK (expected_date IS NULL OR expected_date >= order_date)
);
CREATE TABLE IF NOT EXISTS commercial_order_lines (
    order_line_id TEXT NOT NULL PRIMARY KEY,
    order_id TEXT NOT NULL REFERENCES commercial_orders(order_id),
    line_number INTEGER NOT NULL CHECK (line_number > 0),
    product_id INTEGER REFERENCES products(product_id),
    description TEXT NOT NULL,
    quantity NUMERIC NOT NULL CHECK (quantity > 0),
    fulfilled_quantity NUMERIC NOT NULL DEFAULT 0 CHECK (fulfilled_quantity >= 0 AND fulfilled_quantity <= quantity),
    unit_price NUMERIC NOT NULL CHECK (unit_price >= 0),
    UNIQUE(order_id, line_number)
);

CREATE TABLE IF NOT EXISTS application_settings (
    setting_id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT REFERENCES companies(company_id),
    setting_key TEXT NOT NULL,
    setting_value TEXT NOT NULL,
    is_secret INTEGER NOT NULL DEFAULT 0 CHECK (is_secret IN (0,1)),
    updated_by TEXT NOT NULL,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(company_id, setting_key)
);
CREATE TABLE IF NOT EXISTS audit_events (
    audit_event_id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT REFERENCES companies(company_id),
    actor_id TEXT NOT NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    correlation_id TEXT,
    before_state TEXT,
    after_state TEXT,
    reason TEXT,
    occurred_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS ix_audit_events_entity_date ON audit_events(company_id, entity_type, entity_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS ix_audit_events_actor_date ON audit_events(company_id, actor_id, occurred_at DESC);

-- Reject posting unless a journal has at least two lines and equal non-zero totals.
CREATE TRIGGER IF NOT EXISTS trg_journal_must_balance
BEFORE UPDATE OF status ON journal_entries
WHEN NEW.status = 1 AND OLD.status <> NEW.status
BEGIN
    SELECT CASE WHEN (SELECT count(*) FROM journal_entry_lines WHERE journal_entry_id=NEW.journal_entry_id) < 2
        THEN RAISE(ABORT, 'A journal entry requires at least two lines') END;
    SELECT CASE WHEN (SELECT COALESCE(sum(debit),0) FROM journal_entry_lines WHERE journal_entry_id=NEW.journal_entry_id) <= 0
        OR (SELECT COALESCE(sum(debit),0) FROM journal_entry_lines WHERE journal_entry_id=NEW.journal_entry_id)
           <> (SELECT COALESCE(sum(credit),0) FROM journal_entry_lines WHERE journal_entry_id=NEW.journal_entry_id)
        THEN RAISE(ABORT, 'Journal entry is not balanced') END;
END;

-- Reject direct edits/deletes of stock ledger facts. Reverse with compensating entries.
CREATE TRIGGER IF NOT EXISTS trg_stock_ledger_no_update
BEFORE UPDATE ON stock_ledger_entries
BEGIN
    SELECT RAISE(ABORT, 'Stock ledger entries are immutable; create a reversing entry');
END;
CREATE TRIGGER IF NOT EXISTS trg_stock_ledger_no_delete
BEFORE DELETE ON stock_ledger_entries
BEGIN
    SELECT RAISE(ABORT, 'Stock ledger entries are immutable; create a reversing entry');
END;
