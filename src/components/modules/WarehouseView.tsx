import React, { useState } from 'react';
import {
  Boxes,
  PlusCircle,
  AlertTriangle,
  FileSpreadsheet,
  Search,
  CheckCircle2,
  TrendingDown,
  Warehouse
} from 'lucide-react';
import { MaterialItem } from '../../types/erp';
import { AccountingEngine } from '../../services/accountingEngine';

interface WarehouseViewProps {
  materials: MaterialItem[];
  onAddStock: (materialId: string, quantity: number) => void;
  onIssueStock: (materialId: string, quantity: number) => void;
}

export const WarehouseView: React.FC<WarehouseViewProps> = ({
  materials,
  onAddStock,
  onIssueStock
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('ALL');
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [selectedMat, setSelectedMat] = useState<MaterialItem | null>(null);
  const [qty, setQty] = useState(10);

  const totalStockValue = materials.reduce(
    (sum, m) => sum + m.stockQuantity * m.costPrice,
    0
  );

  const filtered = materials.filter((m) => {
    const matchWh = selectedWarehouse === 'ALL' || m.warehouseCode === selectedWarehouse;
    const matchSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchWh && matchSearch;
  });

  const lowStockCount = materials.filter((m) => m.stockQuantity <= m.minStock).length;

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMat || qty <= 0) return;
    onIssueStock(selectedMat.id, Number(qty));
    setShowIssueModal(false);
    alert(`Đã xuất kho ${qty} ${selectedMat.unit} ${selectedMat.name} và tự động sinh bút toán Nợ 621 / Có 152!`);
  };

  return (
    <div className="space-y-5">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Tổng giá trị tồn kho (TK 152)</span>
            <span className="p-1 rounded bg-indigo-50 text-indigo-600">
              <Boxes className="w-4 h-4" />
            </span>
          </div>
          <p className="text-xl font-extrabold text-slate-900">
            {AccountingEngine.formatVND(totalStockValue)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Tính theo đơn giá bình quân gia quyền</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Tổng danh mục vật tư</span>
            <span className="p-1 rounded bg-emerald-50 text-emerald-600">
              <Warehouse className="w-4 h-4" />
            </span>
          </div>
          <p className="text-xl font-bold text-slate-900">{materials.length} Mặt hàng</p>
          <p className="text-[11px] text-slate-500 mt-1">Phân bón, lúa giống & thuốc BVTV</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Kho trung tâm HTX</span>
            <span className="p-1 rounded bg-blue-50 text-blue-600 font-bold text-xs">KHO-01</span>
          </div>
          <p className="text-xl font-bold text-blue-700">Sức chứa 500 tấn</p>
          <p className="text-[11px] text-slate-500 mt-1">Trụ sở HTX Bích La Đông</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Cảnh báo dưới định mức tồn</span>
            <span className="p-1 rounded bg-amber-50 text-amber-600">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <p className="text-xl font-bold text-amber-600">{lowStockCount} Mặt hàng</p>
          <p className="text-[11px] text-slate-500 mt-1">Cần nhập bổ sung cho đợt bón thúc</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-sm">
              BẢNG TỔNG HỢP XUẤT NHẬP TỒN VẬT TƯ NÔNG NGHIỆP
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
              Kỳ Vụ Đông Xuân 2026
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm mã vật tư, tên phân bón..."
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto max-h-[500px]">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 sticky top-0">
              <tr>
                <th className="py-2.5 px-3">Mã VT</th>
                <th className="py-2.5 px-3 min-w-[200px]">Tên quy cách vật tư</th>
                <th className="py-2.5 px-3 text-center">ĐVT</th>
                <th className="py-2.5 px-3 text-center">Kho</th>
                <th className="py-2.5 px-3 text-right">Giá vốn nhập</th>
                <th className="py-2.5 px-3 text-right">Giá bán xã viên</th>
                <th className="py-2.5 px-3 text-right">Số lượng tồn</th>
                <th className="py-2.5 px-3 text-right">Thành tiền tồn kho</th>
                <th className="py-2.5 px-3 text-center">Định mức</th>
                <th className="py-2.5 px-3 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filtered.map((m) => {
                const isLow = m.stockQuantity <= m.minStock;
                return (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-emerald-700">{m.code}</td>
                    <td className="py-2.5 px-3 font-sans font-semibold text-slate-900">{m.name}</td>
                    <td className="py-2.5 px-3 text-center font-sans text-slate-600">{m.unit}</td>
                    <td className="py-2.5 px-3 text-center text-slate-600">{m.warehouseCode}</td>
                    <td className="py-2.5 px-3 text-right text-slate-800">
                      {AccountingEngine.formatNumber(m.costPrice)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-700">
                      {AccountingEngine.formatNumber(m.salePrice)}
                    </td>
                    <td
                      className={`py-2.5 px-3 text-right font-bold ${
                        isLow ? 'text-rose-600' : 'text-slate-900'
                      }`}
                    >
                      {AccountingEngine.formatNumber(m.stockQuantity)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-indigo-800">
                      {AccountingEngine.formatNumber(m.stockQuantity * m.costPrice)}
                    </td>
                    <td className="py-2.5 px-3 text-center font-sans">
                      {isLow ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                          Sắp hết
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                          An toàn
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-center font-sans">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => {
                            setSelectedMat(m);
                            setShowIssueModal(true);
                          }}
                          className="px-2 py-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded border border-emerald-200 cursor-pointer"
                        >
                          Xuất kho
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Xuất kho vật tư */}
      {showIssueModal && selectedMat && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Lập Phiếu Xuất Kho Vật Tư</h3>
              <button onClick={() => setShowIssueModal(false)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>
            <form onSubmit={handleIssueSubmit} className="p-6 space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                <p>Mặt hàng: <strong className="text-slate-900">{selectedMat.name}</strong></p>
                <p>Tồn hiện tại trong kho: <strong className="text-emerald-700">{selectedMat.stockQuantity} {selectedMat.unit}</strong></p>
                <p>Đơn giá xuất kho: <strong className="font-mono">{AccountingEngine.formatVND(selectedMat.costPrice)} / {selectedMat.unit}</strong></p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Số lượng xuất kho ({selectedMat.unit})</label>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  max={selectedMat.stockQuantity}
                  min={1}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 font-semibold">
                Tổng giá vốn xuất: {AccountingEngine.formatVND(qty * selectedMat.costPrice)}
                <p className="text-[10px] text-slate-500 font-normal mt-0.5">
                  Định khoản tự động: Nợ TK 621 (Chi phí NVL trực tiếp) / Có TK 152
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowIssueModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Xác nhận Xuất kho
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
