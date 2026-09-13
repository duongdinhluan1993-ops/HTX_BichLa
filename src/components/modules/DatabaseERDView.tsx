import React, { useState } from 'react';
import {
  Database,
  Download,
  Copy,
  Check,
  Search,
  Table as TableIcon,
  Layers,
  Key,
  ShieldCheck,
  Code
} from 'lucide-react';
import { ERP_SCHEMA_GROUPS, POSTGRES_DDL_FULL } from '../../data/schema100Tables';

export const DatabaseERDView: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState(ERP_SCHEMA_GROUPS[0].id);
  const [selectedTable, setSelectedTable] = useState(ERP_SCHEMA_GROUPS[0].tables[0]);
  const [searchTable, setSearchTable] = useState('');
  const [copied, setCopied] = useState(false);

  const activeGroup = ERP_SCHEMA_GROUPS.find((g) => g.id === selectedGroup) || ERP_SCHEMA_GROUPS[0];

  const totalTablesCount = ERP_SCHEMA_GROUPS.reduce((acc, g) => acc + g.tables.length, 0);

  const handleCopySQL = () => {
    navigator.clipboard.writeText(POSTGRES_DDL_FULL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadSQL = () => {
    const blob = new Blob([POSTGRES_DDL_FULL], { type: 'text/sql;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'htx_bichla_erp_postgres_100_tables.sql');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-6 rounded-2xl text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-300 text-xs font-semibold">
              Kiến trúc Cơ sở dữ liệu Chuẩn Doanh nghiệp
            </span>
            <span className="text-xs text-slate-300">PostgreSQL 16 Enterprise</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">
            Thiết Kế CSDL ERP 100+ Bảng HTX Nông Nghiệp Bích La
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Cấu trúc cơ sở dữ liệu quan hệ chuẩn 3NF bao quát toàn diện quy trình Kế toán TT 71, Tín dụng nội bộ, Quản lý 168 xã viên, Kho vật tư, Vụ mùa nông nghiệp và Phân quyền RBAC.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySQL}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-all border border-white/20 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Đã sao chép DDL' : 'Copy SQL Script'}</span>
          </button>
          <button
            onClick={handleDownloadSQL}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Tải file .SQL (100+ Bảng)</span>
          </button>
        </div>
      </div>

      {/* Schema Navigation: 7 Groups */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {ERP_SCHEMA_GROUPS.map((g) => {
          const isActive = g.id === selectedGroup;
          return (
            <button
              key={g.id}
              onClick={() => {
                setSelectedGroup(g.id);
                setSelectedTable(g.tables[0]);
              }}
              className={`p-3 rounded-xl text-left transition-all border cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <p className="text-[11px] font-bold truncate">{g.name}</p>
              <p className={`text-[10px] mt-0.5 ${isActive ? 'text-indigo-200' : 'text-slate-400'}`}>
                {g.tables.length} bảng dữ liệu
              </p>
            </button>
          );
        })}
      </div>

      {/* Explorer: Left Table List, Right Columns Detail */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Left: Tables List in Group */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide flex items-center gap-1.5">
              <TableIcon className="w-4 h-4 text-indigo-600" />
              <span>Danh sách bảng ({activeGroup.tables.length})</span>
            </h4>
            <span className="text-[10px] font-mono text-slate-400">Total: {totalTablesCount} tables</span>
          </div>

          <div className="mt-3 divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
            {activeGroup.tables.map((tbl) => {
              const isSelected = selectedTable.tableName === tbl.tableName;
              return (
                <button
                  key={tbl.tableName}
                  onClick={() => setSelectedTable(tbl)}
                  className={`w-full text-left py-2.5 px-3 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                    isSelected ? 'bg-indigo-50 text-indigo-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <p className="font-mono text-xs truncate">{tbl.tableName}</p>
                    <p className="text-[11px] text-slate-500 font-sans truncate">{tbl.description}</p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">
                    {tbl.columns.length} cols
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Table Schema Details */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-mono font-bold text-indigo-800 text-base">
                    {selectedTable.tableName}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    PostgreSQL Table
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">{selectedTable.description}</p>
              </div>

              <div className="text-right text-xs text-slate-500">
                <span>Nhóm: </span>
                <strong className="text-slate-800">{activeGroup.name}</strong>
              </div>
            </div>

            {/* Columns Table */}
            <div className="mt-4 overflow-x-auto max-h-[420px]">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 sticky top-0">
                  <tr>
                    <th className="py-2.5 px-3">Tên cột (Field)</th>
                    <th className="py-2.5 px-3">Kiểu dữ liệu</th>
                    <th className="py-2.5 px-3 text-center">Khóa / Ràng buộc</th>
                    <th className="py-2.5 px-3">Mô tả nghiệp vụ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {selectedTable.columns.map((col, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-bold text-slate-900 flex items-center gap-1.5">
                        {col.isPk && <Key className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                        <span>{col.name}</span>
                      </td>
                      <td className="py-2 px-3 text-indigo-700 font-semibold">{col.type}</td>
                      <td className="py-2 px-3 text-center">
                        {col.isPk ? (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            PRIMARY KEY
                          </span>
                        ) : col.nullable === false ? (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-slate-100 text-slate-600">
                            NOT NULL
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[10px]">NULL</span>
                        )}
                      </td>
                      <td className="py-2 px-3 font-sans text-slate-600">{col.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Đầy đủ ràng buộc Foreign Key (FK), Indexes, và Audit Timestamp (created_at, updated_at).</span>
            <span className="text-indigo-700 font-bold">Chuẩn hóa 3NF</span>
          </div>
        </div>
      </div>
    </div>
  );
};
