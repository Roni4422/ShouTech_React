import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { POSCartItem, Material, Invoice } from '../../types';
import { 
  Barcode, ShoppingCart, Trash2, Plus, Minus, CreditCard, 
  DollarSign, CheckCircle, Printer, X, Tag, User 
} from 'lucide-react';

export const POSView: React.FC = () => {
  const { materials, translate, saveInvoice, postInvoice, showToast, currentCompany } = useApp();
  const [barcodeInput, setBarcodeInput] = useState('');
  const [cart, setCart] = useState<POSCartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Credit' | 'KNet' | 'Visa'>('Cash');
  const [selectedCustomer, setSelectedCustomer] = useState('عميل نقدي صالة العرض (Cash Customer)');
  const [receiptDoc, setReceiptDoc] = useState<Invoice | null>(null);
  const barcodeRef = useRef<HTMLInputElement>(null);

  // Auto-focus barcode scanner input
  useEffect(() => {
    barcodeRef.current?.focus();
  }, []);

  // Keyboard shortcut listener (F2 focus, F12 checkout, Esc clear)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F2') {
        e.preventDefault();
        barcodeRef.current?.focus();
        barcodeRef.current?.select();
      } else if (e.key === 'F12') {
        e.preventDefault();
        if (cart.length > 0) handleCheckout();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setCart([]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cart]);

  const addItemToCart = (mat: Material) => {
    setCart(prev => {
      const existing = prev.find(item => item.material.id === mat.id);
      if (existing) {
        return prev.map(item => item.material.id === mat.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [
        ...prev,
        {
          id: `pos-${Date.now()}-${mat.id}`,
          material: mat,
          selectedUnit: mat.defaultUnit,
          unitFactor: 1,
          qty: 1,
          unitPrice: mat.priceRetail,
          discountPct: 0,
          taxRate: mat.taxRate || 15
        }
      ];
    });
  };

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    const query = barcodeInput.trim();
    if (!query) return;

    // Search by barcode or code or name
    const found = materials.find(m => 
      m.barcode === query || 
      m.barcode2 === query || 
      m.barcode3 === query || 
      m.code.toLowerCase() === query.toLowerCase() ||
      m.nameAr.toLowerCase().includes(query.toLowerCase()) ||
      m.nameEn.toLowerCase().includes(query.toLowerCase())
    );

    if (found) {
      addItemToCart(found);
      setBarcodeInput('');
    } else {
      showToast(`Item not found for barcode: ${query}`);
    }
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.qty * item.unitPrice * (1 - item.discountPct / 100)), 0);
  const taxAmount = subtotal * 0.15; // 15% VAT
  const grandTotal = subtotal + taxAmount;

  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast(translate('pos.scanPrompt'));
      return;
    }

    const docNo = `POS-${Date.now().toString().slice(-6)}`;
    const newInvoice: Omit<Invoice, 'id'> = {
      kind: 'pos',
      docNo,
      date: new Date().toISOString().slice(0, 10),
      partyCode: 'CUST-003',
      partyName: selectedCustomer,
      currency: 'SAR',
      warehouseId: 2, // retail store
      taxRate: 15,
      notes: `POS Cashier Sale - Payment: ${paymentMethod}`,
      status: 'Posted',
      postedBy: 'cashier',
      paymentMethod,
      subtotal,
      taxAmount,
      grandTotal,
      lines: cart.map(item => ({
        id: item.id,
        materialId: item.material.id,
        materialCode: item.material.code,
        description: item.material.nameAr,
        unit: item.selectedUnit,
        qty: item.qty,
        unitPrice: item.unitPrice,
        discountPct: item.discountPct,
        taxRate: item.taxRate,
        lineTotal: item.qty * item.unitPrice * (1 - item.discountPct / 100)
      }))
    };

    const docId = saveInvoice(newInvoice);
    postInvoice(docId);

    setReceiptDoc({ ...newInvoice, id: docId });
    setCart([]);
    showToast(translate('pos.saleSuccess'));
  };

  return (
    <div className="h-full flex flex-col lg:flex-row bg-[#1E1E1E] text-white overflow-hidden">
      {/* Left / Main sale area: Barcode input + Cart items table */}
      <div className="flex-1 flex flex-col p-4 border-e border-[#383838] overflow-hidden">
        {/* Top scan bar */}
        <div className="bg-[#27272A] p-3 rounded-lg border border-[#3F3F46] mb-3">
          <form onSubmit={handleScan} className="flex gap-2">
            <div className="relative flex-1">
              <Barcode className="w-5 h-5 absolute inset-y-0 my-auto start-3 text-cyan-400" />
              <input
                ref={barcodeRef}
                type="text"
                value={barcodeInput}
                onChange={e => setBarcodeInput(e.target.value)}
                placeholder={translate('pos.scanPrompt')}
                className="w-full ps-10 pe-3 py-2.5 bg-[#181818] border border-cyan-500/50 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#0078D4] hover:bg-[#1084D9] text-white rounded text-xs font-semibold shadow transition-colors flex items-center gap-1.5"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{translate('common.new')}</span>
            </button>
          </form>

          {/* Quick pick items */}
          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] text-gray-400 shrink-0">Quick picks:</span>
            {materials.slice(0, 5).map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => addItemToCart(m)}
                className="px-2.5 py-1 bg-[#1E1E1E] hover:bg-[#323238] border border-white/10 rounded shrink-0 text-[11px] text-gray-200 transition-colors flex items-center gap-1"
              >
                <Tag className="w-3 h-3 text-cyan-400" />
                <span className="max-w-[120px] truncate">{m.nameAr}</span>
                <span className="text-gray-400 font-mono font-bold">({m.priceRetail} SAR)</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cart items DataGrid */}
        <div className="flex-1 overflow-y-auto bg-[#242424] rounded-lg border border-[#383838]">
          <table className="w-full text-start text-xs border-collapse">
            <thead className="bg-[#1A1A1A] sticky top-0 border-b border-[#383838] text-gray-300">
              <tr>
                <th className="py-2.5 px-3 text-start">{translate('pos.barcode')}</th>
                <th className="py-2.5 px-3 text-start">{translate('pos.product')}</th>
                <th className="py-2.5 px-3 text-center">{translate('pos.unit')}</th>
                <th className="py-2.5 px-3 text-center w-28">{translate('pos.qty')}</th>
                <th className="py-2.5 px-3 text-end">{translate('pos.price')}</th>
                <th className="py-2.5 px-3 text-end">{translate('pos.tax')}</th>
                <th className="py-2.5 px-3 text-end">{translate('pos.lineTotal')}</th>
                <th className="py-2.5 px-3 text-center w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#333333]">
              {cart.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-gray-500">
                    <ShoppingCart className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    <span>{translate('pos.scanPrompt')}</span>
                  </td>
                </tr>
              ) : (
                cart.map(item => {
                  const lineTotal = item.qty * item.unitPrice * (1 - item.discountPct / 100);
                  return (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-2.5 px-3 font-mono text-[11px] text-cyan-300">{item.material.barcode}</td>
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-white">{item.material.nameAr}</div>
                        <div className="text-[10px] text-gray-400 font-mono">{item.material.code}</div>
                      </td>
                      <td className="py-2.5 px-3 text-center text-gray-300">{item.selectedUnit}</td>
                      <td className="py-2.5 px-3 text-center">
                        <div className="inline-flex items-center gap-1.5 bg-[#181818] border border-white/20 rounded px-1.5 py-0.5">
                          <button 
                            onClick={() => updateQty(item.id, -1)}
                            className="text-gray-400 hover:text-white p-0.5"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono font-bold w-6 text-center">{item.qty}</span>
                          <button 
                            onClick={() => updateQty(item.id, 1)}
                            className="text-gray-400 hover:text-white p-0.5"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-end font-mono">
                        {item.unitPrice.toFixed(2)}
                      </td>
                      <td className="py-2.5 px-3 text-end font-mono text-gray-400">15%</td>
                      <td className="py-2.5 px-3 text-end font-mono font-bold text-white">
                        {lineTotal.toFixed(2)} SAR
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-400 p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right / Order Summary & Checkout Panel */}
      <div className="w-full lg:w-96 p-4 bg-[#242424] flex flex-col justify-between overflow-y-auto">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[#383838] mb-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-[#0078D4]" />
              <span>{translate('pos.title')}</span>
            </h2>
            <button
              onClick={() => setCart([])}
              className="text-xs text-gray-400 hover:text-red-400 transition-colors"
            >
              {translate('pos.clearCart')}
            </button>
          </div>

          {/* Customer Selection */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-gray-400" />
              <span>{translate('pos.customer')}</span>
            </label>
            <input
              type="text"
              value={selectedCustomer}
              onChange={e => setSelectedCustomer(e.target.value)}
              className="w-full px-3 py-1.5 bg-[#1A1A1A] border border-white/20 rounded text-xs text-white"
            />
          </div>

          {/* Payment Method Tabs */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              {translate('pos.paymentMethod')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'Cash', label: translate('pos.cash'), icon: DollarSign },
                { id: 'KNet', label: translate('pos.knet'), icon: CreditCard },
                { id: 'Visa', label: translate('pos.visa'), icon: CreditCard },
                { id: 'Credit', label: translate('pos.credit'), icon: User },
              ].map(method => {
                const isSelected = paymentMethod === method.id;
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`p-2.5 rounded border text-xs flex items-center gap-2 transition-all ${
                      isSelected 
                        ? 'bg-[#0078D4] text-white border-[#0078D4] font-semibold shadow' 
                        : 'bg-[#1E1E1E] text-gray-300 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{method.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="p-4 rounded-lg bg-[#181818] border border-white/10 space-y-2.5">
            <div className="flex justify-between text-xs text-gray-300">
              <span>{translate('pos.subtotal')}</span>
              <span className="font-mono">{subtotal.toFixed(2)} SAR</span>
            </div>
            <div className="flex justify-between text-xs text-gray-300">
              <span>{translate('pos.taxTotal')}</span>
              <span className="font-mono">{taxAmount.toFixed(2)} SAR</span>
            </div>
            <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
              <span className="text-sm font-bold text-white">{translate('pos.grandTotal')}</span>
              <span className="text-2xl font-black text-[#FF6B35] font-mono">
                {grandTotal.toFixed(2)} <span className="text-xs text-gray-400">SAR</span>
              </span>
            </div>
          </div>
        </div>

        {/* Complete Checkout Button */}
        <div className="pt-4">
          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full py-3.5 bg-gradient-to-r from-[#0078D4] to-[#005A9E] hover:from-[#1084D9] hover:to-[#0078D4] text-white rounded-lg font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle className="w-5 h-5" />
            <span>{translate('pos.checkout')}</span>
          </button>
          <p className="text-[11px] text-gray-400 text-center mt-2 font-mono">
            F2: Barcode · F12: Checkout · Esc: Clear
          </p>
        </div>
      </div>

      {/* Simplified Thermal Tax Receipt Modal */}
      {receiptDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <div className="w-[380px] bg-white text-black rounded-lg shadow-2xl p-6 font-mono text-xs animate-scale-up">
            <div className="text-center pb-3 border-b border-dashed border-gray-400">
              <h3 className="font-bold text-base">{currentCompany.name}</h3>
              <p className="text-[11px] text-gray-600">{currentCompany.nameEn}</p>
              <p className="text-[10px] text-gray-600">VAT: {currentCompany.vatNumber}</p>
              <p className="text-[10px] text-gray-600">{translate('pos.receiptTitle')}</p>
            </div>

            <div className="py-2 border-b border-dashed border-gray-400 text-[11px] space-y-1">
              <div>Invoice No: <strong>{receiptDoc.docNo}</strong></div>
              <div>Date: {receiptDoc.date} {new Date().toLocaleTimeString()}</div>
              <div>Customer: {receiptDoc.partyName}</div>
              <div>Payment: {receiptDoc.paymentMethod}</div>
            </div>

            <div className="py-2 border-b border-dashed border-gray-400 space-y-1">
              {receiptDoc.lines.map((l, idx) => (
                <div key={idx} className="flex justify-between text-[11px]">
                  <span>{l.qty}x {l.description}</span>
                  <span>{l.lineTotal.toFixed(2)} SAR</span>
                </div>
              ))}
            </div>

            <div className="py-2 border-b border-dashed border-gray-400 space-y-1 text-end">
              <div>Subtotal: {receiptDoc.subtotal.toFixed(2)} SAR</div>
              <div>VAT (15%): {receiptDoc.taxAmount.toFixed(2)} SAR</div>
              <div className="text-sm font-bold pt-1">Total: {receiptDoc.grandTotal.toFixed(2)} SAR</div>
            </div>

            <div className="pt-3 text-center text-[10px] text-gray-600">
              <p>Thank you for shopping with us!</p>
              <p>ShouTech ERP v10.6.0 · Electronic POS System</p>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-1.5 bg-gray-900 text-white rounded font-sans font-semibold text-xs flex items-center justify-center gap-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{translate('common.print')}</span>
              </button>
              <button
                onClick={() => setReceiptDoc(null)}
                className="px-4 py-1.5 bg-gray-200 text-gray-800 rounded font-sans font-semibold text-xs"
              >
                {translate('common.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
