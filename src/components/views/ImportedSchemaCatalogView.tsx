import React, { useMemo, useState } from 'react';
import { Database, Search, Table2, AlertTriangle } from 'lucide-react';
import { IMPORTED_SCHEMA_CATALOG } from '../../database/importedSchemaCatalog';

export const ImportedSchemaCatalogView: React.FC = () => {
  const [schema, setSchema] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedName, setSelectedName] = useState(IMPORTED_SCHEMA_CATALOG[0]?.tableName ?? '');

  const filtered = useMemo(() => IMPORTED_SCHEMA_CATALOG.filter(item => {
    const schemaMatches = schema === 'all' || item.schema === schema;
    const term = query.trim().toLocaleLowerCase();
    const textMatches = !term || item.tableName.toLocaleLowerCase().includes(term) ||
      item.titleAr.toLocaleLowerCase().includes(term) ||
      item.columns.some(column => column.toLocaleLowerCase().includes(term));
    return schemaMatches && textMatches;
  }), [schema, query]);

  const selected = filtered.find(item => item.tableName === selectedName) ?? filtered[0];

  return <div className="flex h-full min-h-0 flex-col gap-3 overflow-hidden bg-[#1e1e1e] p-4 text-white">
    <header className="flex items-center gap-3 border-b border-[#383838] pb-3">
      <Database className="h-6 w-6 text-sky-400" />
      <div>
        <h2 className="text-sm font-bold">كتالوج مخطط قاعدة البيانات المستورد</h2>
        <p className="text-xs text-gray-400">مرجع تصميم من المشروع الثاني — ليس فحصًا مباشرًا لقاعدة البيانات</p>
      </div>
    </header>
    <div className="flex items-start gap-2 rounded border border-amber-700/60 bg-amber-950/30 p-3 text-xs text-amber-200">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
      <p>أسماء الجداول والحقول هنا مستوردة للمراجعة فقط. لم يتم التحقق من تطابقها مع migrations أو قاعدة SQLite/PostgreSQL الحالية، ولذلك لا تُستخدم لإنشاء الجداول أو تنفيذ عمليات مالية.</p>
    </div>
    <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-[minmax(220px,0.8fr)_minmax(0,1.4fr)]">
      <section className="flex min-h-0 flex-col overflow-hidden rounded border border-[#383838]">
        <div className="flex gap-2 border-b border-[#383838] p-2">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute start-2 top-2.5 h-3.5 w-3.5 text-gray-500" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="بحث في الجدول أو الحقول" className="w-full rounded border border-[#383838] bg-[#151515] py-2 pe-2 ps-8 text-xs outline-none focus:border-sky-500" />
          </div>
          <select value={schema} onChange={e => setSchema(e.target.value)} className="max-w-28 rounded border border-[#383838] bg-[#151515] px-2 text-xs">
            <option value="all">كل المخططات</option>
            {['fin', 'inv', 'pos', 'crm', 'hr', 'aud', 'ai'].map(value => <option key={value} value={value}>{value}</option>)}
          </select>
        </div>
        <div className="min-h-0 flex-1 overflow-auto">
          {filtered.map(item => <button key={item.tableName} type="button" onClick={() => setSelectedName(item.tableName)} className={'block w-full border-b border-[#303030] p-3 text-start hover:bg-[#292929] ' + ((selected?.tableName === item.tableName) ? 'border-s-2 border-sky-500 bg-sky-950/30' : '')}>
            <span className="block font-mono text-xs text-sky-300">{item.tableName}</span>
            <span className="mt-1 block text-xs">{item.titleAr}</span>
            <span className="mt-1 block text-[10px] text-gray-500">{item.columns.length} حقول موثقة في المصدر</span>
          </button>)}
          {filtered.length === 0 && <p className="p-4 text-xs text-gray-400">لا توجد نتائج مطابقة.</p>}
        </div>
      </section>
      <section className="min-h-0 overflow-auto rounded border border-[#383838] p-4">
        {selected ? <>
          <div className="mb-3 flex items-center gap-2 border-b border-[#383838] pb-3">
            <Table2 className="h-5 w-5 text-sky-400" />
            <div><h3 className="font-mono text-sm font-bold">{selected.tableName}</h3><p className="text-xs text-gray-400">{selected.titleAr} · schema: {selected.schema}</p></div>
          </div>
          <h4 className="mb-2 text-xs font-semibold text-gray-300">أسماء الحقول في المرجع المستورد</h4>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {selected.columns.map((column, index) => <div key={column} className="flex items-center gap-2 rounded border border-[#333] bg-[#171717] px-3 py-2">
              <span className="text-[10px] text-gray-500">{index + 1}</span><code className="break-all text-xs text-emerald-300">{column}</code>
            </div>)}
          </div>
          <p className="mt-4 text-xs leading-5 text-gray-400">نافذة الواجهة المقترحة في المصدر: <code>{selected.windowId}</code>. يلزم مطابقة هذه العلاقة مع مسارات الواجهة الحالية قبل اعتمادها.</p>
        </> : <p className="text-xs text-gray-400">اختر جدولًا لعرض حقوله.</p>}
      </section>
    </div>
  </div>;
};
