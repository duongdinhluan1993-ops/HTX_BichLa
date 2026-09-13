import React from 'react';
import {
  HelpCircle,
  CheckCircle2,
  BookOpen,
  Wheat,
  BadgePercent,
  FileSpreadsheet,
  Boxes,
  ArrowRight
} from 'lucide-react';

export const UserGuideView: React.FC = () => {
  const steps = [
    {
      title: '1. Quy trình Hạch toán Tự động (Automated Accounting Flow)',
      content:
        'Tất cả các chứng từ kinh tế phát sinh (Phiếu Thu PT, Phiếu Chi PC, Ủy nhiệm chi UNC, Phiếu Nhập Kho PNK, Phiếu Xuất Kho PXK, Hợp đồng Tín dụng) ngay khi được lưu và duyệt sẽ TỰ ĐỘNG sinh bút toán đối ứng Nợ/Có vào Sổ Nhật Ký Chung. Đồng thời tự động nhảy số liệu vào Sổ Cái từng tài khoản, Bảng Cân Đối Phát Sinh và 20 KPI trên Dashboard realtime mà không cần kế toán phải định khoản lại thủ công.',
      icon: BookOpen
    },
    {
      title: '2. Nghiệp vụ Quản lý Xã viên & Vốn góp (Luật HTX 2023 & TT 71)',
      content:
        'Theo dõi hồ sơ 168 xã viên trên 4 thôn làng cổ Bích La (Bích La Đông, Trung, Nam, Bắc) cùng diện tích ruộng canh tác (chuẩn sào Trung Bộ 500m²). Khi kết nạp hoặc góp vốn: Nợ TK 1111 / Có TK 4111. Cuối năm tài chính, lợi nhuận sau thuế được phân phối theo 2 tiêu chí luật định: 40% chia theo tỷ lệ vốn góp + 60% chia theo mức độ sử dụng dịch vụ nông nghiệp của HTX.',
      icon: CheckCircle2
    },
    {
      title: '3. Nghiệp vụ Tín dụng nội bộ Xã viên (TK 1281 & TK 515)',
      content:
        'HTX cho xã viên vay vốn sản xuất nông nghiệp hoặc ứng trước phân bón/lúa giống đầu vụ: Nợ TK 1281 / Có TK 1111 (hoặc Có TK 152). Lãi suất áp dụng theo Nghị quyết ĐH Xã viên là 0.65%/tháng. Khi thu lãi: Nợ TK 1111 / Có TK 515 (Doanh thu tài chính). Khi thu nợ gốc: Nợ TK 1111 / Có TK 1281. Sau vụ lúa, xã viên có thể thanh toán bằng tiền mặt hoặc cấn trừ trực tiếp qua sản lượng thóc thương phẩm bao tiêu.',
      icon: BadgePercent
    },
    {
      title: '4. Nghiệp vụ Kho vật tư, Trạm bơm & Vụ mùa Đông Xuân',
      content:
        'Nhập kho phân bón (NPK Bình Điền, Urê Phú Mỹ, lúa giống TBR225): Nợ TK 152 / Có TK 331. Khi xuất kho cấp phát cho các xứ đồng: Nợ TK 621 (hoặc 154) / Có TK 152 theo phương pháp bình quân gia quyền. Chi phí điện vận hành 3 tổ máy bơm nước từ sông Thạch Hãn và trích khấu hao trạm bơm được hạch toán Nợ TK 627 / Có TK 112, 214.',
      icon: Wheat
    },
    {
      title: '5. Kết chuyển cuối kỳ TK 911 & Báo cáo Tài chính Thông tư 71',
      content:
        'Cuối quý hoặc cuối năm, Kế toán trưởng chạy chức năng "Chạy Tự Động Kết Chuyển 911": Tự động kết chuyển doanh thu bán hàng & dịch vụ (Nợ 511 / Có 911), doanh thu tài chính (Nợ 515 / Có 911), chi phí giá vốn (Nợ 911 / Có 632) và chi phí quản lý (Nợ 911 / Có 642). Chênh lệch lãi chuyển vào Nợ 911 / Có 421. Toàn bộ Báo cáo tài chính B01a (Bảng CĐKT), B02 (KQKD), B03 (LCTT) được xuất theo đúng biểu mẫu pháp lý của Bộ Tài Chính.',
      icon: FileSpreadsheet
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl pb-10">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Sổ Tay Hướng Dẫn Tác Nghiệp Kế Toán ERP HTX Bích La
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Cẩm nang nghiệp vụ tuân thủ Thông tư 71/2024/TT-BTC và Luật Hợp tác xã số 17/2023/QH15
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step Cards */}
      <div className="space-y-4">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{s.title}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-9">{s.content}</p>
            </div>
          );
        })}
      </div>

      {/* Contact & Support Note */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
        <div>
          <span className="font-bold text-slate-800">Đơn vị triển khai:</span> Hợp tác xã Nông nghiệp Bích La
          <p className="text-[11px] text-slate-400 mt-0.5">Xã Triệu Đông, huyện Triệu Phong, tỉnh Quảng Trị</p>
        </div>
        <div className="text-right">
          <span className="font-semibold text-emerald-700">Hỗ trợ kỹ thuật: 0233 382 9112</span>
          <p className="text-[11px] text-slate-400">Phiên bản ERP v6.2 PRO</p>
        </div>
      </div>
    </div>
  );
};
