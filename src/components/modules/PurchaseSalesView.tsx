import React, { useState } from 'react';
import {
  ShoppingCart,
  TrendingUp,
  Search,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  PlusCircle
} from 'lucide-react';
import { Partner } from '../../types/erp';
import { AccountingEngine } from '../../services/accountingEngine';

interface PurchaseSalesViewProps {
  partners: Partner[];
  onOpenCreateVoucher: () => void;
}

export const PurchaseSalesView: React.FC<PurchaseSalesViewProps> = ({
  partners,
  onOpenCreateVoucher
}) => {
  const [tab, setTab] = useState<'SALES' | 'PURCHASE' | 'AR' | 'AP'>('AR');
  const [searchTerm, setSearchTerm] = useState('');

  const suppliers = partners.filter((p) => p.type === 'SUPPLIER');
  const customers = partners.filter((p) => p.type === 'CUSTOMER');

  const totalReceivables = customers.reduce((sum, c) => sum + (c.receivableDebt || 0), 0);
  const totalPayables = suppliers.reduce((sum, s) => sum + (s.payableDebt || 0), 0);

  return (
    <div className="space-y-5">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Công nợ phải thu khách hàng (TK 131)</span>
            <span className="p-1 rounded bg-emerald-50 text-emerald-600">
              <ArrowDownRight className="w-4 h-4" />
            </span>
          </div>
          <p className="text-xl font-extrabold text-emerald-800">
            {AccountingEngine.formatVND(totalReceivables)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Bao tiêu thóc & bán vật tư</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Công nợ phải trả nhà cung cấp (TK 331)</span>
            <span className="p-1 rounded bg-rose-50 text-rose-600">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
          <p className="text-xl font-extrabold text-rose-700">
            {AccountingEngine.formatVND(totalPayables)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Cty phân bón Bình Điền, ThaiBinh Seed</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Nhà cung cấp vật tư chính</span>
            <span className="p-1 rounded bg-blue-50 text-blue-600 font-bold text-xs">NCC</span>
          </div>
          <p className="text-xl font-bold text-slate-900">{suppliers.length} Đơn vị</p>
          <p className="text-[11px] text-slate-500 mt-1">Chiết khấu thương mại 4-6%</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Doanh nghiệp bao tiêu lúa</span>
            <span className="p-1 rounded bg-amber-50 text-amber-600 font-bold text-xs">DN</span>
          </div>
          <p className="text-xl font-bold text-slate-900">{customers.length} Đối tác</p>
          <p className="text-[11px] text-slate-500 mt-1">Ký hợp đồng tiêu thụ toàn bộ lúa</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Navigation Tabs */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setTab('AR')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                tab === 'AR'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Phải Thu Khách Hàng (131)
            </button>
            <button
              onClick={() => setTab('AP')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                tab === 'AP'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Phải Trả Nhà Cung Cấp (331)
            </button>
          </div>

          <button
            onClick={onOpenCreateVoucher}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Lập chứng từ Mua / Bán</span>
          </button>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto max-h-[500px]">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 sticky top-0">
              <tr>
                <th className="py-2.5 px-3">Mã đối tượng</th>
                <th className="py-2.5 px-3 min-w-[220px]">Tên đối tác kinh doanh</th>
                <th className="py-2.5 px-3">Mã số thuế / CCCD</th>
                <th className="py-2.5 px-3">Điện thoại</th>
                <th className="py-2.5 px-3 min-w-[200px]">Địa chỉ</th>
                <th className="py-2.5 px-3 text-right font-bold">
                  {tab === 'AR' ? 'Số nợ phải thu (131)' : 'Số nợ phải trả (331)'}
                </th>
                <th className="py-2.5 px-3 text-center">Trạng thái công nợ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {(tab === 'AR' ? customers : suppliers).map((p) => {
                const balance = tab === 'AR' ? (p.receivableDebt || 0) : (p.payableDebt || 0);
                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-emerald-700">{p.code}</td>
                    <td className="py-2.5 px-3 font-sans font-semibold text-slate-900">{p.name}</td>
                    <td className="py-2.5 px-3 text-slate-600">{p.taxCode}</td>
                    <td className="py-2.5 px-3 text-slate-600">{p.phone}</td>
                    <td className="py-2.5 px-3 font-sans text-slate-600">{p.address}</td>
                    <td
                      className={`py-2.5 px-3 text-right font-bold ${
                        tab === 'AR' ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {AccountingEngine.formatNumber(balance)}
                    </td>
                    <td className="py-2.5 px-3 text-center font-sans">
                      {balance > 0 ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          Còn công nợ
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                          Đã thanh toán hết
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
