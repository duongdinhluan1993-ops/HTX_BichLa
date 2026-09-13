import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Printer,
  FileDown,
  CheckCircle2,
  Calendar,
  Building,
  Layers,
  ChevronRight
} from 'lucide-react';
import { FinancialKPIs, AccountingEngine } from '../../services/accountingEngine';

interface FinancialReportsViewProps {
  kpis: FinancialKPIs;
  onPrint: () => void;
  initialReport?: 'B01_CDKT' | 'B02_KQKD' | 'B03_LCTT' | 'TMBCTC' | 'BC_HTX';
}

export const FinancialReportsView: React.FC<FinancialReportsViewProps> = ({
  kpis,
  onPrint,
  initialReport = 'B01_CDKT'
}) => {
  const [activeReport, setActiveReport] = useState<'B01_CDKT' | 'B02_KQKD' | 'B03_LCTT' | 'TMBCTC' | 'BC_HTX'>(
    initialReport
  );

  React.useEffect(() => {
    if (initialReport) {
      setActiveReport(initialReport);
    }
  }, [initialReport]);

  const totalAssets =
    kpis.cashBalance +
    kpis.bankBalance +
    kpis.internalCreditOutstanding +
    kpis.receivables +
    kpis.inventoryValue +
    kpis.fixedAssetValue;

  const totalLiabilities = kpis.payables;
  const totalEquity = kpis.totalMemberCapital + kpis.netProfitYear;

  return (
    <div className="space-y-5">
      {/* Top Report Selector Tabs & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveReport('B01_CDKT')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeReport === 'B01_CDKT'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            B01a: Bảng Cân Đối Kế Toán
          </button>
          <button
            onClick={() => setActiveReport('B02_KQKD')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeReport === 'B02_KQKD'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            B02: Kết Quả Kinh Doanh
          </button>
          <button
            onClick={() => setActiveReport('B03_LCTT')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeReport === 'B03_LCTT'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            B03: Lưu Chuyển Tiền Tệ
          </button>
          <button
            onClick={() => setActiveReport('TMBCTC')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeReport === 'TMBCTC'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            TMBCTC: Thuyết Minh BCTC
          </button>
          <button
            onClick={() => setActiveReport('BC_HTX')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeReport === 'BC_HTX'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Báo Cáo Đặc Thù HTX (TT 71)
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Đã xuất file báo cáo Excel chuẩn TT 71/2024/TT-BTC!')}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-emerald-600" />
            <span>Xuất Excel</span>
          </button>
          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>In Báo Cáo A4</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-8 max-w-4xl mx-auto printable-report">
        {/* Unit Header */}
        <div className="flex justify-between items-start border-b border-slate-200 pb-4">
          <div>
            <p className="font-extrabold text-sm uppercase text-slate-900">
              HỢP TÁC XÃ NÔNG NGHIỆP BÍCH LA
            </p>
            <p className="text-xs text-slate-600">Địa chỉ: Xã Triệu Đông, Triệu Phong, Quảng Trị</p>
            <p className="text-xs text-slate-600">Mã số thuế: 3200119283</p>
          </div>
          <div className="text-right text-xs">
            <p className="font-bold text-slate-900">
              {activeReport === 'B01_CDKT'
                ? 'Mẫu số B01a - DNN/HTX'
                : activeReport === 'B02_KQKD'
                ? 'Mẫu số B02 - DNN/HTX'
                : activeReport === 'B03_LCTT'
                ? 'Mẫu số B03 - DNN/HTX'
                : 'Phụ lục BCTC HTX'}
            </p>
            <p className="text-[11px] text-slate-500 italic">
              (Ban hành theo Thông tư 71/2024/TT-BTC)
            </p>
          </div>
        </div>

        {/* 1. BẢNG CÂN ĐỐI KẾ TOÁN */}
        {activeReport === 'B01_CDKT' && (
          <div>
            <div className="text-center my-6">
              <h2 className="text-xl font-black uppercase text-slate-900">BẢNG CÂN ĐỐI KẾ TOÁN</h2>
              <p className="text-xs text-slate-500 italic mt-0.5">Tại ngày 31 tháng 03 năm 2026</p>
              <p className="text-[11px] text-slate-400 mt-0.5">(Đơn vị tính: Đồng Việt Nam)</p>
            </div>

            <table className="w-full text-xs text-left border border-slate-300">
              <thead className="bg-slate-100 font-bold text-slate-800 text-center border-b border-slate-300">
                <tr>
                  <th className="py-2 px-3 text-left border-r border-slate-300">CHỈ TIÊU</th>
                  <th className="py-2 px-2 border-r border-slate-300 w-16">Mã số</th>
                  <th className="py-2 px-2 border-r border-slate-300 w-20">Thuyết minh</th>
                  <th className="py-2 px-3 text-right">Số cuối kỳ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {/* TÀI SẢN */}
                <tr className="bg-slate-50/70 font-bold text-slate-900">
                  <td className="py-2 px-3 border-r border-slate-300">A. TÀI SẢN NGẮN HẠN</td>
                  <td className="py-2 px-2 border-r border-slate-300 text-center font-mono">100</td>
                  <td className="py-2 px-2 border-r border-slate-300 text-center">-</td>
                  <td className="py-2 px-3 text-right font-mono text-emerald-800">
                    {AccountingEngine.formatNumber(
                      kpis.cashBalance +
                        kpis.bankBalance +
                        kpis.internalCreditOutstanding +
                        kpis.receivables +
                        kpis.inventoryValue
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5 px-6 border-r border-slate-300 text-slate-800">
                    I. Tiền và các khoản tương đương tiền (TK 111, 112)
                  </td>
                  <td className="py-1.5 px-2 border-r border-slate-300 text-center font-mono">110</td>
                  <td className="py-1.5 px-2 border-r border-slate-300 text-center font-mono">V.01</td>
                  <td className="py-1.5 px-3 text-right font-mono font-bold">
                    {AccountingEngine.formatNumber(kpis.cashBalance + kpis.bankBalance)}
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5 px-6 border-r border-slate-300 text-slate-800">
                    II. Cho vay tín dụng nội bộ ngắn hạn (TK 1281)
                  </td>
                  <td className="py-1.5 px-2 border-r border-slate-300 text-center font-mono">120</td>
                  <td className="py-1.5 px-2 border-r border-slate-300 text-center font-mono">V.02</td>
                  <td className="py-1.5 px-3 text-right font-mono font-bold text-emerald-700">
                    {AccountingEngine.formatNumber(kpis.internalCreditOutstanding)}
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5 px-6 border-r border-slate-300 text-slate-800">
                    III. Các khoản phải thu ngắn hạn (TK 131, 138)
                  </td>
                  <td className="py-1.5 px-2 border-r border-slate-300 text-center font-mono">130</td>
                  <td className="py-1.5 px-2 border-r border-slate-300 text-center font-mono">V.03</td>
                  <td className="py-1.5 px-3 text-right font-mono">
                    {AccountingEngine.formatNumber(kpis.receivables)}
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5 px-6 border-r border-slate-300 text-slate-800">
                    IV. Hàng tồn kho (TK 152, 154, 155)
                  </td>
                  <td className="py-1.5 px-2 border-r border-slate-300 text-center font-mono">140</td>
                  <td className="py-1.5 px-2 border-r border-slate-300 text-center font-mono">V.04</td>
                  <td className="py-1.5 px-3 text-right font-mono">
                    {AccountingEngine.formatNumber(kpis.inventoryValue)}
                  </td>
                </tr>

                <tr className="bg-slate-50/70 font-bold text-slate-900">
                  <td className="py-2 px-3 border-r border-slate-300">B. TÀI SẢN DÀI HẠN</td>
                  <td className="py-2 px-2 border-r border-slate-300 text-center font-mono">200</td>
                  <td className="py-2 px-2 border-r border-slate-300 text-center">-</td>
                  <td className="py-2 px-3 text-right font-mono text-emerald-800">
                    {AccountingEngine.formatNumber(kpis.fixedAssetValue)}
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5 px-6 border-r border-slate-300 text-slate-800">
                    I. Tài sản cố định hữu hình (TK 211 - 214)
                  </td>
                  <td className="py-1.5 px-2 border-r border-slate-300 text-center font-mono">220</td>
                  <td className="py-1.5 px-2 border-r border-slate-300 text-center font-mono">V.08</td>
                  <td className="py-1.5 px-3 text-right font-mono font-bold">
                    {AccountingEngine.formatNumber(kpis.fixedAssetValue)}
                  </td>
                </tr>

                <tr className="bg-emerald-100 text-emerald-950 font-black text-xs">
                  <td className="py-2.5 px-3 border-r border-slate-300 uppercase">
                    TỔNG CỘNG TÀI SẢN (100 + 200)
                  </td>
                  <td className="py-2.5 px-2 border-r border-slate-300 text-center font-mono">270</td>
                  <td className="py-2.5 px-2 border-r border-slate-300 text-center">-</td>
                  <td className="py-2.5 px-3 text-right font-mono text-sm">
                    {AccountingEngine.formatNumber(totalAssets)}
                  </td>
                </tr>

                {/* NGUỒN VỐN */}
                <tr className="bg-slate-50/70 font-bold text-slate-900">
                  <td className="py-2 px-3 border-r border-slate-300">C. NỢ PHẢI TRẢ</td>
                  <td className="py-2 px-2 border-r border-slate-300 text-center font-mono">300</td>
                  <td className="py-2 px-2 border-r border-slate-300 text-center">-</td>
                  <td className="py-2 px-3 text-right font-mono text-rose-700">
                    {AccountingEngine.formatNumber(totalLiabilities)}
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5 px-6 border-r border-slate-300 text-slate-800">
                    I. Phải trả người bán vật tư (TK 331)
                  </td>
                  <td className="py-1.5 px-2 border-r border-slate-300 text-center font-mono">310</td>
                  <td className="py-1.5 px-2 border-r border-slate-300 text-center font-mono">V.14</td>
                  <td className="py-1.5 px-3 text-right font-mono">
                    {AccountingEngine.formatNumber(totalLiabilities)}
                  </td>
                </tr>

                <tr className="bg-slate-50/70 font-bold text-slate-900">
                  <td className="py-2 px-3 border-r border-slate-300">D. VỐN CHỦ SỞ HỮU HTX</td>
                  <td className="py-2 px-2 border-r border-slate-300 text-center font-mono">400</td>
                  <td className="py-2 px-2 border-r border-slate-300 text-center">-</td>
                  <td className="py-2 px-3 text-right font-mono text-blue-800">
                    {AccountingEngine.formatNumber(totalEquity)}
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5 px-6 border-r border-slate-300 text-slate-800">
                    I. Vốn góp của các xã viên (TK 4111)
                  </td>
                  <td className="py-1.5 px-2 border-r border-slate-300 text-center font-mono">411</td>
                  <td className="py-1.5 px-2 border-r border-slate-300 text-center font-mono">V.22</td>
                  <td className="py-1.5 px-3 text-right font-mono font-bold">
                    {AccountingEngine.formatNumber(kpis.totalMemberCapital)}
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5 px-6 border-r border-slate-300 text-slate-800">
                    II. Lợi nhuận sau thuế chưa phân phối (TK 421)
                  </td>
                  <td className="py-1.5 px-2 border-r border-slate-300 text-center font-mono">421</td>
                  <td className="py-1.5 px-2 border-r border-slate-300 text-center font-mono">V.23</td>
                  <td className="py-1.5 px-3 text-right font-mono font-bold text-emerald-700">
                    {AccountingEngine.formatNumber(kpis.netProfitYear)}
                  </td>
                </tr>

                <tr className="bg-emerald-100 text-emerald-950 font-black text-xs">
                  <td className="py-2.5 px-3 border-r border-slate-300 uppercase">
                    TỔNG CỘNG NGUỒN VỐN (300 + 400)
                  </td>
                  <td className="py-2.5 px-2 border-r border-slate-300 text-center font-mono">440</td>
                  <td className="py-2.5 px-2 border-r border-slate-300 text-center">-</td>
                  <td className="py-2.5 px-3 text-right font-mono text-sm">
                    {AccountingEngine.formatNumber(totalLiabilities + totalEquity)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* 2. BÁO CÁO KẾT QUẢ HOẠT ĐỘNG KINH DOANH */}
        {activeReport === 'B02_KQKD' && (
          <div>
            <div className="text-center my-6">
              <h2 className="text-xl font-black uppercase text-slate-900">
                BÁO CÁO KẾT QUẢ HOẠT ĐỘNG KINH DOANH
              </h2>
              <p className="text-xs text-slate-500 italic mt-0.5">Quý 1 Năm 2026</p>
            </div>

            <table className="w-full text-xs text-left border border-slate-300">
              <thead className="bg-slate-100 font-bold text-slate-800 text-center border-b border-slate-300">
                <tr>
                  <th className="py-2 px-3 text-left border-r border-slate-300">CHỈ TIÊU</th>
                  <th className="py-2 px-2 border-r border-slate-300 w-16">Mã số</th>
                  <th className="py-2 px-3 text-right">Kỳ này</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-2 px-3 border-r border-slate-300 font-semibold">
                    1. Doanh thu bán hàng và cung cấp dịch vụ nông nghiệp (TK 511)
                  </td>
                  <td className="py-2 px-2 border-r border-slate-300 text-center font-mono">01</td>
                  <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">
                    {AccountingEngine.formatNumber(kpis.totalRevenueYear)}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 border-r border-slate-300 font-semibold">
                    2. Giá vốn hàng bán và dịch vụ (TK 632)
                  </td>
                  <td className="py-2 px-2 border-r border-slate-300 text-center font-mono">11</td>
                  <td className="py-2 px-3 text-right font-mono text-slate-800">
                    {AccountingEngine.formatNumber(80000000)}
                  </td>
                </tr>
                <tr className="bg-slate-50 font-bold text-slate-900">
                  <td className="py-2 px-3 border-r border-slate-300">
                    3. Lợi nhuận gộp về bán hàng và dịch vụ (20 = 01 - 11)
                  </td>
                  <td className="py-2 px-2 border-r border-slate-300 text-center font-mono">20</td>
                  <td className="py-2 px-3 text-right font-mono text-emerald-700">
                    {AccountingEngine.formatNumber(kpis.totalRevenueYear - 80000000)}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 border-r border-slate-300">
                    4. Doanh thu hoạt động tài chính (Lãi tín dụng nội bộ TK 515)
                  </td>
                  <td className="py-2 px-2 border-r border-slate-300 text-center font-mono">21</td>
                  <td className="py-2 px-3 text-right font-mono font-bold text-blue-700">
                    {AccountingEngine.formatNumber(3250000)}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 border-r border-slate-300">
                    5. Chi phí quản lý HTX (TK 642)
                  </td>
                  <td className="py-2 px-2 border-r border-slate-300 text-center font-mono">26</td>
                  <td className="py-2 px-3 text-right font-mono text-slate-800">
                    {AccountingEngine.formatNumber(20955554)}
                  </td>
                </tr>
                <tr className="bg-emerald-100 text-emerald-950 font-black text-xs">
                  <td className="py-2.5 px-3 border-r border-slate-300 uppercase">
                    6. TỔNG LỢI NHUẬN THUẦN TRƯỚC THUẾ (50 = 20 + 21 - 26)
                  </td>
                  <td className="py-2.5 px-2 border-r border-slate-300 text-center font-mono">50</td>
                  <td className="py-2.5 px-3 text-right font-mono text-sm">
                    {AccountingEngine.formatNumber(kpis.netProfitYear)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* 3. BÁO CÁO LƯU CHUYỂN TIỀN TỆ */}
        {activeReport === 'B03_LCTT' && (
          <div>
            <div className="text-center my-6">
              <h2 className="text-xl font-black uppercase text-slate-900">
                BÁO CÁO LƯU CHUYỂN TIỀN TỆ
              </h2>
              <p className="text-xs text-slate-500 italic mt-0.5">Phương pháp trực tiếp • Quý 1/2026</p>
            </div>

            <table className="w-full text-xs text-left border border-slate-300">
              <thead className="bg-slate-100 font-bold text-slate-800 text-center border-b border-slate-300">
                <tr>
                  <th className="py-2 px-3 text-left border-r border-slate-300">CHỈ TIÊU</th>
                  <th className="py-2 px-2 border-r border-slate-300 w-16">Mã số</th>
                  <th className="py-2 px-3 text-right">Số tiền (VNĐ)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-2 px-3 border-r border-slate-300">1. Tiền thu từ bán hàng và dịch vụ nông nghiệp</td>
                  <td className="py-2 px-2 border-r border-slate-300 text-center font-mono">01</td>
                  <td className="py-2 px-3 text-right font-mono font-bold text-emerald-700">
                    +{AccountingEngine.formatNumber(kpis.totalReceiptYear)}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 border-r border-slate-300">2. Tiền chi trả cho người cung cấp phân bón vật tư</td>
                  <td className="py-2 px-2 border-r border-slate-300 text-center font-mono">02</td>
                  <td className="py-2 px-3 text-right font-mono text-rose-700">
                    -{AccountingEngine.formatNumber(150000000)}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 border-r border-slate-300">3. Tiền chi trả thù lao Ban Quản trị & người lao động</td>
                  <td className="py-2 px-2 border-r border-slate-300 text-center font-mono">03</td>
                  <td className="py-2 px-3 text-right font-mono text-rose-700">
                    -{AccountingEngine.formatNumber(20000000)}
                  </td>
                </tr>
                <tr className="bg-emerald-100 text-emerald-950 font-black">
                  <td className="py-2 px-3 border-r border-slate-300 uppercase">
                    LƯU CHUYỂN TIỀN THUẦN TRONG KỲ
                  </td>
                  <td className="py-2 px-2 border-r border-slate-300 text-center font-mono">20</td>
                  <td className="py-2 px-3 text-right font-mono text-sm">
                    +{AccountingEngine.formatNumber(kpis.totalReceiptYear - 170000000)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* 4. BÁO CÁO ĐẶC THÙ HỢP TÁC XÃ */}
        {activeReport === 'BC_HTX' && (
          <div className="space-y-4">
            <div className="text-center my-6">
              <h2 className="text-xl font-black uppercase text-slate-900">
                BÁO CÁO TỔNG HỢP VỐN XÃ VIÊN & TÍN DỤNG NỘI BỘ HTX
              </h2>
              <p className="text-xs text-slate-500 italic mt-0.5">Kỳ hạch toán Quý 1 Năm 2026</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                <p className="font-bold text-slate-900 text-sm mb-2">1. Tình hình Vốn góp xã viên</p>
                <div className="space-y-1 text-slate-700">
                  <p>Số thành viên đầu kỳ: <strong>167 xã viên</strong></p>
                  <p>Kết nạp mới trong kỳ: <strong>01 xã viên</strong></p>
                  <p>Tổng số xã viên hiện tại: <strong>168 xã viên</strong></p>
                  <p>Tổng vốn điều lệ (TK 411): <strong className="text-emerald-700">{AccountingEngine.formatVND(kpis.totalMemberCapital)}</strong></p>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                <p className="font-bold text-slate-900 text-sm mb-2">2. Tình hình Tín dụng nội bộ HTX</p>
                <div className="space-y-1 text-slate-700">
                  <p>Dư nợ gốc đang cho vay: <strong className="text-emerald-700">{AccountingEngine.formatVND(kpis.internalCreditOutstanding)}</strong></p>
                  <p>Lãi suất cho vay: <strong>0.65% / tháng</strong></p>
                  <p>Tỷ lệ nợ quá hạn: <strong>10.6% (An toàn trong chu kỳ lúa)</strong></p>
                  <p>Biện pháp xử lý: Thu hồi bằng thóc thương phẩm vụ Đông Xuân.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REPORT 5: TMBCTC (Thuyết minh BCTC Thông tư 71) */}
        {activeReport === 'TMBCTC' && (
          <div className="space-y-6">
            <div className="text-center border-b border-slate-200 pb-4">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                MẪU SỐ B09 - HTX (Ban hành theo TT số 71/2024/TT-BTC)
              </span>
              <h2 className="text-base font-extrabold text-slate-900 mt-1 uppercase">
                BẢN THUYẾT MINH BÁO CÁO TÀI CHÍNH
              </h2>
              <p className="text-xs text-slate-500 italic mt-0.5">Năm tài chính 2026 - Áp dụng cho HTX Nông nghiệp Bích La</p>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">I. ĐẶC ĐIỂM HOẠT ĐỘNG CỦA HỢP TÁC XÃ</h4>
                <p>1. Tên đơn vị: Hợp tác xã Nông nghiệp Bích La</p>
                <p>2. Địa bàn hoạt động: Thôn Bích La Đông, xã Triệu Thành, huyện Triệu Phong, tỉnh Quảng Trị</p>
                <p>3. Ngành nghề chính: Dịch vụ nông nghiệp, trạm bơm tưới tiêu, cung ứng giống & phân bón, tiêu thụ lúa gạo chất lượng cao, tín dụng nội bộ xã viên.</p>
                <p>4. Chế độ kế toán áp dụng: Thông tư 71/2024/TT-BTC ngày 07/10/2024 của Bộ Tài chính.</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">II. CHÍNH SÁCH KẾ TOÁN ÁP DỤNG</h4>
                <p>1. Kỳ kế toán năm: Từ ngày 01/01 đến ngày 31/12.</p>
                <p>2. Đơn vị tiền tệ sử dụng: Đồng Việt Nam (VND).</p>
                <p>3. Phương pháp hạch toán hàng tồn kho: Kê khai thường xuyên; tính giá xuất kho theo phương pháp Bình quân gia quyền.</p>
                <p>4. Phương pháp khấu hao TSCĐ: Khấu hao theo đường thẳng theo Thông tư 45/2013/TT-BTC.</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">III. THÔNG TIN BỔ SUNG CHO CÁC KHOẢN MỤC TRÌNH BÀY TRÊN BCTC</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  <div className="p-3 bg-white border border-slate-200 rounded-lg">
                    <p className="font-bold text-slate-900">1. Tiền và tương đương tiền (TK 111, 112)</p>
                    <p className="text-emerald-700 font-bold font-mono text-sm mt-0.5">
                      {AccountingEngine.formatVND(kpis.cashBalance + kpis.bankBalance)}
                    </p>
                    <p className="text-[11px] text-slate-500">Tiền mặt: {AccountingEngine.formatVND(kpis.cashBalance)} | Ngân hàng: {AccountingEngine.formatVND(kpis.bankBalance)}</p>
                  </div>

                  <div className="p-3 bg-white border border-slate-200 rounded-lg">
                    <p className="font-bold text-slate-900">2. Hàng tồn kho (TK 152, 156)</p>
                    <p className="text-emerald-700 font-bold font-mono text-sm mt-0.5">
                      {AccountingEngine.formatVND(kpis.inventoryValue)}
                    </p>
                    <p className="text-[11px] text-slate-500">Phân NPK, lúa giống Khang Dân 18, ST25, thuốc BVTV sinh học.</p>
                  </div>

                  <div className="p-3 bg-white border border-slate-200 rounded-lg">
                    <p className="font-bold text-slate-900">3. Vốn đầu tư của chủ sở hữu (TK 411)</p>
                    <p className="text-emerald-700 font-bold font-mono text-sm mt-0.5">
                      {AccountingEngine.formatVND(kpis.totalMemberCapital)}
                    </p>
                    <p className="text-[11px] text-slate-500">168 xã viên tham gia đóng góp cổ phần theo Luật HTX 2023.</p>
                  </div>

                  <div className="p-3 bg-white border border-slate-200 rounded-lg">
                    <p className="font-bold text-slate-900">4. Hoạt động Tín dụng nội bộ (TK 128)</p>
                    <p className="text-emerald-700 font-bold font-mono text-sm mt-0.5">
                      {AccountingEngine.formatVND(kpis.internalCreditOutstanding)}
                    </p>
                    <p className="text-[11px] text-slate-500">Dư nợ hỗ trợ xã viên đầu tư mùa vụ lãi suất tương trợ 0.65%/tháng.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Signatures */}
        <div className="grid grid-cols-3 gap-6 text-center mt-12 text-xs pt-4 border-t border-slate-200">
          <div>
            <p className="font-bold uppercase text-slate-900">Người lập biểu</p>
            <p className="text-[11px] text-slate-500 italic">(Ký, họ tên)</p>
            <div className="h-16 flex items-end justify-center font-semibold text-slate-800">
              Lê Đình Quang
            </div>
          </div>

          <div>
            <p className="font-bold uppercase text-slate-900">Kế toán trưởng</p>
            <p className="text-[11px] text-slate-500 italic">(Ký, họ tên)</p>
            <div className="h-16 flex items-end justify-center font-semibold text-slate-800">
              Lê Đình Quang
            </div>
          </div>

          <div>
            <p className="font-bold uppercase text-slate-900">Giám đốc HTX Bích La</p>
            <p className="text-[11px] text-slate-500 italic">(Ký, đóng dấu, họ tên)</p>
            <div className="h-16 flex items-end justify-center font-semibold text-slate-800">
              Nguyễn Văn Hùng
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
