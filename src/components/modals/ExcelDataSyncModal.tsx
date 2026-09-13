import React, { useState } from 'react';
import {
  X,
  FileSpreadsheet,
  Upload,
  Download,
  CheckCircle2,
  AlertCircle,
  Copy,
  RefreshCw,
  Sparkles,
  Database,
  ArrowRight,
  TrendingUp,
  Wallet,
  Trash2,
  RotateCcw,
  AlertTriangle
} from 'lucide-react';
import { AccountingEngine } from '../../services/accountingEngine';
import { Member, Partner, MaterialItem, CashBankVoucher, JournalEntry, Account } from '../../types/erp';

interface ExcelDataSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateMetrics: (metrics: {
    revenue6T: number;
    expense6T: number;
    cashBalance: number;
    bankBalance: number;
  }) => void;
  onImportData: (type: 'DM_DOITUONG' | 'DM_VATTU' | 'PHATSINH' | 'DM_TK', rawText: string) => void;
  onResetToEmpty: () => void;
  onResetToSample: () => void;
  onClearTransactionsOnly?: () => void;
  onClearEverything?: () => void;
  currentMetrics: {
    revenue6T: number;
    expense6T: number;
    cashBalance: number;
    bankBalance: number;
  };
}

export const ExcelDataSyncModal: React.FC<ExcelDataSyncModalProps> = ({
  isOpen,
  onClose,
  onUpdateMetrics,
  onImportData,
  onResetToEmpty,
  onResetToSample,
  onClearTransactionsOnly,
  onClearEverything,
  currentMetrics
}) => {
  const [activeTab, setActiveTab] = useState<'QUICK_METRICS' | 'PASTE_EXCEL' | 'SHEET_CATALOG' | 'RESET_DATA'>('QUICK_METRICS');
  const [selectedSheet, setSelectedSheet] = useState<'DM_DOITUONG' | 'DM_VATTU' | 'PHATSINH' | 'DM_TK'>('DM_DOITUONG');
  const [pasteContent, setPasteContent] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Quick inputs
  const [inputRev, setInputRev] = useState(currentMetrics.revenue6T.toString());
  const [inputExp, setInputExp] = useState(currentMetrics.expense6T.toString());
  const [inputCash, setInputCash] = useState(currentMetrics.cashBalance.toString());
  const [inputBank, setInputBank] = useState(currentMetrics.bankBalance.toString());

  if (!isOpen) return null;

  const handleSaveQuickMetrics = (e: React.FormEvent) => {
    e.preventDefault();
    const rev = parseFloat(inputRev.replace(/,/g, '')) || 0;
    const exp = parseFloat(inputExp.replace(/,/g, '')) || 0;
    const cash = parseFloat(inputCash.replace(/,/g, '')) || 0;
    const bank = parseFloat(inputBank.replace(/,/g, '')) || 0;

    onUpdateMetrics({
      revenue6T: rev,
      expense6T: exp,
      cashBalance: cash,
      bankBalance: bank
    });
    setImportStatus('Đã cập nhật số liệu 4 chỉ số 6T thành công!');
    setTimeout(() => {
      setImportStatus(null);
      onClose();
    }, 1200);
  };

  const handleProcessPaste = () => {
    if (!pasteContent.trim()) {
      alert('Vui lòng dán dữ liệu từ bảng tính Excel vào ô văn bản!');
      return;
    }
    onImportData(selectedSheet, pasteContent);
    setImportStatus(`Đã nạp thành công dữ liệu cho Sheet ${selectedSheet}!`);
    setPasteContent('');
    setTimeout(() => {
      setImportStatus(null);
      onClose();
    }, 1500);
  };

  const handleDownloadSampleCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      encodeURIComponent(
        'PHẦN MỀM KẾ TOÁN HỢP TÁC XÃ - TT71 - V6 AMATAX\n' +
          'DOANH THU 6T,CHI PHÍ 6T,LỢI NHUẬN,TIỀN 111+112 CUỐI KỲ\n' +
          '335300000,100955554,234344446,816500000\n\n' +
          'NHÓM,TÊN SHEET,CHỨC NĂNG\n' +
          'Tổng quan,DASHBOARD,Dashboard quản trị\n' +
          'Danh mục,DM_TK,Hệ thống tài khoản TT71\n' +
          'Danh mục,DM_DOITUONG,Khách hàng/NCC/NV/Xã viên\n' +
          'Danh mục,DM_VATTU,Vật tư hàng hóa\n' +
          'Nhập liệu,PHATSINH,Nhập liệu chứng từ\n' +
          'Sổ sách,NKC,Nhật ký chung\n' +
          'Sổ sách,SO_CAI,Sổ cái chi tiết theo TK\n' +
          'Sổ sách,SO_PHU,Sổ phụ theo TK/đối tượng/tháng\n' +
          'Quản trị,CONG_NO,Theo dõi công nợ\n' +
          'Quản trị,XNT,Xuất nhập tồn\n' +
          'Kết chuyển,KET_CHUYEN,Kết chuyển 6 tháng\n' +
          'Báo cáo,BCDPS,Bảng cân đối phát sinh\n' +
          'Báo cáo,KQKD,Báo cáo KQKD\n' +
          'Báo cáo,LCTT,Lưu chuyển tiền tệ\n' +
          'Báo cáo,CDKT,Bảng cân đối kế toán\n' +
          'Báo cáo,TMBCTC,Thuyết minh BCTC\n' +
          'Báo cáo,HUONG_DAN,Hướng dẫn sử dụng\n'
      );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', csvContent);
    downloadAnchor.setAttribute('download', 'AMATAX_V6_TT71_HTX_BICH_LA.csv');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const sampleHeaders = {
    DM_DOITUONG: 'Mã đối tượng \t Tên đối tượng \t Loại (KHACH_HANG / NHA_CUNG_CAP / XA_VIEN) \t Địa chỉ \t SĐT',
    DM_VATTU: 'Mã VT \t Tên vật tư hàng hóa \t Đơn vị tính \t Đơn giá mua \t Đơn giá bán \t Tồn đầu',
    PHATSINH: 'Ngày (YYYY-MM-DD) \t Số chứng từ \t Diễn giải \t TK Nợ \t TK Có \t Số tiền \t Mã đối tượng',
    DM_TK: 'Số tài khoản \t Tên tài khoản \t Cấp \t Tính chất (Dư Nợ / Dư Có / Lưỡng tính)'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-8">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-tight">
                  ĐỒNG BỘ DỮ LIỆU FILE EXCEL V6 AMATAX (TT71)
                </h3>
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 text-[10px] font-bold">
                  AMATAX V6
                </span>
              </div>
              <p className="text-xs text-emerald-100/80">
                Đưa nội dung và số liệu thực tế từ file Excel vào phần mềm kế toán HTX
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Header Metric Indicators (from Excel Header) */}
        <div className="bg-emerald-950/20 border-b border-emerald-200/50 p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-2 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>4 CHỈ SỐ CỐT LÕI TRÊN FILE EXCEL AMATAX (DÒNG 4 & 5):</span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-3 rounded-xl border border-emerald-200 shadow-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">DOANH THU 6T</span>
              <p className="text-sm sm:text-base font-extrabold text-emerald-700 font-mono mt-0.5 truncate">
                {AccountingEngine.formatVND(currentMetrics.revenue6T)}
              </p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">CHI PHÍ 6T</span>
              <p className="text-sm sm:text-base font-extrabold text-rose-700 font-mono mt-0.5 truncate">
                {AccountingEngine.formatVND(currentMetrics.expense6T)}
              </p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-blue-200 shadow-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">LỢI NHUẬN</span>
              <p className="text-sm sm:text-base font-extrabold text-blue-700 font-mono mt-0.5 truncate">
                {AccountingEngine.formatVND(currentMetrics.revenue6T - currentMetrics.expense6T)}
              </p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-amber-200 shadow-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">TIỀN 111+112 CUỐI KỲ</span>
              <p className="text-sm sm:text-base font-extrabold text-amber-700 font-mono mt-0.5 truncate">
                {AccountingEngine.formatVND(currentMetrics.cashBalance + currentMetrics.bankBalance)}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 px-5 pt-3 gap-2 bg-slate-50 text-xs">
          <button
            onClick={() => setActiveTab('QUICK_METRICS')}
            className={`pb-2.5 px-3 font-bold border-b-2 transition-colors ${
              activeTab === 'QUICK_METRICS'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Nhập nhanh 4 chỉ tiêu 6T
          </button>
          <button
            onClick={() => setActiveTab('PASTE_EXCEL')}
            className={`pb-2.5 px-3 font-bold border-b-2 transition-colors ${
              activeTab === 'PASTE_EXCEL'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Dán dữ liệu từ Sheet Excel (Copy-Paste)
          </button>
          <button
            onClick={() => setActiveTab('SHEET_CATALOG')}
            className={`pb-2.5 px-3 font-bold border-b-2 transition-colors ${
              activeTab === 'SHEET_CATALOG'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            3. Bản đồ 17 Sheet & Tải file mẫu
          </button>
          <button
            onClick={() => setActiveTab('RESET_DATA')}
            className={`pb-2.5 px-3 font-bold border-b-2 transition-colors ${
              activeTab === 'RESET_DATA'
                ? 'border-rose-600 text-rose-700'
                : 'border-transparent text-slate-600 hover:text-rose-700'
            }`}
          >
            4. Xóa dữ liệu & Nhập lại từ đầu
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {importStatus && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{importStatus}</span>
            </div>
          )}

          {/* TAB 1: QUICK METRICS */}
          {activeTab === 'QUICK_METRICS' && (
            <form onSubmit={handleSaveQuickMetrics} className="space-y-4">
              <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-900">
                <p className="font-bold flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Cách nhập nhanh nhất để ứng dụng hiển thị đúng số liệu HTX:</span>
                </p>
                <p className="text-slate-600">
                  Nhập số tiền thực tế của Hợp tác xã bạn theo kỳ hạch toán (hoặc 6 tháng đầu năm). Hệ thống sẽ tự động phân bổ cân đối số dư vào các báo cáo BCTC (B01a, B02, B03, BCDPS).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    DOANH THU 6T (TK 511, 515) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={inputRev}
                    onChange={(e) => setInputRev(e.target.value)}
                    placeholder="VD: 335300000"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono font-bold text-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Bao gồm: Cung ứng phân bón, làm đất, gặt lúa, trạm bơm
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    CHI PHÍ 6T (TK 621, 622, 627, 632, 642) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={inputExp}
                    onChange={(e) => setInputExp(e.target.value)}
                    placeholder="VD: 100955554"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono font-bold text-rose-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Bao gồm: Giá vốn vật tư, xăng dầu máy móc, tiền điện trạm bơm
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    TIỀN MẶT TỒN QUỸ (TK 111) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={inputCash}
                    onChange={(e) => setInputCash(e.target.value)}
                    placeholder="VD: 145000000"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    TIỀN GỬI NGÂN HÀNG (TK 112 - Agribank/Vietinbank) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={inputBank}
                    onChange={(e) => setInputBank(e.target.value)}
                    placeholder="VD: 671500000"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onResetToEmpty}
                    className="px-3 py-1.5 border border-slate-300 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-medium transition-colors"
                  >
                    Đặt về 0 (Trắng dữ liệu)
                  </button>
                  <button
                    type="button"
                    onClick={onResetToSample}
                    className="px-3 py-1.5 border border-emerald-300 text-emerald-700 hover:bg-emerald-50 rounded-lg text-xs font-medium transition-colors"
                  >
                    Dữ liệu chuẩn HTX Bích La
                  </button>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  Lưu & Áp dụng ngay
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: PASTE EXCEL */}
          {activeTab === 'PASTE_EXCEL' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs font-bold text-slate-800">
                    Chọn Sheet trong file Excel bạn muốn nạp dữ liệu:
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Mở file Excel của bạn, quét chọn các dòng dữ liệu, bấm <kbd className="px-1 bg-slate-200 rounded">Ctrl + C</kbd> và dán vào ô bên dưới.
                  </p>
                </div>
                <select
                  value={selectedSheet}
                  onChange={(e) => setSelectedSheet(e.target.value as any)}
                  className="px-3 py-1.5 bg-slate-100 border border-slate-300 rounded-lg text-xs font-bold text-emerald-800 focus:outline-none"
                >
                  <option value="DM_DOITUONG">Sheet: DM_DOITUONG (Xã viên / NCC / KH)</option>
                  <option value="DM_VATTU">Sheet: DM_VATTU (Vật tư hàng hóa)</option>
                  <option value="PHATSINH">Sheet: PHATSINH (Chứng từ phát sinh)</option>
                  <option value="DM_TK">Sheet: DM_TK (Tài khoản TT71)</option>
                </select>
              </div>

              {/* Sample Header Guidance */}
              <div className="bg-slate-900 text-slate-300 p-2.5 rounded-lg text-[11px] font-mono overflow-x-auto">
                <span className="text-emerald-400 font-bold block mb-1">
                  Định dạng cột khuyến nghị khi copy từ Excel ({selectedSheet}):
                </span>
                <code>{sampleHeaders[selectedSheet]}</code>
              </div>

              {/* Paste Area */}
              <div>
                <textarea
                  rows={6}
                  value={pasteContent}
                  onChange={(e) => setPasteContent(e.target.value)}
                  placeholder={`Dán các dòng từ Sheet ${selectedSheet} vào đây...\nVí dụ:\nXV01\tNguyễn Văn An\tBích La Đông\t0912345678\t10000000`}
                  className="w-full p-3 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPasteContent('')}
                  className="px-3 py-2 border border-slate-300 text-slate-600 rounded-xl text-xs hover:bg-slate-100 font-medium"
                >
                  Xóa ô dán
                </button>
                <button
                  type="button"
                  onClick={handleProcessPaste}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Nạp dữ liệu vào ứng dụng</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: SHEET CATALOG */}
          {activeTab === 'SHEET_CATALOG' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <h4 className="font-bold text-xs text-slate-900">
                    Bản đồ 17 Sheet - Chuẩn Kế toán Hợp tác xã TT 71
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Đầy đủ 17 module tương thích 100% với workbook kế toán Excel AMATAX V6.
                  </p>
                </div>
                <button
                  onClick={handleDownloadSampleCSV}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-emerald-700 border border-emerald-300 rounded-lg text-xs font-bold shadow-2xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải file mẫu Excel (.csv)</span>
                </button>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">NHÓM</th>
                      <th className="p-2.5">TÊN SHEET</th>
                      <th className="p-2.5">CHỨC NĂNG</th>
                      <th className="p-2.5 text-center">TRẠNG THÁI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { g: 'Tổng quan', s: 'DASHBOARD', d: 'Dashboard quản trị 20 KPI', st: 'Hoạt động' },
                      { g: 'Danh mục', s: 'DM_TK', d: 'Hệ thống tài khoản Thông tư 71', st: 'Hoạt động' },
                      { g: 'Danh mục', s: 'DM_DOITUONG', d: 'Khách hàng, NCC, Nhân viên, Xã viên', st: 'Hoạt động' },
                      { g: 'Danh mục', s: 'DM_VATTU', d: 'Vật tư hàng hóa, lúa giống, phân bón', st: 'Hoạt động' },
                      { g: 'Nhập liệu', s: 'PHATSINH', d: 'Nhập liệu chứng từ thu, chi, mua, bán', st: 'Hoạt động' },
                      { g: 'Sổ sách', s: 'NKC', d: 'Sổ Nhật ký chung', st: 'Hoạt động' },
                      { g: 'Sổ sách', s: 'SO_CAI', d: 'Sổ cái chi tiết theo TK - lọc chuẩn', st: 'Hoạt động' },
                      { g: 'Sổ sách', s: 'SO_PHU', d: 'Sổ phụ theo TK/đối tượng/tháng', st: 'Hoạt động' },
                      { g: 'Quản trị', s: 'CONG_NO', d: 'Theo dõi công nợ (131, 331)', st: 'Hoạt động' },
                      { g: 'Quản trị', s: 'XNT', d: 'Báo cáo Xuất - Nhập - Tồn kho', st: 'Hoạt động' },
                      { g: 'Kết chuyển', s: 'KET_CHUYEN', d: 'Kết chuyển doanh thu, chi phí 6T (TK 911)', st: 'Hoạt động' },
                      { g: 'Báo cáo', s: 'BCDPS', d: 'Bảng cân đối phát sinh tài khoản', st: 'Hoạt động' },
                      { g: 'Báo cáo', s: 'KQKD', d: 'Báo cáo KQKD (Mẫu B02)', st: 'Hoạt động' },
                      { g: 'Báo cáo', s: 'LCTT', d: 'Báo cáo Lưu chuyển tiền tệ (Mẫu B03)', st: 'Hoạt động' },
                      { g: 'Báo cáo', s: 'CDKT', d: 'Bảng cân đối kế toán (Mẫu B01a)', st: 'Hoạt động' },
                      { g: 'Báo cáo', s: 'TMBCTC', d: 'Thuyết minh BCTC Thông tư 71', st: 'Hoạt động' },
                      { g: 'Hướng dẫn', s: 'HUONG_DAN', d: 'Hướng dẫn sử dụng quy trình kế toán', st: 'Hoạt động' }
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="p-2 text-slate-500 font-medium">{row.g}</td>
                        <td className="p-2 font-mono font-bold text-emerald-700">{row.s}</td>
                        <td className="p-2 text-slate-700">{row.d}</td>
                        <td className="p-2 text-center">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            {row.st}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: RESET DATA */}
          {activeTab === 'RESET_DATA' && (
            <div className="space-y-4">
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs text-rose-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-rose-800">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>Quản lý xóa trắng dữ liệu để nhập lại từ đầu</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Nếu bạn muốn đưa số liệu kế toán thực tế của HTX vào phần mềm mà không bị lẫn với dữ liệu mẫu, bạn có thể thực hiện một trong hai lựa chọn bên dưới:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {/* Option 1: Xóa chứng từ phát sinh */}
                <div className="p-4 rounded-xl border border-rose-200 bg-white hover:border-rose-300 transition-colors shadow-xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-xs mb-1.5">
                      <Trash2 className="w-4 h-4 text-rose-600" />
                      <span>1. Xóa toàn bộ Chứng từ & Phát sinh (Khuyên dùng)</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Xóa toàn bộ Phiếu thu/chi, Sổ Nhật ký chung, Sổ Cái và đặt các chỉ số Doanh thu, Chi phí, Tiền mặt về 0. Giữ lại danh mục tài khoản TT71, danh sách xã viên và kho vật tư để bạn nhập ngay chứng từ mới.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Xác nhận xóa toàn bộ chứng từ phát sinh và đưa số dư về 0 để nhập lại từ đầu?')) {
                        if (onClearTransactionsOnly) onClearTransactionsOnly();
                        setImportStatus('Đã xóa toàn bộ chứng từ phát sinh thành công! Số dư đã về 0.');
                        setTimeout(() => setImportStatus(null), 2500);
                      }
                    }}
                    className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Xóa phát sinh & Đặt về 0
                  </button>
                </div>

                {/* Option 2: Xóa sạch toàn bộ */}
                <div className="p-4 rounded-xl border border-rose-200 bg-white hover:border-rose-300 transition-colors shadow-xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-xs mb-1.5">
                      <Trash2 className="w-4 h-4 text-rose-600" />
                      <span>2. Xóa trắng toàn bộ hệ thống (Dữ liệu rỗng 100%)</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Xóa sạch toàn bộ chứng từ, danh mục đối tác, danh mục vật tư, hợp đồng tín dụng và số dư. Hệ thống trở về trạng thái trống hoàn toàn để bạn nạp file Excel từ đầu.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('CẢNH BÁO: Thao tác này sẽ xóa sạch toàn bộ hệ thống (chứng từ, đối tác, vật tư). Bạn có chắc chắn muốn làm trắng dữ liệu 100%?')) {
                        if (onClearEverything) onClearEverything();
                        setImportStatus('Đã làm trắng toàn bộ hệ thống thành công!');
                        setTimeout(() => setImportStatus(null), 2500);
                      }
                    }}
                    className="w-full py-2 bg-slate-800 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Xóa sạch toàn bộ hệ thống
                  </button>
                </div>
              </div>

              {/* Restore button */}
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Muốn xem lại dữ liệu mẫu HTX Bích La bất kỳ lúc nào?</span>
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    Bấm để khôi phục lại dữ liệu mẫu chuẩn của HTX Bích La (168 xã viên, chứng từ vật tư, lúa giống).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onResetToSample();
                    setImportStatus('Đã khôi phục dữ liệu mẫu HTX Bích La thành công!');
                    setTimeout(() => setImportStatus(null), 2500);
                  }}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors shrink-0 ml-3 cursor-pointer"
                >
                  Khôi phục dữ liệu mẫu
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Hệ thống ERP Kế toán HTX Bích La • Thông tư 71/2024/TT-BTC</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg font-medium transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
