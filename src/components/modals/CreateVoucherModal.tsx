import React, { useState } from 'react';
import { X, Save, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { Account, CashBankVoucher, Member, Partner } from '../../types/erp';
import { AccountingEngine } from '../../services/accountingEngine';

interface CreateVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: Account[];
  members: Member[];
  partners: Partner[];
  onSaveVoucher: (voucher: CashBankVoucher) => void;
}

export const CreateVoucherModal: React.FC<CreateVoucherModalProps> = ({
  isOpen,
  onClose,
  accounts,
  members,
  partners,
  onSaveVoucher
}) => {
  if (!isOpen) return null;

  const [type, setType] = useState<'PT' | 'PC' | 'UNC' | 'GBC' | 'GBN'>('PT');
  const [voucherNo, setVoucherNo] = useState(`PT-2026-${Math.floor(100 + Math.random() * 900)}`);
  const [date, setDate] = useState('2026-03-12');
  const [partnerType, setPartnerType] = useState<'MEMBER' | 'SUPPLIER' | 'CUSTOMER' | 'OTHER'>('MEMBER');
  const [selectedPartner, setSelectedPartner] = useState(members[0]?.id || '');
  const [partnerName, setPartnerName] = useState(members[0]?.fullName || '');
  const [reason, setReason] = useState('Thu tiền bán phân bón NPK vụ Đông Xuân 2026');
  const [amount, setAmount] = useState(15000000);
  const [debitAccount, setDebitAccount] = useState('1111');
  const [creditAccount, setCreditAccount] = useState('1311');
  const [originalDocument, setOriginalDocument] = useState('Hóa đơn bán lẻ vật tư');

  const handleTypeChange = (newType: 'PT' | 'PC' | 'UNC' | 'GBC' | 'GBN') => {
    setType(newType);
    const prefix = newType;
    setVoucherNo(`${prefix}-2026-${Math.floor(100 + Math.random() * 900)}`);
    if (newType === 'PT') {
      setDebitAccount('1111');
      setCreditAccount('1311');
      setReason('Thu nợ tiền phân bón vật tư vụ Đông Xuân');
    } else if (newType === 'PC') {
      setDebitAccount('331');
      setCreditAccount('1111');
      setReason('Chi tiền thanh toán mua phân bón hoặc trả thù lao thủy lợi');
    } else if (newType === 'UNC') {
      setDebitAccount('331');
      setCreditAccount('1121');
      setReason('Ủy nhiệm chi Agribank thanh toán tiền lúa giống cho ThaiBinh Seed');
    } else if (newType === 'GBC') {
      setDebitAccount('1121');
      setCreditAccount('1313');
      setReason('Khách hàng chuyển khoản thanh toán tiền mua thóc thương phẩm');
    }
  };

  const handlePartnerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedPartner(val);
    if (partnerType === 'MEMBER') {
      const m = members.find((x) => x.id === val);
      if (m) setPartnerName(`${m.fullName} (${m.hamlet})`);
    } else {
      const p = partners.find((x) => x.id === val);
      if (p) setPartnerName(p.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      alert('Vui lòng nhập số tiền hợp lệ!');
      return;
    }

    const newVoucher: CashBankVoucher = {
      id: `VC-${Date.now()}`,
      voucherNo,
      type,
      date,
      partnerId: selectedPartner,
      partnerName: partnerName || 'Đối tác HTX Bích La',
      reason,
      amount: Number(amount),
      debitAccount,
      creditAccount,
      status: 'APPROVED',
      creator: 'Lê Đình Quang',
      approver: 'Nguyễn Văn Hùng',
      originalDocument
    };

    onSaveVoucher(newVoucher);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-base">Lập Chứng Từ Kế Toán Mới</h3>
            <span className="text-[11px] px-2 py-0.5 rounded font-semibold bg-emerald-100 text-emerald-800">
              Thông tư 71/2024
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Row 1: Loại chứng từ & Số CT & Ngày */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Loại chứng từ
              </label>
              <select
                value={type}
                onChange={(e) => handleTypeChange(e.target.value as any)}
                className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              >
                <option value="PT">Phiếu Thu (PT)</option>
                <option value="PC">Phiếu Chi (PC)</option>
                <option value="UNC">Ủy nhiệm chi (UNC)</option>
                <option value="GBC">Giấy báo Có (GBC)</option>
                <option value="GBN">Giấy báo Nợ (GBN)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Số chứng từ
              </label>
              <input
                type="text"
                value={voucherNo}
                onChange={(e) => setVoucherNo(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ngày hạch toán
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                required
              />
            </div>
          </div>

          {/* Row 2: Nhóm đối tượng & Chọn đối tượng */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nhóm đối tượng
              </label>
              <select
                value={partnerType}
                onChange={(e) => setPartnerType(e.target.value as any)}
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                <option value="MEMBER">Xã viên HTX Bích La</option>
                <option value="SUPPLIER">Nhà cung cấp vật tư</option>
                <option value="CUSTOMER">Khách hàng mua nông sản</option>
                <option value="OTHER">Đối tượng khác</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Họ tên / Đơn vị giao dịch
              </label>
              {partnerType === 'MEMBER' ? (
                <select
                  value={selectedPartner}
                  onChange={handlePartnerSelect}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.code} - {m.fullName} ({m.hamlet})
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="Nhập tên đối tượng"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              )}
            </div>
          </div>

          {/* Row 3: Lý do / Diễn giải */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Diễn giải nội dung kinh tế
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              required
            />
          </div>

          {/* Row 4: Định khoản Nợ / Có & Số tiền */}
          <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200 grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-emerald-900 mb-1">
                Tài khoản Nợ
              </label>
              <select
                value={debitAccount}
                onChange={(e) => setDebitAccount(e.target.value)}
                className="w-full text-xs font-mono font-bold px-3 py-2 bg-white border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                {accounts.map((a) => (
                  <option key={a.code} value={a.code}>
                    {a.code} - {a.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-900 mb-1">
                Tài khoản Có
              </label>
              <select
                value={creditAccount}
                onChange={(e) => setCreditAccount(e.target.value)}
                className="w-full text-xs font-mono font-bold px-3 py-2 bg-white border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                {accounts.map((a) => (
                  <option key={a.code} value={a.code}>
                    {a.code} - {a.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-900 mb-1">
                Số tiền (VNĐ)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full text-xs font-bold px-3 py-2 bg-white border border-emerald-300 rounded-lg text-emerald-800 focus:ring-2 focus:ring-emerald-500"
                required
                min={1000}
                step={1000}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Bằng chữ: <strong className="text-slate-800">{AccountingEngine.formatVND(amount)}</strong></span>
            <span className="text-emerald-700">Tự động sinh vào Nhật ký chung & Sổ cái</span>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Lưu & Ghi sổ kế toán</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
