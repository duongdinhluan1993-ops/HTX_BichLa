import React, { useState } from 'react';
import {
  Tractor,
  Calendar,
  Layers,
  FileSpreadsheet,
  CheckCircle2,
  DollarSign,
  Play
} from 'lucide-react';
import { FixedAsset } from '../../types/erp';
import { AccountingEngine } from '../../services/accountingEngine';

interface FixedAssetsViewProps {
  assets: FixedAsset[];
  onDepreciate: () => void;
}

export const FixedAssetsView: React.FC<FixedAssetsViewProps> = ({ assets, onDepreciate }) => {
  const totalOriginal = assets.reduce((sum, a) => sum + (a.originalCost || 0), 0);
  const totalAccumulated = assets.reduce((sum, a) => sum + (a.accumulatedDepreciation || 0), 0);
  const totalNetValue = totalOriginal - totalAccumulated;
  const monthlyDepreciation = assets.reduce((sum, a) => sum + (a.monthlyDepreciation || 0), 0);

  const handleRunDepreciation = () => {
    onDepreciate();
    alert(`Đã thực hiện trích khấu hao TSCĐ tháng 03/2026 tổng số tiền ${AccountingEngine.formatVND(monthlyDepreciation)}! Định khoản tự động Nợ 6274, 6424 / Có 2141.`);
  };

  return (
    <div className="space-y-5">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Nguyên giá TSCĐ hữu hình (TK 211)</span>
            <Tractor className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xl font-extrabold text-slate-900">
            {AccountingEngine.formatVND(totalOriginal)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Trạm bơm, máy cày, máy gặt, kho</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Hao mòn lũy kế (TK 214)</span>
            <span className="p-1 rounded bg-rose-50 text-rose-600 text-xs font-bold">214</span>
          </div>
          <p className="text-xl font-bold text-rose-700">
            {AccountingEngine.formatVND(totalAccumulated)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Đã trích theo phương pháp đường thẳng</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Giá trị còn lại của TSCĐ</span>
            <span className="p-1 rounded bg-blue-50 text-blue-600 text-xs font-bold">Ròng</span>
          </div>
          <p className="text-xl font-extrabold text-blue-800">
            {AccountingEngine.formatVND(totalNetValue)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Tài sản phục vụ sản xuất HTX</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Mức trích khấu hao hàng tháng</span>
            <Calendar className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-xl font-bold text-amber-700">
            {AccountingEngine.formatVND(monthlyDepreciation)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Phân bổ chi phí thủy nông, làm đất</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              SỔ THEO DÕI TÀI SẢN CỐ ĐỊNH & CÔNG CỤ DỤNG CỤ
            </h3>
            <p className="text-xs text-slate-500">
              Quản lý trạm bơm điện, máy móc cơ giới hóa nông nghiệp HTX Bích La
            </p>
          </div>

          <button
            onClick={handleRunDepreciation}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Chạy trích khấu hao tháng 03/2026</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto max-h-[500px]">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 sticky top-0">
              <tr>
                <th className="py-2.5 px-3">Mã TSCĐ</th>
                <th className="py-2.5 px-3 min-w-[200px]">Tên tài sản cố định</th>
                <th className="py-2.5 px-3 text-center">Năm SD</th>
                <th className="py-2.5 px-3 text-center">Thời gian KH</th>
                <th className="py-2.5 px-3 text-right">Nguyên giá (TK 211)</th>
                <th className="py-2.5 px-3 text-right">Hao mòn lũy kế (214)</th>
                <th className="py-2.5 px-3 text-right">Giá trị còn lại</th>
                <th className="py-2.5 px-3 text-right">Khấu hao / tháng</th>
                <th className="py-2.5 px-3 text-center">Bộ phận sử dụng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {assets.map((a) => {
                const net = (a.originalCost || 0) - (a.accumulatedDepreciation || 0);
                return (
                  <tr key={a.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-emerald-700">{a.code}</td>
                    <td className="py-2.5 px-3 font-sans font-semibold text-slate-900">{a.name}</td>
                    <td className="py-2.5 px-3 text-center text-slate-600">{a.startDate}</td>
                    <td className="py-2.5 px-3 text-center text-slate-600">{Math.round((a.depreciationMonths || 60) / 12)} năm</td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                      {AccountingEngine.formatNumber(a.originalCost)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-rose-700">
                      {AccountingEngine.formatNumber(a.accumulatedDepreciation)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-blue-800">
                      {AccountingEngine.formatNumber(net)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-amber-700 font-semibold">
                      {AccountingEngine.formatNumber(a.monthlyDepreciation)}
                    </td>
                    <td className="py-2.5 px-3 text-center font-sans text-slate-700">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-semibold">
                        {a.usageDepartment}
                      </span>
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
