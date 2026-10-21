-- ShouTech ERP documents module schema for SQLite.
-- Canonical module definitions; core company/security/accounting tables are defined by the base schema.
PRAGMA foreign_keys = ON;

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
