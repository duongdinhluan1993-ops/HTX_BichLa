import React, { useState } from 'react';
import {
  Wallet,
  Landmark,
  PlusCircle,
  Printer,
  Search,
  CheckCircle2,
  Calendar,
  FileDown,
  ArrowUpRight,
  ArrowDownRight,
  Edit3,
  Trash2
} from 'lucide-react';
import { CashBankVoucher } from '../../types/erp';
import { AccountingEngine } from '../../services/accountingEngine';

interface CashBankViewProps {
  initialType?: 'CASH' | 'BANK';
  vouchers: CashBankVoucher[];
  onOpenCreateVoucher: () => void;
  onSelectVoucherForPrint: (voucher: CashBankVoucher) => void;
  onEditVoucher?: (voucher: CashBankVoucher) => void;
  onDeleteVoucher?: (id: string, voucherNo: string) => void;
}

export const CashBankView: React.FC<CashBankViewProps> = ({
  initialType = 'CASH',
  vouchers,
  onOpenCreateVoucher,
  onSelectVoucherForPrint,
  onEditVoucher,
  onDeleteVoucher
}) => {
  const [filterType, setFilterType] = useState<'ALL' | 'PT' | 'PC' | 'UNC' | 'GBC'>(
    initialType === 'CASH' ? 'ALL' : 'UNC'
  );
  const [searchTerm, setSearchTerm] = useState('');

  const cashVouchers = vouchers.filter((v) => {
    if (initialType === 'CASH') {
      return v.type === 'PT' || v.type === 'PC';
    } else {
      return v.type === 'UNC' || v.type === 'GBC' || v.type === 'GBN';
    }
  });

  const filtered = cashVouchers.filter((v) => {
    const matchType = filterType === 'ALL' || v.type === filterType;
    const matchSearch =
      v.voucherNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.reason.toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchSearch;
  });

  const totalIn = filtered
    .filter((v) => v.type === 'PT' || v.type === 'GBC')
    .reduce((sum, v) => sum + v.amount, 0);

  const totalOut = filtered
    .filter((v) => v.type === 'PC' || v.type === 'UNC' || v.type === 'GBN')
    .reduce((sum, v) => sum + v.amount, 0);

  return (
    <div className="space-y-5">
      {/* Top Metric Cards for Cash/Bank */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>{initialType === 'CASH' ? 'Quỹ Tiền Mặt (TK 1111)' : 'Tiền Gửi Agribank (1121)'}</span>
            <span className="p-1 rounded bg-emerald-50 text-emerald-600">
              {initialType === 'CASH' ? <Wallet className="w-4 h-4" /> : <Landmark className="w-4 h-4" />}
            </span>
          </div>
          <p className="text-xl font-extrabold text-slate-900">
            {AccountingEngine.formatVND(initialType === 'CASH' ? 45000000 + totalIn - totalOut : 380000000 + totalIn - totalOut)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Dư khả dụng tại HTX</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Tổng Thu trong kỳ</span>
            <span className="p-1 rounded bg-emerald-50 text-emerald-600">
              <ArrowDownRight className="w-4 h-4" />
            </span>
          </div>
          <p className="text-xl font-bold text-emerald-700">
            {AccountingEngine.formatVND(totalIn)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Thu tiền bán vật tư & thu nợ</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Tổng Chi trong kỳ</span>
            <span className="p-1 rounded bg-rose-50 text-rose-600">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
          <p className="text-xl font-bold text-rose-700">
            {AccountingEngine.formatVND(totalOut)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Chi mua hàng, chi lương & điện bơm</p>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-sm">
              {initialType === 'CASH' ? 'DANH SÁCH CHỨNG TỪ TIỀN MẶT' : 'CHỨNG TỪ TIỀN GỬI NGÂN HÀNG'}
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
              {filtered.length} chứng từ
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm số CT, đối tượng..."
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <button
              onClick={onOpenCreateVoucher}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Lập chứng từ</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto max-h-[550px]">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 sticky top-0">
              <tr>
                <th className="py-2.5 px-3">Ngày CT</th>
                <th className="py-2.5 px-3">Số chứng từ</th>
                <th className="py-2.5 px-3">Loại</th>
                <th className="py-2.5 px-3 min-w-[160px]">Người nộp / nhận</th>
                <th className="py-2.5 px-3 min-w-[220px]">Nội dung thanh toán</th>
                <th className="py-2.5 px-3 text-center">TK Nợ</th>
                <th className="py-2.5 px-3 text-center">TK Có</th>
                <th className="py-2.5 px-3 text-right">Số tiền (VNĐ)</th>
                <th className="py-2.5 px-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filtered.map((v) => {
                const isReceipt = v.type === 'PT' || v.type === 'GBC';
                return (
                  <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 text-slate-600">{v.date}</td>
                    <td className="py-2.5 px-3 font-bold text-emerald-700">{v.voucherNo}</td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isReceipt
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {v.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-sans font-semibold text-slate-800">
                      {v.partnerName}
                    </td>
                    <td className="py-2.5 px-3 font-sans text-slate-700">{v.reason}</td>
                    <td className="py-2.5 px-3 text-center font-bold text-blue-700">
                      {v.debitAccount}
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold text-amber-700">
                      {v.creditAccount}
                    </td>
                    <td
                      className={`py-2.5 px-3 text-right font-bold ${
                        isReceipt ? 'text-emerald-700' : 'text-slate-900'
                      }`}
                    >
                      {AccountingEngine.formatNumber(v.amount)}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {onEditVoucher && (
                          <button
                            onClick={() => onEditVoucher(v)}
                            className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-emerald-700 hover:text-white hover:bg-emerald-600 rounded-md border border-emerald-300 transition-colors cursor-pointer"
                            title="Sửa chứng từ & hạch toán Nợ/Có"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Sửa</span>
                          </button>
                        )}
                        <button
                          onClick={() => onSelectVoucherForPrint(v)}
                          className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-md border border-slate-200 transition-colors cursor-pointer"
                          title="In phiếu thu / phiếu chi"
                        >
                          <Printer className="w-3 h-3 text-slate-500" />
                          <span>In</span>
                        </button>
                        {onDeleteVoucher && (
                          <button
                            onClick={() => {
                              if (window.confirm(`Xác nhận xóa chứng từ ${v.voucherNo}?`)) {
                                onDeleteVoucher(v.id, v.voucherNo);
                              }
                            }}
                            className="inline-flex items-center px-1.5 py-1 text-[11px] font-semibold text-rose-600 hover:text-white hover:bg-rose-600 rounded-md border border-rose-200 transition-colors cursor-pointer"
                            title="Xóa chứng từ"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
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
