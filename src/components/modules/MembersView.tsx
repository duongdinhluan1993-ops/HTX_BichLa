import React, { useState } from 'react';
import {
  Users,
  PlusCircle,
  Award,
  Search,
  CheckCircle2,
  DollarSign,
  PieChart,
  FileSpreadsheet,
  Wheat
} from 'lucide-react';
import { Member } from '../../types/erp';
import { AccountingEngine } from '../../services/accountingEngine';

interface MembersViewProps {
  members: Member[];
  onAddMember: (member: Member) => void;
  onCapitalContribution: (memberId: string, amount: number) => void;
}

export const MembersView: React.FC<MembersViewProps> = ({
  members,
  onAddMember,
  onCapitalContribution
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHamlet, setSelectedHamlet] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDividendsModal, setShowDividendsModal] = useState(false);

  // Add member form state
  const [fullName, setFullName] = useState('');
  const [idCard, setIdCard] = useState('');
  const [phone, setPhone] = useState('');
  const [hamlet, setHamlet] = useState('Thôn Bích La Đông');
  const [farmlandAreaSao, setFarmlandAreaSao] = useState(8);
  const [capitalContribution, setCapitalContribution] = useState(10000000);

  const hamlets = ['Thôn Bích La Đông', 'Thôn Bích La Trung', 'Thôn Bích La Nam', 'Thôn Bích La Bắc'];

  const filteredMembers = members.filter((m) => {
    const matchHamlet = selectedHamlet === 'ALL' || m.hamlet === selectedHamlet;
    const matchSearch =
      m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.phone.includes(searchTerm);
    return matchHamlet && matchSearch;
  });

  const totalCapital = members.reduce((sum, m) => sum + (m.capitalContributed || 0), 0);
  const totalFarmlandSao = members.reduce((sum, m) => sum + (m.landAreaSao || 0), 0);
  const totalFarmlandHa = (totalFarmlandSao * 500) / 10000; // 1 sào Trung Bộ = 500 m2

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName) return;

    const sao = Number(farmlandAreaSao) || 10;
    const capital = Number(capitalContribution) || 10000000;
    const newMember: Member = {
      id: `XV-${Date.now()}`,
      code: `XV-${members.length + 101}`,
      fullName,
      idCard: idCard || '045089001234',
      phone: phone || '0912345678',
      hamlet,
      joinDate: '2026-03-12',
      status: 'ACTIVE',
      landAreaSao: sao,
      landAreaHa: Number((sao * 0.05).toFixed(2)),
      capitalContributed: capital,
      creditLimit: capital * 3,
      currentDebt: 0,
      patronagePoints: 100
    };

    onAddMember(newMember);
    setShowAddModal(false);
    alert(`Đã kết nạp xã viên mới ${newMember.fullName} và ghi nhận vốn góp ${AccountingEngine.formatVND(newMember.capitalContributed)}!`);
  };

  return (
    <div className="space-y-5">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Tổng số xã viên chính thức</span>
            <span className="p-1 rounded bg-blue-50 text-blue-600">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <p className="text-xl font-extrabold text-slate-900">{members.length} Hộ xã viên</p>
          <p className="text-[11px] text-slate-500 mt-1">4 thôn làng cổ Bích La</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Tổng vốn điều lệ góp (TK 411)</span>
            <span className="p-1 rounded bg-emerald-50 text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <p className="text-xl font-extrabold text-emerald-800">
            {AccountingEngine.formatVND(totalCapital)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">100% đã góp đủ theo Luật HTX</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Tổng diện tích đất canh tác</span>
            <span className="p-1 rounded bg-amber-50 text-amber-600">
              <Wheat className="w-4 h-4" />
            </span>
          </div>
          <p className="text-xl font-bold text-slate-900">
            {totalFarmlandSao} Sào ({totalFarmlandHa.toFixed(1)} ha)
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Chuẩn 500m²/sào Trung Bộ</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Phân phối lợi nhuận / Cổ tức</span>
            <span className="p-1 rounded bg-purple-50 text-purple-600">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <p className="text-xl font-bold text-purple-700">12.5% / năm</p>
          <p className="text-[11px] text-slate-500 mt-1">Chia theo vốn & mức độ sd DV</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-sm">
              SỔ QUẢN LÝ XÃ VIÊN & VỐN GÓP ĐIỀU LỆ HTX BÍCH LA
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
              {filteredMembers.length} thành viên
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm mã, họ tên, SĐT..."
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <button
              onClick={() => setShowDividendsModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold rounded-lg border border-blue-200 transition-colors cursor-pointer"
            >
              <PieChart className="w-3.5 h-3.5" />
              <span>Phương án chia cổ tức</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Kết nạp xã viên</span>
            </button>
          </div>
        </div>

        {/* Hamlet Filter Tabs */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-2 text-xs">
          <button
            onClick={() => setSelectedHamlet('ALL')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              selectedHamlet === 'ALL'
                ? 'bg-slate-800 text-white'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tất cả thôn
          </button>
          {hamlets.map((h) => (
            <button
              key={h}
              onClick={() => setSelectedHamlet(h)}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                selectedHamlet === h
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {h}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto max-h-[500px]">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 sticky top-0">
              <tr>
                <th className="py-2.5 px-3">Mã XV</th>
                <th className="py-2.5 px-3">Họ và tên</th>
                <th className="py-2.5 px-3">CCCD / ĐT</th>
                <th className="py-2.5 px-3">Thôn cư trú</th>
                <th className="py-2.5 px-3 text-right">Ruộng canh tác</th>
                <th className="py-2.5 px-3 text-right">Vốn góp (TK 411)</th>
                <th className="py-2.5 px-3 text-center">Tỷ lệ vốn</th>
                <th className="py-2.5 px-3 text-right">Hạn mức vay TD</th>
                <th className="py-2.5 px-3 text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMembers.map((m) => {
                const capitalShare = (((m.capitalContributed || 0) / (totalCapital || 1)) * 100).toFixed(2);
                return (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">{m.code}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">{m.fullName}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">
                      <div>{m.phone}</div>
                      <div className="text-[10px] text-slate-400">{m.idCard}</div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">{m.hamlet}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-slate-800">
                      {m.landAreaSao} sào ({(m.landAreaSao * 0.05).toFixed(2)} ha)
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-800">
                      {AccountingEngine.formatNumber(m.capitalContributed)}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono text-slate-600">
                      {capitalShare}%
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-blue-700 font-semibold">
                      {AccountingEngine.formatNumber(m.creditLimit)}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                        <CheckCircle2 className="w-3 h-3" /> Đang hoạt động
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Kết nạp xã viên mới */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Kết Nạp Xã Viên HTX Bích La Mới</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Họ và tên xã viên</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ví dụ: Lê Thị Hằng"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Số CCCD</label>
                  <input
                    type="text"
                    value={idCard}
                    onChange={(e) => setIdCard(e.target.value)}
                    placeholder="045091002345"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Số điện thoại</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0988 123 456"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Thôn cư trú</label>
                  <select
                    value={hamlet}
                    onChange={(e) => setHamlet(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  >
                    {hamlets.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Diện tích ruộng (Sào)</label>
                  <input
                    type="number"
                    value={farmlandAreaSao}
                    onChange={(e) => setFarmlandAreaSao(Number(e.target.value))}
                    min={1}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Vốn góp ban đầu (VNĐ)</label>
                  <input
                    type="number"
                    value={capitalContribution}
                    onChange={(e) => setCapitalContribution(Number(e.target.value))}
                    step={1000000}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-emerald-800"
                  />
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                Tự động định khoản thu vốn góp: <strong>Nợ TK 1111 / Có TK 4111 ({AccountingEngine.formatVND(capitalContribution)})</strong>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Ghi sổ kết nạp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Phương án chia Cổ tức theo Luật HTX 2023 */}
      {showDividendsModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Phương Án Phân Phối Cổ Tức HTX</h3>
                <p className="text-[11px] text-slate-500">Tuân thủ Luật HTX 2023 & Thông tư 71/2024/TT-BTC</p>
              </div>
              <button onClick={() => setShowDividendsModal(false)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Tổng lợi nhuận sau thuế trích chia cổ tức:</span>
                  <span className="font-bold text-slate-900 font-mono">180.000.000 đ</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-1.5">
                  <span className="text-slate-600">1. Chia theo tỷ lệ vốn góp (40%):</span>
                  <span className="font-bold text-emerald-700 font-mono">72.000.000 đ (12.5%/vốn)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">2. Chia theo mức độ sử dụng dịch vụ HTX (60%):</span>
                  <span className="font-bold text-blue-700 font-mono">108.000.000 đ (theo sản lượng)</span>
                </div>
              </div>

              <p className="text-slate-600 italic">
                * Tỷ lệ 60% phân phối theo mức độ sử dụng dịch vụ nông nghiệp (tiêu thụ lúa, mua phân bón, làm đất, bơm nước) khuyến khích xã viên gắn bó và tiêu thụ sản phẩm qua HTX Bích La.
              </p>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowDividendsModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200"
                >
                  Đóng
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert('Đã duyệt phương án phân phối cổ tức và trích lập quỹ phát triển sản xuất HTX!');
                    setShowDividendsModal(false);
                  }}
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Phê duyệt & Chuyển hạch toán TK 3388
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
