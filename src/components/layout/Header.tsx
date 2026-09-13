import React from 'react';
import {
  Bell,
  Search,
  PlusCircle,
  FileDown,
  Shield,
  Radio,
  Calendar,
  Building,
  Printer,
  FileSpreadsheet,
  RotateCcw
} from 'lucide-react';
import { Role } from '../../types/erp';

interface HeaderProps {
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  onOpenCreateVoucher: () => void;
  onTriggerPrint: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onOpenExcelSync?: () => void;
  onOpenResetData?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  setCurrentRole,
  onOpenCreateVoucher,
  onTriggerPrint,
  searchTerm,
  setSearchTerm,
  onOpenExcelSync,
  onOpenResetData
}) => {
  const roleNames: Record<Role, string> = {
    ADMIN: 'Admin Hệ Thống',
    CHIEF_ACCOUNTANT: 'Kế toán trưởng',
    ACCOUNTANT: 'Kế toán viên',
    TREASURER: 'Thủ quỹ',
    WAREHOUSE_KEEPER: 'Thủ kho',
    BOARD_DIRECTOR: 'Ban Quản Trị HTX'
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      {/* Left: Unit branding & Period */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-slate-800">
          <Building className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-900 tracking-tight">
                HTX NÔNG NGHIỆP BÍCH LA
              </span>
              <span className="text-[11px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                Thông tư 71
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Xã Triệu Đông, huyện Triệu Phong, Quảng Trị</p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 pl-4 border-l border-slate-200 text-xs text-slate-600">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Kỳ hạch toán:</span>
          <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
            Năm 2026 - Quý 1
          </span>
        </div>
      </div>

      {/* Middle: Search bar */}
      <div className="hidden md:flex items-center relative max-w-xs w-full mx-4">
        <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
        <input
          id="header-search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm chứng từ, xã viên, vật tư..."
          className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800 placeholder-slate-400"
        />
      </div>

      {/* Right: Actions, RBAC Switcher, Status */}
      <div className="flex items-center gap-3">
        {/* Realtime Websocket indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>Websocket: Live</span>
        </div>

        {/* Excel Sync button */}
        {onOpenExcelSync && (
          <button
            id="btn-excel-sync"
            onClick={onOpenExcelSync}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 text-xs font-bold rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Đồng bộ Excel V6</span>
          </button>
        )}

        {/* Reset / Clear Data button */}
        {onOpenResetData && (
          <button
            id="btn-reset-data"
            onClick={onOpenResetData}
            title="Xóa dữ liệu & Bắt đầu lại từ đầu"
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Xóa & Nhập mới</span>
          </button>
        )}

        {/* Quick action button */}
        <button
          id="btn-quick-new-voucher"
          onClick={onOpenCreateVoucher}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Lập chứng từ</span>
        </button>

        {/* Print button */}
        <button
          id="btn-print-voucher"
          onClick={onTriggerPrint}
          title="In chứng từ hiện hành"
          className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
        >
          <Printer className="w-4 h-4" />
        </button>

        {/* RBAC Role Selector for quick testing */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <Shield className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
          <select
            id="rbac-role-select"
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value as Role)}
            className="text-xs bg-transparent border-0 font-medium text-slate-700 focus:outline-none cursor-pointer pr-2"
          >
            <option value="ADMIN">Admin (Toàn quyền)</option>
            <option value="CHIEF_ACCOUNTANT">Kế toán trưởng (Duyệt/Khóa)</option>
            <option value="ACCOUNTANT">Kế toán viên (Nhập liệu)</option>
            <option value="TREASURER">Thủ quỹ (Thu chi)</option>
            <option value="WAREHOUSE_KEEPER">Thủ kho (Nhập xuất)</option>
            <option value="BOARD_DIRECTOR">Ban Quản Trị (Xem Dashboard)</option>
          </select>
        </div>
      </div>
    </header>
  );
};
