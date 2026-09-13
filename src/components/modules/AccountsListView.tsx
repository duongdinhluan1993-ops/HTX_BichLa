import React, { useState } from 'react';
import { BookOpen, Search, Filter, Layers, CheckCircle2, Download } from 'lucide-react';
import { Account } from '../../types/erp';

interface AccountsListViewProps {
  accounts: Account[];
}

export const AccountsListView: React.FC<AccountsListViewProps> = ({ accounts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<number | 'ALL'>('ALL');
  const [filterNature, setFilterNature] = useState<string>('ALL');

  const filteredAccounts = accounts.filter((a) => {
    const matchSearch =
      a.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.description && a.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchLevel = filterLevel === 'ALL' || a.level === filterLevel;
    const matchNature = filterNature === 'ALL' || a.nature === filterNature;

    return matchSearch && matchLevel && matchNature;
  });

  const natureLabels: Record<string, { label: string; badge: string }> = {
    DEBIT: { label: 'Dư Nợ', badge: 'bg-blue-100 text-blue-800 border-blue-200' },
    CREDIT: { label: 'Dư Có', badge: 'bg-purple-100 text-purple-800 border-purple-200' },
    DUAL: { label: 'Lưỡng tính (Nợ/Có)', badge: 'bg-amber-100 text-amber-800 border-amber-200' }
  };

  return (
    <div className="space-y-5">
      {/* Header banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                Sheet: DM_TK - Hệ Thống Tài Khoản Kế Toán TT71
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                TT 71/2024/TT-BTC
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Danh mục tài khoản chuẩn áp dụng cho Hợp tác xã Nông nghiệp, đầy đủ tài khoản cấp 1 và cấp 2.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const rows = [
                'Số hiệu TK\tTên tài khoản\tCấp TK\tTính chất\tTK Mẹ',
                ...filteredAccounts.map(
                  (a) => `${a.code}\t${a.name}\tCấp ${a.level}\t${a.nature}\t${a.parentCode || ''}`
                )
              ].join('\n');
              navigator.clipboard.writeText(rows);
              alert('Đã sao chép danh sách tài khoản vào Clipboard để dán vào Excel!');
            }}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Copy vào Excel</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto flex-1 max-w-sm">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo số hiệu TK (111, 152...) hoặc tên..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-500 font-medium">Cấp TK:</span>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="ALL">Tất cả cấp</option>
              <option value={1}>Cấp 1 (3 chữ số)</option>
              <option value={2}>Cấp 2 (4 chữ số)</option>
            </select>
          </div>

          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-500 font-medium">Tính chất:</span>
            <select
              value={filterNature}
              onChange={(e) => setFilterNature(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="ALL">Tất cả tính chất</option>
              <option value="DEBIT">Dư Nợ</option>
              <option value="CREDIT">Dư Có</option>
              <option value="DUAL">Lưỡng tính</option>
            </select>
          </div>
        </div>
      </div>

      {/* Account Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold">
            <tr>
              <th className="py-3 px-4 w-32">Số hiệu TK</th>
              <th className="py-3 px-4">Tên tài khoản kế toán</th>
              <th className="py-3 px-3 text-center w-24">Cấp TK</th>
              <th className="py-3 px-3 text-center w-36">Tính chất</th>
              <th className="py-3 px-3 w-28 text-center">TK Mẹ</th>
              <th className="py-3 px-4">Diễn giải & Hướng dẫn HTX</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            {filteredAccounts.map((a) => {
              const isLevel1 = a.level === 1;
              const nat = natureLabels[a.nature] || { label: a.nature, badge: 'bg-slate-100 text-slate-700' };
              return (
                <tr
                  key={a.code}
                  className={`hover:bg-slate-50/90 transition-colors ${
                    isLevel1 ? 'bg-slate-50/40 font-bold' : ''
                  }`}
                >
                  <td className="py-2.5 px-4 font-bold text-emerald-800">
                    <span className={isLevel1 ? 'text-emerald-900 text-sm' : 'pl-4 text-emerald-700'}>
                      {a.code}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 font-sans text-slate-900">
                    <span className={isLevel1 ? 'font-bold' : 'pl-4 text-slate-700'}>{a.name}</span>
                  </td>
                  <td className="py-2.5 px-3 text-center font-sans">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isLevel1 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Cấp {a.level}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center font-sans">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${nat.badge}`}>
                      {nat.label}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold text-slate-600">
                    {a.parentCode || '-'}
                  </td>
                  <td className="py-2.5 px-4 font-sans text-slate-500 text-[11px]">
                    {a.description || '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
