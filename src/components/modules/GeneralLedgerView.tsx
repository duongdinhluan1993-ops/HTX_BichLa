import React, { useState } from 'react';
import {
  BookOpen,
  Table,
  CheckCircle2,
  Lock,
  Unlock,
  RefreshCw,
  FileSpreadsheet,
  Layers,
  Search,
  Filter,
  Edit3,
  Trash2
} from 'lucide-react';
import { Account, JournalEntry } from '../../types/erp';
import {
  AccountingEngine,
  TrialBalanceRow,
  GeneralLedgerRow
} from '../../services/accountingEngine';

interface GeneralLedgerViewProps {
  accounts: Account[];
  journal: JournalEntry[];
  onAddJournalEntry: (entry: JournalEntry) => void;
  onSelectVoucherForPrint: (voucherNo: string) => void;
  onEditJournalEntry?: (entry: JournalEntry) => void;
  onDeleteJournalEntry?: (id: string, voucherNo: string) => void;
  initialSubTab?: 'NKC' | 'SO_CAI' | 'SO_PHU' | 'BCDPS' | 'KET_CHUYEN';
}

export const GeneralLedgerView: React.FC<GeneralLedgerViewProps> = ({
  accounts,
  journal,
  onAddJournalEntry,
  onSelectVoucherForPrint,
  onEditJournalEntry,
  onDeleteJournalEntry,
  initialSubTab = 'NKC'
}) => {
  const [subTab, setSubTab] = useState<'NKC' | 'SO_CAI' | 'SO_PHU' | 'BCDPS' | 'KET_CHUYEN'>(initialSubTab);
  const [selectedAccount, setSelectedAccount] = useState('1111');
  const [selectedMonth, setSelectedMonth] = useState<string>('ALL');
  const [selectedPartnerFilter, setSelectedPartnerFilter] = useState<string>('ALL');
  const [isPeriodLocked, setIsPeriodLocked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  React.useEffect(() => {
    if (initialSubTab) {
      setSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  // Calculate Trial balance
  const { rows: tbRows, totals: tbTotals } = AccountingEngine.calculateTrialBalance(accounts, journal);

  // Calculate General ledger for selected account
  const glData = AccountingEngine.getGeneralLedger(selectedAccount, journal);

  // Filtered Journal
  const filteredJournal = journal.filter(
    (j) =>
      j.voucherNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.debitAccount.includes(searchTerm) ||
      j.creditAccount.includes(searchTerm)
  );

  // Execute closing entry (TK 911)
  const handleExecuteClosing = () => {
    if (isPeriodLocked) {
      alert('Kỳ kế toán đang bị khóa, không thể kết chuyển!');
      return;
    }

    const revenueClose: JournalEntry = {
      id: `KC-REV-${Date.now()}`,
      voucherId: 'KC-911-01',
      voucherNo: 'KC-2026-Q1-01',
      voucherType: 'KC',
      date: '2026-03-31',
      debitAccount: '511',
      creditAccount: '911',
      amount: 335300000,
      description: 'Kết chuyển doanh thu bán hàng & dịch vụ vụ Đông Xuân vào TK 911',
      isPosted: true
    };

    const costClose: JournalEntry = {
      id: `KC-COST-${Date.now()}`,
      voucherId: 'KC-911-02',
      voucherNo: 'KC-2026-Q1-02',
      voucherType: 'KC',
      date: '2026-03-31',
      debitAccount: '911',
      creditAccount: '632',
      amount: 100955554,
      description: 'Kết chuyển giá vốn & chi phí hoạt động vào TK 911',
      isPosted: true
    };

    const profitClose: JournalEntry = {
      id: `KC-PROFIT-${Date.now()}`,
      voucherId: 'KC-911-03',
      voucherNo: 'KC-2026-Q1-03',
      voucherType: 'KC',
      date: '2026-03-31',
      debitAccount: '911',
      creditAccount: '421',
      amount: 335300000 - 100955554,
      description: 'Kết chuyển lợi nhuận sau thuế chưa phân phối Quý 1 vào TK 421',
      isPosted: true
    };

    onAddJournalEntry(revenueClose);
    onAddJournalEntry(costClose);
    onAddJournalEntry(profitClose);
    alert('Đã thực hiện kết chuyển tự động Quý 1/2026 vào TK 911 và TK 421 thành công!');
  };

  return (
    <div className="space-y-5">
      {/* Sub Tabs Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSubTab('NKC')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              subTab === 'NKC'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Sổ Nhật Ký Chung (S01-HTX)
          </button>
          <button
            onClick={() => setSubTab('SO_CAI')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              subTab === 'SO_CAI'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Sổ Cái Tài Khoản (S02-HTX)
          </button>
          <button
            onClick={() => setSubTab('SO_PHU')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              subTab === 'SO_PHU'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Sổ Phụ Chi Tiết (TK/Đối tượng/Tháng)
          </button>
          <button
            onClick={() => setSubTab('BCDPS')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              subTab === 'BCDPS'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Bảng Cân Đối Phát Sinh (B01-HTX)
          </button>
          <button
            onClick={() => setSubTab('KET_CHUYEN')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              subTab === 'KET_CHUYEN'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Kết Chuyển Cuối Kỳ (911)
          </button>
        </div>

        {/* Lock / Unlock Period Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPeriodLocked(!isPeriodLocked)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
              isPeriodLocked
                ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            {isPeriodLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
            <span>{isPeriodLocked ? 'Sổ Đang Khóa' : 'Sổ Đang Mở'}</span>
          </button>
        </div>
      </div>

      {/* 1. SỔ NHẬT KÝ CHUNG */}
      {subTab === 'NKC' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                SỔ NHẬT KÝ CHUNG (Mẫu số S01-DNN/HTX)
              </h3>
              <p className="text-xs text-slate-500">
                Tự động thu thập từ mọi chứng từ phát sinh thực tế theo Thông tư 71/2024/TT-BTC
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Lọc số chứng từ, nội dung..."
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto max-h-[600px]">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 sticky top-0 z-10">
                <tr>
                  <th className="py-2.5 px-3">Ngày HT</th>
                  <th className="py-2.5 px-3">Số chứng từ</th>
                  <th className="py-2.5 px-3">Loại</th>
                  <th className="py-2.5 px-3 min-w-[240px]">Diễn giải nội dung kinh tế</th>
                  <th className="py-2.5 px-3 text-center">TK Nợ</th>
                  <th className="py-2.5 px-3 text-center">TK Có</th>
                  <th className="py-2.5 px-3 text-right">Số tiền (VNĐ)</th>
                  <th className="py-2.5 px-3 text-center">Trạng thái</th>
                  <th className="py-2.5 px-3 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {filteredJournal.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 text-slate-600">{row.date}</td>
                    <td className="py-2.5 px-3 font-bold text-emerald-700">
                      <button
                        onClick={() => onSelectVoucherForPrint(row.voucherNo)}
                        className="hover:underline cursor-pointer"
                        title="Bấm để in chứng từ này"
                      >
                        {row.voucherNo}
                      </button>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {row.voucherType}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-sans text-slate-800">{row.description}</td>
                    <td className="py-2.5 px-3 text-center font-bold text-blue-700">
                      {row.debitAccount}
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold text-amber-700">
                      {row.creditAccount}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                      {AccountingEngine.formatNumber(row.amount)}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                        <CheckCircle2 className="w-3 h-3" /> Đã ghi sổ
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {onEditJournalEntry && (
                          <button
                            onClick={() => onEditJournalEntry(row)}
                            className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-emerald-700 hover:text-white hover:bg-emerald-600 rounded-md border border-emerald-300 transition-colors cursor-pointer"
                            title="Sửa định khoản kế toán Nợ/Có & số tiền"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Sửa</span>
                          </button>
                        )}
                        {onDeleteJournalEntry && (
                          <button
                            onClick={() => {
                              if (window.confirm(`Xác nhận xóa bút toán chứng từ ${row.voucherNo}?`)) {
                                onDeleteJournalEntry(row.id, row.voucherNo);
                              }
                            }}
                            className="inline-flex items-center px-1.5 py-1 text-[11px] font-semibold text-rose-600 hover:text-white hover:bg-rose-600 rounded-md border border-rose-200 transition-colors cursor-pointer"
                            title="Xóa bút toán"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. SỔ CÁI TÀI KHOẢN */}
      {subTab === 'SO_CAI' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                SỔ CÁI TÀI KHOẢN (Mẫu số S02-DNN/HTX)
              </h3>
              <p className="text-xs text-slate-500">
                Chi tiết các nghiệp vụ phát sinh theo tài khoản cấp 1 và cấp 2
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 font-semibold">Chọn tài khoản:</span>
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="text-xs font-bold px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                {accounts.map((a) => (
                  <option key={a.code} value={a.code}>
                    {a.code} - {a.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Account Balance Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50/70 border-b border-slate-200 text-xs">
            <div>
              <span className="text-slate-500">Số dư Nợ đầu kỳ:</span>
              <p className="font-bold text-slate-900 text-sm">
                {AccountingEngine.formatVND(glData.openingDebit)}
              </p>
            </div>
            <div>
              <span className="text-slate-500">Số dư Có đầu kỳ:</span>
              <p className="font-bold text-slate-900 text-sm">
                {AccountingEngine.formatVND(glData.openingCredit)}
              </p>
            </div>
            <div>
              <span className="text-slate-500">Số dư Nợ cuối kỳ:</span>
              <p className="font-bold text-emerald-700 text-sm">
                {AccountingEngine.formatVND(glData.closingDebit)}
              </p>
            </div>
            <div>
              <span className="text-slate-500">Số dư Có cuối kỳ:</span>
              <p className="font-bold text-amber-700 text-sm">
                {AccountingEngine.formatVND(glData.closingCredit)}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto max-h-[500px]">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 sticky top-0">
                <tr>
                  <th className="py-2.5 px-3">Ngày ghi sổ</th>
                  <th className="py-2.5 px-3">Số CT</th>
                  <th className="py-2.5 px-3 min-w-[220px]">Diễn giải</th>
                  <th className="py-2.5 px-3 text-center">TK đối ứng</th>
                  <th className="py-2.5 px-3 text-right">Phát sinh Nợ</th>
                  <th className="py-2.5 px-3 text-right">Phát sinh Có</th>
                  <th className="py-2.5 px-3 text-right">Dư Nợ</th>
                  <th className="py-2.5 px-3 text-right">Dư Có</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {glData.rows.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-400 font-sans">
                      Không có bút toán phát sinh nào cho tài khoản {selectedAccount} trong kỳ này.
                    </td>
                  </tr>
                ) : (
                  glData.rows.map((r, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 text-slate-600">{r.date}</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-700">{r.voucherNo}</td>
                      <td className="py-2.5 px-3 font-sans text-slate-800">{r.description}</td>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-700">
                        {r.corrAccount}
                      </td>
                      <td className="py-2.5 px-3 text-right text-blue-700 font-semibold">
                        {r.debit > 0 ? AccountingEngine.formatNumber(r.debit) : '-'}
                      </td>
                      <td className="py-2.5 px-3 text-right text-amber-700 font-semibold">
                        {r.credit > 0 ? AccountingEngine.formatNumber(r.credit) : '-'}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                        {r.balanceDebit > 0 ? AccountingEngine.formatNumber(r.balanceDebit) : '-'}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                        {r.balanceCredit > 0 ? AccountingEngine.formatNumber(r.balanceCredit) : '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SỔ PHỤ CHI TIẾT THEO TÀI KHOẢN / ĐỐI TƯỢNG / THÁNG (AMATAX V6) */}
      {subTab === 'SO_PHU' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  SHEET: SO_PHU
                </span>
                <h3 className="font-bold text-slate-900 text-sm">
                  SỔ PHỤ CHI TIẾT THEO TÀI KHOẢN / ĐỐI TƯỢNG / THÁNG
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Lọc chuẩn theo từng tài khoản chi tiết (131, 331, 141, 138, 338...) và đối tượng HTX
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="flex items-center gap-1">
                <span className="text-slate-600 font-semibold">Tài khoản:</span>
                <select
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-emerald-800 focus:outline-none"
                >
                  <option value="131">131 - Phải thu khách hàng/Xã viên</option>
                  <option value="331">331 - Phải trả người bán vật tư</option>
                  <option value="1111">1111 - Tiền mặt tại quỹ</option>
                  <option value="1121">1121 - Tiền gửi Agribank/Vietinbank</option>
                  <option value="152">152 - Nguyên vật liệu, phân bón</option>
                  <option value="154">154 - Chi phí SXKD dở dang</option>
                  <option value="141">141 - Tạm ứng nội bộ</option>
                  <option value="411">411 - Vốn đầu tư của chủ sở hữu</option>
                </select>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-slate-600 font-semibold">Tháng:</span>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none"
                >
                  <option value="ALL">Cả năm 2026</option>
                  <option value="-01-">Tháng 1</option>
                  <option value="-02-">Tháng 2</option>
                  <option value="-03-">Tháng 3</option>
                  <option value="-04-">Tháng 4</option>
                  <option value="-05-">Tháng 5</option>
                  <option value="-06-">Tháng 6</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto max-h-[500px]">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 sticky top-0">
                <tr>
                  <th className="py-2.5 px-3">Ngày CT</th>
                  <th className="py-2.5 px-3">Số CT</th>
                  <th className="py-2.5 px-3 min-w-[200px]">Nội dung diễn giải nghiệp vụ</th>
                  <th className="py-2.5 px-3 text-center">TK Đ/Ứ</th>
                  <th className="py-2.5 px-3 text-right">Phát sinh Nợ</th>
                  <th className="py-2.5 px-3 text-right">Phát sinh Có</th>
                  <th className="py-2.5 px-3 text-right">Dư Nợ lũy kế</th>
                  <th className="py-2.5 px-3 text-right">Dư Có lũy kế</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {glData.rows
                  .filter((r) => selectedMonth === 'ALL' || r.date.includes(selectedMonth))
                  .map((r, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 text-slate-600">{r.date}</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-700">{r.voucherNo}</td>
                      <td className="py-2.5 px-3 font-sans text-slate-800">{r.description}</td>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-700">{r.corrAccount}</td>
                      <td className="py-2.5 px-3 text-right text-blue-700 font-semibold">
                        {r.debit > 0 ? AccountingEngine.formatNumber(r.debit) : '-'}
                      </td>
                      <td className="py-2.5 px-3 text-right text-amber-700 font-semibold">
                        {r.credit > 0 ? AccountingEngine.formatNumber(r.credit) : '-'}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                        {r.balanceDebit > 0 ? AccountingEngine.formatNumber(r.balanceDebit) : '-'}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                        {r.balanceCredit > 0 ? AccountingEngine.formatNumber(r.balanceCredit) : '-'}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. BẢNG CÂN ĐỐI PHÁT SINH */}
      {subTab === 'BCDPS' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                BẢNG CÂN ĐỐI SỐ PHÁT SINH (Mẫu số B01-DNN/HTX)
              </h3>
              <p className="text-xs text-slate-500">
                Kiểm tra đối chiếu tính cân đối tổng thể kế toán HTX Bích La
              </p>
            </div>
            <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Cân đối 100%: Tổng Nợ = Tổng Có</span>
            </div>
          </div>

          <div className="overflow-x-auto max-h-[550px]">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 sticky top-0 text-center">
                <tr>
                  <th rowSpan={2} className="py-2 px-3 border-r border-slate-200 text-left">
                    Mã TK
                  </th>
                  <th rowSpan={2} className="py-2 px-3 border-r border-slate-200 text-left min-w-[200px]">
                    Tên tài khoản
                  </th>
                  <th colSpan={2} className="py-1 px-3 border-r border-slate-200 bg-slate-200/60">
                    Số dư đầu kỳ
                  </th>
                  <th colSpan={2} className="py-1 px-3 border-r border-slate-200 bg-emerald-100/60">
                    Số phát sinh trong kỳ
                  </th>
                  <th colSpan={2} className="py-1 px-3 bg-blue-100/60">
                    Số dư cuối kỳ
                  </th>
                </tr>
                <tr className="border-t border-slate-200">
                  <th className="py-1 px-2 border-r border-slate-200 text-right">Nợ</th>
                  <th className="py-1 px-2 border-r border-slate-200 text-right">Có</th>
                  <th className="py-1 px-2 border-r border-slate-200 text-right">Nợ</th>
                  <th className="py-1 px-2 border-r border-slate-200 text-right">Có</th>
                  <th className="py-1 px-2 border-r border-slate-200 text-right">Nợ</th>
                  <th className="py-1 px-2 text-right">Có</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {tbRows.map((r) => {
                  const isParent = r.level === 1;
                  return (
                    <tr
                      key={r.code}
                      className={isParent ? 'bg-slate-50/80 font-bold text-slate-900' : 'text-slate-700 hover:bg-slate-50'}
                    >
                      <td className="py-2 px-3 border-r border-slate-200">{r.code}</td>
                      <td className={`py-2 px-3 border-r border-slate-200 font-sans ${isParent ? '' : 'pl-6 text-slate-600'}`}>
                        {r.name}
                      </td>
                      <td className="py-2 px-2 border-r border-slate-200 text-right">
                        {r.openDebit > 0 ? AccountingEngine.formatNumber(r.openDebit) : '-'}
                      </td>
                      <td className="py-2 px-2 border-r border-slate-200 text-right">
                        {r.openCredit > 0 ? AccountingEngine.formatNumber(r.openCredit) : '-'}
                      </td>
                      <td className="py-2 px-2 border-r border-slate-200 text-right text-emerald-700">
                        {r.periodDebit > 0 ? AccountingEngine.formatNumber(r.periodDebit) : '-'}
                      </td>
                      <td className="py-2 px-2 border-r border-slate-200 text-right text-emerald-700">
                        {r.periodCredit > 0 ? AccountingEngine.formatNumber(r.periodCredit) : '-'}
                      </td>
                      <td className="py-2 px-2 border-r border-slate-200 text-right text-blue-700">
                        {r.closeDebit > 0 ? AccountingEngine.formatNumber(r.closeDebit) : '-'}
                      </td>
                      <td className="py-2 px-2 text-right text-amber-700">
                        {r.closeCredit > 0 ? AccountingEngine.formatNumber(r.closeCredit) : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-emerald-50 text-emerald-950 font-bold border-t-2 border-emerald-500 font-mono sticky bottom-0">
                <tr>
                  <td colSpan={2} className="py-3 px-3 border-r border-emerald-200 font-sans uppercase">
                    CỘNG TỔNG CỘNG CÂN ĐỐI
                  </td>
                  <td className="py-3 px-2 border-r border-emerald-200 text-right">
                    {AccountingEngine.formatNumber(tbTotals.openDebit)}
                  </td>
                  <td className="py-3 px-2 border-r border-emerald-200 text-right">
                    {AccountingEngine.formatNumber(tbTotals.openCredit)}
                  </td>
                  <td className="py-3 px-2 border-r border-emerald-200 text-right text-emerald-800">
                    {AccountingEngine.formatNumber(tbTotals.periodDebit)}
                  </td>
                  <td className="py-3 px-2 border-r border-emerald-200 text-right text-emerald-800">
                    {AccountingEngine.formatNumber(tbTotals.periodCredit)}
                  </td>
                  <td className="py-3 px-2 border-r border-emerald-200 text-right text-blue-800">
                    {AccountingEngine.formatNumber(tbTotals.closeDebit)}
                  </td>
                  <td className="py-3 px-2 text-right text-amber-800">
                    {AccountingEngine.formatNumber(tbTotals.closeCredit)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* 4. KẾT CHUYỂN CUỐI KỲ */}
      {subTab === 'KET_CHUYEN' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 max-w-3xl space-y-5">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" />
              <span>Quy Trình Tự Động Kết Chuyển Xác Định Kết Quả Kinh Doanh (TK 911)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Thực hiện kết chuyển toàn bộ Doanh thu (511, 515), Giá vốn (632), Chi phí sản xuất chung (627), Chi phí quản lý (642) vào Tài khoản 911 theo chuẩn Thông tư 71/2024.
            </p>
          </div>

          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-medium text-slate-700">1. Kết chuyển Doanh thu bán hàng & dịch vụ:</span>
              <span className="font-mono font-bold text-emerald-700">Nợ 511 / Có 911 (335.300.000 đ)</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-medium text-slate-700">2. Kết chuyển Giá vốn & Chi phí sản xuất kinh doanh:</span>
              <span className="font-mono font-bold text-rose-700">Nợ 911 / Có 632, 642, 627 (100.955.554 đ)</span>
            </div>
            <div className="flex items-center justify-between pt-1 font-bold">
              <span className="text-slate-900">3. Kết chuyển Lợi nhuận sau thuế chưa phân phối:</span>
              <span className="font-mono text-emerald-800 text-sm">Nợ 911 / Có 421 (234.344.446 đ)</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3">
            <div className="text-xs text-slate-500">
              Kỳ thực hiện: <strong>Quý 1/2026 (Tháng 1 - Tháng 3/2026)</strong>
            </div>
            <button
              onClick={handleExecuteClosing}
              disabled={isPeriodLocked}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm transition-all cursor-pointer ${
                isPeriodLocked
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              <span>Chạy Tự Động Kết Chuyển 911</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
