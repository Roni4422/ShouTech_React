using System;
using System.Collections.Generic;

namespace ShouTech.ERP.Core.Services
{
    public class AccountSummary
    {
        public string Code { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public decimal Balance { get; set; }
    }

    public class AccountingService
    {
        private readonly Dictionary<string, AccountSummary> _ledger = new()
        {
            { "111", new AccountSummary { Code = "111", Name = "Cash & Vault (الصندوق والنقدية)", Balance = 84500.00m } },
            { "112", new AccountSummary { Code = "112", Name = "Bank Accounts (الحسابات البنكية)", Balance = 142000.00m } },
            { "113", new AccountSummary { Code = "113", Name = "Accounts Receivable (العملاء)", Balance = 46200.00m } },
            { "212", new AccountSummary { Code = "212", Name = "VAT Output Payable (أمانات الضريبة)", Balance = 18000.00m } },
            { "41",  new AccountSummary { Code = "41",  Name = "Sales Revenue (إيراد المبيعات)", Balance = 165000.00m } }
        };

        public void PostJournalEntry(decimal debitCash, decimal creditRevenue, decimal creditVat)
        {
            if (_ledger.TryGetValue("111", out var cash)) cash.Balance += debitCash;
            if (_ledger.TryGetValue("41", out var rev)) rev.Balance += creditRevenue;
            if (_ledger.TryGetValue("212", out var vat)) vat.Balance += creditVat;
        }

        public IEnumerable<AccountSummary> GenerateTrialBalance() => _ledger.Values;
    }
}
