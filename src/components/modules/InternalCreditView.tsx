import React, { useState } from 'react';
import {
  BadgePercent,
  PlusCircle,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Calculator,
  Search,
  FileSpreadsheet,
  ArrowRight
} from 'lucide-react';
import { LoanContract, Member } from '../../types/erp';
import { AccountingEngine } from '../../services/accountingEngine';

interface InternalCreditViewProps {
  loans: LoanContract[];
  members: Member[];
  onAddLoan: (loan: LoanContract) => void;
  onRepayLoan: (contractNo: string, principal: number, interest: number) => void;
}

export const InternalCreditView: React.FC<InternalCreditViewProps> = ({
  loans,
  members,
  onAddLoan,
  onRepayLoan
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRepayModal, setShowRepayModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<LoanContract | null>(null);
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'NORMAL' | 'OVERDUE' | 'COMPLETED'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Form states for new loan
  const [memberId, setMemberId] = useState(members[0]?.id || '');
  const [loanType, setLoanType] = useState<'CASH' | 'MATERIAL'>('MATERIAL');
  const [amount, setAmount] = useState(25000000);
  const [termMonths, setTermMonths] = useState(5);
  const [purpose, setPurpose] = useState('Ứng trước phân bón NPK & Đạm cho vụ lúa Đông Xuân');

  // Form states for repay
  const [repayPrincipal, setRepayPrincipal] = useState(10000000);
  const [repayInterest, setRepayInterest] = useState(325000);

  const totalOutstanding = loans
    .filter((l) => l.status !== 'COMPLETED')
    .reduce((sum, l) => sum + l.remainingPrincipal, 0);

  const totalInterestCollected = loans.reduce((sum, l) => sum + l.paidInterest, 0);
  const overdueLoans = loans.filter((l) => l.status === 'OVERDUE');

  const filteredLoans = loans.filter((l) => {
    const matchStatus = filterStatus === 'ALL' || l.status === filterStatus;
    const matchSearch =
      l.contractNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.hamlet.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mem = members.find((m) => m.id === memberId);
    if (!mem) return;

    const newLoan: LoanContract = {
      id: `HDV-${Date.now()}`,
      contractNo: `HDV-2026-${Math.floor(100 + Math.random() * 900)}`,
      memberId: mem.id,
      memberName: mem.fullName,
      hamlet: mem.hamlet,
      loanType,
      loanAmount: Number(amount),
      interestRateMonthly: 0.65,
      termMonths: Number(termMonths),
      startDate: '2026-03-12',
      dueDate: '2026-08-12',
      purpose,
      disbursedAmount: Number(amount),
      paidPrincipal: 0,
      paidInterest: 0,
      remainingPrincipal: Number(amount),
      accruedInterest: 0,
      status: 'NORMAL',
      overdueDays: 0,
      seasonId: 'VU-DX-2025-2026'
    };

    onAddLoan(newLoan);
    setShowCreateModal(false);
    alert(`Đã lập hợp đồng tín dụng số ${newLoan.contractNo} thành công và hạch toán giải ngân!`);
  };

  const handleOpenRepay = (loan: LoanContract) => {
    setSelectedLoan(loan);
    setRepayPrincipal(Math.min(loan.remainingPrincipal, 10000000));
    setRepayInterest(Math.round(loan.remainingPrincipal * (loan.interestRateMonthly / 100)));
    setShowRepayModal(true);
  };

  const handleRepaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLoan) return;
    onRepayLoan(selectedLoan.contractNo, Number(repayPrincipal), Number(repayInterest));
    setShowRepayModal(false);
    alert(`Đã thu nợ gốc ${AccountingEngine.formatVND(repayPrincipal)} và thu lãi ${AccountingEngine.formatVND(repayInterest)} thành công! Tự động sinh Phiếu thu.`);
  };

  return (
    <div className="space-y-5">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Dư nợ gốc tín dụng nội bộ</span>
            <span className="p-1 rounded bg-emerald-50 text-emerald-600">
              <BadgePercent className="w-4 h-4" />
            </span>
          </div>
          <p className="text-xl font-extrabold text-emerald-800">
            {AccountingEngine.formatVND(totalOutstanding)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">TK 1281 - Phục vụ vụ Đông Xuân</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Lãi suất ưu đãi xã viên</span>
            <span className="p-1 rounded bg-blue-50 text-blue-600 font-bold text-xs">
              HTX
            </span>
          </div>
          <p className="text-xl font-bold text-blue-700">0.65% / tháng</p>
          <p className="text-[11px] text-slate-500 mt-1">Nghị quyết Đại hội xã viên 2026</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Doanh thu lãi đã thu (515)</span>
            <span className="p-1 rounded bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <p className="text-xl font-bold text-slate-900">
            {AccountingEngine.formatVND(totalInterestCollected)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Ghi nhận vào doanh thu tài chính</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Cảnh báo nợ quá hạn</span>
            <span className="p-1 rounded bg-rose-50 text-rose-600">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <p className="text-xl font-bold text-rose-700">{overdueLoans.length} Hợp đồng</p>
          <p className="text-[11px] text-slate-500 mt-1">Cần đôn đốc sau thu hoạch lúa</p>
        </div>
      </div>

      {/* Main Loan Contracts Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-sm">
              SỔ THEO DÕI HỢP ĐỒNG CHO VAY TÍN DỤNG NỘI BỘ XÃ VIÊN
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
              Quỹ Tín Dụng HTX Bích La
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm hợp đồng, xã viên..."
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Hợp đồng vay mới</span>
            </button>
          </div>
        </div>

        {/* Status Filters */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-2 text-xs">
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              filterStatus === 'ALL'
                ? 'bg-slate-800 text-white'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tất cả ({loans.length})
          </button>
          <button
            onClick={() => setFilterStatus('NORMAL')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              filterStatus === 'NORMAL'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Trong hạn
          </button>
          <button
            onClick={() => setFilterStatus('OVERDUE')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              filterStatus === 'OVERDUE'
                ? 'bg-rose-600 text-white'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Quá hạn ({overdueLoans.length})
          </button>
          <button
            onClick={() => setFilterStatus('COMPLETED')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              filterStatus === 'COMPLETED'
                ? 'bg-slate-600 text-white'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Đã tất toán
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto max-h-[500px]">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 sticky top-0">
              <tr>
                <th className="py-2.5 px-3">Số HĐ vay</th>
                <th className="py-2.5 px-3">Xã viên vay</th>
                <th className="py-2.5 px-3">Thôn</th>
                <th className="py-2.5 px-3">Hình thức</th>
                <th className="py-2.5 px-3 text-right">Số tiền vay</th>
                <th className="py-2.5 px-3 text-center">Lãi suất</th>
                <th className="py-2.5 px-3 text-center">Thời hạn</th>
                <th className="py-2.5 px-3">Ngày đáo hạn</th>
                <th className="py-2.5 px-3 text-right">Dư nợ gốc còn lại</th>
                <th className="py-2.5 px-3 text-center">Trạng thái</th>
                <th className="py-2.5 px-3 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filteredLoans.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-emerald-700">{l.contractNo}</td>
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-900">
                    {l.memberName}
                  </td>
                  <td className="py-2.5 px-3 font-sans text-slate-600">{l.hamlet}</td>
                  <td className="py-2.5 px-3 font-sans">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        l.loanType === 'MATERIAL'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {l.loanType === 'MATERIAL' ? 'Vay vật tư' : 'Vay tiền mặt'}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                    {AccountingEngine.formatNumber(l.loanAmount)}
                  </td>
                  <td className="py-2.5 px-3 text-center text-slate-700">
                    {l.interestRateMonthly}%/th
                  </td>
                  <td className="py-2.5 px-3 text-center text-slate-700">{l.termMonths} tháng</td>
                  <td className="py-2.5 px-3 text-slate-600">{l.dueDate}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-emerald-800">
                    {AccountingEngine.formatNumber(l.remainingPrincipal)}
                  </td>
                  <td className="py-2.5 px-3 text-center font-sans">
                    {l.status === 'NORMAL' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Trong hạn
                      </span>
                    )}
                    {l.status === 'OVERDUE' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 animate-pulse">
                        Quá hạn {l.overdueDays} ngày
                      </span>
                    )}
                    {l.status === 'COMPLETED' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                        Đã tất toán
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-center font-sans">
                    {l.remainingPrincipal > 0 ? (
                      <button
                        onClick={() => handleOpenRepay(l)}
                        className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-md border border-emerald-200 transition-colors cursor-pointer"
                      >
                        Thu nợ gốc / Lãi
                      </button>
                    ) : (
                      <span className="text-slate-400 text-[11px]">Đã xong</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Lập Hợp đồng vay mới */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Lập Hợp Đồng Vay Tín Dụng Nội Bộ</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Xã viên vay vốn</label>
                <select
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                >
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.code} - {m.fullName} ({m.hamlet}) - Hạn mức:{' '}
                      {AccountingEngine.formatVND(m.creditLimit)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hình thức vay</label>
                  <select
                    value={loanType}
                    onChange={(e) => setLoanType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  >
                    <option value="MATERIAL">Vay phân bón vật tư</option>
                    <option value="CASH">Vay tiền mặt</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Thời hạn (tháng)</label>
                  <input
                    type="number"
                    value={termMonths}
                    onChange={(e) => setTermMonths(Number(e.target.value))}
                    min={1}
                    max={12}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Số tiền vay (VNĐ)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  step={1000000}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-emerald-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mục đích vay vốn</label>
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800">
                <p>Lãi suất áp dụng: <strong>0.65% / tháng</strong></p>
                <p className="mt-0.5">Tiền lãi dự tính mỗi tháng: <strong>{AccountingEngine.formatVND(amount * 0.0065)}</strong></p>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Ký hợp đồng & Giải ngân
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Thu nợ gốc & lãi */}
      {showRepayModal && selectedLoan && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Thu Nợ Tín Dụng Nội Bộ</h3>
              <button onClick={() => setShowRepayModal(false)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>
            <form onSubmit={handleRepaySubmit} className="p-6 space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                <p>Hợp đồng: <strong className="text-emerald-700">{selectedLoan.contractNo}</strong></p>
                <p>Xã viên: <strong>{selectedLoan.memberName}</strong> ({selectedLoan.hamlet})</p>
                <p>Dư nợ gốc hiện tại: <strong className="text-slate-900">{AccountingEngine.formatVND(selectedLoan.remainingPrincipal)}</strong></p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Số tiền gốc thu đợt này (VNĐ)</label>
                <input
                  type="number"
                  value={repayPrincipal}
                  onChange={(e) => setRepayPrincipal(Number(e.target.value))}
                  max={selectedLoan.remainingPrincipal}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-emerald-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Số tiền lãi thu đợt này (VNĐ)</label>
                <input
                  type="number"
                  value={repayInterest}
                  onChange={(e) => setRepayInterest(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-blue-800"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 font-semibold">
                Tổng số tiền nộp: {AccountingEngine.formatVND(Number(repayPrincipal) + Number(repayInterest))}
                <p className="text-[10px] text-slate-500 font-normal mt-0.5">
                  Tự động sinh Phiếu thu tiền mặt (Nợ 1111 / Có 1281 nợ gốc & Có 515 tiền lãi)
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowRepayModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Xác nhận Thu nợ & Sinh phiếu thu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
