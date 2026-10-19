import React, { useState, useEffect, useRef } from 'react';
import { 
  FileSpreadsheet, Printer, Download, Filter, Search, 
  ArrowUpDown, ChevronDown, RefreshCw, ZoomIn, ZoomOut,
  SlidersHorizontal, Check, Eye, EyeOff, X 
} from 'lucide-react';

export type ExcelThemeColor = 
  | 'blueGray'     // Invoices: White + #E2E8F0
  | 'emerald'      // Journals: White + #DCFCE7 / #ECFDF5
  | 'amber'        // Materials: White + #FEF3C7
  | 'indigo'       // Accounts: White + #E0E7FF
  | 'violet'       // Cheques: White + #EDE9FE
  | 'rose'         // Financial Analysis: White + #FFE4E6
  | 'teal'         // POS: White + #CCFBF1
  | 'yellow'       // Currencies: White + #FEF9C3
  | 'orange'       // Orders: White + #FFEDD5
  | 'fuchsia'      // CRM: White + #FDF2F8
  | 'stone'        // Warehouses: White + #E7E5E4
  | 'cyan'         // Banks: White + #CFFAFE
  | 'red'          // Security / Audit: White + #FEE2E2
  | 'bronze';      // Manufacturing: White + #E4E4E7

export interface ExcelColumn<T> {
  key: string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  defaultVisible?: boolean;
}

interface ExcelScheduleProps<T> {
  title?: string;
  sheetName?: string;
  themeColor: ExcelThemeColor;
  columns: ExcelColumn<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string | number;
  onRowClick?: (row: T) => void;
  selectedRowKey?: string | number | null;
  showToolbar?: boolean;
  showRowNumbers?: boolean;
  showExcelLetters?: boolean;
  summaryRow?: React.ReactNode;
  searchPlaceholder?: string;
  emptyMessage?: string;
}

const THEME_CLASSES: Record<ExcelThemeColor, { altBg: string; activeRow: string; headerAccent: string; badge: string; cellBorder: string }> = {
  blueGray: {
    altBg: 'bg-[#E2E8F0]', // Crisp blue-gray
    activeRow: 'bg-[#CBD5E1]',
    headerAccent: 'bg-[#334155] text-white',
    badge: 'bg-slate-200 text-slate-800',
    cellBorder: 'border-blue-600'
  },
  emerald: {
    altBg: 'bg-[#DCFCE7]', // Mint / emerald
    activeRow: 'bg-[#BBF7D0]',
    headerAccent: 'bg-[#065F46] text-white',
    badge: 'bg-emerald-100 text-emerald-800',
    cellBorder: 'border-emerald-600'
  },
  amber: {
    altBg: 'bg-[#FEF3C7]', // Amber / warm gold
    activeRow: 'bg-[#FDE68A]',
    headerAccent: 'bg-[#92400E] text-white',
    badge: 'bg-amber-100 text-amber-900',
    cellBorder: 'border-amber-600'
  },
  indigo: {
    altBg: 'bg-[#E0E7FF]', // Indigo / Slate blue
    activeRow: 'bg-[#C7D2FE]',
    headerAccent: 'bg-[#3730A3] text-white',
    badge: 'bg-indigo-100 text-indigo-900',
    cellBorder: 'border-indigo-600'
  },
  violet: {
    altBg: 'bg-[#EDE9FE]', // Violet / purple-gray
    activeRow: 'bg-[#DDD6FE]',
    headerAccent: 'bg-[#5B21B6] text-white',
    badge: 'bg-purple-100 text-purple-900',
    cellBorder: 'border-purple-600'
  },
  rose: {
    altBg: 'bg-[#FFE4E6]', // Rose / soft salmon
    activeRow: 'bg-[#FECDD3]',
    headerAccent: 'bg-[#9F1239] text-white',
    badge: 'bg-rose-100 text-rose-900',
    cellBorder: 'border-rose-600'
  },
  teal: {
    altBg: 'bg-[#CCFBF1]', // Teal / Aqua
    activeRow: 'bg-[#99F6E4]',
    headerAccent: 'bg-[#115E59] text-white',
    badge: 'bg-teal-100 text-teal-900',
    cellBorder: 'border-teal-600'
  },
  yellow: {
    altBg: 'bg-[#FEF9C3]', // Bright yellow / gold
    activeRow: 'bg-[#FEF08A]',
    headerAccent: 'bg-[#854D0E] text-white',
    badge: 'bg-yellow-100 text-yellow-900',
    cellBorder: 'border-yellow-600'
  },
  orange: {
    altBg: 'bg-[#FFEDD5]', // Peach / orange-gray
    activeRow: 'bg-[#FED7AA]',
    headerAccent: 'bg-[#9A3412] text-white',
    badge: 'bg-orange-100 text-orange-900',
    cellBorder: 'border-orange-600'
  },
  fuchsia: {
    altBg: 'bg-[#FDF2F8]', // Fuchsia / pink-gray
    activeRow: 'bg-[#FCE7F3]',
    headerAccent: 'bg-[#831843] text-white',
    badge: 'bg-pink-100 text-pink-900',
    cellBorder: 'border-pink-600'
  },
  stone: {
    altBg: 'bg-[#E7E5E4]', // Warm stone / steel
    activeRow: 'bg-[#D6D3D1]',
    headerAccent: 'bg-[#44403C] text-white',
    badge: 'bg-stone-200 text-stone-800',
    cellBorder: 'border-stone-600'
  },
  cyan: {
    altBg: 'bg-[#CFFAFE]', // Sky cyan
    activeRow: 'bg-[#A5F3FC]',
    headerAccent: 'bg-[#155E75] text-white',
    badge: 'bg-cyan-100 text-cyan-900',
    cellBorder: 'border-cyan-600'
  },
  red: {
    altBg: 'bg-[#FEE2E2]', // Light crimson / red
    activeRow: 'bg-[#FECACA]',
    headerAccent: 'bg-[#991B1B] text-white',
    badge: 'bg-red-100 text-red-900',
    cellBorder: 'border-red-600'
  },
  bronze: {
    altBg: 'bg-[#E4E4E7]', // Bronze zinc
    activeRow: 'bg-[#D4D4D8]',
    headerAccent: 'bg-[#3F3F46] text-white',
    badge: 'bg-zinc-200 text-zinc-900',
    cellBorder: 'border-zinc-600'
  }
};

const EXCEL_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export function ExcelSchedule<T>({
  title,
  sheetName = 'Sheet1',
  themeColor,
  columns,
  data,
  keyExtractor,
  onRowClick,
  selectedRowKey,
  showToolbar = true,
  showRowNumbers = true,
  showExcelLetters = true,
  summaryRow,
  searchPlaceholder = 'بحث سريع في الجدول (Excel Filter)...',
  emptyMessage = 'لا توجد بيانات مطابقة في هذا الجدول'
}: ExcelScheduleProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);

  // Column Visibility Controller State
  const [visibleColsMap, setVisibleColsMap] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    columns.forEach(c => {
      init[c.key] = c.defaultVisible !== false;
    });
    return init;
  });
  const [showColChooser, setShowColChooser] = useState(false);
  const colChooserRef = useRef<HTMLDivElement>(null);

  // Keyboard Navigation: Enter moves horizontally cell-by-cell!
  const [activeCell, setActiveCell] = useState<{ rowIdx: number; colIdx: number } | null>({ rowIdx: 0, colIdx: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const theme = THEME_CLASSES[themeColor] || THEME_CLASSES.blueGray;

  // Filter visible columns
  const visibleColumns = React.useMemo(() => {
    return columns.filter(c => visibleColsMap[c.key] !== false);
  }, [columns, visibleColsMap]);

  // Filter Data
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data;
    const term = searchTerm.toLowerCase();
    return data.filter((row: any) => {
      return Object.values(row).some(val => 
        String(val ?? '').toLowerCase().includes(term)
      );
    });
  }, [data, searchTerm]);

  // Sort Data
  const sortedData = React.useMemo(() => {
    if (!sortCol) return filteredData;
    return [...filteredData].sort((a: any, b: any) => {
      const vA = a[sortCol];
      const vB = b[sortCol];
      if (vA == null) return 1;
      if (vB == null) return -1;
      if (typeof vA === 'number' && typeof vB === 'number') {
        return sortAsc ? vA - vB : vB - vA;
      }
      return sortAsc 
        ? String(vA).localeCompare(String(vB)) 
        : String(vB).localeCompare(String(vA));
    });
  }, [filteredData, sortCol, sortAsc]);

  // Handle outside click for column chooser
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (colChooserRef.current && !colChooserRef.current.contains(e.target as Node)) {
        setShowColChooser(false);
      }
    };
    if (showColChooser) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColChooser]);

  // Keyboard Navigation: ENTER moves horizontally cell by cell
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (sortedData.length === 0 || visibleColumns.length === 0) return;

    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      const isShift = e.shiftKey;
      setActiveCell(prev => {
        if (!prev) return { rowIdx: 0, colIdx: 0 };
        const numCols = visibleColumns.length;
        const numRows = sortedData.length;

        if (!isShift) {
          // Move Horizontally to Next Cell
          let nextCol = prev.colIdx + 1;
          let nextRow = prev.rowIdx;
          if (nextCol >= numCols) {
            nextCol = 0;
            nextRow = (nextRow + 1) % numRows;
          }
          return { rowIdx: nextRow, colIdx: nextCol };
        } else {
          // Move Horizontally to Previous Cell (Shift+Enter or Shift+Tab)
          let prevCol = prev.colIdx - 1;
          let prevRow = prev.rowIdx;
          if (prevCol < 0) {
            prevCol = numCols - 1;
            prevRow = prevRow > 0 ? prevRow - 1 : numRows - 1;
          }
          return { rowIdx: prevRow, colIdx: prevCol };
        }
      });
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setActiveCell(prev => {
        if (!prev) return { rowIdx: 0, colIdx: 0 };
        const isRtl = document.documentElement.dir === 'rtl';
        const delta = isRtl ? -1 : 1;
        const nextCol = Math.max(0, Math.min(visibleColumns.length - 1, prev.colIdx + delta));
        return { ...prev, colIdx: nextCol };
      });
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setActiveCell(prev => {
        if (!prev) return { rowIdx: 0, colIdx: 0 };
        const isRtl = document.documentElement.dir === 'rtl';
        const delta = isRtl ? 1 : -1;
        const nextCol = Math.max(0, Math.min(visibleColumns.length - 1, prev.colIdx + delta));
        return { ...prev, colIdx: nextCol };
      });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveCell(prev => {
        if (!prev) return { rowIdx: 0, colIdx: 0 };
        return { ...prev, rowIdx: Math.min(sortedData.length - 1, prev.rowIdx + 1) };
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveCell(prev => {
        if (!prev) return { rowIdx: 0, colIdx: 0 };
        return { ...prev, rowIdx: Math.max(0, prev.rowIdx - 1) };
      });
    }
  };

  const handleSort = (colKey: string) => {
    if (sortCol === colKey) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(colKey);
      setSortAsc(true);
    }
  };

  const toggleColumn = (key: string) => {
    setVisibleColsMap(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const selectAllColumns = () => {
    const all: Record<string, boolean> = {};
    columns.forEach(c => (all[c.key] = true));
    setVisibleColsMap(all);
  };

  const resetColumns = () => {
    const init: Record<string, boolean> = {};
    columns.forEach(c => {
      init[c.key] = c.defaultVisible !== false;
    });
    setVisibleColsMap(init);
  };

  const handleExportCSV = () => {
    if (sortedData.length === 0) return;
    const headers = visibleColumns.map(c => `"${c.header}"`).join(',');
    const rows = sortedData.map((row: any) => {
      return visibleColumns.map(c => {
        const val = row[c.key] ?? '';
        return `"${String(val).replace(/"/g, '""')}"`;
      }).join(',');
    });
    const csvContent = '\uFEFF' + [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${sheetName}_export_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="flex flex-col h-full w-full bg-[#FFFFFF] text-gray-900 border border-[#CBD5E1] rounded-lg shadow-sm overflow-hidden select-none font-sans focus:outline-none focus:ring-1 focus:ring-blue-500/50"
    >
      {/* 1. Excel Ribbon / Spreadsheet Top Bar */}
      {showToolbar && (
        <div className="bg-[#F1F5F9] border-b border-[#CBD5E1] px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-white border border-[#CBD5E1] rounded font-semibold text-gray-700 shadow-xs">
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>{title || sheetName}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-gray-200 text-gray-600">
                {sortedData.length} صفوف · {visibleColumns.length} أعمدة
              </span>
            </div>

            {/* Quick Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute start-2 top-2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder={searchPlaceholder}
                className="ps-7 pe-3 py-1 text-xs bg-white border border-[#CBD5E1] rounded text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 w-52"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute end-1.5 top-1 text-gray-400 hover:text-gray-600 text-xs px-1"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Excel Toolbar Actions & Column Chooser */}
          <div className="flex items-center gap-1 relative">
            {/* Small button at the end to control column appearance */}
            <button
              onClick={() => setShowColChooser(!showColChooser)}
              className={`flex items-center gap-1 px-2.5 py-1 border rounded text-xs font-semibold transition-colors shadow-xs ${
                showColChooser ? 'bg-blue-600 text-white border-blue-700' : 'bg-white hover:bg-gray-100 border-[#CBD5E1] text-gray-700'
              }`}
              title="التحكم في ظهور الأعمدة (Column Visibility Chooser)"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
              <span>الأعمدة</span>
              <span className="text-[10px] px-1 rounded bg-gray-200 text-gray-700 font-mono">
                {visibleColumns.length}/{columns.length}
              </span>
            </button>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-gray-100 border border-[#CBD5E1] rounded text-gray-700 font-medium transition-colors"
              title="تصدير كملف إكسل CSV"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              <span>تصدير Excel</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-gray-100 border border-[#CBD5E1] rounded text-gray-700 font-medium transition-colors"
              title="طباعة الجدول"
            >
              <Printer className="w-3.5 h-3.5 text-blue-700" />
              <span>طباعة</span>
            </button>
            <div className="h-4 w-[1px] bg-[#CBD5E1] mx-1" />
            <button
              onClick={() => setZoomLevel(prev => Math.max(80, prev - 10))}
              className="p-1 hover:bg-gray-200 rounded text-gray-600"
              title="تصغير"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono text-gray-500 min-w-[32px] text-center">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel(prev => Math.min(130, prev + 10))}
              className="p-1 hover:bg-gray-200 rounded text-gray-600"
              title="تكبير"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            {/* Column Appearance Popover Dropdown */}
            {showColChooser && (
              <div 
                ref={colChooserRef}
                className="absolute end-0 top-9 w-64 bg-white border border-[#CBD5E1] rounded-xl shadow-2xl z-50 p-3 text-xs animate-scale-up"
              >
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2 mb-2">
                  <div className="flex items-center gap-1.5 font-bold text-gray-800">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
                    <span>تخصيص ظهور الأعمدة</span>
                  </div>
                  <button 
                    onClick={() => setShowColChooser(false)}
                    className="p-1 text-gray-400 hover:text-gray-700 rounded"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] mb-2 text-blue-600 font-semibold">
                  <button onClick={selectAllColumns} className="hover:underline">إظهار الكل</button>
                  <button onClick={resetColumns} className="hover:underline text-gray-500">إعادة ضبط</button>
                </div>

                <div className="max-h-60 overflow-y-auto space-y-1 pe-1 divide-y divide-gray-100">
                  {columns.map(col => {
                    const isVisible = visibleColsMap[col.key] !== false;
                    return (
                      <label
                        key={col.key}
                        className="flex items-center justify-between py-1.5 px-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isVisible}
                            onChange={() => toggleColumn(col.key)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className={`text-xs ${isVisible ? 'text-gray-900 font-medium' : 'text-gray-400 line-through'}`}>
                            {col.header}
                          </span>
                        </div>
                        {isVisible ? (
                          <Eye className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <EyeOff className="w-3 h-3 text-gray-400" />
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Excel Formula Bar Style Indicator & Keyboard Enter Navigation Hint */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-3 py-1 flex items-center justify-between text-[11px] text-gray-600">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold bg-[#E2E8F0] px-1.5 py-0.5 rounded text-gray-700 border border-[#CBD5E1]">
            fx
          </span>
          <div className="h-4 w-[1px] bg-gray-300" />
          <span className="text-gray-700 font-mono text-[10px]">
            خلية نشطة: [صف {activeCell ? activeCell.rowIdx + 1 : 1} ، عمود {activeCell ? visibleColumns[activeCell.colIdx]?.header : ''}]
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
          <span className="px-1.5 py-0.5 bg-gray-200 text-gray-700 rounded font-bold border border-gray-300">Enter / Tab</span>
          <span>ينتقل أفقياً خلية بعد خلية</span>
          <span className="text-gray-300">|</span>
          <span className="px-1.5 py-0.5 bg-gray-200 text-gray-700 rounded font-bold border border-gray-300">Shift+Enter</span>
          <span>للرجوع للخلف</span>
        </div>
      </div>

      {/* 3. The Spreadsheet Grid */}
      <div className="flex-1 overflow-auto bg-white" style={{ fontSize: `${(zoomLevel / 100) * 12}px` }}>
        <table className="w-full border-collapse text-right border-spacing-0">
          <thead>
            {/* Excel column letters A, B, C, D */}
            {showExcelLetters && (
              <tr className="bg-[#E2E8F0] text-gray-600 text-[10px] font-mono select-none">
                {showRowNumbers && (
                  <th className="w-10 px-1 py-0.5 text-center border-e border-b border-[#CBD5E1] bg-[#CBD5E1] font-bold">
                    #
                  </th>
                )}
                {visibleColumns.map((col, idx) => (
                  <th
                    key={`letter-${col.key}`}
                    style={{ width: col.width }}
                    className="px-2 py-0.5 text-center border-e border-b border-[#CBD5E1] text-gray-600 font-semibold"
                  >
                    {EXCEL_LETTERS[idx % EXCEL_LETTERS.length]}
                  </th>
                ))}
                {/* Column control header stub */}
                <th className="w-8 px-1 py-0.5 text-center border-b border-[#CBD5E1] bg-[#CBD5E1]">
                  ⚙
                </th>
              </tr>
            )}

            {/* Official Column Headers with Excel gradient styling */}
            <tr className="bg-gradient-to-b from-[#F1F5F9] to-[#E2E8F0] text-gray-800 font-bold border-b-2 border-[#94A3B8] shadow-xs select-none sticky top-0 z-10">
              {showRowNumbers && (
                <th className="w-10 px-2 py-2 text-center border-e border-[#CBD5E1] bg-[#E2E8F0] text-gray-600 font-mono text-[11px]">
                  #
                </th>
              )}
              {visibleColumns.map((col, colIdx) => {
                const isCurrentSort = sortCol === col.key;
                return (
                  <th
                    key={col.key}
                    style={{ width: col.width }}
                    onClick={() => col.sortable !== false && handleSort(col.key)}
                    className={`px-3 py-2 border-e border-[#CBD5E1] text-xs font-bold text-gray-800 transition-colors ${
                      col.sortable !== false ? 'cursor-pointer hover:bg-[#CBD5E1]' : ''
                    } ${
                      col.align === 'center' ? 'text-center' : col.align === 'left' ? 'text-left' : 'text-right'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span>{col.header}</span>
                      {col.sortable !== false && (
                        <ArrowUpDown className={`w-3 h-3 ${isCurrentSort ? 'text-blue-600 font-bold' : 'text-gray-400 opacity-60'}`} />
                      )}
                    </div>
                  </th>
                );
              })}
              {/* Small button at the end to control column appearance */}
              <th className="w-8 px-1 py-1 text-center bg-[#E2E8F0]">
                <button
                  onClick={() => setShowColChooser(prev => !prev)}
                  className="p-1 hover:bg-[#CBD5E1] rounded text-gray-600 transition-colors"
                  title="التحكم في ظهور الأعمدة"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-blue-700" />
                </button>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#CBD5E1]">
            {sortedData.length === 0 ? (
              <tr>
                <td 
                  colSpan={visibleColumns.length + (showRowNumbers ? 1 : 0) + 1} 
                  className="py-12 text-center text-gray-500 bg-white"
                >
                  <FileSpreadsheet className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-xs font-semibold">{emptyMessage}</p>
                </td>
              </tr>
            ) : (
              sortedData.map((row, rowIdx) => {
                const key = keyExtractor(row, rowIdx);
                const isSelected = selectedRowKey === key;
                
                // Authentic Excel 2-Color Alternating Zebra Stripe:
                // Row 1 (even index): Pure White (#FFFFFF)
                // Row 2 (odd index): The specific Window's custom alternating color (theme.altBg)
                const isOdd = rowIdx % 2 === 1;
                const rowBgClass = isSelected 
                  ? theme.activeRow 
                  : isOdd 
                    ? theme.altBg 
                    : 'bg-[#FFFFFF]';

                return (
                  <tr
                    key={key}
                    onClick={() => {
                      if (onRowClick) onRowClick(row);
                    }}
                    className={`${rowBgClass} hover:brightness-95 transition-all text-gray-900 border-b border-[#CBD5E1] ${
                      onRowClick ? 'cursor-pointer' : ''
                    }`}
                  >
                    {/* Excel Row Number Index (1, 2, 3...) */}
                    {showRowNumbers && (
                      <td className="w-10 px-1 py-1.5 text-center border-e border-[#CBD5E1] bg-[#F1F5F9] text-gray-500 font-mono text-[10px] select-none font-bold">
                        {rowIdx + 1}
                      </td>
                    )}

                    {visibleColumns.map((col, colIdx) => {
                      const isCellFocused = activeCell?.rowIdx === rowIdx && activeCell?.colIdx === colIdx;
                      const content = col.render 
                        ? col.render(row, rowIdx) 
                        : (row as any)[col.key] ?? '—';

                      return (
                        <td
                          key={col.key}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCell({ rowIdx, colIdx });
                            if (onRowClick) onRowClick(row);
                          }}
                          className={`px-3 py-1.5 border-e border-[#CBD5E1] text-xs font-normal text-gray-800 leading-tight transition-all relative ${
                            col.align === 'center' ? 'text-center' : col.align === 'left' ? 'text-left font-mono' : 'text-right'
                          } ${
                            isCellFocused 
                              ? 'outline-2 outline-emerald-600 outline-offset-[-2px] bg-blue-100/40 z-10 font-medium' 
                              : ''
                          }`}
                        >
                          {content}
                          {isCellFocused && (
                            <div className="absolute bottom-0 end-0 w-1.5 h-1.5 bg-emerald-600 pointer-events-none" />
                          )}
                        </td>
                      );
                    })}

                    {/* End row stub */}
                    <td className="w-8 px-1 py-1 text-center bg-transparent border-b border-[#CBD5E1]"></td>
                  </tr>
                );
              })
            )}
          </tbody>

          {/* Optional Excel Totals Summary Row */}
          {summaryRow && (
            <tfoot className="sticky bottom-0 bg-[#F1F5F9] border-t-2 border-[#94A3B8] font-bold text-gray-900 shadow-md">
              {summaryRow}
            </tfoot>
          )}
        </table>
      </div>

      {/* 4. Excel Sheet Tab Bar at Bottom (like authentic Excel tabs) */}
      <div className="bg-[#E2E8F0] border-t border-[#CBD5E1] px-3 py-1 flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <div className="px-3 py-1 bg-white border-t-2 border-emerald-600 text-gray-800 font-bold rounded-t text-[11px] shadow-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{sheetName}</span>
          </div>
          <span className="text-[10px] text-gray-500 ms-2 font-mono">
            النمط اللوني للمجدول: <span className="font-bold text-gray-700">{themeColor}</span> (أبيض + لون النافذة الخاص)
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-gray-500 font-mono">
          <span>العدد: {sortedData.length}</span>
          <span>جاهز 100%</span>
        </div>
      </div>
    </div>
  );
}
