-- ShouTech ERP service module schema for SQLite.
-- Canonical module definitions; core company/security/accounting tables are defined by the base schema.
PRAGMA foreign_keys = ON;

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
