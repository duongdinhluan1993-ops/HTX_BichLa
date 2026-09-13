import React, { useState } from 'react';
import { X, AlertOctagon, RotateCcw, Trash2, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ResetDataConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClearTransactionsOnly: () => void;
  onClearEverything: () => void;
  onRestoreSampleData: () => void;
}

export const ResetDataConfirmModal: React.FC<ResetDataConfirmModalProps> = ({
  isOpen,
  onClose,
  onClearTransactionsOnly,
  onClearEverything,
  onRestoreSampleData
}) => {
  if (!isOpen) return null;

  const [confirmText, setConfirmText] = useState('');
  const [selectedMode, setSelectedMode] = useState<'TRANSACTIONS' | 'EVERYTHING' | 'RESTORE'>('TRANSACTIONS');

  const handleExecute = () => {
    if (selectedMode === 'RESTORE') {
      onRestoreSampleData();
      onClose();
      return;
    }

    if (confirmText.trim().toUpperCase() !== 'XOA') {
      alert('Vui lòng gõ chữ "XOA" vào ô xác nhận để tiến hành!');
      return;
    }

    if (selectedMode === 'TRANSACTIONS') {
      onClearTransactionsOnly();
    } else if (selectedMode === 'EVERYTHING') {
      onClearEverything();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-700 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center">
              <AlertOctagon className="w-6 h-6 text-rose-400" />
            </div>
            <div>
              <span className="px-2 py-0.5 rounded bg-rose-500/30 text-rose-200 text-[10px] font-bold">
                QUẢN LÝ DỮ LIỆU HỆ THỐNG
              </span>
              <h3 className="font-extrabold text-base tracking-tight mt-0.5">
                Xóa Dữ Liệu & Nhập Lại Từ Đầu
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Bạn có thể xóa toàn bộ dữ liệu mẫu hiện tại để bắt đầu nhập chứng từ và dữ liệu thực tế của Hợp tác xã Bích La từ đầu. Vui lòng chọn chế độ mong muốn:
          </p>

          <div className="space-y-3">
            {/* Option 1: Xóa chứng từ phát sinh */}
            <div
              onClick={() => setSelectedMode('TRANSACTIONS')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                selectedMode === 'TRANSACTIONS'
                  ? 'border-rose-500 bg-rose-50/50 shadow-xs ring-1 ring-rose-400'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="resetMode"
                  checked={selectedMode === 'TRANSACTIONS'}
                  onChange={() => setSelectedMode('TRANSACTIONS')}
                  className="mt-1 text-rose-600 focus:ring-rose-500"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    1. Xóa toàn bộ Chứng từ & Sổ sách phát sinh (Khuyên dùng)
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Xóa sạch toàn bộ Phiếu thu/chi, Sổ Nhật ký chung, Sổ cái, kết chuyển và đặt số dư về 0. <strong>Giữ nguyên</strong> danh mục tài khoản TT71, danh sách xã viên và kho hàng để bạn nhập ngay chứng từ mới.
                  </p>
                </div>
              </div>
            </div>

            {/* Option 2: Xóa sạch toàn bộ */}
            <div
              onClick={() => setSelectedMode('EVERYTHING')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                selectedMode === 'EVERYTHING'
                  ? 'border-rose-500 bg-rose-50/50 shadow-xs ring-1 ring-rose-400'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="resetMode"
                  checked={selectedMode === 'EVERYTHING'}
                  onChange={() => setSelectedMode('EVERYTHING')}
                  className="mt-1 text-rose-600 focus:ring-rose-500"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    2. Xóa trắng toàn bộ hệ thống (Dữ liệu rỗng 100%)
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Xóa sạch toàn bộ chứng từ, danh mục đối tác, danh mục vật tư, hợp đồng tín dụng. Hệ thống trở về trạng thái trống hoàn toàn để bạn nạp file Excel từ A-Z.
                  </p>
                </div>
              </div>
            </div>

            {/* Option 3: Khôi phục mẫu HTX */}
            <div
              onClick={() => setSelectedMode('RESTORE')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                selectedMode === 'RESTORE'
                  ? 'border-emerald-500 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-400'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="resetMode"
                  checked={selectedMode === 'RESTORE'}
                  onChange={() => setSelectedMode('RESTORE')}
                  className="mt-1 text-emerald-600 focus:ring-emerald-500"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
                    <span>3. Khôi phục lại Dữ liệu mẫu chuẩn HTX Bích La</span>
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Nạp lại bộ số liệu mẫu chuẩn 168 xã viên, chứng từ vật tư lúa giống, trạm bơm, phân bón và báo cáo tài chính 6 tháng.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Verification for destructive action */}
          {selectedMode !== 'RESTORE' && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Xác nhận thao tác bảo vệ an toàn:</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Để tránh xóa nhầm dữ liệu, vui lòng nhập chữ <strong>XOA</strong> vào ô bên dưới:
              </p>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Nhập chữ XOA..."
                className="w-full px-3 py-1.5 bg-white border border-amber-300 rounded-lg text-xs font-bold font-mono text-rose-700 focus:ring-2 focus:ring-rose-500 focus:outline-none uppercase"
              />
            </div>
          )}

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl border border-slate-300 transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="button"
              onClick={handleExecute}
              className={`flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer text-white ${
                selectedMode === 'RESTORE'
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-rose-600 hover:bg-rose-700'
              }`}
            >
              {selectedMode === 'RESTORE' ? (
                <>
                  <RotateCcw className="w-4 h-4" />
                  <span>Khôi phục dữ liệu mẫu</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  <span>Tiến hành xóa & Bắt đầu lại</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
