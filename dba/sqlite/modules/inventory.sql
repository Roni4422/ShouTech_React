-- ShouTech ERP inventory module schema for SQLite.
-- Canonical module definitions; core company/security/accounting tables are defined by the base schema.
PRAGMA foreign_keys = ON;

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
