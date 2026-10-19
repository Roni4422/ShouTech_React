/**
 * ShouTech ERP — Core C Computational & Security Engine
 * Version: 10.6.0
 * Implementation file
 */

#include "shoutech_core.h"
#include <string.h>
#include <ctype.h>

double shoutech_calc_weighted_avg(double current_qty, double current_cost,
                                  double incoming_qty, double incoming_cost) {
    double total_qty = current_qty + incoming_qty;
    if (total_qty <= 0.0) {
        return incoming_cost > 0.0 ? incoming_cost : current_cost;
    }
    double total_val = (current_qty * current_cost) + (incoming_qty * incoming_cost);
    return total_val / total_qty;
}

double shoutech_calc_line_total(double qty, double unit_price,
                                double discount_percent, double tax_rate,
                                double *out_subtotal, double *out_tax_amount) {
    if (discount_percent < 0.0) discount_percent = 0.0;
    if (discount_percent > 100.0) discount_percent = 100.0;

    double gross = qty * unit_price;
    double discount_amount = gross * (discount_percent / 100.0);
    double subtotal = gross - discount_amount;
    double tax = subtotal * (tax_rate / 100.0);
    double total = subtotal + tax;

    if (out_subtotal) *out_subtotal = subtotal;
    if (out_tax_amount) *out_tax_amount = tax;

    return total;
}

int shoutech_validate_ean13(const char *barcode) {
    if (!barcode || strlen(barcode) != 13) {
        return 0;
    }

    int sum_odd = 0;
    int sum_even = 0;

    for (int i = 0; i < 12; i++) {
        if (!isdigit((unsigned char)barcode[i])) return 0;
        int digit = barcode[i] - '0';
        if (i % 2 == 0) {
            sum_odd += digit;
        } else {
            sum_even += digit;
        }
    }

    int total = sum_odd + (sum_even * 3);
    int check_digit = (10 - (total % 10)) % 10;
    int actual_check = barcode[12] - '0';

    return check_digit == actual_check;
}

uint32_t shoutech_crc32(const uint8_t *data, size_t length) {
    uint32_t crc = 0xFFFFFFFF;
    for (size_t i = 0; i < length; i++) {
        uint8_t byte = data[i];
        crc = crc ^ byte;
        for (int j = 7; j >= 0; j--) {
            uint32_t mask = -(crc & 1);
            crc = (crc >> 1) ^ (0xEDB88320 & mask);
        }
    }
    return ~crc;
}

double shoutech_calc_fifo_cogs(const InventoryLayer *layers, size_t layer_count,
                               double qty_sold, size_t *out_layers_consumed) {
    double remaining_to_sell = qty_sold;
    double total_cogs = 0.0;
    size_t consumed = 0;

    for (size_t i = 0; i < layer_count && remaining_to_sell > 0.0; i++) {
        double layer_available = layers[i].quantity;
        if (layer_available <= 0.0) continue;

        double deduct = (remaining_to_sell < layer_available) ? remaining_to_sell : layer_available;
        total_cogs += deduct * layers[i].unit_cost;
        remaining_to_sell -= deduct;
        consumed++;
    }

    if (out_layers_consumed) {
        *out_layers_consumed = consumed;
    }

    return total_cogs;
}
