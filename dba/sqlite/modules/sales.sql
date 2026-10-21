-- ShouTech ERP sales module schema for SQLite.
-- Canonical module definitions; core company/security/accounting tables are defined by the base schema.
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS sales_quotations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    code VARCHAR(80),
    document_no VARCHAR(100),
    document_date DATE,
    due_date DATE,
    currency_code VARCHAR(3),
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1 CHECK (exchange_rate > 0),
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (subtotal >= 0),
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (discount_total >= 0),
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (tax_total >= 0),
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (total_amount >= 0),
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
    row_version INTEGER NOT NULL DEFAULT 1 CHECK (row_version > 0),
    UNIQUE (company_id, code),
    UNIQUE (company_id, id)
);
CREATE INDEX IF NOT EXISTS idx_sales_quotations_company_status ON sales_quotations(company_id, status);
CREATE INDEX IF NOT EXISTS idx_sales_quotations_company_date ON sales_quotations(company_id, document_date);
CREATE UNIQUE INDEX IF NOT EXISTS uq_sales_quotations_company_docno ON sales_quotations(company_id, document_no) WHERE document_no IS NOT NULL;

CREATE TABLE IF NOT EXISTS sales_quotation_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT NOT NULL,
    line_no INTEGER NOT NULL DEFAULT 1 CHECK (line_no > 0),
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (unit_price >= 0),
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
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
    row_version INTEGER NOT NULL DEFAULT 1 CHECK (row_version > 0),
    UNIQUE (company_id, code),
    UNIQUE (company_id, parent_id, line_no),
    FOREIGN KEY (company_id, parent_id) REFERENCES sales_quotations(company_id, id) ON DELETE RESTRICT
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
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1 CHECK (exchange_rate > 0),
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (subtotal >= 0),
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (discount_total >= 0),
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (tax_total >= 0),
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (total_amount >= 0),
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
    row_version INTEGER NOT NULL DEFAULT 1 CHECK (row_version > 0),
    UNIQUE (company_id, code),
    UNIQUE (company_id, id)
);
CREATE INDEX IF NOT EXISTS idx_sales_orders_company_status ON sales_orders(company_id, status);
CREATE INDEX IF NOT EXISTS idx_sales_orders_company_date ON sales_orders(company_id, document_date);
CREATE UNIQUE INDEX IF NOT EXISTS uq_sales_orders_company_docno ON sales_orders(company_id, document_no) WHERE document_no IS NOT NULL;

CREATE TABLE IF NOT EXISTS sales_order_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT NOT NULL,
    line_no INTEGER NOT NULL DEFAULT 1 CHECK (line_no > 0),
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (unit_price >= 0),
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
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
    row_version INTEGER NOT NULL DEFAULT 1 CHECK (row_version > 0),
    UNIQUE (company_id, code),
    UNIQUE (company_id, parent_id, line_no),
    FOREIGN KEY (company_id, parent_id) REFERENCES sales_orders(company_id, id) ON DELETE RESTRICT
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
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1 CHECK (exchange_rate > 0),
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (subtotal >= 0),
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (discount_total >= 0),
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (tax_total >= 0),
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (total_amount >= 0),
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
    row_version INTEGER NOT NULL DEFAULT 1 CHECK (row_version > 0),
    UNIQUE (company_id, code),
    UNIQUE (company_id, id)
);
CREATE INDEX IF NOT EXISTS idx_sales_shipments_company_status ON sales_shipments(company_id, status);
CREATE INDEX IF NOT EXISTS idx_sales_shipments_company_date ON sales_shipments(company_id, document_date);
CREATE UNIQUE INDEX IF NOT EXISTS uq_sales_shipments_company_docno ON sales_shipments(company_id, document_no) WHERE document_no IS NOT NULL;

CREATE TABLE IF NOT EXISTS sales_shipment_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT NOT NULL,
    line_no INTEGER NOT NULL DEFAULT 1 CHECK (line_no > 0),
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (unit_price >= 0),
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
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
    row_version INTEGER NOT NULL DEFAULT 1 CHECK (row_version > 0),
    UNIQUE (company_id, code),
    UNIQUE (company_id, parent_id, line_no),
    FOREIGN KEY (company_id, parent_id) REFERENCES sales_shipments(company_id, id) ON DELETE RESTRICT
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
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1 CHECK (exchange_rate > 0),
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (subtotal >= 0),
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (discount_total >= 0),
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (tax_total >= 0),
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (total_amount >= 0),
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
    row_version INTEGER NOT NULL DEFAULT 1 CHECK (row_version > 0),
    UNIQUE (company_id, code),
    UNIQUE (company_id, id)
);
CREATE INDEX IF NOT EXISTS idx_sales_returns_company_status ON sales_returns(company_id, status);
CREATE INDEX IF NOT EXISTS idx_sales_returns_company_date ON sales_returns(company_id, document_date);
CREATE UNIQUE INDEX IF NOT EXISTS uq_sales_returns_company_docno ON sales_returns(company_id, document_no) WHERE document_no IS NOT NULL;

CREATE TABLE IF NOT EXISTS sales_return_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT NOT NULL,
    line_no INTEGER NOT NULL DEFAULT 1 CHECK (line_no > 0),
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (unit_price >= 0),
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
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
    row_version INTEGER NOT NULL DEFAULT 1 CHECK (row_version > 0),
    UNIQUE (company_id, code),
    UNIQUE (company_id, parent_id, line_no),
    FOREIGN KEY (company_id, parent_id) REFERENCES sales_returns(company_id, id) ON DELETE RESTRICT
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
    row_version INTEGER NOT NULL DEFAULT 1 CHECK (row_version > 0),
    UNIQUE (company_id, code),
    UNIQUE (company_id, id)
);
CREATE INDEX IF NOT EXISTS idx_sales_price_lists_company_status ON sales_price_lists(company_id, status);

CREATE TABLE IF NOT EXISTS sales_price_list_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT NOT NULL,
    line_no INTEGER NOT NULL DEFAULT 1 CHECK (line_no > 0),
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (unit_price >= 0),
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
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
    row_version INTEGER NOT NULL DEFAULT 1 CHECK (row_version > 0),
    UNIQUE (company_id, code),
    UNIQUE (company_id, parent_id, line_no),
    FOREIGN KEY (company_id, parent_id) REFERENCES sales_price_lists(company_id, id) ON DELETE RESTRICT
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
CREATE UNIQUE INDEX IF NOT EXISTS uq_sales_promotions_company_docno ON sales_promotions(company_id, document_no) WHERE document_no IS NOT NULL;

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
    exchange_rate NUMERIC(20,8) NOT NULL DEFAULT 1 CHECK (exchange_rate > 0),
    subtotal NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (subtotal >= 0),
    discount_total NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (discount_total >= 0),
    tax_total NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (tax_total >= 0),
    total_amount NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (total_amount >= 0),
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
    row_version INTEGER NOT NULL DEFAULT 1 CHECK (row_version > 0),
    UNIQUE (company_id, code),
    UNIQUE (company_id, id)
);
CREATE INDEX IF NOT EXISTS idx_sales_targets_company_status ON sales_targets(company_id, status);
CREATE INDEX IF NOT EXISTS idx_sales_targets_company_date ON sales_targets(company_id, document_date);
CREATE UNIQUE INDEX IF NOT EXISTS uq_sales_targets_company_docno ON sales_targets(company_id, document_no) WHERE document_no IS NOT NULL;

CREATE TABLE IF NOT EXISTS sales_target_lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT NOT NULL,
    line_no INTEGER NOT NULL DEFAULT 1 CHECK (line_no > 0),
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (unit_price >= 0),
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
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
    row_version INTEGER NOT NULL DEFAULT 1 CHECK (row_version > 0),
    UNIQUE (company_id, code),
    UNIQUE (company_id, parent_id, line_no),
    FOREIGN KEY (company_id, parent_id) REFERENCES sales_targets(company_id, id) ON DELETE RESTRICT
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
    row_version INTEGER NOT NULL DEFAULT 1 CHECK (row_version > 0),
    UNIQUE (company_id, code),
    UNIQUE (company_id, id)
);
CREATE INDEX IF NOT EXISTS idx_sales_delivery_routes_company_status ON sales_delivery_routes(company_id, status);

CREATE TABLE IF NOT EXISTS sales_route_stops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
    parent_id BIGINT NOT NULL,
    line_no INTEGER NOT NULL DEFAULT 1 CHECK (line_no > 0),
    item_id BIGINT,
    item_code VARCHAR(100),
    item_description VARCHAR(500),
    quantity NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    unit_code VARCHAR(20),
    unit_price NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (unit_price >= 0),
    discount_amount NUMERIC(20,6) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
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
    row_version INTEGER NOT NULL DEFAULT 1 CHECK (row_version > 0),
    UNIQUE (company_id, code),
    UNIQUE (company_id, parent_id, line_no),
    FOREIGN KEY (company_id, parent_id) REFERENCES sales_delivery_routes(company_id, id) ON DELETE RESTRICT
);
CREATE INDEX IF NOT EXISTS idx_sales_route_stops_company_status ON sales_route_stops(company_id, status);
CREATE INDEX IF NOT EXISTS idx_sales_route_stops_parent_line ON sales_route_stops(parent_id, line_no);
