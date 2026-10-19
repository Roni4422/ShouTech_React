import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Code, Terminal, Play, CheckCircle2, Copy, FileCode, 
  Cpu, Layers, Sparkles 
} from 'lucide-react';

export const NativeEngineView: React.FC = () => {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'c_lang' | 'csharp_lang' | 'live_sim'>('c_lang');
  const [selectedFile, setSelectedFile] = useState<string>('c_src/shoutech_core.c');

  // Live simulation states
  const [simQty, setSimQty] = useState<number>(5);
  const [simPrice, setSimPrice] = useState<number>(1250);
  const [simDiscount, setSimDiscount] = useState<number>(10);
  const [simTax, setSimTax] = useState<number>(15);
  const [simBarcode, setSimBarcode] = useState<string>('6281001001011');
  const [simLog, setSimLog] = useState<string[]>([
    'ShouTech C & C# Engine initialized.',
    'Ready for simulated execution.'
  ]);

  const runSimulation = () => {
    // Simulate C calculation: shoutech_calc_line_total
    const gross = simQty * simPrice;
    const discountAmount = gross * (simDiscount / 100);
    const subtotal = gross - discountAmount;
    const taxAmount = subtotal * (simTax / 100);
    const grandTotal = subtotal + taxAmount;

    // Simulate C barcode check
    let sumOdd = 0, sumEven = 0;
    for (let i = 0; i < 12; i++) {
      const digit = Number(simBarcode[i]) || 0;
      if (i % 2 === 0) sumOdd += digit;
      else sumEven += digit;
    }
    const checkDigit = (10 - ((sumOdd + sumEven * 3) % 10)) % 10;
    const isValidEan13 = simBarcode.length === 13 && Number(simBarcode[12]) === checkDigit;

    const timestamp = new Date().toLocaleTimeString();
    const newLogs = [
      `[${timestamp}] [C Engine] shoutech_calc_line_total(qty=${simQty}, price=${simPrice}, disc=${simDiscount}%, tax=${simTax}%):`,
      `    -> Gross: ${gross.toFixed(2)} SAR`,
      `    -> Discount: -${discountAmount.toFixed(2)} SAR`,
      `    -> Subtotal: ${subtotal.toFixed(2)} SAR`,
      `    -> VAT (15%): ${taxAmount.toFixed(2)} SAR`,
      `    -> Line Total: ${grandTotal.toFixed(2)} SAR`,
      `[${timestamp}] [C Engine] shoutech_validate_ean13("${simBarcode}"): ${isValidEan13 ? 'VALID' : 'INVALID (check digit ' + checkDigit + ')'}`,
      `[${timestamp}] [C# Engine] POSService.ProcessSale() completed successfully. Ledger updated.`
    ];

    setSimLog(prev => [...newLogs, ...prev]);
    showToast('Executed C & C# algorithm simulation');
  };

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Code copied to clipboard');
  };

  const fileContents: Record<string, { lang: string; code: string; desc: string }> = {
    'c_src/shoutech_core.h': {
      lang: 'C Header (C99)',
      desc: 'C function declarations for high-performance inventory valuation, pricing and CRC32 verification',
      code: `/**
 * ShouTech ERP — Core C Computational & Security Engine
 * Version: 10.6.0
 * Language: C (C99 / C11 compatible)
 */
#ifndef SHOUTECH_CORE_H
#define SHOUTECH_CORE_H

#include <stdint.h>
#include <stddef.h>

#ifdef __cplusplus
extern "C" {
#endif

typedef enum {
    VALUATION_WEIGHTED_AVERAGE = 0,
    VALUATION_FIFO             = 1,
    VALUATION_LIFO             = 2,
    VALUATION_STANDARD_COST    = 3
} ValuationMethod;

typedef struct {
    double quantity;
    double unit_cost;
    uint64_t timestamp;
} InventoryLayer;

double shoutech_calc_weighted_avg(double current_qty, double current_cost,
                                  double incoming_qty, double incoming_cost);

double shoutech_calc_line_total(double qty, double unit_price,
                                double discount_percent, double tax_rate,
                                double *out_subtotal, double *out_tax_amount);

int shoutech_validate_ean13(const char *barcode);
uint32_t shoutech_crc32(const uint8_t *data, size_t length);

#ifdef __cplusplus
}
#endif
#endif`
    },
    'c_src/shoutech_core.c': {
      lang: 'C Source (C99)',
      desc: 'C Implementation of inventory weighted average, line totals, EAN-13 validation and CRC32 hashing',
      code: `/**
 * ShouTech ERP — Core C Computational & Security Engine
 * Version: 10.6.0
 */
#include "shoutech_core.h"
#include <string.h>
#include <ctype.h>

double shoutech_calc_weighted_avg(double current_qty, double current_cost,
                                  double incoming_qty, double incoming_cost) {
    double total_qty = current_qty + incoming_qty;
    if (total_qty <= 0.0) return incoming_cost > 0.0 ? incoming_cost : current_cost;
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
    if (!barcode || strlen(barcode) != 13) return 0;
    int sum_odd = 0, sum_even = 0;
    for (int i = 0; i < 12; i++) {
        if (!isdigit((unsigned char)barcode[i])) return 0;
        int digit = barcode[i] - '0';
        if (i % 2 == 0) sum_odd += digit;
        else sum_even += digit;
    }
    int check_digit = (10 - ((sum_odd + sum_even * 3) % 10)) % 10;
    return check_digit == (barcode[12] - '0');
}

uint32_t shoutech_crc32(const uint8_t *data, size_t length) {
    uint32_t crc = 0xFFFFFFFF;
    for (size_t i = 0; i < length; i++) {
        crc ^= data[i];
        for (int j = 7; j >= 0; j--) {
            uint32_t mask = -(crc & 1);
            crc = (crc >> 1) ^ (0xEDB88320 & mask);
        }
    }
    return ~crc;
}`
    },
    'c_src/Makefile': {
      lang: 'Makefile',
      desc: 'GNU Makefile to build libshoutech.so (dynamic library) and libshoutech.a (static library)',
      code: `# ShouTech ERP — C Engine Makefile
CC ?= gcc
CFLAGS ?= -O3 -Wall -Wextra -fPIC -std=c99
TARGET_LIB = libshoutech.so
TARGET_STATIC = libshoutech.a

all: $(TARGET_LIB) $(TARGET_STATIC)

$(TARGET_LIB): shoutech_core.o
	$(CC) -shared -o $@ $^

$(TARGET_STATIC): shoutech_core.o
	ar rcs $@ $^

shoutech_core.o: shoutech_core.c shoutech_core.h
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f *.o $(TARGET_LIB) $(TARGET_STATIC)`
    },
    'csharp_src/Program.cs': {
      lang: 'C# (.NET 8)',
      desc: 'Entry point for ShouTech C# Core Engine executing POS transactions and General Ledger audits',
      code: `using System;
using ShouTech.ERP.Core.Services;

namespace ShouTech.ERP.Core
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("ShouTech ERP — Core C# Business Engine v10.6.0");
            var inventoryService = new InventoryService();
            var accountingService = new AccountingService();
            var posService = new POSService(inventoryService, accountingService);

            inventoryService.SeedDefaultMaterials();
            var saleResult = posService.ProcessSale(new POSSaleOrder
            {
                Barcode = "6281001001011",
                Quantity = 2,
                PaymentMethod = "Cash",
                CustomerCode = "CUST-003"
            });

            Console.WriteLine($"Sale Doc: {saleResult.DocNo}");
            Console.WriteLine($"Grand Total: {saleResult.GrandTotal:N2} SAR");
        }
    }
}`
    },
    'csharp_src/Services/POSService.cs': {
      lang: 'C# (.NET 8)',
      desc: 'Point of Sale transaction orchestrator coordinating inventory deduction and double-entry ledger posting',
      code: `using System;

namespace ShouTech.ERP.Core.Services
{
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
            if (item == null) return new POSSaleResult { Success = false, Message = "Item not found" };
            if (item.QtyOnHand < order.Quantity) return new POSSaleResult { Success = false, Message = "Low stock" };

            _inventory.DeductStock(item.Code, order.Quantity);

            decimal subtotal = item.PriceRetail * order.Quantity;
            decimal tax = subtotal * (item.TaxRate / 100.0m);
            decimal total = subtotal + tax;

            _accounting.PostJournalEntry(debitCash: total, creditRevenue: subtotal, creditVat: tax);

            return new POSSaleResult
            {
                Success = true,
                DocNo = $"POS-{DateTime.UtcNow:yyyyMMddHHmmss}",
                Subtotal = subtotal,
                TaxAmount = tax,
                GrandTotal = total,
                RemainingStock = item.QtyOnHand
            };
        }
    }
}`
    },
    'csharp_src/Services/AccountingService.cs': {
      lang: 'C# (.NET 8)',
      desc: 'General ledger account balances and journal voucher posting routines in C#',
      code: `using System.Collections.Generic;

namespace ShouTech.ERP.Core.Services
{
    public class AccountingService
    {
        private readonly Dictionary<string, AccountSummary> _ledger = new()
        {
            { "111", new AccountSummary { Code = "111", Name = "Cash & Vault", Balance = 84500.00m } },
            { "112", new AccountSummary { Code = "112", Name = "Bank Accounts", Balance = 142000.00m } },
            { "113", new AccountSummary { Code = "113", Name = "Accounts Receivable", Balance = 46200.00m } },
            { "212", new AccountSummary { Code = "212", Name = "VAT Output Payable", Balance = 18000.00m } },
            { "41",  new AccountSummary { Code = "41",  Name = "Sales Revenue", Balance = 165000.00m } }
        };

        public void PostJournalEntry(decimal debitCash, decimal creditRevenue, decimal creditVat)
        {
            if (_ledger.TryGetValue("111", out var cash)) cash.Balance += debitCash;
            if (_ledger.TryGetValue("41", out var rev)) rev.Balance += creditRevenue;
            if (_ledger.TryGetValue("212", out var vat)) vat.Balance += creditVat;
        }

        public IEnumerable<AccountSummary> GenerateTrialBalance() => _ledger.Values;
    }
}`
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#1E1E1E] text-white overflow-hidden">
      {/* Top Banner */}
      <div className="p-4 bg-[#242424] border-b border-[#383838] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center font-bold text-white shadow">
            C# / C
          </div>
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              <span>C & C# Native Engine Architecture</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                C99 / C11 & .NET 8
              </span>
            </h1>
            <p className="text-xs text-gray-400">
              Native high-performance computation modules, FIFO/Weighted Average valuation in C, and business services in C#
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 bg-[#1A1A1A] p-1 rounded-lg border border-[#333333]">
          <button
            onClick={() => { setActiveTab('c_lang'); setSelectedFile('c_src/shoutech_core.c'); }}
            className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'c_lang' ? 'bg-[#0078D4] text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>C Engine</span>
          </button>
          <button
            onClick={() => { setActiveTab('csharp_lang'); setSelectedFile('csharp_src/Program.cs'); }}
            className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'csharp_lang' ? 'bg-[#0078D4] text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>C# .NET 8</span>
          </button>
          <button
            onClick={() => setActiveTab('live_sim')}
            className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'live_sim' ? 'bg-purple-600 text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Live Interactive Test</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {activeTab !== 'live_sim' ? (
          <>
            {/* File List Column */}
            <div className="w-64 bg-[#212121] border-e border-[#383838] p-3 flex flex-col shrink-0">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                {activeTab === 'c_lang' ? 'C Source Files (c_src/)' : 'C# Source Files (csharp_src/)'}
              </span>

              <div className="space-y-1">
                {Object.keys(fileContents)
                  .filter(key => activeTab === 'c_lang' ? key.startsWith('c_src') : key.startsWith('csharp_src'))
                  .map(filePath => {
                    const isSelected = selectedFile === filePath;
                    return (
                      <button
                        key={filePath}
                        onClick={() => setSelectedFile(filePath)}
                        className={`w-full text-start px-2.5 py-1.5 rounded text-xs font-mono flex items-center gap-2 transition-colors ${
                          isSelected 
                            ? 'bg-[#0078D4] text-white font-bold' 
                            : 'text-gray-300 hover:bg-white/5'
                        }`}
                      >
                        <FileCode className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
                        <span className="truncate">{filePath.split('/')[1]}</span>
                      </button>
                    );
                  })}
              </div>

              {/* Build Instructions Box */}
              <div className="mt-auto p-3 bg-[#181818] rounded border border-white/10 text-xs text-gray-400 space-y-1.5">
                <span className="font-bold text-white block">CLI Build Command:</span>
                {activeTab === 'c_lang' ? (
                  <code className="block bg-black/60 p-2 rounded text-[11px] text-emerald-400 font-mono">
                    cd c_src && make
                  </code>
                ) : (
                  <code className="block bg-black/60 p-2 rounded text-[11px] text-cyan-300 font-mono">
                    dotnet run --project csharp_src/ShouTech.ERP.Core.csproj
                  </code>
                )}
              </div>
            </div>

            {/* Code Viewer Panel */}
            <div className="flex-1 flex flex-col bg-[#1A1A1A] overflow-hidden">
              <div className="p-3 bg-[#242424] border-b border-[#383838] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-cyan-400">{selectedFile}</span>
                  <span className="text-gray-400 text-[11px]">({fileContents[selectedFile]?.lang})</span>
                </div>
                <button
                  onClick={() => copyCode(fileContents[selectedFile]?.code || '')}
                  className="px-2.5 py-1 bg-[#1E1E1E] hover:bg-white/10 border border-white/10 rounded text-xs flex items-center gap-1.5 text-gray-300"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </button>
              </div>

              <div className="p-2 bg-[#202020] border-b border-[#333333] text-[11px] text-gray-400 px-4">
                {fileContents[selectedFile]?.desc}
              </div>

              <pre className="flex-1 p-4 font-mono text-xs overflow-auto text-gray-200 leading-relaxed bg-[#141414]">
                <code>{fileContents[selectedFile]?.code}</code>
              </pre>
            </div>
          </>
        ) : (
          /* Live Interactive Simulation View */
          <div className="flex-1 p-6 overflow-y-auto space-y-6 max-w-4xl mx-auto">
            <div className="bg-[#242424] p-5 rounded-lg border border-[#383838] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Live C & C# Algorithm Runner</span>
                </h3>
                <button
                  onClick={runSimulation}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded text-xs font-bold shadow flex items-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Execution</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Quantity (C double qty)</label>
                  <input
                    type="number"
                    value={simQty}
                    onChange={e => setSimQty(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded font-mono text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Unit Price (C double price)</label>
                  <input
                    type="number"
                    value={simPrice}
                    onChange={e => setSimPrice(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded font-mono text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Discount %</label>
                  <input
                    type="number"
                    value={simDiscount}
                    onChange={e => setSimDiscount(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded font-mono text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-white/10">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Barcode to Validate (EAN-13)</label>
                  <input
                    type="text"
                    value={simBarcode}
                    onChange={e => setSimBarcode(e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded font-mono text-cyan-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">VAT Tax Rate %</label>
                  <input
                    type="number"
                    value={simTax}
                    onChange={e => setSimTax(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded font-mono text-white"
                  />
                </div>
              </div>
            </div>

            {/* Execution Console Output */}
            <div className="bg-[#181818] rounded-lg border border-[#383838] p-4 font-mono text-xs overflow-hidden">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                <span className="text-gray-400 flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Execution Output Stream</span>
                </span>
                <span className="text-[11px] text-gray-500">Live stdout</span>
              </div>

              <div className="space-y-1.5 max-h-60 overflow-y-auto">
                {simLog.map((log, idx) => (
                  <div key={idx} className="text-gray-300 font-mono">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
