import React, { useState } from 'react';
import {
  Wheat,
  Tractor,
  Droplets,
  Calendar,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import { AgricultureSeason } from '../../types/erp';
import { AccountingEngine } from '../../services/accountingEngine';

interface AgricultureSeasonsViewProps {
  seasons: AgricultureSeason[];
}

export const AgricultureSeasonsView: React.FC<AgricultureSeasonsViewProps> = ({ seasons }) => {
  const [activeSeasonId, setActiveSeasonId] = useState(seasons[0]?.id || 'VU-DX-2025-2026');

  const selectedSeason = seasons.find((s) => s.id === activeSeasonId) || seasons[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-200 text-xs font-semibold">
              Kế hoạch sản xuất nông nghiệp
            </span>
            <span className="text-xs text-slate-300">HTX Nông nghiệp Bích La</span>
          </div>
          <h2 className="text-xl font-extrabold">{selectedSeason?.name}</h2>
          <p className="text-xs text-emerald-100/80 mt-1">
            Thời vụ: {selectedSeason?.startDate} đến {selectedSeason?.endDate} • Cây trồng: {selectedSeason?.cropType}
          </p>
        </div>

        {/* Season Selector */}
        <div className="flex items-center gap-2">
          {seasons.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSeasonId(s.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSeasonId === s.id
                  ? 'bg-white text-emerald-950 shadow-md'
                  : 'bg-emerald-950/60 text-emerald-100 hover:bg-emerald-900'
              }`}
            >
              {s.code}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics of Season */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Tổng diện tích quy hoạch</span>
            <Wheat className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xl font-extrabold text-slate-900">{selectedSeason?.totalAreaHa} Hecta</p>
          <p className="text-[11px] text-slate-500 mt-1">Tương đương 2.910 sào ruộng Trung Bộ</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Chi phí đầu tư vụ mùa (TK 154)</span>
            <DollarSign className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-xl font-bold text-slate-900">
            {AccountingEngine.formatVND(selectedSeason?.totalCost || 0)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Giống, phân bón, bơm nước, làm đất</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Doanh thu bao tiêu vụ mùa (TK 511)</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xl font-bold text-emerald-700">
            {AccountingEngine.formatVND(selectedSeason?.actualRevenue || selectedSeason?.estimatedRevenue || 0)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Cung cấp dịch vụ & tiêu thụ thóc</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Tiến độ vụ mùa</span>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-xl font-bold text-blue-700">{selectedSeason?.status}</p>
          <p className="text-[11px] text-slate-500 mt-1">Dự kiến thu hoạch cuối tháng 4/2026</p>
        </div>
      </div>

      {/* Detail Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agricultural Services details */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
          <h3 className="font-bold text-slate-900 text-sm pb-3 border-b border-slate-100 flex items-center justify-between">
            <span>Báo cáo Dịch vụ Hỗ trợ Nông nghiệp Vụ Đông Xuân</span>
            <span className="text-xs text-emerald-700 font-semibold">168/168 Hộ tham gia</span>
          </h3>

          <div className="divide-y divide-slate-100 mt-3 text-xs">
            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Dịch vụ Thủy Nông & Trạm Bơm Điện</p>
                  <p className="text-[11px] text-slate-500">3 tổ máy bơm 1.000m³/h bơm từ sông Thạch Hãn</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900">43.650.000 đ</p>
                <span className="text-[10px] text-emerald-700 font-semibold">Hoàn thành 100% tưới dưỡng</span>
              </div>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
                  <Tractor className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Dịch vụ Làm Đất Cơ Giới Hóa</p>
                  <p className="text-[11px] text-slate-500">Đội máy cày Kubota L5018 của HTX cày ải, bừa lồng</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900">58.200.000 đ</p>
                <span className="text-[10px] text-blue-700 font-semibold">200.000 đ / sào</span>
              </div>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                  <Wheat className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Dịch vụ Cung Ứng Giống Lúa & BVTV</p>
                  <p className="text-[11px] text-slate-500">Giống TBR225 nguyên chủng + phun trừ đạo ôn</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900">125.400.000 đ</p>
                <span className="text-[10px] text-emerald-700 font-semibold">Tín dụng ứng trước 100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Production Target */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm pb-3 border-b border-slate-100">
              Chỉ tiêu Năng suất & Sản lượng
            </h3>

            <div className="mt-4 space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500">Năng suất bình quân dự kiến:</span>
                <p className="text-lg font-bold text-emerald-800 mt-0.5">68.5 Tạ / ha</p>
                <p className="text-[10px] text-slate-500">(Khoảng 340 kg thóc tươi / sào)</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500">Tổng sản lượng thóc thương phẩm:</span>
                <p className="text-lg font-bold text-blue-800 mt-0.5">996.6 Tấn</p>
                <p className="text-[10px] text-slate-500">Đã ký bao tiêu với Doanh nghiệp Lương thực</p>
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-emerald-900">
                <p className="font-bold">Cam kết chất lượng VietGAP</p>
                <p className="text-[10px] mt-0.5 text-emerald-800">
                  Lúa Bích La đạt tiêu chuẩn an toàn thực phẩm, không dư lượng thuốc BVTV.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-right">
            <span className="text-xs text-slate-500">Tổ kỹ thuật nông nghiệp HTX Bích La</span>
          </div>
        </div>
      </div>
    </div>
  );
};
