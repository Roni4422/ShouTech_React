using System;
using System.Collections.Generic;
using ShouTech.ERP.Core.Services;

namespace ShouTech.ERP.Core
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("=================================================");
            Console.WriteLine(" ShouTech ERP — Core C# Business Engine v10.6.0  ");
            Console.WriteLine(" © 2026 ShouTech Software. All Rights Reserved.  ");
            Console.WriteLine("=================================================");

            var inventoryService = new InventoryService();
            var accountingService = new AccountingService();
            var posService = new POSService(inventoryService, accountingService);

            Console.WriteLine("\n[1] Initializing Product Catalog...");
            inventoryService.SeedDefaultMaterials();
            Console.WriteLine($"-> Registered {inventoryService.GetMaterialCount()} active materials.");

            Console.WriteLine("\n[2] Executing POS Sale Transaction via C# Engine...");
            var saleResult = posService.ProcessSale(new POSSaleOrder
            {
                Barcode = "6281001001011",
                Quantity = 2,
                PaymentMethod = "Cash",
                CustomerCode = "CUST-003"
            });

            Console.WriteLine($"-> POS Status: {(saleResult.Success ? "SUCCESS" : "FAILED")}");
            Console.WriteLine($"-> Document: {saleResult.DocNo}");
            Console.WriteLine($"-> Grand Total: {saleResult.GrandTotal:N2} SAR (VAT 15% included)");
            Console.WriteLine($"-> Remaining Stock: {saleResult.RemainingStock}");

            Console.WriteLine("\n[3] Auditing General Ledger Balances...");
            var trialBalance = accountingService.GenerateTrialBalance();
            foreach (var account in trialBalance)
            {
                Console.WriteLine($"   [{account.Code}] {account.Name,-30} | {account.Balance,12:N2} SAR");
            }

            Console.WriteLine("\n[✓] ShouTech C# Core Engine initialized and operating normally.");
        }
    }
}
