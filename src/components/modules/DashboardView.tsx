import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Landmark,
  FileText,
  Users,
  BadgePercent,
  Boxes,
  Tractor,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertTriangle,
  Wheat,
  Activity,
  Layers,
  BarChart3,
  FileSpreadsheet,
  ExternalLink
} from 'lucide-react';
import {
  FinancialKPIs,
  AccountingEngine
} from '../../services/accountingEngine';
import { Member, LoanContract, MaterialItem, AgricultureSeason } from '../../types/erp';

interface DashboardViewProps {
  kpis: FinancialKPIs;
  members: Member[];
  loans: LoanContract[];
  materials: MaterialItem[];
  seasons: AgricultureSeason[];
  onNavigateTab: (tab: any) => void;
  onOpenExcelSync?: () => void;
  excelMetrics?: {
    revenue6T: number;
    expense6T: number;
    cashBalance: number;
    bankBalance: number;
  };
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  kpis,
  members,
  loans,
  materials,
  seasons,
  onNavigateTab,
  onOpenExcelSync,
  excelMetrics
}) => {
  // 4 metrics from Excel file
  const rev6T = excelMetrics?.revenue6T ?? kpis.totalRevenueYear;
  const exp6T = excelMetrics?.expense6T ?? kpis.totalExpenseYear;
  const profit6T = rev6T - exp6T;
  const moneyTotal = (excelMetrics?.cashBalance ?? kpis.cashBalance) + (excelMetrics?.bankBalance ?? kpis.bankBalance);

  // 17 Sheets exact definition from AMATAX V6
  const sheetList = [
    { group: 'Tổng quan', name: 'DASHBOARD', desc: 'Dashboard quản trị 4 chỉ số & 20 KPI', tab: 'DASHBOARD' },
    { group: 'Danh mục', name: 'DM_TK', desc: 'Hệ thống tài khoản TT71', tab: 'DM_TK' },
    { group: 'Danh mục', name: 'DM_DOITUONG', desc: 'Khách hàng/NCC/NV/Xã viên', tab: 'DM_DOITUONG' },
    { group: 'Danh mục', name: 'DM_VATTU', desc: 'Vật tư hàng hóa, giống, phân bón', tab: 'DM_VATTU' },
    { group: 'Nhập liệu', name: 'PHATSINH', desc: 'Nhập liệu chứng từ thu/chi/mua/bán', tab: 'PHATSINH' },
    { group: 'Sổ sách', name: 'NKC', desc: 'Sổ Nhật ký chung (Mẫu S01)', tab: 'NKC' },
    { group: 'Sổ sách', name: 'SO_CAI', desc: 'Sổ cái chi tiết theo TK - lọc chuẩn', tab: 'SO_CAI' },
    { group: 'Sổ sách', name: 'SO_PHU', desc: 'Sổ phụ theo TK/đối tượng/tháng', tab: 'SO_PHU' },
    { group: 'Quản trị', name: 'CONG_NO', desc: 'Theo dõi công nợ phải thu, phải trả (131, 331)', tab: 'CONG_NO' },
    { group: 'Quản trị', name: 'XNT', desc: 'Báo cáo Xuất - Nhập - Tồn kho', tab: 'XNT' },
    { group: 'Kết chuyển', name: 'KET_CHUYEN', desc: 'Kết chuyển 6 tháng (TK 911)', tab: 'KET_CHUYEN' },
    { group: 'Báo cáo', name: 'BCDPS', desc: 'Bảng cân đối phát sinh tài khoản', tab: 'BCDPS' },
    { group: 'Báo cáo', name: 'KQKD', desc: 'Báo cáo kết quả hoạt động KD (Mẫu B02)', tab: 'KQKD' },
    { group: 'Báo cáo', name: 'LCTT', desc: 'Báo cáo Lưu chuyển tiền tệ (Mẫu B03)', tab: 'LCTT' },
    { group: 'Báo cáo', name: 'CDKT', desc: 'Bảng Cân đối kế toán (Mẫu B01a)', tab: 'CDKT' },
    { group: 'Báo cáo', name: 'TMBCTC', desc: 'Thuyết minh Báo cáo tài chính TT71', tab: 'TMBCTC' },
    { group: 'Báo cáo', name: 'HUONG_DAN', desc: 'Hướng dẫn sử dụng quy trình kế toán HTX', tab: 'HUONG_DAN' }
  ];
  // Monthly Revenue & Expense data for chart (12 months of 2026)
  const monthlyData = [
    { month: 'T1', rev: 145, exp: 92, cf: 53 },
    { month: 'T2', rev: 190, exp: 115, cf: 75 },
    { month: 'T3', rev: 168, exp: 98, cf: 70 },
    { month: 'T4 (DK)', rev: 210, exp: 130, cf: 80 },
    { month: 'T5 (DK)', rev: 280, exp: 160, cf: 120 },
    { month: 'T6 (DK)', rev: 175, exp: 110, cf: 65 },
    { month: 'T7 (DK)', rev: 190, exp: 125, cf: 65 },
    { month: 'T8 (DK)', rev: 240, exp: 140, cf: 100 },
    { month: 'T9 (DK)', rev: 310, exp: 180, cf: 130 },
    { month: 'T10 (DK)', rev: 160, exp: 105, cf: 55 },
    { month: 'T11 (DK)', rev: 170, exp: 115, cf: 55 },
    { month: 'T12 (DK)', rev: 220, exp: 135, cf: 85 }
  ];

  const maxVal = 320;

  // Top 5 xã viên vay vốn
  const topBorrowers = [...loans]
    .filter((l) => l.remainingPrincipal > 0)
    .sort((a, b) => b.remainingPrincipal - a.remainingPrincipal)
    .slice(0, 4);

  // Top vật tư bán chạy
  const topMaterials = [...materials]
    .sort((a, b) => b.stockQuantity - a.stockQuantity)
    .slice(0, 4);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner: Status & Realtime Alert */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
                HTX Nông nghiệp Bích La • TT 71/2024/TT-BTC
              </span>
              <span className="text-xs text-slate-300 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Dữ liệu trực tuyến
              </span>
            </div>
            <h2 className="text-xl lg:text-2xl font-extrabold tracking-tight">
              Bảng Chỉ Số Điều Hành Ban Quản Trị HTX
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Giám sát realtime 20 chỉ số tài chính, tình hình vốn góp xã viên, công nợ mùa vụ, tín dụng nội bộ và tiến độ vụ lúa Đông Xuân 2025 - 2026.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onNavigateTab('AGRICULTURE')}
              className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <Wheat className="w-4 h-4" />
              <span>Tiến độ Vụ lúa (145.5 ha)</span>
            </button>
            <button
              onClick={() => onNavigateTab('FINANCIAL_REPORTS')}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-all border border-white/20 flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>Báo cáo BCTC TT71</span>
            </button>
          </div>
        </div>
      </div>

      {/* AMATAX V6 4-CORE METRIC BAR (EXACT FROM EXCEL TOP HEADER) */}
      <div className="bg-white rounded-2xl border-2 border-emerald-500/40 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wide">
                PHẦN MỀM KẾ TOÁN HTX - TT71 - V6 AMATAX
              </span>
              <span className="text-xs text-slate-500">• 4 Chỉ số cốt lõi 6 Tháng</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
              Bảng Chỉ Tiêu Tài Chính Cốt Lõi 6 Tháng Đầu Năm
            </h3>
          </div>

          {onOpenExcelSync && (
            <button
              onClick={onOpenExcelSync}
              className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer shrink-0"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Nạp / Đồng bộ từ File Excel</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Card 1: DOANH THU 6T */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 hover:border-emerald-400 transition-colors">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              DOANH THU 6T
            </span>
            <p className="text-xl font-extrabold text-emerald-700 font-mono mt-1">
              {AccountingEngine.formatVND(rev6T)}
            </p>
            <span className="text-[11px] text-slate-500 mt-0.5 block">TK 511 + 515</span>
          </div>

          {/* Card 2: CHI PHÍ 6T */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 hover:border-rose-400 transition-colors">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              CHI PHÍ 6T
            </span>
            <p className="text-xl font-extrabold text-rose-700 font-mono mt-1">
              {AccountingEngine.formatVND(exp6T)}
            </p>
            <span className="text-[11px] text-slate-500 mt-0.5 block">TK 621, 622, 627, 632, 642</span>
          </div>

          {/* Card 3: LỢI NHUẬN */}
          <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-300">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
              LỢI NHUẬN (DT - CP)
            </span>
            <p className="text-xl font-extrabold text-emerald-800 font-mono mt-1">
              {AccountingEngine.formatVND(profit6T)}
            </p>
            <span className="text-[11px] text-emerald-700 mt-0.5 block">Kết chuyển vào TK 911 / 421</span>
          </div>

          {/* Card 4: TIỀN 111+112 CUỐI KỲ */}
          <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-200">
            <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">
              TIỀN 111+112 CUỐI KỲ
            </span>
            <p className="text-xl font-extrabold text-blue-900 font-mono mt-1">
              {AccountingEngine.formatVND(moneyTotal)}
            </p>
            <span className="text-[11px] text-blue-700 mt-0.5 block">Tiền mặt quỹ + Tiền gửi ngân hàng</span>
          </div>
        </div>
      </div>

      {/* AMATAX V6 17-SHEET QUICK NAVIGATION MAP */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Bản Đồ 17 Sheet Kế Toán AMATAX V6 (Thông Tư 71)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Nhấp trực tiếp nút [Mở] để chuyển đến bất kỳ Sheet nào trong hệ thống
            </p>
          </div>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3 w-28">NHÓM</th>
                <th className="py-2.5 px-3 w-36">TÊN SHEET</th>
                <th className="py-2.5 px-3">CHỨC NĂNG</th>
                <th className="py-2.5 px-3 text-center w-28">MỞ NHANH</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sheetList.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2 px-3 text-slate-500 font-medium">{item.group}</td>
                  <td className="py-2 px-3 font-mono font-bold text-emerald-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>{item.name}</span>
                  </td>
                  <td className="py-2 px-3 text-slate-700">{item.desc}</td>
                  <td className="py-2 px-3 text-center">
                    <button
                      onClick={() => onNavigateTab(item.tab as any)}
                      className="px-3 py-1 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-lg font-bold text-[11px] border border-emerald-300 hover:border-emerald-600 transition-all cursor-pointer inline-flex items-center gap-1"
                    >
                      <span>Mở</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 20 Realtime KPIs Matrix: Group 1 - Tài chính cốt lõi (1 - 7) */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-emerald-600" />
          <span>I. Chỉ số Tài chính & Dòng tiền (KPI 1 - 7)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* KPI 1: Tổng thu năm */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-colors">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span className="font-medium">1. Tổng thu năm (Quỹ)</span>
              <span className="p-1 rounded-md bg-emerald-50 text-emerald-600">
                <ArrowDownRight className="w-4 h-4" />
              </span>
            </div>
            <p className="text-lg font-bold text-slate-900">
              {AccountingEngine.formatVND(kpis.totalReceiptYear)}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Đã thu qua quỹ tiền mặt & NH</p>
          </div>

          {/* KPI 2: Tổng chi năm */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-rose-300 transition-colors">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span className="font-medium">2. Tổng chi năm (Quỹ)</span>
              <span className="p-1 rounded-md bg-rose-50 text-rose-600">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
            <p className="text-lg font-bold text-slate-900">
              {AccountingEngine.formatVND(kpis.totalDisbursementYear)}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Chi mua phân bón, lương, trạm bơm</p>
          </div>

          {/* KPI 3: Doanh thu năm */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-colors">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span className="font-medium">3. Doanh thu năm (511+515)</span>
              <span className="p-1 rounded-md bg-blue-50 text-blue-600">
                <TrendingUp className="w-4 h-4" />
              </span>
            </div>
            <p className="text-lg font-bold text-emerald-700">
              {AccountingEngine.formatVND(kpis.totalRevenueYear)}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 mt-1">
              <span>+18.5% so với vụ trước</span>
            </div>
          </div>

          {/* KPI 4: Chi phí năm */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-amber-300 transition-colors">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span className="font-medium">4. Chi phí năm (621..642)</span>
              <span className="p-1 rounded-md bg-amber-50 text-amber-600">
                <TrendingDown className="w-4 h-4" />
              </span>
            </div>
            <p className="text-lg font-bold text-slate-900">
              {AccountingEngine.formatVND(kpis.totalExpenseYear)}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Bao gồm khấu hao TSCĐ</p>
          </div>

          {/* KPI 5: Lợi nhuận năm */}
          <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 shadow-xs">
            <div className="flex items-center justify-between text-emerald-800 text-xs mb-1">
              <span className="font-semibold">5. Lợi nhuận thuần năm</span>
              <span className="p-1 rounded-md bg-emerald-600 text-white">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>
            <p className="text-xl font-extrabold text-emerald-800">
              {AccountingEngine.formatVND(kpis.netProfitYear)}
            </p>
            <p className="text-[11px] text-emerald-700 mt-1">Tỷ suất lợi nhuận ròng: 69.8%</p>
          </div>

          {/* KPI 6: Số dư quỹ tiền mặt (111) */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span className="font-medium">6. Số dư quỹ tiền mặt (TK 111)</span>
              <span className="p-1 rounded-md bg-slate-100 text-slate-700">
                <Wallet className="w-4 h-4" />
              </span>
            </div>
            <p className="text-lg font-bold text-slate-900">
              {AccountingEngine.formatVND(kpis.cashBalance)}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Tại két sắt thủ quỹ HTX</p>
          </div>

          {/* KPI 7: Số dư ngân hàng (112) */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span className="font-medium">7. Số dư ngân hàng (TK 112)</span>
              <span className="p-1 rounded-md bg-blue-50 text-blue-600">
                <Landmark className="w-4 h-4" />
              </span>
            </div>
            <p className="text-lg font-bold text-blue-700">
              {AccountingEngine.formatVND(kpis.bankBalance)}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Agribank & VietinBank Triệu Phong</p>
          </div>

          {/* KPI 8 & 9: Công nợ 131 và 331 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span className="font-medium">8 & 9. Công nợ đối chiếu</span>
              <span className="text-[10px] text-slate-400">131 / 331</span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <div>
                <span className="text-[10px] text-slate-500">Phải thu (131):</span>
                <p className="text-xs font-bold text-amber-600">
                  {AccountingEngine.formatVND(kpis.receivables)}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500">Phải trả (331):</span>
                <p className="text-xs font-bold text-rose-600">
                  {AccountingEngine.formatVND(kpis.payables)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Group 2: Tài sản, Vốn góp, Tín dụng & Vụ mùa (KPI 10 - 14) */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-teal-600" />
          <span>II. Tín dụng nội bộ, Vốn góp xã viên & Tài sản (KPI 10 - 14)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* KPI 10: Dư nợ tín dụng nội bộ */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span className="font-medium truncate">10. Dư nợ TD nội bộ (128)</span>
              <BadgePercent className="w-4 h-4 text-emerald-600 shrink-0" />
            </div>
            <p className="text-base font-bold text-emerald-800">
              {AccountingEngine.formatVND(kpis.internalCreditOutstanding)}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Đang cho vay sản xuất lúa</p>
          </div>

          {/* KPI 11: Tổng vốn xã viên */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span className="font-medium truncate">11. Tổng vốn góp (411)</span>
              <Users className="w-4 h-4 text-blue-600 shrink-0" />
            </div>
            <p className="text-base font-bold text-slate-900">
              {AccountingEngine.formatVND(kpis.totalMemberCapital)}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">168 xã viên HTX Bích La</p>
          </div>

          {/* KPI 12: Giá trị hàng tồn kho */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span className="font-medium truncate">12. Giá trị tồn kho (152)</span>
              <Boxes className="w-4 h-4 text-indigo-600 shrink-0" />
            </div>
            <p className="text-base font-bold text-slate-900">
              {AccountingEngine.formatVND(kpis.inventoryValue)}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Phân bón, giống lúa, BVTV</p>
          </div>

          {/* KPI 13: Giá trị TSCĐ */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span className="font-medium truncate">13. Giá trị TSCĐ ròng</span>
              <Tractor className="w-4 h-4 text-amber-600 shrink-0" />
            </div>
            <p className="text-base font-bold text-slate-900">
              {AccountingEngine.formatVND(kpis.fixedAssetValue)}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Trạm bơm, máy cày, máy gặt</p>
          </div>

          {/* KPI 14: Chi phí theo vụ */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span className="font-medium truncate">14. Chi phí Vụ ĐX</span>
              <Wheat className="w-4 h-4 text-emerald-600 shrink-0" />
            </div>
            <p className="text-base font-bold text-slate-900">
              {AccountingEngine.formatVND(kpis.seasonCost)}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">145.5 ha lúa Đông Xuân</p>
          </div>
        </div>
      </div>

      {/* Biểu đồ KPI 15 (Doanh thu theo tháng) & KPI 16 (Dòng tiền theo tháng) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Chart: 15 & 16 */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span>15 & 16. Doanh thu & Dòng tiền ròng theo tháng (Triệu VNĐ)</span>
              </h4>
              <p className="text-[11px] text-slate-500">Biểu đồ đối chiếu doanh thu và dòng tiền thuần 12 tháng năm 2026</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-600"></span>
                <span className="text-slate-600">Doanh thu</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-teal-300"></span>
                <span className="text-slate-600">Chi phí</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-amber-500 rounded-full"></span>
                <span className="text-slate-600">Dòng tiền ròng</span>
              </div>
            </div>
          </div>

          {/* SVG Custom High-density Bar & Line Chart */}
          <div className="mt-6 h-64 w-full flex items-end gap-2 sm:gap-3 px-2">
            {monthlyData.map((d, i) => {
              const revHeight = (d.rev / maxVal) * 100;
              const expHeight = (d.exp / maxVal) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] py-1 px-2 rounded pointer-events-none z-20 whitespace-nowrap shadow-lg">
                    <p className="font-bold">{d.month}: {d.rev} tr VNĐ</p>
                    <p className="text-emerald-300">Dòng tiền: +{d.cf} tr</p>
                  </div>

                  <div className="w-full flex items-end justify-center gap-1 h-48">
                    {/* Revenue Bar */}
                    <div
                      style={{ height: `${revHeight}%` }}
                      className="w-full max-w-[14px] bg-emerald-600 rounded-t transition-all group-hover:bg-emerald-500"
                    ></div>
                    {/* Expense Bar */}
                    <div
                      style={{ height: `${expHeight}%` }}
                      className="w-full max-w-[14px] bg-teal-200 rounded-t transition-all group-hover:bg-teal-300"
                    ></div>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-2 truncate w-full text-center font-medium">
                    {d.month}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Dữ liệu thực tế T1 - T3/2026, kế hoạch dự phóng T4 - T12/2026</span>
            <span className="text-emerald-700 font-semibold">Tăng trưởng kế hoạch: +14.2%</span>
          </div>
        </div>

        {/* Right column: 20. KPI Điều hành & Tiến độ HTX */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 pb-3 border-b border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>20. Bộ Chỉ Số KPI Điều Hành HTX</span>
            </h4>

            <div className="mt-4 space-y-3.5 text-xs">
              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Diện tích gieo cấy lúa Đông Xuân:</span>
                  <span className="font-bold text-emerald-700">145.5 / 145.5 ha (100%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full w-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Tỷ lệ xã viên sử dụng dịch vụ HTX:</span>
                  <span className="font-bold text-emerald-700">92.8% (156/168 hộ)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-600 h-full rounded-full w-[92.8%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Thu nợ tín dụng nội bộ đúng hạn:</span>
                  <span className="font-bold text-amber-600">89.4% (Chuẩn an toàn)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full w-[89.4%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Tự cân đối nước tưới trạm bơm:</span>
                  <span className="font-bold text-blue-700">100% (3 tổ máy chạy tốt)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full w-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600">
            <p className="font-semibold text-slate-800 flex items-center gap-1.5 mb-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Thông báo quản trị</span>
            </p>
            Vụ Đông Xuân 2025-2026 đang vào giai đoạn trỗ bông, chuẩn bị kế hoạch thu hoạch và thu hồi dư nợ tín dụng vật tư đầu vụ trước 15/05/2026.
          </div>
        </div>
      </div>

      {/* KPI 17, 18, 19: Top xã viên vay vốn, Top khách hàng & Top vật tư */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KPI 17: Top xã viên vay vốn */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide flex items-center gap-1.5">
              <BadgePercent className="w-4 h-4 text-emerald-600" />
              <span>17. Top Xã viên vay vốn tín dụng</span>
            </h4>
            <button
              onClick={() => onNavigateTab('INTERNAL_CREDIT')}
              className="text-[11px] text-emerald-600 hover:underline font-semibold"
            >
              Xem tất cả
            </button>
          </div>
          <div className="divide-y divide-slate-100 mt-2">
            {topBorrowers.map((b) => (
              <div key={b.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-slate-800">{b.memberName}</p>
                  <p className="text-[11px] text-slate-400">{b.hamlet} • {b.contractNo}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-700">
                    {AccountingEngine.formatVND(b.remainingPrincipal)}
                  </p>
                  <span
                    className={`inline-block text-[10px] px-1.5 py-0.2 rounded font-medium ${
                      b.status === 'OVERDUE'
                        ? 'bg-rose-50 text-rose-600 border border-rose-200'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {b.status === 'OVERDUE' ? `Quá hạn ${b.overdueDays} ngày` : 'Trong hạn'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KPI 18: Top khách hàng & Đối tác */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-600" />
              <span>18. Top Khách hàng & Đối tác</span>
            </h4>
            <button
              onClick={() => onNavigateTab('PURCHASE_SALES')}
              className="text-[11px] text-blue-600 hover:underline font-semibold"
            >
              Xem công nợ
            </button>
          </div>
          <div className="divide-y divide-slate-100 mt-2 text-xs">
            <div className="py-2.5 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-800">Cty TNHH Lương thực Miền Trung</p>
                <p className="text-[11px] text-slate-400">Bao tiêu thóc thương phẩm ST25</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-800">165.000.000 đ</span>
                <p className="text-[10px] text-emerald-600">Hợp đồng dài hạn</p>
              </div>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-800">Đại lý Nông sản Gio Linh</p>
                <p className="text-[11px] text-slate-400">Tiêu thụ gạo Bích La</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-800">92.000.000 đ</span>
                <p className="text-[10px] text-slate-500">Đã thanh toán 80%</p>
              </div>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-800">Tổ hợp tác Hoa Sen Bích La</p>
                <p className="text-[11px] text-slate-400">Cung cấp hạt sen khô</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-800">38.000.000 đ</span>
                <p className="text-[10px] text-slate-500">Đối tác nội bộ</p>
              </div>
            </div>
          </div>
        </div>

        {/* KPI 19: Top vật tư bán chạy & tồn kho */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide flex items-center gap-1.5">
              <Boxes className="w-4 h-4 text-amber-600" />
              <span>19. Top Vật tư & Phân bón vụ mùa</span>
            </h4>
            <button
              onClick={() => onNavigateTab('WAREHOUSE')}
              className="text-[11px] text-amber-600 hover:underline font-semibold"
            >
              Xem tồn kho
            </button>
          </div>
          <div className="divide-y divide-slate-100 mt-2 text-xs">
            {topMaterials.map((m) => (
              <div key={m.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800">{m.name}</p>
                  <p className="text-[11px] text-slate-400">ĐVT: {m.unit} • Kho: {m.warehouseCode}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">{m.stockQuantity} {m.unit}</p>
                  <p className="text-[10px] text-emerald-600">
                    Giá: {AccountingEngine.formatVND(m.salePrice)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
