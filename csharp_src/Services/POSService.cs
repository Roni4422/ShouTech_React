using System;

namespace ShouTech.ERP.Core.Services
{
    public class POSSaleOrder
    {
        public string Barcode { get; set; } = string.Empty;
        public decimal Quantity { get; set; } = 1.0m;
        public string PaymentMethod { get; set; } = "Cash";
        public string CustomerCode { get; set; } = "CUST-003";
    }

    public class POSSaleResult
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public string DocNo { get; set; } = string.Empty;
        public decimal Subtotal { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal GrandTotal { get; set; }
        public decimal RemainingStock { get; set; }
    }

    public class POSService
    {
        private readonly InventoryService _inventory;
        private readonly AccountingService _accounting;

        public POSService(InventoryService inventory, AccountingService accounting)
        {
            _inventory = inventory;
            _accounting = accounting;
        }

        public POSSaleResult ProcessSale(POSSaleOrder order)
        {
            var item = _inventory.FindByBarcode(order.Barcode);
            if (item == null)
            {
                return new POSSaleResult { Success = false, Message = $"Barcode '{order.Barcode}' not found." };
            }

            if (item.QtyOnHand < order.Quantity)
            {
                return new POSSaleResult { Success = false, Message = $"Insufficient inventory. Available: {item.QtyOnHand}" };
            }

            // Deduct stock
            _inventory.DeductStock(item.Code, order.Quantity);

            // Calculate amounts (15% VAT)
            decimal subtotal = item.PriceRetail * order.Quantity;
            decimal tax = subtotal * (item.TaxRate / 100.0m);
            decimal total = subtotal + tax;

            // Post double-entry to General Ledger
            _accounting.PostJournalEntry(debitCash: total, creditRevenue: subtotal, creditVat: tax);

            string docNo = $"POS-{DateTime.UtcNow:yyyyMMddHHmmss}";

            return new POSSaleResult
            {
                Success = true,
                Message = "Sale processed and ledger updated.",
                DocNo = docNo,
                Subtotal = subtotal,
                TaxAmount = tax,
                GrandTotal = total,
                RemainingStock = item.QtyOnHand
            };
        }
    }
}
