import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, Edit3, AlertTriangle, ArrowRightLeft } from 'lucide-react';
import { Account, CashBankVoucher, JournalEntry } from '../../types/erp';
import { AccountingEngine } from '../../services/accountingEngine';

export interface EditableVoucherData {
  id: string;
  voucherNo: string;
  type: string;
  date: string;
  partnerName: string;
  reason: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
}

interface EditVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  voucher: CashBankVoucher | JournalEntry | null;
  accounts: Account[];
  onSave: (updated: EditableVoucherData) => void;
  onDelete?: (id: string, voucherNo: string) => void;
}

export const EditVoucherModal: React.FC<EditVoucherModalProps> = ({
  isOpen,
  onClose,
  voucher,
  accounts,
  onSave,
  onDelete
}) => {
  if (!isOpen || !voucher) return null;

  // Derive initial values
  const voucherId = voucher.id;
  const initialVoucherNo = voucher.voucherNo || '';
  const initialType = (voucher as any).type || (voucher as any).voucherType || 'PT';
  const initialDate = voucher.date || new Date().toISOString().split('T')[0];
  const initialPartner = (voucher as any).partnerName || 'Đối tác HTX Bích La';
  const initialReason = (voucher as any).reason || (voucher as any).description || '';
  const initialDebit = voucher.debitAccount || '1111';
  const initialCredit = voucher.creditAccount || '511';
  const initialAmount = voucher.amount || 0;

  const [voucherNo, setVoucherNo] = useState(initialVoucherNo);
  const [type, setType] = useState(initialType);
  const [date, setDate] = useState(initialDate);
  const [partnerName, setPartnerName] = useState(initialPartner);
  const [reason, setReason] = useState(initialReason);
  const [debitAccount, setDebitAccount] = useState(initialDebit);
  const [creditAccount, setCreditAccount] = useState(initialCredit);
  const [amount, setAmount] = useState(initialAmount);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (voucher) {
      setVoucherNo(voucher.voucherNo || '');
      setType((voucher as any).type || (voucher as any).voucherType || 'PT');
      setDate(voucher.date || '');
      setPartnerName((voucher as any).partnerName || 'Đối tác HTX Bích La');
      setReason((voucher as any).reason || (voucher as any).description || '');
      setDebitAccount(voucher.debitAccount || '1111');
      setCreditAccount(voucher.creditAccount || '511');
      setAmount(voucher.amount || 0);
      setConfirmDelete(false);
    }
  }, [voucher]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      alert('Vui lòng nhập số tiền lớn hơn 0!');
      return;
    }
    if (!debitAccount || !creditAccount) {
      alert('Vui lòng chọn đầy đủ Tài khoản Nợ và Tài khoản Có!');
      return;
    }

    onSave({
      id: voucherId,
      voucherNo,
      type,
      date,
      partnerName,
      reason,
      debitAccount,
      creditAccount,
      amount: Number(amount)
    });
    onClose();
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(voucherId, voucherNo);
      onClose();
    }
  };

  // Find account labels
  const debitAccObj = accounts.find((a) => a.code === debitAccount);
  const creditAccObj = accounts.find((a) => a.code === creditAccount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-slate-900 text-white p-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
              <Edit3 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                  SỬA CHỨNG TỪ & HẠCH TOÁN
                </span>
                <span className="text-xs text-slate-300 font-mono font-bold">{voucherNo}</span>
              </div>
              <h3 className="font-extrabold text-base tracking-tight mt-0.5">
                Chỉnh Sửa Nghiệp Vụ Kế Toán HTX Bích La
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Row 1: Số chứng từ & Ngày & Loại */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Số chứng từ <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={voucherNo}
                onChange={(e) => setVoucherNo(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono font-bold text-emerald-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Loại chứng từ
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="PT">Phiếu Thu (PT)</option>
                <option value="PC">Phiếu Chi (PC)</option>
                <option value="UNC">Ủy Nhiệm Chi (UNC)</option>
                <option value="GBC">Giấy Báo Có (GBC)</option>
                <option value="GBN">Giấy Báo Nợ (GBN)</option>
                <option value="PNK">Phiếu Nhập Kho (PNK)</option>
                <option value="PXK">Phiếu Xuất Kho (PXK)</option>
                <option value="PKC">Phiếu Kết Chuyển (PKC)</option>
                <option value="PKH">Phiếu Khấu Hao (PKH)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Ngày hạch toán <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Row 2: Đối tác / Người nộp/nhận */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Người nộp / Người nhận / Đối tác
            </label>
            <input
              type="text"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              placeholder="Họ tên xã viên, khách hàng hoặc nhà cung cấp"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Row 3: Diễn giải nội dung */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Diễn giải nội dung kinh tế <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              placeholder="VD: Thu tiền bán lúa giống ST25 cho xã viên đợt 1..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Row 4: HẠCH TOÁN ĐỊNH KHOẢN KẾ TOÁN (NỢ / CÓ) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wide text-slate-700 flex items-center gap-1.5">
                <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-600" />
                <span>Định Khoản Kế Toán (Thông tư 71/2024/TT-BTC)</span>
              </span>
              <span className="text-[11px] text-slate-500">Bút toán kép Nợ/Có cân xứng</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* TK Nợ */}
              <div>
                <label className="block text-xs font-bold text-blue-700 mb-1">
                  Tài khoản Nợ (Debit) <span className="text-rose-500">*</span>
                </label>
                <select
                  value={debitAccount}
                  onChange={(e) => setDebitAccount(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-blue-300 rounded-lg text-xs font-mono font-bold text-blue-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {accounts.map((acc) => (
                    <option key={acc.code} value={acc.code}>
                      {acc.code} - {acc.name}
                    </option>
                  ))}
                </select>
                {debitAccObj && (
                  <p className="text-[11px] text-slate-500 mt-1 truncate">
                    {debitAccObj.name}
                  </p>
                )}
              </div>

              {/* TK Có */}
              <div>
                <label className="block text-xs font-bold text-amber-700 mb-1">
                  Tài khoản Có (Credit) <span className="text-rose-500">*</span>
                </label>
                <select
                  value={creditAccount}
                  onChange={(e) => setCreditAccount(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-amber-300 rounded-lg text-xs font-mono font-bold text-amber-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  {accounts.map((acc) => (
                    <option key={acc.code} value={acc.code}>
                      {acc.code} - {acc.name}
                    </option>
                  ))}
                </select>
                {creditAccObj && (
                  <p className="text-[11px] text-slate-500 mt-1 truncate">
                    {creditAccObj.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Row 5: SỐ TIỀN */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Số tiền thanh toán / hạch toán (VNĐ) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min="1"
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono font-extrabold text-emerald-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <span className="absolute right-3 top-2 text-xs font-bold text-slate-500">VNĐ</span>
            </div>
            <p className="text-xs text-emerald-700 font-bold mt-1">
              Bằng chữ: {AccountingEngine.formatVND(amount)}
            </p>
          </div>

          {/* Delete confirmation box */}
          {confirmDelete && (
            <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-xs space-y-2 animate-in fade-in">
              <div className="flex items-center gap-2 text-rose-800 font-bold">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Bạn có chắc chắn muốn xóa chứng từ {voucherNo} này?</span>
              </div>
              <p className="text-rose-700">
                Thao tác này sẽ xóa chứng từ khỏi sổ quỹ và tự động đảo ngược bút toán khỏi Sổ Nhật ký chung, Sổ Cái.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-xs cursor-pointer"
                >
                  Xác nhận xóa vĩnh viễn
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="px-3 py-1 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs cursor-pointer"
                >
                  Hủy
                </button>
              </div>
            </div>
          )}

          {/* Footer actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <div>
              {onDelete && !confirmDelete && (
                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa chứng từ</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl border border-slate-300 transition-colors cursor-pointer"
              >
                Đóng
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Lưu thay đổi</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
