import React from 'react';
import { ShieldCheck, Check, X, UserCheck } from 'lucide-react';
import { Role } from '../../types/erp';

interface RBACPermissionsViewProps {
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
}

export const RBACPermissionsView: React.FC<RBACPermissionsViewProps> = ({
  currentRole,
  setCurrentRole
}) => {
  const roles: { id: Role; title: string; desc: string; color: string }[] = [
    {
      id: 'ADMIN',
      title: 'Admin Hệ Thống',
      desc: 'Quản trị kỹ thuật, phân quyền người dùng, sao lưu & phục hồi CSDL PostgreSQL.',
      color: 'border-purple-500 bg-purple-50 text-purple-900'
    },
    {
      id: 'CHIEF_ACCOUNTANT',
      title: 'Kế toán trưởng',
      desc: 'Phê duyệt chứng từ, khóa/mở sổ kỳ kế toán, chạy kết chuyển 911, ký BCTC TT 71.',
      color: 'border-emerald-500 bg-emerald-50 text-emerald-900'
    },
    {
      id: 'ACCOUNTANT',
      title: 'Kế toán viên',
      desc: 'Lập chứng từ phát sinh, ghi sổ Nhật ký chung, theo dõi công nợ 131/331, theo dõi TSCĐ.',
      color: 'border-blue-500 bg-blue-50 text-blue-900'
    },
    {
      id: 'TREASURER',
      title: 'Thủ quỹ',
      desc: 'Thực hiện thu/chi tiền mặt tại két, in phiếu thu chi, đối chiếu số dư sổ quỹ TK 111.',
      color: 'border-amber-500 bg-amber-50 text-amber-900'
    },
    {
      id: 'WAREHOUSE_KEEPER',
      title: 'Thủ kho vật tư',
      desc: 'Lập phiếu nhập kho, phiếu xuất kho phân bón giống lúa, theo dõi thẻ kho và định mức tồn.',
      color: 'border-indigo-500 bg-indigo-50 text-indigo-900'
    },
    {
      id: 'BOARD_DIRECTOR',
      title: 'Ban Quản Trị / Giám Đốc',
      desc: 'Giám sát 20 KPI điều hành, duyệt hạn mức tín dụng nội bộ xã viên, duyệt phương án cổ tức.',
      color: 'border-teal-500 bg-teal-50 text-teal-900'
    }
  ];

  const permissionsMatrix = [
    { module: 'Dashboard Ban Quản Trị (20 KPI)', admin: true, ca: true, acc: true, tr: false, wh: false, bd: true },
    { module: 'Lập chứng từ Kế toán (PT/PC/UNC)', admin: true, ca: true, acc: true, tr: true, wh: false, bd: false },
    { module: 'Phê duyệt chứng từ Kế toán', admin: true, ca: true, acc: false, tr: false, wh: false, bd: false },
    { module: 'Khóa / Mở sổ kỳ kế toán', admin: true, ca: true, acc: false, tr: false, wh: false, bd: false },
    { module: 'Chạy Kết chuyển cuối kỳ (TK 911)', admin: true, ca: true, acc: false, tr: false, wh: false, bd: false },
    { module: 'In ấn Phiếu Thu / Phiếu Chi A4', admin: true, ca: true, acc: true, tr: true, wh: false, bd: false },
    { module: 'Lập Phiếu Nhập / Xuất kho vật tư', admin: true, ca: true, acc: true, tr: false, wh: true, bd: false },
    { module: 'Quản lý Hồ sơ Xã viên & Vốn góp', admin: true, ca: true, acc: true, tr: false, wh: false, bd: true },
    { module: 'Giải ngân & Thu nợ Tín dụng nội bộ', admin: true, ca: true, acc: true, tr: true, wh: false, bd: true },
    { module: 'Trích khấu hao TSCĐ & Trạm bơm', admin: true, ca: true, acc: true, tr: false, wh: false, bd: false },
    { module: 'Xem & In Báo cáo Tài chính TT 71', admin: true, ca: true, acc: true, tr: false, wh: false, bd: true },
    { module: 'Cấu hình CSDL PostgreSQL & DDL', admin: true, ca: false, acc: false, tr: false, wh: false, bd: false }
  ];

  return (
    <div className="space-y-6">
      {/* Role Selection Cards */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Chọn vai trò trải nghiệm hệ thống (RBAC Testing)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {roles.map((r) => {
            const isCurrent = currentRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setCurrentRole(r.id)}
                className={`p-4 rounded-xl text-left border-2 transition-all cursor-pointer ${
                  isCurrent ? r.color : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs">{r.title}</span>
                  {isCurrent && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-white/80 text-emerald-800 border border-emerald-300">
                      ĐANG KÍCH HOẠT
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">{r.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Permissions Matrix Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h4 className="font-bold text-slate-900 text-sm">
            MA TRẬN PHÂN QUYỀN TRUY CẬP HỆ THỐNG ERP BÍCH LA (RBAC MATRIX)
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Phân định rõ ràng trách nhiệm nghiệp vụ kế toán, thủ quỹ, thủ kho và người có thẩm quyền ký duyệt
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 text-center">
              <tr>
                <th className="py-2.5 px-4 text-left min-w-[240px]">Chức năng / Phân hệ</th>
                <th className="py-2.5 px-3">Admin</th>
                <th className="py-2.5 px-3">Kế toán trưởng</th>
                <th className="py-2.5 px-3">Kế toán viên</th>
                <th className="py-2.5 px-3">Thủ quỹ</th>
                <th className="py-2.5 px-3">Thủ kho</th>
                <th className="py-2.5 px-3">Ban Quản Trị</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissionsMatrix.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80">
                  <td className="py-2.5 px-4 font-semibold text-slate-900">{p.module}</td>
                  <td className="py-2.5 px-3 text-center">
                    {p.admin ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {p.ca ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {p.acc ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {p.tr ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {p.wh ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {p.bd ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
