# ShouTech ERP enterprise database expansion

## Scope
This additive schema extension adds 217 module tables across CRM, sales, purchasing, inventory, manufacturing, finance, human resources, projects, service management, document workflows, and administration. It is provided separately for SQLite and PostgreSQL. The existing migrations remain the source of truth for the core company, user, accounting, and commercial tables.

## Migration files
- `mig/sqlite/013_enterprise_modules.sql`
- `mig/postgresql/015_enterprise_modules.sql`

## Design principles
- No destructive drops or data rewrites.
- Every module table is company-scoped and references `companies(company_id)`.
- Monetary and quantity values use fixed-precision NUMERIC types (six decimal places for commercial quantities and amounts; eight to ten places for exchange rates).
- Document headers, detail rows, audit/workflow/event records and master-data records have distinct typed columns. `attributes_json` is only for optional extensions, not a replacement for core fields.
- Composite company/status/date and parent/line indexes support common list, search and report workflows.
- API credentials are represented by hash fields; raw API secrets must never be persisted.
- Posted accounting and stock ledgers must remain append-only. Reversals/corrections should be represented as compensating documents, not destructive updates.

## Module table inventory
### CRM
- `crm_leads`
- `crm_opportunities`
- `crm_activities`
- `crm_activity_participants`
- `crm_campaigns`
- `crm_campaign_members`
- `crm_cases`
- `crm_case_comments`
- `crm_case_attachments`
- `crm_contracts`
- `crm_contract_lines`
- `crm_contact_methods`
- `crm_addresses`
- `crm_tags`
- `crm_entity_tags`

### Sales
- `sales_quotations`
- `sales_quotation_lines`
- `sales_orders`
- `sales_order_lines`
- `sales_shipments`
- `sales_shipment_lines`
- `sales_returns`
- `sales_return_lines`
- `sales_commissions`
- `sales_commission_rules`
- `sales_price_lists`
- `sales_price_list_lines`
- `sales_promotions`
- `sales_promotion_rules`
- `sales_targets`
- `sales_target_lines`
- `sales_delivery_routes`
- `sales_route_stops`

### Purchasing
- `purchase_requisitions`
- `purchase_requisition_lines`
- `purchase_quotations`
- `purchase_quotation_lines`
- `purchase_orders`
- `purchase_order_lines`
- `purchase_receipts`
- `purchase_receipt_lines`
- `purchase_returns`
- `purchase_return_lines`
- `purchase_supplier_prices`
- `purchase_supplier_price_breaks`
- `purchase_landed_costs`
- `purchase_landed_cost_lines`
- `purchase_approval_rules`
- `purchase_approval_steps`

### Inventory
- `inventory_adjustments`
- `inventory_adjustment_lines`
- `inventory_transfers`
- `inventory_transfer_lines`
- `inventory_counts`
- `inventory_count_lines`
- `inventory_lots`
- `inventory_serial_numbers`
- `inventory_barcodes`
- `inventory_item_units`
- `inventory_reorder_rules`
- `inventory_reservations`
- `inventory_reservation_lines`
- `inventory_cost_layers`
- `inventory_cost_transactions`
- `inventory_quality_inspections`
- `inventory_quality_inspection_lines`
- `inventory_bin_locations`

### Manufacturing
- `manufacturing_boms`
- `manufacturing_bom_lines`
- `manufacturing_routings`
- `manufacturing_routing_steps`
- `manufacturing_work_centers`
- `manufacturing_work_center_calendars`
- `manufacturing_production_orders`
- `manufacturing_production_order_lines`
- `manufacturing_material_issues`
- `manufacturing_material_issue_lines`
- `manufacturing_completions`
- `manufacturing_completion_lines`
- `manufacturing_scrap_records`
- `manufacturing_capacity_plans`
- `manufacturing_quality_checks`
- `manufacturing_quality_check_lines`

### Finance
- `finance_account_groups`
- `finance_account_mappings`
- `finance_journal_batches`
- `finance_journal_batch_lines`
- `finance_recurring_journals`
- `finance_recurring_journal_lines`
- `finance_budget_versions`
- `finance_budget_lines`
- `finance_bank_statements`
- `finance_bank_statement_lines`
- `finance_bank_reconciliations`
- `finance_bank_reconciliation_lines`
- `finance_fixed_assets`
- `finance_asset_categories`
- `finance_asset_books`
- `finance_depreciation_runs`
- `finance_depreciation_lines`
- `finance_asset_disposals`
- `finance_tax_returns`
- `finance_tax_return_lines`
- `finance_exchange_rates`
- `finance_currency_revaluations`
- `finance_currency_revaluation_lines`
- `finance_payment_terms`
- `finance_payment_term_lines`
- `finance_credit_limits`
- `finance_dunning_runs`
- `finance_dunning_items`
- `finance_cash_counts`
- `finance_cash_count_lines`

### HR
- `hr_departments`
- `hr_positions`
- `hr_employees`
- `hr_employee_contacts`
- `hr_employee_documents`
- `hr_employment_contracts`
- `hr_salary_components`
- `hr_salary_structures`
- `hr_salary_structure_lines`
- `hr_payroll_periods`
- `hr_payroll_runs`
- `hr_payroll_lines`
- `hr_payroll_line_components`
- `hr_attendance_records`
- `hr_shift_definitions`
- `hr_shift_assignments`
- `hr_leave_types`
- `hr_leave_balances`
- `hr_leave_requests`
- `hr_leave_approvals`
- `hr_expense_claims`
- `hr_expense_claim_lines`
- `hr_recruitment_vacancies`
- `hr_applicants`
- `hr_applicant_interviews`
- `hr_performance_reviews`
- `hr_training_courses`
- `hr_training_enrollments`

### Projects
- `project_portfolios`
- `projects`
- `project_members`
- `project_milestones`
- `project_tasks`
- `project_task_dependencies`
- `project_time_entries`
- `project_expense_lines`
- `project_budgets`
- `project_budget_lines`
- `project_invoices`
- `project_invoice_lines`
- `project_risks`
- `project_issues`
- `project_deliverables`

### Service
- `service_tickets`
- `service_ticket_messages`
- `service_ticket_attachments`
- `service_sla_policies`
- `service_sla_events`
- `service_equipment`
- `service_equipment_warranties`
- `service_work_orders`
- `service_work_order_lines`
- `service_appointments`
- `service_parts_used`
- `service_contracts`
- `service_contract_lines`

### Documents
- `document_folders`
- `document_records`
- `document_versions`
- `document_links`
- `document_access_rules`
- `document_templates`
- `document_template_fields`
- `document_approval_flows`
- `document_approval_steps`
- `document_approval_tasks`
- `document_numbering_rules`
- `document_sequences`
- `document_import_jobs`
- `document_import_rows`
- `document_export_jobs`
- `document_export_rows`
- `document_attachments`
- `document_signatures`

### Administration
- `admin_api_clients`
- `admin_api_tokens`
- `admin_webhooks`
- `admin_webhook_deliveries`
- `admin_notification_templates`
- `admin_notifications`
- `admin_user_preferences`
- `admin_saved_filters`
- `admin_saved_reports`
- `admin_report_schedules`
- `admin_report_runs`
- `admin_job_queue`
- `admin_job_attempts`
- `admin_feature_flags`
- `admin_integration_endpoints`
- `admin_integration_runs`
- `admin_data_retention_policies`
- `admin_privacy_requests`
- `admin_audit_reviews`
- `admin_audit_review_items`
- `admin_approval_policies`
- `admin_approval_requests`
- `admin_approval_steps`
- `admin_approval_actions`
- `admin_custom_fields`
- `admin_custom_field_values`
- `admin_number_series`
- `admin_localization_overrides`
- `admin_system_events`
- `admin_error_catalog`

## Important integration boundary
This migration creates persistence structures, not complete business services. Before a ribbon command is considered production-ready, its API/service must validate company scope and permissions, persist the workflow transactionally, enforce document state transitions, and write audit events. No frontend-only state should be treated as durable storage.

## External design references
- ERPNext: https://github.com/frappe/erpnext
- ERPNext accounting model: https://docs.frappe.io/erpnext/accounting-introduction
- Dolibarr: https://github.com/Dolibarr/dolibarr
- Dolibarr SQL conventions: https://wiki.dolibarr.org/index.php?title=Language_and_development_rules
