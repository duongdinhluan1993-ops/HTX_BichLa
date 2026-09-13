import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Wallet,
  Building2,
  ShoppingCart,
  Boxes,
  Users,
  BadgePercent,
  Wheat,
  Tractor,
  FileSpreadsheet,
  Database,
  ShieldCheck,
  HelpCircle,
  TrendingUp,
  Landmark
} from 'lucide-react';
import { Role } from '../../types/erp';

export type ActiveTab =
  | 'DASHBOARD'
  | 'DM_TK'
  | 'DM_DOITUONG'
  | 'DM_VATTU'
  | 'PHATSINH'
  | 'NKC'
  | 'SO_CAI'
  | 'SO_PHU'
  | 'CONG_NO'
  | 'XNT'
  | 'KET_CHUYEN'
  | 'BCDPS'
  | 'KQKD'
  | 'LCTT'
  | 'CDKT'
  | 'TMBCTC'
  | 'HUONG_DAN'
  | 'MEMBERS'
  | 'INTERNAL_CREDIT'
  | 'AGRICULTURE'
  | 'FIXED_ASSETS'
  | 'FINANCIAL_REPORTS'
  | 'DATABASE_ERD'
  | 'RBAC';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currentRole: Role;
  onOpenExcelSync?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  currentRole,
  onOpenExcelSync
}) => {
  const menuItems = [
    {
      group: '1. TỔNG QUAN',
      items: [
        { id: 'DASHBOARD', label: 'DASHBOARD - Quản trị 6T', icon: LayoutDashboard, badge: '4 CHỈ SỐ' }
      ]
    },
    {
      group: '2. DANH MỤC',
      items: [
        { id: 'DM_TK', label: 'DM_TK - Hệ thống TK TT71', icon: BookOpen },
        { id: 'DM_DOITUONG', label: 'DM_DOITUONG - Khách hàng/NCC/NV', icon: ShoppingCart },
        { id: 'DM_VATTU', label: 'DM_VATTU - Vật tư hàng hóa', icon: Boxes }
      ]
    },
    {
      group: '3. NHẬP LIỆU',
      items: [
        { id: 'PHATSINH', label: 'PHATSINH - Nhập chứng từ thu/chi', icon: Wallet, badge: 'Thu/Chi' }
      ]
    },
    {
      group: '4. SỔ SÁCH KẾ TOÁN',
      items: [
        { id: 'NKC', label: 'NKC - Nhật ký chung (S01)', icon: BookOpen },
        { id: 'SO_CAI', label: 'SO_CAI - Sổ cái chi tiết theo TK', icon: FileSpreadsheet, badge: 'Lọc chuẩn' },
        { id: 'SO_PHU', label: 'SO_PHU - Sổ phụ TK/đối tượng/tháng', icon: Landmark }
      ]
    },
    {
      group: '5. QUẢN TRỊ & KẾT CHUYỂN',
      items: [
        { id: 'CONG_NO', label: 'CONG_NO - Theo dõi công nợ 131/331', icon: ShoppingCart },
        { id: 'XNT', label: 'XNT - Báo cáo Xuất nhập tồn', icon: Boxes },
        { id: 'KET_CHUYEN', label: 'KET_CHUYEN - Kết chuyển 6 tháng', icon: TrendingUp, badge: 'TK 911' }
      ]
    },
    {
      group: '6. BÁO CÁO TÀI CHÍNH (TT71)',
      items: [
        { id: 'BCDPS', label: 'BCDPS - Bảng cân đối phát sinh', icon: FileSpreadsheet },
        { id: 'KQKD', label: 'KQKD - Báo cáo kết quả KD (B02)', icon: TrendingUp },
        { id: 'LCTT', label: 'LCTT - Lưu chuyển tiền tệ (B03)', icon: Wallet },
        { id: 'CDKT', label: 'CDKT - Cân đối kế toán (B01a)', icon: FileSpreadsheet },
        { id: 'TMBCTC', label: 'TMBCTC - Thuyết minh BCTC', icon: HelpCircle }
      ]
    },
    {
      group: '7. ĐẶC THÙ HỢP TÁC XÃ',
      items: [
        { id: 'MEMBERS', label: 'Xã viên, Vốn góp & Ruộng đất', icon: Users, badge: '168 Hộ' },
        { id: 'INTERNAL_CREDIT', label: 'Tín dụng nội bộ Xã viên', icon: BadgePercent, badge: '0.65%' },
        { id: 'AGRICULTURE', label: 'Quản lý Vụ mùa nông nghiệp', icon: Wheat, badge: 'Đông Xuân' },
        { id: 'FIXED_ASSETS', label: 'Tài sản cố định (Trạm bơm, máy cày)', icon: Tractor },
        { id: 'DATABASE_ERD', label: 'Kiến trúc ERD 100+ Bảng', icon: Database },
        { id: 'HUONG_DAN', label: 'HUONG_DAN - Hướng dẫn sử dụng', icon: HelpCircle }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col shrink-0 border-r border-slate-800 select-none h-screen sticky top-0 z-30">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-950/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-900/30">
            BL
          </div>
          <div className="overflow-hidden">
            <h1 className="font-bold text-sm tracking-wide text-white truncate leading-snug">
              HTX NÔNG NGHIỆP BÍCH LA
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] font-semibold text-emerald-400">ERP Kế toán TT 71</span>
            </div>
          </div>
        </div>
        <div className="mt-2.5 px-2 py-1 rounded bg-slate-800/70 text-[10px] text-slate-400 flex items-center justify-between border border-slate-700/50">
          <span>Chuẩn MISA / FAST</span>
          <span className="text-emerald-400 font-mono font-medium">v6.2 PRO</span>
        </div>
        {onOpenExcelSync && (
          <button
            onClick={onOpenExcelSync}
            className="w-full mt-2 py-1.5 px-2.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Nạp / Đồng bộ Excel V6</span>
          </button>
        )}
      </div>

      {/* Navigation Scroll */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4 text-xs">
        {menuItems.map((sec, idx) => (
          <div key={idx} className="space-y-1">
            <p className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              {sec.group}
            </p>
            {sec.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => setActiveTab(item.id as ActiveTab)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all group ${
                    isActive
                      ? 'bg-emerald-600 text-white font-medium shadow-md shadow-emerald-900/40'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-400'
                      }`}
                    />
                    <span className="truncate text-xs">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold tracking-tight shrink-0 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Role indicator */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40 text-[11px]">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-[10px]">Đang đăng nhập:</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/60">
            {currentRole}
          </span>
        </div>
        <p className="text-slate-300 font-medium truncate mt-0.5">HTX NN Bích La - Triệu Phong</p>
      </div>
    </aside>
  );
};
