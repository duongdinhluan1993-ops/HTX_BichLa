import React from 'react';
import { X, Printer, Download, Check } from 'lucide-react';
import { CashBankVoucher } from '../../types/erp';
import { AccountingEngine } from '../../services/accountingEngine';

interface VoucherPrintModalProps {
  voucher: CashBankVoucher | null;
  onClose: () => void;
}

export const VoucherPrintModal: React.FC<VoucherPrintModalProps> = ({ voucher, onClose }) => {
  if (!voucher) return null;

  const handlePrint = () => {
    window.print();
  };

  const isReceipt = voucher.type === 'PT' || voucher.type === 'GBC';
  const voucherTitle = isReceipt ? 'PHIẾU THU' : voucher.type === 'UNC' ? 'ỦY NHIỆM CHI' : 'PHIẾU CHI';
  const formCode = isReceipt ? 'Mẫu số 01 - TT' : voucher.type === 'UNC' ? 'Mẫu Agribank' : 'Mẫu số 02 - TT';

  // Convert date to string format: Ngày ... tháng ... năm ...
  const dateObj = new Date(voucher.date);
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Toolbar (No-print) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 no-print">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-slate-800">Xem trước in ấn chứng từ</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800">
              {formCode}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>In chứng từ (A4/A5)</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div id="print-area" className="flex-1 overflow-y-auto p-8 bg-white text-slate-900 text-sm">
          {/* Header of Voucher */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-4">
            <div>
              <p className="font-extrabold text-sm uppercase text-slate-900">
                HỢP TÁC XÃ NÔNG NGHIỆP BÍCH LA
              </p>
              <p className="text-xs text-slate-600">Địa chỉ: Xã Triệu Đông, huyện Triệu Phong, tỉnh Quảng Trị</p>
              <p className="text-xs text-slate-600">Mã số thuế: 3200119283 • ĐT: 0233 382 9112</p>
            </div>

            <div className="text-right text-xs">
              <p className="font-bold text-slate-900">{formCode}</p>
              <p className="text-[11px] text-slate-500 italic">
                (Ban hành theo Thông tư số 71/2024/TT-BTC)
              </p>
              <p className="font-mono font-bold text-slate-800 mt-1">Số: {voucher.voucherNo}</p>
              <p className="text-slate-600">Nợ: <span className="font-bold">{voucher.debitAccount}</span></p>
              <p className="text-slate-600">Có: <span className="font-bold">{voucher.creditAccount}</span></p>
            </div>
          </div>

          {/* Title */}
          <div className="text-center my-6">
            <h2 className="text-2xl font-black tracking-wider uppercase text-slate-900">
              {voucherTitle}
            </h2>
            <p className="text-xs text-slate-500 italic mt-1">
              Ngày {day} tháng {month} năm {year}
            </p>
          </div>

          {/* Body Lines */}
          <div className="space-y-3 text-sm">
            <div className="flex items-baseline">
              <span className="w-48 text-slate-600 shrink-0">
                {isReceipt ? 'Họ và tên người nộp tiền:' : 'Họ và tên người nhận tiền:'}
              </span>
              <span className="font-bold text-slate-900 border-b border-dotted border-slate-400 flex-1 pb-0.5">
                {voucher.partnerName || '...................................................'}
              </span>
            </div>

            <div className="flex items-baseline">
              <span className="w-48 text-slate-600 shrink-0">Địa chỉ:</span>
              <span className="text-slate-800 border-b border-dotted border-slate-400 flex-1 pb-0.5">
                {voucher.address || 'Xã Triệu Đông, Triệu Phong, Quảng Trị'}
              </span>
            </div>

            <div className="flex items-baseline">
              <span className="w-48 text-slate-600 shrink-0">Lý do nộp/chi:</span>
              <span className="text-slate-800 border-b border-dotted border-slate-400 flex-1 pb-0.5">
                {voucher.reason}
              </span>
            </div>

            <div className="flex items-baseline">
              <span className="w-48 text-slate-600 shrink-0">Số tiền:</span>
              <span className="font-extrabold text-base text-emerald-800 border-b border-dotted border-slate-400 flex-1 pb-0.5">
                {AccountingEngine.formatVND(voucher.amount)}
              </span>
            </div>

            <div className="flex items-baseline">
              <span className="w-48 text-slate-600 shrink-0">Viết bằng chữ:</span>
              <span className="italic text-slate-700 border-b border-dotted border-slate-400 flex-1 pb-0.5">
                (Đã khớp đúng theo số tiền định khoản trên chứng từ kế toán HTX Bích La)
              </span>
            </div>

            <div className="flex items-baseline">
              <span className="w-48 text-slate-600 shrink-0">Kèm theo:</span>
              <span className="text-slate-700 border-b border-dotted border-slate-400 flex-1 pb-0.5">
                {voucher.originalDocument || '01 chứng từ gốc'}
              </span>
            </div>
          </div>

          {/* Signature Grid */}
          <div className="grid grid-cols-4 gap-4 text-center mt-12 text-xs pt-4 border-t border-slate-200">
            <div>
              <p className="font-bold uppercase text-slate-900">Giám đốc HTX</p>
              <p className="text-[11px] text-slate-500 italic">(Ký, họ tên, đóng dấu)</p>
              <div className="h-20 flex items-end justify-center font-semibold text-slate-800">
                Nguyễn Văn Hùng
              </div>
            </div>

            <div>
              <p className="font-bold uppercase text-slate-900">Kế toán trưởng</p>
              <p className="text-[11px] text-slate-500 italic">(Ký, họ tên)</p>
              <div className="h-20 flex items-end justify-center font-semibold text-slate-800">
                Lê Đình Quang
              </div>
            </div>

            <div>
              <p className="font-bold uppercase text-slate-900">Thủ quỹ</p>
              <p className="text-[11px] text-slate-500 italic">(Ký, họ tên)</p>
              <div className="h-20 flex items-end justify-center font-semibold text-slate-800">
                Đặng Ngọc Thạch
              </div>
            </div>

            <div>
              <p className="font-bold uppercase text-slate-900">
                {isReceipt ? 'Người nộp tiền' : 'Người nhận tiền'}
              </p>
              <p className="text-[11px] text-slate-500 italic">(Ký, họ tên)</p>
              <div className="h-20 flex items-end justify-center font-semibold text-slate-800">
                {voucher.partnerName?.split('(')[0] || 'Ký nhận'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
