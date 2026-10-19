/**
 * ShouTech ERP — Core C Computational & Security Engine
 * Version: 10.6.0
 * Language: C (C99 / C11 compatible)
 * Description: High-performance calculation for inventory valuation (FIFO, LIFO, Weighted Average),
 *              tax & discount calculations, barcode checksum validation, and cryptographic hash verification.
 */

#ifndef SHOUTECH_CORE_H
#define SHOUTECH_CORE_H

#include <stdint.h>
#include <stddef.h>

#ifdef __cplusplus
extern "C" {
#endif

/* Inventory Valuation Methods */
typedef enum {
    VALUATION_WEIGHTED_AVERAGE = 0,
    VALUATION_FIFO             = 1,
    VALUATION_LIFO             = 2,
    VALUATION_STANDARD_COST    = 3
} ValuationMethod;

/* Inventory Layer structure for FIFO / LIFO */
typedef struct {
    double quantity;
    double unit_cost;
    uint64_t timestamp;
} InventoryLayer;

/* Calculate Weighted Average Unit Cost */
double shoutech_calc_weighted_avg(double current_qty, double current_cost,
                                  double incoming_qty, double incoming_cost);

/* Calculate Line Item Total with discount and VAT */
double shoutech_calc_line_total(double qty, double unit_price,
                                double discount_percent, double tax_rate,
                                double *out_subtotal, double *out_tax_amount);

/* Calculate EAN-13 / Code128 Check Digit */
int shoutech_validate_ean13(const char *barcode);

/* Compute CRC32 Checksum for local data integrity */
uint32_t shoutech_crc32(const uint8_t *data, size_t length);

/* Simulate FIFO Cost of Goods Sold */
double shoutech_calc_fifo_cogs(const InventoryLayer *layers, size_t layer_count,
                               double qty_sold, size_t *out_layers_consumed);

#ifdef __cplusplus
}
#endif

#endif /* SHOUTECH_CORE_H */
