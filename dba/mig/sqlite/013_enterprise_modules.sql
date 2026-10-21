-- ShouTech ERP enterprise modules. Additive migration; existing data and contracts are preserved.
-- Reference patterns: ERPNext (accounts/stock/sales/purchase) and Dolibarr (modular SQL DDL).
-- Flexible attributes are supplementary; core business fields remain typed.
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS crm_leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_crm_leads_company_status ON crm_leads(company_id, status);

CREATE TABLE IF NOT EXISTS crm_opportunities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_crm_opportunities_company_status ON crm_opportunities(company_id, status);

CREATE TABLE IF NOT EXISTS crm_activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_crm_activities_company_status ON crm_activities(company_id, status);

CREATE TABLE IF NOT EXISTS crm_activity_participants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_crm_activity_participants_company_status ON crm_activity_participants(company_id, status);
CREATE INDEX IF NOT EXISTS idx_crm_activity_participants_parent_line ON crm_activity_participants(parent_id, line_no);

CREATE TABLE IF NOT EXISTS crm_campaigns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_crm_campaigns_company_status ON crm_campaigns(company_id, status);
CREATE INDEX IF NOT EXISTS idx_crm_campaigns_company_date ON crm_campaigns(company_id, document_date);

CREATE TABLE IF NOT EXISTS crm_campaign_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_crm_campaign_members_company_status ON crm_campaign_members(company_id, status);
CREATE INDEX IF NOT EXISTS idx_crm_campaign_members_parent_line ON crm_campaign_members(parent_id, line_no);

CREATE TABLE IF NOT EXISTS crm_cases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_crm_cases_company_status ON crm_cases(company_id, status);
CREATE INDEX IF NOT EXISTS idx_crm_cases_company_date ON crm_cases(company_id, document_date);

CREATE TABLE IF NOT EXISTS crm_case_comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_crm_case_comments_company_status ON crm_case_comments(company_id, status);
CREATE INDEX IF NOT EXISTS idx_crm_case_comments_parent_line ON crm_case_comments(parent_id, line_no);

CREATE TABLE IF NOT EXISTS crm_case_attachments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_crm_case_attachments_company_status ON crm_case_attachments(company_id, status);
CREATE INDEX IF NOT EXISTS idx_crm_case_attachments_parent_line ON crm_case_attachments(parent_id, line_no);

CREATE TABLE IF NOT EXISTS crm_contracts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_crm_contracts_company_status ON crm_contracts(company_id, status);
CREATE INDEX IF NOT EXISTS idx_crm_contracts_company_date ON crm_contracts(company_id, document_date);

CREATE TABLE IF NOT EXISTS crm_contract_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_crm_contract_lines_company_status ON crm_contract_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_crm_contract_lines_parent_line ON crm_contract_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS crm_contact_methods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_crm_contact_methods_company_status ON crm_contact_methods(company_id, status);

CREATE TABLE IF NOT EXISTS crm_addresses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_crm_addresses_company_status ON crm_addresses(company_id, status);

CREATE TABLE IF NOT EXISTS crm_tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_crm_tags_company_status ON crm_tags(company_id, status);
CREATE INDEX IF NOT EXISTS idx_crm_tags_parent_line ON crm_tags(parent_id, line_no);

CREATE TABLE IF NOT EXISTS crm_entity_tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_crm_entity_tags_company_status ON crm_entity_tags(company_id, status);
CREATE INDEX IF NOT EXISTS idx_crm_entity_tags_parent_line ON crm_entity_tags(parent_id, line_no);

CREATE TABLE IF NOT EXISTS sales_quotations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_sales_quotations_company_status ON sales_quotations(company_id, status);
CREATE INDEX IF NOT EXISTS idx_sales_quotations_company_date ON sales_quotations(company_id, document_date);

CREATE TABLE IF NOT EXISTS sales_quotation_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_sales_quotation_lines_company_status ON sales_quotation_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_sales_quotation_lines_parent_line ON sales_quotation_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS sales_orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_sales_orders_company_status ON sales_orders(company_id, status);
CREATE INDEX IF NOT EXISTS idx_sales_orders_company_date ON sales_orders(company_id, document_date);

CREATE TABLE IF NOT EXISTS sales_order_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_sales_order_lines_company_status ON sales_order_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_sales_order_lines_parent_line ON sales_order_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS sales_shipments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_sales_shipments_company_status ON sales_shipments(company_id, status);
CREATE INDEX IF NOT EXISTS idx_sales_shipments_company_date ON sales_shipments(company_id, document_date);

CREATE TABLE IF NOT EXISTS sales_shipment_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_sales_shipment_lines_company_status ON sales_shipment_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_sales_shipment_lines_parent_line ON sales_shipment_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS sales_returns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_sales_returns_company_status ON sales_returns(company_id, status);
CREATE INDEX IF NOT EXISTS idx_sales_returns_company_date ON sales_returns(company_id, document_date);

CREATE TABLE IF NOT EXISTS sales_return_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_sales_return_lines_company_status ON sales_return_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_sales_return_lines_parent_line ON sales_return_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS sales_commissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_sales_commissions_company_status ON sales_commissions(company_id, status);

CREATE TABLE IF NOT EXISTS sales_commission_rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_sales_commission_rules_company_status ON sales_commission_rules(company_id, status);

CREATE TABLE IF NOT EXISTS sales_price_lists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_sales_price_lists_company_status ON sales_price_lists(company_id, status);

CREATE TABLE IF NOT EXISTS sales_price_list_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_sales_price_list_lines_company_status ON sales_price_list_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_sales_price_list_lines_parent_line ON sales_price_list_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS sales_promotions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_sales_promotions_company_status ON sales_promotions(company_id, status);
CREATE INDEX IF NOT EXISTS idx_sales_promotions_company_date ON sales_promotions(company_id, document_date);

CREATE TABLE IF NOT EXISTS sales_promotion_rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_sales_promotion_rules_company_status ON sales_promotion_rules(company_id, status);

CREATE TABLE IF NOT EXISTS sales_targets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_sales_targets_company_status ON sales_targets(company_id, status);
CREATE INDEX IF NOT EXISTS idx_sales_targets_company_date ON sales_targets(company_id, document_date);

CREATE TABLE IF NOT EXISTS sales_target_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_sales_target_lines_company_status ON sales_target_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_sales_target_lines_parent_line ON sales_target_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS sales_delivery_routes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_sales_delivery_routes_company_status ON sales_delivery_routes(company_id, status);

CREATE TABLE IF NOT EXISTS sales_route_stops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_sales_route_stops_company_status ON sales_route_stops(company_id, status);
CREATE INDEX IF NOT EXISTS idx_sales_route_stops_parent_line ON sales_route_stops(parent_id, line_no);

CREATE TABLE IF NOT EXISTS purchase_requisitions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_purchase_requisitions_company_status ON purchase_requisitions(company_id, status);
CREATE INDEX IF NOT EXISTS idx_purchase_requisitions_company_date ON purchase_requisitions(company_id, document_date);

CREATE TABLE IF NOT EXISTS purchase_requisition_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_purchase_requisition_lines_company_status ON purchase_requisition_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_purchase_requisition_lines_parent_line ON purchase_requisition_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS purchase_quotations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_purchase_quotations_company_status ON purchase_quotations(company_id, status);
CREATE INDEX IF NOT EXISTS idx_purchase_quotations_company_date ON purchase_quotations(company_id, document_date);

CREATE TABLE IF NOT EXISTS purchase_quotation_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_purchase_quotation_lines_company_status ON purchase_quotation_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_purchase_quotation_lines_parent_line ON purchase_quotation_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS purchase_orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_company_status ON purchase_orders(company_id, status);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_company_date ON purchase_orders(company_id, document_date);

CREATE TABLE IF NOT EXISTS purchase_order_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_purchase_order_lines_company_status ON purchase_order_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_purchase_order_lines_parent_line ON purchase_order_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS purchase_receipts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_purchase_receipts_company_status ON purchase_receipts(company_id, status);
CREATE INDEX IF NOT EXISTS idx_purchase_receipts_company_date ON purchase_receipts(company_id, document_date);

CREATE TABLE IF NOT EXISTS purchase_receipt_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_purchase_receipt_lines_company_status ON purchase_receipt_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_purchase_receipt_lines_parent_line ON purchase_receipt_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS purchase_returns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_purchase_returns_company_status ON purchase_returns(company_id, status);
CREATE INDEX IF NOT EXISTS idx_purchase_returns_company_date ON purchase_returns(company_id, document_date);

CREATE TABLE IF NOT EXISTS purchase_return_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_purchase_return_lines_company_status ON purchase_return_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_purchase_return_lines_parent_line ON purchase_return_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS purchase_supplier_prices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_purchase_supplier_prices_company_status ON purchase_supplier_prices(company_id, status);

CREATE TABLE IF NOT EXISTS purchase_supplier_price_breaks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_purchase_supplier_price_breaks_company_status ON purchase_supplier_price_breaks(company_id, status);
CREATE INDEX IF NOT EXISTS idx_purchase_supplier_price_breaks_parent_line ON purchase_supplier_price_breaks(parent_id, line_no);

CREATE TABLE IF NOT EXISTS purchase_landed_costs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_purchase_landed_costs_company_status ON purchase_landed_costs(company_id, status);

CREATE TABLE IF NOT EXISTS purchase_landed_cost_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_purchase_landed_cost_lines_company_status ON purchase_landed_cost_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_purchase_landed_cost_lines_parent_line ON purchase_landed_cost_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS purchase_approval_rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_purchase_approval_rules_company_status ON purchase_approval_rules(company_id, status);

CREATE TABLE IF NOT EXISTS purchase_approval_steps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_purchase_approval_steps_company_status ON purchase_approval_steps(company_id, status);
CREATE INDEX IF NOT EXISTS idx_purchase_approval_steps_parent_line ON purchase_approval_steps(parent_id, line_no);

CREATE TABLE IF NOT EXISTS inventory_adjustments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_inventory_adjustments_company_status ON inventory_adjustments(company_id, status);
CREATE INDEX IF NOT EXISTS idx_inventory_adjustments_company_date ON inventory_adjustments(company_id, document_date);

CREATE TABLE IF NOT EXISTS inventory_adjustment_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_inventory_adjustment_lines_company_status ON inventory_adjustment_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_inventory_adjustment_lines_parent_line ON inventory_adjustment_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS inventory_transfers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_inventory_transfers_company_status ON inventory_transfers(company_id, status);
CREATE INDEX IF NOT EXISTS idx_inventory_transfers_company_date ON inventory_transfers(company_id, document_date);

CREATE TABLE IF NOT EXISTS inventory_transfer_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_inventory_transfer_lines_company_status ON inventory_transfer_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_inventory_transfer_lines_parent_line ON inventory_transfer_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS inventory_counts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_inventory_counts_company_status ON inventory_counts(company_id, status);
CREATE INDEX IF NOT EXISTS idx_inventory_counts_company_date ON inventory_counts(company_id, document_date);

CREATE TABLE IF NOT EXISTS inventory_count_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_inventory_count_lines_company_status ON inventory_count_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_inventory_count_lines_parent_line ON inventory_count_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS inventory_lots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    item_id BIGINT NOT NULL,
    lot_number VARCHAR(160) NOT NULL,
    manufacture_date DATE,
    expiry_date DATE,
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_inventory_lots_company_status ON inventory_lots(company_id, status);
CREATE UNIQUE INDEX IF NOT EXISTS ux_inventory_lot_company_number ON inventory_lots(company_id, lot_number);

CREATE TABLE IF NOT EXISTS inventory_serial_numbers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    item_id BIGINT NOT NULL,
    serial_number VARCHAR(160) NOT NULL,
    warehouse_id BIGINT,
    lot_id BIGINT,
    received_at TIMESTAMP,
    issued_at TIMESTAMP,
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_inventory_serial_numbers_company_status ON inventory_serial_numbers(company_id, status);
CREATE UNIQUE INDEX IF NOT EXISTS ux_inventory_serial_company_number ON inventory_serial_numbers(company_id, serial_number);

CREATE TABLE IF NOT EXISTS inventory_barcodes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_inventory_barcodes_company_status ON inventory_barcodes(company_id, status);

CREATE TABLE IF NOT EXISTS inventory_item_units (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_inventory_item_units_company_status ON inventory_item_units(company_id, status);

CREATE TABLE IF NOT EXISTS inventory_reorder_rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_inventory_reorder_rules_company_status ON inventory_reorder_rules(company_id, status);

CREATE TABLE IF NOT EXISTS inventory_reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_inventory_reservations_company_status ON inventory_reservations(company_id, status);

CREATE TABLE IF NOT EXISTS inventory_reservation_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_inventory_reservation_lines_company_status ON inventory_reservation_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_inventory_reservation_lines_parent_line ON inventory_reservation_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS inventory_cost_layers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_inventory_cost_layers_company_status ON inventory_cost_layers(company_id, status);

CREATE TABLE IF NOT EXISTS inventory_cost_transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_inventory_cost_transactions_company_status ON inventory_cost_transactions(company_id, status);

CREATE TABLE IF NOT EXISTS inventory_quality_inspections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_inventory_quality_inspections_company_status ON inventory_quality_inspections(company_id, status);
CREATE INDEX IF NOT EXISTS idx_inventory_quality_inspections_company_date ON inventory_quality_inspections(company_id, document_date);

CREATE TABLE IF NOT EXISTS inventory_quality_inspection_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_inventory_quality_inspection_lines_company_status ON inventory_quality_inspection_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_inventory_quality_inspection_lines_parent_line ON inventory_quality_inspection_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS inventory_bin_locations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_inventory_bin_locations_company_status ON inventory_bin_locations(company_id, status);

CREATE TABLE IF NOT EXISTS manufacturing_boms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_manufacturing_boms_company_status ON manufacturing_boms(company_id, status);

CREATE TABLE IF NOT EXISTS manufacturing_bom_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_manufacturing_bom_lines_company_status ON manufacturing_bom_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_manufacturing_bom_lines_parent_line ON manufacturing_bom_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS manufacturing_routings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_manufacturing_routings_company_status ON manufacturing_routings(company_id, status);

CREATE TABLE IF NOT EXISTS manufacturing_routing_steps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_manufacturing_routing_steps_company_status ON manufacturing_routing_steps(company_id, status);
CREATE INDEX IF NOT EXISTS idx_manufacturing_routing_steps_parent_line ON manufacturing_routing_steps(parent_id, line_no);

CREATE TABLE IF NOT EXISTS manufacturing_work_centers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_manufacturing_work_centers_company_status ON manufacturing_work_centers(company_id, status);

CREATE TABLE IF NOT EXISTS manufacturing_work_center_calendars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_manufacturing_work_center_calendars_company_status ON manufacturing_work_center_calendars(company_id, status);

CREATE TABLE IF NOT EXISTS manufacturing_production_orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_manufacturing_production_orders_company_status ON manufacturing_production_orders(company_id, status);
CREATE INDEX IF NOT EXISTS idx_manufacturing_production_orders_company_date ON manufacturing_production_orders(company_id, document_date);

CREATE TABLE IF NOT EXISTS manufacturing_production_order_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_manufacturing_production_order_lines_company_status ON manufacturing_production_order_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_manufacturing_production_order_lines_parent_line ON manufacturing_production_order_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS manufacturing_material_issues (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_manufacturing_material_issues_company_status ON manufacturing_material_issues(company_id, status);
CREATE INDEX IF NOT EXISTS idx_manufacturing_material_issues_company_date ON manufacturing_material_issues(company_id, document_date);

CREATE TABLE IF NOT EXISTS manufacturing_material_issue_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_manufacturing_material_issue_lines_company_status ON manufacturing_material_issue_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_manufacturing_material_issue_lines_parent_line ON manufacturing_material_issue_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS manufacturing_completions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_manufacturing_completions_company_status ON manufacturing_completions(company_id, status);
CREATE INDEX IF NOT EXISTS idx_manufacturing_completions_company_date ON manufacturing_completions(company_id, document_date);

CREATE TABLE IF NOT EXISTS manufacturing_completion_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_manufacturing_completion_lines_company_status ON manufacturing_completion_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_manufacturing_completion_lines_parent_line ON manufacturing_completion_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS manufacturing_scrap_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_manufacturing_scrap_records_company_status ON manufacturing_scrap_records(company_id, status);

CREATE TABLE IF NOT EXISTS manufacturing_capacity_plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_manufacturing_capacity_plans_company_status ON manufacturing_capacity_plans(company_id, status);

CREATE TABLE IF NOT EXISTS manufacturing_quality_checks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_manufacturing_quality_checks_company_status ON manufacturing_quality_checks(company_id, status);

CREATE TABLE IF NOT EXISTS manufacturing_quality_check_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_manufacturing_quality_check_lines_company_status ON manufacturing_quality_check_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_manufacturing_quality_check_lines_parent_line ON manufacturing_quality_check_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS finance_account_groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_account_groups_company_status ON finance_account_groups(company_id, status);

CREATE TABLE IF NOT EXISTS finance_account_mappings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_account_mappings_company_status ON finance_account_mappings(company_id, status);

CREATE TABLE IF NOT EXISTS finance_journal_batches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_journal_batches_company_status ON finance_journal_batches(company_id, status);
CREATE INDEX IF NOT EXISTS idx_finance_journal_batches_company_date ON finance_journal_batches(company_id, document_date);

CREATE TABLE IF NOT EXISTS finance_journal_batch_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_journal_batch_lines_company_status ON finance_journal_batch_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_finance_journal_batch_lines_parent_line ON finance_journal_batch_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS finance_recurring_journals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_recurring_journals_company_status ON finance_recurring_journals(company_id, status);
CREATE INDEX IF NOT EXISTS idx_finance_recurring_journals_company_date ON finance_recurring_journals(company_id, document_date);

CREATE TABLE IF NOT EXISTS finance_recurring_journal_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_recurring_journal_lines_company_status ON finance_recurring_journal_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_finance_recurring_journal_lines_parent_line ON finance_recurring_journal_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS finance_budget_versions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_budget_versions_company_status ON finance_budget_versions(company_id, status);
CREATE INDEX IF NOT EXISTS idx_finance_budget_versions_company_date ON finance_budget_versions(company_id, document_date);
CREATE INDEX IF NOT EXISTS idx_finance_budget_versions_parent_line ON finance_budget_versions(parent_id, line_no);

CREATE TABLE IF NOT EXISTS finance_budget_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_budget_lines_company_status ON finance_budget_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_finance_budget_lines_parent_line ON finance_budget_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS finance_bank_statements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_bank_statements_company_status ON finance_bank_statements(company_id, status);
CREATE INDEX IF NOT EXISTS idx_finance_bank_statements_company_date ON finance_bank_statements(company_id, document_date);

CREATE TABLE IF NOT EXISTS finance_bank_statement_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_bank_statement_lines_company_status ON finance_bank_statement_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_finance_bank_statement_lines_parent_line ON finance_bank_statement_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS finance_bank_reconciliations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_bank_reconciliations_company_status ON finance_bank_reconciliations(company_id, status);
CREATE INDEX IF NOT EXISTS idx_finance_bank_reconciliations_company_date ON finance_bank_reconciliations(company_id, document_date);

CREATE TABLE IF NOT EXISTS finance_bank_reconciliation_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_bank_reconciliation_lines_company_status ON finance_bank_reconciliation_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_finance_bank_reconciliation_lines_parent_line ON finance_bank_reconciliation_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS finance_fixed_assets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_fixed_assets_company_status ON finance_fixed_assets(company_id, status);

CREATE TABLE IF NOT EXISTS finance_asset_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_asset_categories_company_status ON finance_asset_categories(company_id, status);

CREATE TABLE IF NOT EXISTS finance_asset_books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_asset_books_company_status ON finance_asset_books(company_id, status);

CREATE TABLE IF NOT EXISTS finance_depreciation_runs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_depreciation_runs_company_status ON finance_depreciation_runs(company_id, status);
CREATE INDEX IF NOT EXISTS idx_finance_depreciation_runs_company_date ON finance_depreciation_runs(company_id, document_date);

CREATE TABLE IF NOT EXISTS finance_depreciation_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_depreciation_lines_company_status ON finance_depreciation_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_finance_depreciation_lines_parent_line ON finance_depreciation_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS finance_asset_disposals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_asset_disposals_company_status ON finance_asset_disposals(company_id, status);

CREATE TABLE IF NOT EXISTS finance_tax_returns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_tax_returns_company_status ON finance_tax_returns(company_id, status);
CREATE INDEX IF NOT EXISTS idx_finance_tax_returns_company_date ON finance_tax_returns(company_id, document_date);

CREATE TABLE IF NOT EXISTS finance_tax_return_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_tax_return_lines_company_status ON finance_tax_return_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_finance_tax_return_lines_parent_line ON finance_tax_return_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS finance_exchange_rates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    base_currency VARCHAR(3) NOT NULL,
    quote_currency VARCHAR(3) NOT NULL,
    rate_date DATE NOT NULL,
    rate NUMERIC(20,10) NOT NULL,
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_exchange_rates_company_status ON finance_exchange_rates(company_id, status);
CREATE UNIQUE INDEX IF NOT EXISTS ux_finance_exchange_rates_pair_date ON finance_exchange_rates(company_id, base_currency, quote_currency, rate_date);

CREATE TABLE IF NOT EXISTS finance_currency_revaluations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_currency_revaluations_company_status ON finance_currency_revaluations(company_id, status);
CREATE INDEX IF NOT EXISTS idx_finance_currency_revaluations_company_date ON finance_currency_revaluations(company_id, document_date);

CREATE TABLE IF NOT EXISTS finance_currency_revaluation_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_currency_revaluation_lines_company_status ON finance_currency_revaluation_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_finance_currency_revaluation_lines_parent_line ON finance_currency_revaluation_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS finance_payment_terms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_payment_terms_company_status ON finance_payment_terms(company_id, status);

CREATE TABLE IF NOT EXISTS finance_payment_term_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_payment_term_lines_company_status ON finance_payment_term_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_finance_payment_term_lines_parent_line ON finance_payment_term_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS finance_credit_limits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_credit_limits_company_status ON finance_credit_limits(company_id, status);

CREATE TABLE IF NOT EXISTS finance_dunning_runs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_dunning_runs_company_status ON finance_dunning_runs(company_id, status);
CREATE INDEX IF NOT EXISTS idx_finance_dunning_runs_company_date ON finance_dunning_runs(company_id, document_date);

CREATE TABLE IF NOT EXISTS finance_dunning_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_dunning_items_company_status ON finance_dunning_items(company_id, status);
CREATE INDEX IF NOT EXISTS idx_finance_dunning_items_parent_line ON finance_dunning_items(parent_id, line_no);

CREATE TABLE IF NOT EXISTS finance_cash_counts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_cash_counts_company_status ON finance_cash_counts(company_id, status);
CREATE INDEX IF NOT EXISTS idx_finance_cash_counts_company_date ON finance_cash_counts(company_id, document_date);

CREATE TABLE IF NOT EXISTS finance_cash_count_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_finance_cash_count_lines_company_status ON finance_cash_count_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_finance_cash_count_lines_parent_line ON finance_cash_count_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS hr_departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_departments_company_status ON hr_departments(company_id, status);

CREATE TABLE IF NOT EXISTS hr_positions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_positions_company_status ON hr_positions(company_id, status);

CREATE TABLE IF NOT EXISTS hr_employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    employee_no VARCHAR(80) NOT NULL,
    first_name VARCHAR(120) NOT NULL,
    last_name VARCHAR(120) NOT NULL,
    department_id BIGINT,
    position_id BIGINT,
    hire_date DATE,
    termination_date DATE,
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_employees_company_status ON hr_employees(company_id, status);
CREATE UNIQUE INDEX IF NOT EXISTS ux_hr_employees_company_no ON hr_employees(company_id, employee_no);

CREATE TABLE IF NOT EXISTS hr_employee_contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_employee_contacts_company_status ON hr_employee_contacts(company_id, status);

CREATE TABLE IF NOT EXISTS hr_employee_documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_employee_documents_company_status ON hr_employee_documents(company_id, status);

CREATE TABLE IF NOT EXISTS hr_employment_contracts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_employment_contracts_company_status ON hr_employment_contracts(company_id, status);
CREATE INDEX IF NOT EXISTS idx_hr_employment_contracts_company_date ON hr_employment_contracts(company_id, document_date);

CREATE TABLE IF NOT EXISTS hr_salary_components (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_salary_components_company_status ON hr_salary_components(company_id, status);
CREATE INDEX IF NOT EXISTS idx_hr_salary_components_parent_line ON hr_salary_components(parent_id, line_no);

CREATE TABLE IF NOT EXISTS hr_salary_structures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_salary_structures_company_status ON hr_salary_structures(company_id, status);

CREATE TABLE IF NOT EXISTS hr_salary_structure_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_salary_structure_lines_company_status ON hr_salary_structure_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_hr_salary_structure_lines_parent_line ON hr_salary_structure_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS hr_payroll_periods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_payroll_periods_company_status ON hr_payroll_periods(company_id, status);
CREATE INDEX IF NOT EXISTS idx_hr_payroll_periods_company_date ON hr_payroll_periods(company_id, document_date);

CREATE TABLE IF NOT EXISTS hr_payroll_runs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_payroll_runs_company_status ON hr_payroll_runs(company_id, status);
CREATE INDEX IF NOT EXISTS idx_hr_payroll_runs_company_date ON hr_payroll_runs(company_id, document_date);

CREATE TABLE IF NOT EXISTS hr_payroll_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_payroll_lines_company_status ON hr_payroll_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_hr_payroll_lines_parent_line ON hr_payroll_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS hr_payroll_line_components (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_payroll_line_components_company_status ON hr_payroll_line_components(company_id, status);
CREATE INDEX IF NOT EXISTS idx_hr_payroll_line_components_parent_line ON hr_payroll_line_components(parent_id, line_no);

CREATE TABLE IF NOT EXISTS hr_attendance_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_attendance_records_company_status ON hr_attendance_records(company_id, status);

CREATE TABLE IF NOT EXISTS hr_shift_definitions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_shift_definitions_company_status ON hr_shift_definitions(company_id, status);

CREATE TABLE IF NOT EXISTS hr_shift_assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_shift_assignments_company_status ON hr_shift_assignments(company_id, status);

CREATE TABLE IF NOT EXISTS hr_leave_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_leave_types_company_status ON hr_leave_types(company_id, status);

CREATE TABLE IF NOT EXISTS hr_leave_balances (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_leave_balances_company_status ON hr_leave_balances(company_id, status);

CREATE TABLE IF NOT EXISTS hr_leave_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_leave_requests_company_status ON hr_leave_requests(company_id, status);
CREATE INDEX IF NOT EXISTS idx_hr_leave_requests_company_date ON hr_leave_requests(company_id, document_date);

CREATE TABLE IF NOT EXISTS hr_leave_approvals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_leave_approvals_company_status ON hr_leave_approvals(company_id, status);
CREATE INDEX IF NOT EXISTS idx_hr_leave_approvals_parent_line ON hr_leave_approvals(parent_id, line_no);

CREATE TABLE IF NOT EXISTS hr_expense_claims (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_expense_claims_company_status ON hr_expense_claims(company_id, status);
CREATE INDEX IF NOT EXISTS idx_hr_expense_claims_company_date ON hr_expense_claims(company_id, document_date);

CREATE TABLE IF NOT EXISTS hr_expense_claim_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_expense_claim_lines_company_status ON hr_expense_claim_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_hr_expense_claim_lines_parent_line ON hr_expense_claim_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS hr_recruitment_vacancies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_recruitment_vacancies_company_status ON hr_recruitment_vacancies(company_id, status);

CREATE TABLE IF NOT EXISTS hr_applicants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_applicants_company_status ON hr_applicants(company_id, status);

CREATE TABLE IF NOT EXISTS hr_applicant_interviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_applicant_interviews_company_status ON hr_applicant_interviews(company_id, status);

CREATE TABLE IF NOT EXISTS hr_performance_reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_performance_reviews_company_status ON hr_performance_reviews(company_id, status);

CREATE TABLE IF NOT EXISTS hr_training_courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_training_courses_company_status ON hr_training_courses(company_id, status);

CREATE TABLE IF NOT EXISTS hr_training_enrollments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_hr_training_enrollments_company_status ON hr_training_enrollments(company_id, status);
CREATE INDEX IF NOT EXISTS idx_hr_training_enrollments_parent_line ON hr_training_enrollments(parent_id, line_no);

CREATE TABLE IF NOT EXISTS project_portfolios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_project_portfolios_company_status ON project_portfolios(company_id, status);

CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    project_code VARCHAR(80) NOT NULL,
    customer_id BIGINT,
    manager_id BIGINT,
    start_date DATE,
    end_date DATE,
    budget_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_projects_company_status ON projects(company_id, status);
CREATE UNIQUE INDEX IF NOT EXISTS ux_projects_company_code ON projects(company_id, project_code);

CREATE TABLE IF NOT EXISTS project_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_project_members_company_status ON project_members(company_id, status);
CREATE INDEX IF NOT EXISTS idx_project_members_parent_line ON project_members(parent_id, line_no);

CREATE TABLE IF NOT EXISTS project_milestones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_project_milestones_company_status ON project_milestones(company_id, status);

CREATE TABLE IF NOT EXISTS project_tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_project_tasks_company_status ON project_tasks(company_id, status);

CREATE TABLE IF NOT EXISTS project_task_dependencies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_project_task_dependencies_company_status ON project_task_dependencies(company_id, status);
CREATE INDEX IF NOT EXISTS idx_project_task_dependencies_parent_line ON project_task_dependencies(parent_id, line_no);

CREATE TABLE IF NOT EXISTS project_time_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_project_time_entries_company_status ON project_time_entries(company_id, status);

CREATE TABLE IF NOT EXISTS project_expense_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_project_expense_lines_company_status ON project_expense_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_project_expense_lines_parent_line ON project_expense_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS project_budgets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_project_budgets_company_status ON project_budgets(company_id, status);

CREATE TABLE IF NOT EXISTS project_budget_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_project_budget_lines_company_status ON project_budget_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_project_budget_lines_parent_line ON project_budget_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS project_invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_project_invoices_company_status ON project_invoices(company_id, status);
CREATE INDEX IF NOT EXISTS idx_project_invoices_company_date ON project_invoices(company_id, document_date);

CREATE TABLE IF NOT EXISTS project_invoice_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_project_invoice_lines_company_status ON project_invoice_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_project_invoice_lines_parent_line ON project_invoice_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS project_risks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_project_risks_company_status ON project_risks(company_id, status);

CREATE TABLE IF NOT EXISTS project_issues (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_project_issues_company_status ON project_issues(company_id, status);

CREATE TABLE IF NOT EXISTS project_deliverables (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_project_deliverables_company_status ON project_deliverables(company_id, status);

CREATE TABLE IF NOT EXISTS service_tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_service_tickets_company_status ON service_tickets(company_id, status);
CREATE INDEX IF NOT EXISTS idx_service_tickets_company_date ON service_tickets(company_id, document_date);

CREATE TABLE IF NOT EXISTS service_ticket_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_service_ticket_messages_company_status ON service_ticket_messages(company_id, status);

CREATE TABLE IF NOT EXISTS service_ticket_attachments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_service_ticket_attachments_company_status ON service_ticket_attachments(company_id, status);
CREATE INDEX IF NOT EXISTS idx_service_ticket_attachments_parent_line ON service_ticket_attachments(parent_id, line_no);

CREATE TABLE IF NOT EXISTS service_sla_policies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_service_sla_policies_company_status ON service_sla_policies(company_id, status);

CREATE TABLE IF NOT EXISTS service_sla_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_service_sla_events_company_status ON service_sla_events(company_id, status);
CREATE INDEX IF NOT EXISTS idx_service_sla_events_parent_line ON service_sla_events(parent_id, line_no);

CREATE TABLE IF NOT EXISTS service_equipment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_service_equipment_company_status ON service_equipment(company_id, status);

CREATE TABLE IF NOT EXISTS service_equipment_warranties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_service_equipment_warranties_company_status ON service_equipment_warranties(company_id, status);

CREATE TABLE IF NOT EXISTS service_work_orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_service_work_orders_company_status ON service_work_orders(company_id, status);
CREATE INDEX IF NOT EXISTS idx_service_work_orders_company_date ON service_work_orders(company_id, document_date);

CREATE TABLE IF NOT EXISTS service_work_order_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_service_work_order_lines_company_status ON service_work_order_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_service_work_order_lines_parent_line ON service_work_order_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS service_appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_service_appointments_company_status ON service_appointments(company_id, status);

CREATE TABLE IF NOT EXISTS service_parts_used (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_service_parts_used_company_status ON service_parts_used(company_id, status);
CREATE INDEX IF NOT EXISTS idx_service_parts_used_parent_line ON service_parts_used(parent_id, line_no);

CREATE TABLE IF NOT EXISTS service_contracts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_service_contracts_company_status ON service_contracts(company_id, status);
CREATE INDEX IF NOT EXISTS idx_service_contracts_company_date ON service_contracts(company_id, document_date);

CREATE TABLE IF NOT EXISTS service_contract_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_service_contract_lines_company_status ON service_contract_lines(company_id, status);
CREATE INDEX IF NOT EXISTS idx_service_contract_lines_parent_line ON service_contract_lines(parent_id, line_no);

CREATE TABLE IF NOT EXISTS document_folders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_document_folders_company_status ON document_folders(company_id, status);

CREATE TABLE IF NOT EXISTS document_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_document_records_company_status ON document_records(company_id, status);

CREATE TABLE IF NOT EXISTS document_versions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_document_versions_company_status ON document_versions(company_id, status);
CREATE INDEX IF NOT EXISTS idx_document_versions_parent_line ON document_versions(parent_id, line_no);

CREATE TABLE IF NOT EXISTS document_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_document_links_company_status ON document_links(company_id, status);
CREATE INDEX IF NOT EXISTS idx_document_links_parent_line ON document_links(parent_id, line_no);

CREATE TABLE IF NOT EXISTS document_access_rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_document_access_rules_company_status ON document_access_rules(company_id, status);

CREATE TABLE IF NOT EXISTS document_templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_document_templates_company_status ON document_templates(company_id, status);

CREATE TABLE IF NOT EXISTS document_template_fields (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_document_template_fields_company_status ON document_template_fields(company_id, status);

CREATE TABLE IF NOT EXISTS document_approval_flows (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_document_approval_flows_company_status ON document_approval_flows(company_id, status);

CREATE TABLE IF NOT EXISTS document_approval_steps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_document_approval_steps_company_status ON document_approval_steps(company_id, status);
CREATE INDEX IF NOT EXISTS idx_document_approval_steps_parent_line ON document_approval_steps(parent_id, line_no);

CREATE TABLE IF NOT EXISTS document_approval_tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_document_approval_tasks_company_status ON document_approval_tasks(company_id, status);

CREATE TABLE IF NOT EXISTS document_numbering_rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_document_numbering_rules_company_status ON document_numbering_rules(company_id, status);

CREATE TABLE IF NOT EXISTS document_sequences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_document_sequences_company_status ON document_sequences(company_id, status);

CREATE TABLE IF NOT EXISTS document_import_jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_document_import_jobs_company_status ON document_import_jobs(company_id, status);
CREATE INDEX IF NOT EXISTS idx_document_import_jobs_company_date ON document_import_jobs(company_id, document_date);

CREATE TABLE IF NOT EXISTS document_import_rows (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_document_import_rows_company_status ON document_import_rows(company_id, status);
CREATE INDEX IF NOT EXISTS idx_document_import_rows_parent_line ON document_import_rows(parent_id, line_no);

CREATE TABLE IF NOT EXISTS document_export_jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_document_export_jobs_company_status ON document_export_jobs(company_id, status);
CREATE INDEX IF NOT EXISTS idx_document_export_jobs_company_date ON document_export_jobs(company_id, document_date);

CREATE TABLE IF NOT EXISTS document_export_rows (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_document_export_rows_company_status ON document_export_rows(company_id, status);
CREATE INDEX IF NOT EXISTS idx_document_export_rows_parent_line ON document_export_rows(parent_id, line_no);

CREATE TABLE IF NOT EXISTS document_attachments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_document_attachments_company_status ON document_attachments(company_id, status);
CREATE INDEX IF NOT EXISTS idx_document_attachments_parent_line ON document_attachments(parent_id, line_no);

CREATE TABLE IF NOT EXISTS document_signatures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_document_signatures_company_status ON document_signatures(company_id, status);

CREATE TABLE IF NOT EXISTS admin_api_clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    client_id VARCHAR(160) NOT NULL,
    client_secret_hash VARCHAR(255) NOT NULL,
    scopes_json TEXT NOT NULL DEFAULT '{}',
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_api_clients_company_status ON admin_api_clients(company_id, status);
CREATE UNIQUE INDEX IF NOT EXISTS ux_admin_api_clients_id ON admin_api_clients(client_id);

CREATE TABLE IF NOT EXISTS admin_api_tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP,
    last_used_at TIMESTAMP,
    revoked_at TIMESTAMP,
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_api_tokens_company_status ON admin_api_tokens(company_id, status);
CREATE UNIQUE INDEX IF NOT EXISTS ux_admin_api_tokens_hash ON admin_api_tokens(token_hash);

CREATE TABLE IF NOT EXISTS admin_webhooks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_webhooks_company_status ON admin_webhooks(company_id, status);

CREATE TABLE IF NOT EXISTS admin_webhook_deliveries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_webhook_deliveries_company_status ON admin_webhook_deliveries(company_id, status);
CREATE INDEX IF NOT EXISTS idx_admin_webhook_deliveries_parent_line ON admin_webhook_deliveries(parent_id, line_no);

CREATE TABLE IF NOT EXISTS admin_notification_templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_notification_templates_company_status ON admin_notification_templates(company_id, status);

CREATE TABLE IF NOT EXISTS admin_notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_notifications_company_status ON admin_notifications(company_id, status);

CREATE TABLE IF NOT EXISTS admin_user_preferences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_user_preferences_company_status ON admin_user_preferences(company_id, status);

CREATE TABLE IF NOT EXISTS admin_saved_filters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_saved_filters_company_status ON admin_saved_filters(company_id, status);

CREATE TABLE IF NOT EXISTS admin_saved_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_saved_reports_company_status ON admin_saved_reports(company_id, status);

CREATE TABLE IF NOT EXISTS admin_report_schedules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_report_schedules_company_status ON admin_report_schedules(company_id, status);

CREATE TABLE IF NOT EXISTS admin_report_runs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_report_runs_company_status ON admin_report_runs(company_id, status);
CREATE INDEX IF NOT EXISTS idx_admin_report_runs_company_date ON admin_report_runs(company_id, document_date);

CREATE TABLE IF NOT EXISTS admin_job_queue (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_job_queue_company_status ON admin_job_queue(company_id, status);

CREATE TABLE IF NOT EXISTS admin_job_attempts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_job_attempts_company_status ON admin_job_attempts(company_id, status);
CREATE INDEX IF NOT EXISTS idx_admin_job_attempts_parent_line ON admin_job_attempts(parent_id, line_no);

CREATE TABLE IF NOT EXISTS admin_feature_flags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_feature_flags_company_status ON admin_feature_flags(company_id, status);

CREATE TABLE IF NOT EXISTS admin_integration_endpoints (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_integration_endpoints_company_status ON admin_integration_endpoints(company_id, status);

CREATE TABLE IF NOT EXISTS admin_integration_runs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_integration_runs_company_status ON admin_integration_runs(company_id, status);
CREATE INDEX IF NOT EXISTS idx_admin_integration_runs_company_date ON admin_integration_runs(company_id, document_date);

CREATE TABLE IF NOT EXISTS admin_data_retention_policies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_data_retention_policies_company_status ON admin_data_retention_policies(company_id, status);

CREATE TABLE IF NOT EXISTS admin_privacy_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_privacy_requests_company_status ON admin_privacy_requests(company_id, status);
CREATE INDEX IF NOT EXISTS idx_admin_privacy_requests_company_date ON admin_privacy_requests(company_id, document_date);

CREATE TABLE IF NOT EXISTS admin_audit_reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_audit_reviews_company_status ON admin_audit_reviews(company_id, status);
CREATE INDEX IF NOT EXISTS idx_admin_audit_reviews_company_date ON admin_audit_reviews(company_id, document_date);

CREATE TABLE IF NOT EXISTS admin_audit_review_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_audit_review_items_company_status ON admin_audit_review_items(company_id, status);
CREATE INDEX IF NOT EXISTS idx_admin_audit_review_items_parent_line ON admin_audit_review_items(parent_id, line_no);

CREATE TABLE IF NOT EXISTS admin_approval_policies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_approval_policies_company_status ON admin_approval_policies(company_id, status);

CREATE TABLE IF NOT EXISTS admin_approval_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1,
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    reference_type VARCHAR(80),
    reference_id VARCHAR(100),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_approval_requests_company_status ON admin_approval_requests(company_id, status);
CREATE INDEX IF NOT EXISTS idx_admin_approval_requests_company_date ON admin_approval_requests(company_id, document_date);

CREATE TABLE IF NOT EXISTS admin_approval_steps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_approval_steps_company_status ON admin_approval_steps(company_id, status);
CREATE INDEX IF NOT EXISTS idx_admin_approval_steps_parent_line ON admin_approval_steps(parent_id, line_no);

CREATE TABLE IF NOT EXISTS admin_approval_actions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_approval_actions_company_status ON admin_approval_actions(company_id, status);
CREATE INDEX IF NOT EXISTS idx_admin_approval_actions_parent_line ON admin_approval_actions(parent_id, line_no);

CREATE TABLE IF NOT EXISTS admin_custom_fields (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_custom_fields_company_status ON admin_custom_fields(company_id, status);

CREATE TABLE IF NOT EXISTS admin_custom_field_values (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_custom_field_values_company_status ON admin_custom_field_values(company_id, status);
CREATE INDEX IF NOT EXISTS idx_admin_custom_field_values_parent_line ON admin_custom_field_values(parent_id, line_no);

CREATE TABLE IF NOT EXISTS admin_number_series (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_number_series_company_status ON admin_number_series(company_id, status);

CREATE TABLE IF NOT EXISTS admin_localization_overrides (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_localization_overrides_company_status ON admin_localization_overrides(company_id, status);

CREATE TABLE IF NOT EXISTS admin_system_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT,
    line_no INTEGER NOT NULL DEFAULT 1,
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0,
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(20,6) NOT NULL DEFAULT 0,
    line_total NUMERIC(20,6) NOT NULL DEFAULT 0,
    code VARCHAR(80),
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_system_events_company_status ON admin_system_events(company_id, status);
CREATE INDEX IF NOT EXISTS idx_admin_system_events_parent_line ON admin_system_events(parent_id, line_no);

CREATE TABLE IF NOT EXISTS admin_error_catalog (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    external_code VARCHAR(120),
    email VARCHAR(254),
    phone VARCHAR(50),
    effective_from DATE,
    effective_to DATE,
    name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    description TEXT,
    attributes_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(128),
    updated_by VARCHAR(128),
    row_version INTEGER NOT NULL DEFAULT 1,
    UNIQUE (company_id, code)
);
CREATE INDEX IF NOT EXISTS idx_admin_error_catalog_company_status ON admin_error_catalog(company_id, status);

