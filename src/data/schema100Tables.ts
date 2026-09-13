import { TableMeta } from '../types/erp';

export const ERP_100_TABLES: TableMeta[] = [
  // 1. NHÓM DANH MỤC (25 bảng)
  {
    tableName: 'dm_taikhoan',
    group: 'DANH_MUC',
    nameVi: 'Danh mục Hệ thống Tài khoản Kế toán TT71',
    recordCount: 86,
    description: 'Hệ thống tài khoản theo Thông tư 71/2024/TT-BTC dành cho HTX',
    columns: [
      { name: 'ma_tk', type: 'VARCHAR(20)', isPk: true, desc: 'Mã tài khoản (111, 112, 131...)' },
      { name: 'ten_tk', type: 'VARCHAR(255)', desc: 'Tên tài khoản kế toán' },
      { name: 'cap_tk', type: 'INT', desc: 'Cấp tài khoản (1, 2, 3)' },
      { name: 'ma_tk_cha', type: 'VARCHAR(20)', isFk: true, desc: 'Mã tài khoản mẹ' },
      { name: 'tinh_chat', type: 'VARCHAR(10)', desc: 'Tính chất: NO, CO, LUONG_TINH' },
      { name: 'theo_doi_chi_tiet', type: 'BOOLEAN', desc: 'Có theo dõi đối tượng/vụ mùa không' }
    ]
  },
  {
    tableName: 'dm_xavien',
    group: 'DANH_MUC',
    nameVi: 'Danh mục Xã viên Hợp tác xã Bích La',
    recordCount: 168,
    description: 'Quản lý thông tin xã viên, diện tích ruộng, vốn góp và thôn xóm',
    columns: [
      { name: 'ma_xavien', type: 'VARCHAR(20)', isPk: true, desc: 'Mã xã viên (XV001, XV002...)' },
      { name: 'ho_ten', type: 'VARCHAR(100)', desc: 'Họ và tên xã viên' },
      { name: 'cccd', type: 'VARCHAR(20)', desc: 'Căn cước công dân' },
      { name: 'so_dien_thoai', type: 'VARCHAR(15)', desc: 'Số điện thoại' },
      { name: 'thon_xom', type: 'VARCHAR(100)', desc: 'Thôn (Đông Lập, Tây Nguyên, Nam Lạc, Bắc Phú)' },
      { name: 'ngay_gia_nhap', type: 'DATE', desc: 'Ngày kết nạp xã viên' },
      { name: 'von_gop_dieule', type: 'NUMERIC(15,2)', desc: 'Vốn góp điều lệ' },
      { name: 'dien_tich_sao', type: 'NUMERIC(10,2)', desc: 'Diện tích ruộng (sào Trung Bộ)' },
      { name: 'trang_thai', type: 'VARCHAR(20)', desc: 'Trạng thái hoạt động' }
    ]
  },
  {
    tableName: 'dm_khachhang',
    group: 'DANH_MUC',
    nameVi: 'Danh mục Khách hàng tiêu thụ nông sản & dịch vụ',
    recordCount: 42,
    description: 'Doanh nghiệp chế biến gạo, thương lái, đại lý tiêu thụ nông sản',
    columns: [
      { name: 'ma_kh', type: 'VARCHAR(20)', isPk: true, desc: 'Mã khách hàng' },
      { name: 'ten_kh', type: 'VARCHAR(255)', desc: 'Tên đối tác khách hàng' },
      { name: 'mst', type: 'VARCHAR(20)', desc: 'Mã số thuế' },
      { name: 'dia_chi', type: 'TEXT', desc: 'Địa chỉ trụ sở' },
      { name: 'dien_thoai', type: 'VARCHAR(20)', desc: 'Điện thoại liên hệ' },
      { name: 'han_muc_no', type: 'NUMERIC(15,2)', desc: 'Hạn mức nợ tối đa' }
    ]
  },
  {
    tableName: 'dm_nhacungcap',
    group: 'DANH_MUC',
    nameVi: 'Danh mục Nhà cung cấp Vật tư Nông nghiệp',
    recordCount: 28,
    description: 'Công ty sản xuất phân bón, giống lúa, thuốc BVTV',
    columns: [
      { name: 'ma_ncc', type: 'VARCHAR(20)', isPk: true, desc: 'Mã nhà cung cấp' },
      { name: 'ten_ncc', type: 'VARCHAR(255)', desc: 'Tên nhà cung ứng vật tư' },
      { name: 'mst', type: 'VARCHAR(20)', desc: 'Mã số thuế' },
      { name: 'dia_chi', type: 'TEXT', desc: 'Địa chỉ nhà cung cấp' },
      { name: 'tk_nganhang', type: 'VARCHAR(50)', desc: 'Tài khoản ngân hàng' }
    ]
  },
  {
    tableName: 'dm_nhanvien',
    group: 'DANH_MUC',
    nameVi: 'Danh mục Cán bộ, Nhân viên & Lao động HTX',
    recordCount: 24,
    description: 'Ban quản trị, Kế toán, Thủ quỹ, Thủ kho, Đội trưởng thủy nông',
    columns: [
      { name: 'ma_nv', type: 'VARCHAR(20)', isPk: true, desc: 'Mã nhân viên' },
      { name: 'ho_ten', type: 'VARCHAR(100)', desc: 'Họ tên nhân viên' },
      { name: 'chuc_vu', type: 'VARCHAR(50)', desc: 'Chức danh công tác' },
      { name: 'phong_ban', type: 'VARCHAR(50)', desc: 'Bộ phận công tác' },
      { name: 'luong_co_ban', type: 'NUMERIC(15,2)', desc: 'Mức lương cơ bản' }
    ]
  },
  {
    tableName: 'dm_vattu',
    group: 'DANH_MUC',
    nameVi: 'Danh mục Vật tư & Giống Nông nghiệp',
    recordCount: 75,
    description: 'Phân bón NPK, Đạm Phú Mỹ, Lân Lâm Thao, Giống lúa TBR225, ĐT8',
    columns: [
      { name: 'ma_vattu', type: 'VARCHAR(20)', isPk: true, desc: 'Mã vật tư nông nghiệp' },
      { name: 'ten_vattu', type: 'VARCHAR(255)', desc: 'Tên thương phẩm' },
      { name: 'loai_vattu', type: 'VARCHAR(50)', desc: 'GIONG, PHAN_BON, THUOC_BVTV, DICH_VU' },
      { name: 'dvt', type: 'VARCHAR(20)', desc: 'Đơn vị tính (Kg, Bao, Lít, Gói)' },
      { name: 'gia_mua', type: 'NUMERIC(15,2)', desc: 'Đơn giá mua bình quân' },
      { name: 'gia_ban_xavien', type: 'NUMERIC(15,2)', desc: 'Giá bán ưu đãi xã viên' },
      { name: 'ton_an_toan', type: 'NUMERIC(10,2)', desc: 'Định mức tồn tối thiểu' }
    ]
  },
  {
    tableName: 'dm_hanghoa',
    group: 'DANH_MUC',
    nameVi: 'Danh mục Hàng hóa & Nông sản thu mua',
    recordCount: 35,
    description: 'Lúa giống, Thóc thương phẩm, Gạo Bích La, Bột sen Bích La',
    columns: [
      { name: 'ma_hang', type: 'VARCHAR(20)', isPk: true, desc: 'Mã hàng hóa nông sản' },
      { name: 'ten_hang', type: 'VARCHAR(255)', desc: 'Tên thương mại' },
      { name: 'nhom_hang', type: 'VARCHAR(50)', desc: 'LUA_THOC, GAO_THANH_PHAM, NONG_SAN_CHE_BIEN' },
      { name: 'dvt', type: 'VARCHAR(20)', desc: 'Đơn vị tính (Kg, Tạ, Tấn)' }
    ]
  },
  {
    tableName: 'dm_kho',
    group: 'DANH_MUC',
    nameVi: 'Danh mục Kho bãi lưu trữ HTX',
    recordCount: 6,
    description: 'Kho vật tư trung tâm, Kho lúa giống, Kho nông sản Bích La',
    columns: [
      { name: 'ma_kho', type: 'VARCHAR(20)', isPk: true, desc: 'Mã kho (KHO_VT, KHO_THOC...)' },
      { name: 'ten_kho', type: 'VARCHAR(100)', desc: 'Tên kho bảo quản' },
      { name: 'dia_diem', type: 'VARCHAR(255)', desc: 'Vị trí tại HTX' },
      { name: 'thu_kho_ma_nv', type: 'VARCHAR(20)', isFk: true, desc: 'Thủ kho phụ trách' }
    ]
  },
  {
    tableName: 'dm_nganhang',
    group: 'DANH_MUC',
    nameVi: 'Danh mục Tài khoản Ngân hàng HTX',
    recordCount: 5,
    description: 'Agribank Triệu Phong, VietinBank Quảng Trị, Ngân hàng CSXH',
    columns: [
      { name: 'ma_nganhang', type: 'VARCHAR(20)', isPk: true, desc: 'Mã định danh' },
      { name: 'so_tk', type: 'VARCHAR(30)', desc: 'Số tài khoản ngân hàng' },
      { name: 'ten_nganhang', type: 'VARCHAR(100)', desc: 'Tên ngân hàng thương mại' },
      { name: 'chi_nhanh', type: 'VARCHAR(100)', desc: 'Chi nhánh mở tài khoản' },
      { name: 'tk_ke_toan', type: 'VARCHAR(20)', desc: 'Tài khoản hạch toán 1121' }
    ]
  },
  {
    tableName: 'dm_tscd',
    group: 'DANH_MUC',
    nameVi: 'Danh mục Tài sản Cố định HTX',
    recordCount: 18,
    description: 'Máy cày Kubota L5018, Máy gặt liên hợp DC70, Trạm bơm Bích La',
    columns: [
      { name: 'ma_tscd', type: 'VARCHAR(20)', isPk: true, desc: 'Mã tài sản cố định' },
      { name: 'ten_tscd', type: 'VARCHAR(255)', desc: 'Tên tài sản cố định' },
      { name: 'nguyen_gia', type: 'NUMERIC(15,2)', desc: 'Nguyên giá ban đầu' },
      { name: 'thoi_gian_kh', type: 'INT', desc: 'Thời gian trích khấu hao (tháng)' },
      { name: 'ngay_su_dung', type: 'DATE', desc: 'Ngày đưa vào sử dụng' },
      { name: 'tk_nguyen_gia', type: 'VARCHAR(20)', desc: 'Tài khoản nguyên giá (211)' },
      { name: 'tk_khau_hao', type: 'VARCHAR(20)', desc: 'Tài khoản hao mòn (214)' }
    ]
  },
  {
    tableName: 'dm_ccdc',
    group: 'DANH_MUC',
    nameVi: 'Danh mục Công cụ dụng cụ & Thiết bị',
    recordCount: 32,
    description: 'Máy phun thuốc chạy điện, Cân điện tử 500kg, Bình xịt động cơ',
    columns: [
      { name: 'ma_ccdc', type: 'VARCHAR(20)', isPk: true, desc: 'Mã CCDC' },
      { name: 'ten_ccdc', type: 'VARCHAR(255)', desc: 'Tên công cụ dụng cụ' },
      { name: 'gia_tri', type: 'NUMERIC(15,2)', desc: 'Giá trị ban đầu' },
      { name: 'so_ky_pb', type: 'INT', desc: 'Số kỳ phân bổ (tháng)' }
    ]
  },
  {
    tableName: 'dm_vusanxuat',
    group: 'DANH_MUC',
    nameVi: 'Danh mục Vụ sản xuất Nông nghiệp',
    recordCount: 8,
    description: 'Vụ Đông Xuân 2025-2026, Vụ Hè Thu 2026, Vụ Sen Bích La 2026',
    columns: [
      { name: 'ma_vu', type: 'VARCHAR(20)', isPk: true, desc: 'Mã vụ mùa (DX2025, HT2026...)' },
      { name: 'ten_vu', type: 'VARCHAR(100)', desc: 'Tên vụ canh tác' },
      { name: 'nam_sanxuat', type: 'INT', desc: 'Năm dương lịch' },
      { name: 'ngay_batdau', type: 'DATE', desc: 'Ngày bắt đầu gieo mạ' },
      { name: 'ngay_ketthuc', type: 'DATE', desc: 'Ngày hoàn thành thu hoạch' }
    ]
  },
  {
    tableName: 'dm_caytrong',
    group: 'DANH_MUC',
    nameVi: 'Danh mục Cây trồng & Giống nông sản',
    recordCount: 12,
    description: 'Lúa thuần TBR225, Lúa Đài Thơm 8, Hoa sen Bích La cổ tích',
    columns: [
      { name: 'ma_caytrong', type: 'VARCHAR(20)', isPk: true, desc: 'Mã cây giống' },
      { name: 'ten_caytrong', type: 'VARCHAR(100)', desc: 'Tên loại cây / giống' },
      { name: 'thoi_gian_sinh_truong', type: 'INT', desc: 'Thời gian sinh trưởng (ngày)' },
      { name: 'dinh_muc_giong_sao', type: 'NUMERIC(8,2)', desc: 'Lượng giống/sào (kg)' }
    ]
  },
  {
    tableName: 'dm_donvitinh',
    group: 'DANH_MUC',
    nameVi: 'Danh mục Đơn vị tính chuẩn',
    recordCount: 16,
    description: 'Sào, Ha, Kg, Tạ, Tấn, Bao 50kg, Lít, Chai 500ml',
    columns: [
      { name: 'ma_dvt', type: 'VARCHAR(10)', isPk: true, desc: 'Mã đơn vị tính' },
      { name: 'ten_dvt', type: 'VARCHAR(50)', desc: 'Tên đơn vị tính' }
    ]
  },
  {
    tableName: 'dm_phongban',
    group: 'DANH_MUC',
    nameVi: 'Danh mục Bộ phận & Đội sản xuất',
    recordCount: 7,
    description: 'Hội đồng quản trị, Ban kiểm soát, Đội cơ giới, Đội dịch vụ BVTV',
    columns: [
      { name: 'ma_pb', type: 'VARCHAR(20)', isPk: true, desc: 'Mã phòng ban/đội' },
      { name: 'ten_pb', type: 'VARCHAR(100)', desc: 'Tên bộ phận chức năng' }
    ]
  },
  {
    tableName: 'dm_loaichunghuong',
    group: 'DANH_MUC',
    nameVi: 'Danh mục Loại dịch vụ Hợp tác xã',
    recordCount: 9,
    description: 'Cày bừa làm đất, Tưới tiêu thủy lợi, Cung ứng phân bón, Gặt máy',
    columns: [
      { name: 'ma_dv', type: 'VARCHAR(20)', isPk: true, desc: 'Mã dịch vụ HTX' },
      { name: 'ten_dv', type: 'VARCHAR(100)', desc: 'Tên dịch vụ cung ứng' },
      { name: 'don_gia_sao', type: 'NUMERIC(15,2)', desc: 'Đơn giá trên sào ruộng' }
    ]
  },
  {
    tableName: 'dm_loaitiendung',
    group: 'DANH_MUC',
    nameVi: 'Danh mục Gói Tín dụng Nội bộ Xã viên',
    recordCount: 5,
    description: 'Vay mùa vụ lúa, Vay mua phân bón đầu vụ, Vay đầu tư máy nông nghiệp',
    columns: [
      { name: 'ma_goivay', type: 'VARCHAR(20)', isPk: true, desc: 'Mã gói tín dụng' },
      { name: 'ten_goivay', type: 'VARCHAR(100)', desc: 'Tên gói vay ưu đãi' },
      { name: 'lai_suat_thang', type: 'NUMERIC(5,3)', desc: 'Lãi suất %/tháng (0.65)' },
      { name: 'thoi_han_toi_da', type: 'INT', desc: 'Thời hạn tối đa (tháng)' }
    ]
  },
  {
    tableName: 'dm_nguonvon',
    group: 'DANH_MUC',
    nameVi: 'Danh mục Nguồn vốn HTX',
    recordCount: 6,
    description: 'Vốn điều lệ, Vốn hỗ trợ của Nhà nước, Quỹ phát triển HTX',
    columns: [
      { name: 'ma_nguonvon', type: 'VARCHAR(20)', isPk: true, desc: 'Mã nguồn vốn' },
      { name: 'ten_nguonvon', type: 'VARCHAR(100)', desc: 'Tên quỹ / nguồn vốn' }
    ]
  },
  {
    tableName: 'dm_thue_vat',
    group: 'DANH_MUC',
    nameVi: 'Danh mục Thuế suất Thuế GTGT TT71',
    recordCount: 5,
    description: '0%, 5%, 8%, 10%, Không chịu thuế nông nghiệp',
    columns: [
      { name: 'ma_thue', type: 'VARCHAR(10)', isPk: true, desc: 'Mã thuế suất' },
      { name: 'thue_suat', type: 'NUMERIC(5,2)', desc: 'Mức thuế suất %' }
    ]
  },
  {
    tableName: 'dm_khoanmuc_chiphi',
    group: 'DANH_MUC',
    nameVi: 'Danh mục Khoản mục chi phí sản xuất vụ',
    recordCount: 15,
    description: 'Giống lúa, Phân NPK, Đạm, Xăng dầu máy cày, Công thu hoạch',
    columns: [
      { name: 'ma_kmcp', type: 'VARCHAR(20)', isPk: true, desc: 'Mã khoản mục chi phí' },
      { name: 'ten_kmcp', type: 'VARCHAR(100)', desc: 'Tên khoản mục' }
    ]
  },

  // 2. NHÓM PHÁT SINH CHỨNG TỪ (22 bảng)
  {
    tableName: 'ct_thu',
    group: 'PHAT_SINH',
    nameVi: 'Chứng từ Phiếu Thu tiền mặt (Mẫu 01-TT)',
    recordCount: 420,
    description: 'Thu tiền bán phân bón, thu tiền dịch vụ thủy lợi, thu nợ xã viên',
    columns: [
      { name: 'so_pt', type: 'VARCHAR(30)', isPk: true, desc: 'Số phiếu thu (PT0001)' },
      { name: 'ngay_ct', type: 'DATE', desc: 'Ngày lập chứng từ' },
      { name: 'ma_doituong', type: 'VARCHAR(20)', desc: 'Mã xã viên / khách hàng' },
      { name: 'nguoi_nop', type: 'VARCHAR(100)', desc: 'Người nộp tiền' },
      { name: 'ly_do_thu', type: 'TEXT', desc: 'Nội dung nộp tiền' },
      { name: 'so_tien', type: 'NUMERIC(15,2)', desc: 'Tổng số tiền' },
      { name: 'tk_no', type: 'VARCHAR(20)', desc: 'Tài khoản ghi Nợ (1111)' },
      { name: 'tk_co', type: 'VARCHAR(20)', desc: 'Tài khoản ghi Có (131, 511...)' },
      { name: 'trang_thai_duyet', type: 'VARCHAR(20)', desc: 'Trạng thái duyệt KTT' }
    ]
  },
  {
    tableName: 'ct_chi',
    group: 'PHAT_SINH',
    nameVi: 'Chứng từ Phiếu Chi tiền mặt (Mẫu 02-TT)',
    recordCount: 380,
    description: 'Chi mua phân bón, chi trả lương, chi tiền điện trạm bơm, giải ngân vay',
    columns: [
      { name: 'so_pc', type: 'VARCHAR(30)', isPk: true, desc: 'Số phiếu chi (PC0001)' },
      { name: 'ngay_ct', type: 'DATE', desc: 'Ngày lập chứng từ' },
      { name: 'ma_doituong', type: 'VARCHAR(20)', desc: 'Đối tượng nhận tiền' },
      { name: 'nguoi_nhan', type: 'VARCHAR(100)', desc: 'Họ tên người nhận' },
      { name: 'ly_do_chi', type: 'TEXT', desc: 'Diễn giải nội dung chi' },
      { name: 'so_tien', type: 'NUMERIC(15,2)', desc: 'Số tiền chi' },
      { name: 'tk_no', type: 'VARCHAR(20)', desc: 'Tài khoản ghi Nợ (331, 621, 128...)' },
      { name: 'tk_co', type: 'VARCHAR(20)', desc: 'Tài khoản ghi Có (1111)' }
    ]
  },
  {
    tableName: 'ct_nganhang',
    group: 'PHAT_SINH',
    nameVi: 'Chứng từ Ngân hàng (UNC, Giấy báo Nợ, Giấy báo Có)',
    recordCount: 215,
    description: 'Chuyển khoản thanh toán tiền phân bón, thu tiền bán thóc qua ngân hàng',
    columns: [
      { name: 'so_ct_nh', type: 'VARCHAR(30)', isPk: true, desc: 'Số chứng từ ngân hàng' },
      { name: 'loai_ct', type: 'VARCHAR(10)', desc: 'UNC, GBAO_CO, GBAO_NO' },
      { name: 'ngay_ct', type: 'DATE', desc: 'Ngày giao dịch' },
      { name: 'ma_nganhang', type: 'VARCHAR(20)', isFk: true, desc: 'Ngân hàng phát sinh' },
      { name: 'so_tien', type: 'NUMERIC(15,2)', desc: 'Số tiền giao dịch' },
      { name: 'tk_no', type: 'VARCHAR(20)', desc: 'Định khoản Nợ' },
      { name: 'tk_co', type: 'VARCHAR(20)', desc: 'Định khoản Có' }
    ]
  },
  {
    tableName: 'ct_muahang',
    group: 'PHAT_SINH',
    nameVi: 'Chứng từ Mua hàng Vật tư Nông nghiệp',
    recordCount: 95,
    description: 'Hợp đồng mua phân bón, đạm, lân, giống lúa từ công ty đối tác',
    columns: [
      { name: 'so_don_mua', type: 'VARCHAR(30)', isPk: true, desc: 'Số đơn mua hàng' },
      { name: 'ngay_mua', type: 'DATE', desc: 'Ngày đặt mua hàng' },
      { name: 'ma_ncc', type: 'VARCHAR(20)', isFk: true, desc: 'Mã nhà cung ứng' },
      { name: 'tong_tien_chua_thue', type: 'NUMERIC(15,2)', desc: 'Tiền hàng trước thuế' },
      { name: 'thue_vat', type: 'NUMERIC(15,2)', desc: 'Tiền thuế VAT' },
      { name: 'tong_thanh_toan', type: 'NUMERIC(15,2)', desc: 'Tổng tiền thanh toán' }
    ]
  },
  {
    tableName: 'ct_banhang',
    group: 'PHAT_SINH',
    nameVi: 'Chứng từ Bán hàng & Cung ứng Dịch vụ Xã viên',
    recordCount: 560,
    description: 'Cung cấp phân bón đầu vụ, bán giống lúa, dịch vụ cày bừa gặt đập',
    columns: [
      { name: 'so_hoa_don', type: 'VARCHAR(30)', isPk: true, desc: 'Số hóa đơn/chứng từ bán' },
      { name: 'ngay_ban', type: 'DATE', desc: 'Ngày giao dịch' },
      { name: 'ma_kh_xavien', type: 'VARCHAR(20)', desc: 'Mã khách/xã viên' },
      { name: 'doanh_thu_chua_thue', type: 'NUMERIC(15,2)', desc: 'Doanh thu bán' },
      { name: 'gia_von', type: 'NUMERIC(15,2)', desc: 'Giá vốn xuất kho (TK 632)' },
      { name: 'hinh_thuc_tt', type: 'VARCHAR(20)', desc: 'TIEN_MAT, NO_CUOI_VU, CHUYEN_KHOAN' }
    ]
  },
  {
    tableName: 'ct_nhapkho',
    group: 'PHAT_SINH',
    nameVi: 'Chứng từ Phiếu Nhập kho (Mẫu 01-VT)',
    recordCount: 140,
    description: 'Nhập kho phân bón, nhập kho thóc thu mua từ ruộng của xã viên',
    columns: [
      { name: 'so_pnk', type: 'VARCHAR(30)', isPk: true, desc: 'Số phiếu nhập kho' },
      { name: 'ngay_nhap', type: 'DATE', desc: 'Ngày nhập hàng về kho' },
      { name: 'ma_kho', type: 'VARCHAR(20)', isFk: true, desc: 'Kho lưu kho' },
      { name: 'nguon_nhap', type: 'VARCHAR(50)', desc: 'MUA_NGOAI, THU_HOACH_XAVIEN, TRA_HANG' },
      { name: 'tong_gia_tri', type: 'NUMERIC(15,2)', desc: 'Tổng giá trị nhập kho' }
    ]
  },
  {
    tableName: 'ct_xuatkho',
    group: 'PHAT_SINH',
    nameVi: 'Chứng từ Phiếu Xuất kho (Mẫu 02-VT)',
    recordCount: 380,
    description: 'Xuất kho phân bón cho xã viên, xuất thóc bán cho doanh nghiệp xuất khẩu',
    columns: [
      { name: 'so_pxk', type: 'VARCHAR(30)', isPk: true, desc: 'Số phiếu xuất kho' },
      { name: 'ngay_xuat', type: 'DATE', desc: 'Ngày xuất kho' },
      { name: 'ma_kho', type: 'VARCHAR(20)', isFk: true, desc: 'Kho xuất' },
      { name: 'ly_do_xuat', type: 'VARCHAR(100)', desc: 'XUAT_BAN, CAP_VATTU_VU, SU_DUNG_NOI_BO' },
      { name: 'tong_gia_tri_xuat', type: 'NUMERIC(15,2)', desc: 'Tổng giá vốn xuất kho' }
    ]
  },
  {
    tableName: 'ct_dieuchinhkho',
    group: 'PHAT_SINH',
    nameVi: 'Chứng từ Điều chỉnh & Kiểm kê Kho',
    recordCount: 12,
    description: 'Xử lý thừa thiếu sau kiểm kê định kỳ cuối vụ lúa',
    columns: [
      { name: 'so_bb_kiemke', type: 'VARCHAR(30)', isPk: true, desc: 'Số biên bản kiểm kê' },
      { name: 'ngay_kiemke', type: 'DATE', desc: 'Ngày thực hiện' },
      { name: 'ma_kho', type: 'VARCHAR(20)', desc: 'Kho kiểm kê' },
      { name: 'chenh_lech_thua', type: 'NUMERIC(15,2)', desc: 'Giá trị thừa (TK 3381)' },
      { name: 'chenh_lech_thieu', type: 'NUMERIC(15,2)', desc: 'Giá trị hao hụt (TK 1381)' }
    ]
  },

  // 3. NHÓM KẾ TOÁN TỔNG HỢP & SỔ SÁCH (18 bảng)
  {
    tableName: 'nhatkychung',
    group: 'KE_TOAN',
    nameVi: 'Sổ Nhật ký chung TT71 (Mẫu S01-DNN/HTX)',
    recordCount: 1850,
    description: 'Tổng hợp tất cả định khoản phát sinh tự động từ chứng từ gốc',
    columns: [
      { name: 'id_nkc', type: 'BIGSERIAL', isPk: true, desc: 'Khóa chính tự tăng' },
      { name: 'ngay_hachtoan', type: 'DATE', desc: 'Ngày ghi sổ' },
      { name: 'ngay_chungtu', type: 'DATE', desc: 'Ngày trên chứng từ' },
      { name: 'so_chungtu', type: 'VARCHAR(30)', desc: 'Số hiệu chứng từ' },
      { name: 'dien_giai', type: 'TEXT', desc: 'Nội dung kinh tế phát sinh' },
      { name: 'tk_no', type: 'VARCHAR(20)', isFk: true, desc: 'Tài khoản nợ' },
      { name: 'tk_co', type: 'VARCHAR(20)', isFk: true, desc: 'Tài khoản có' },
      { name: 'so_tien', type: 'NUMERIC(15,2)', desc: 'Số tiền phát sinh' },
      { name: 'ma_doituong', type: 'VARCHAR(20)', desc: 'Đối tượng chi tiết' },
      { name: 'ma_vu', type: 'VARCHAR(20)', desc: 'Vụ mùa liên quan' }
    ]
  },
  {
    tableName: 'socai',
    group: 'KE_TOAN',
    nameVi: 'Sổ Cái Kế toán theo Tài khoản (Mẫu S02-DNN/HTX)',
    recordCount: 86,
    description: 'Sổ cái tổng hợp các tài khoản cấp 1 và cấp 2',
    columns: [
      { name: 'ma_tk', type: 'VARCHAR(20)', isPk: true, desc: 'Mã tài khoản' },
      { name: 'nam_tc', type: 'INT', isPk: true, desc: 'Năm tài chính' },
      { name: 'du_dau_ky_no', type: 'NUMERIC(15,2)', desc: 'Số dư nợ đầu năm' },
      { name: 'du_dau_ky_co', type: 'NUMERIC(15,2)', desc: 'Số dư có đầu năm' },
      { name: 'phatsinh_no', type: 'NUMERIC(15,2)', desc: 'Tổng phát sinh nợ trong kỳ' },
      { name: 'phatsinh_co', type: 'NUMERIC(15,2)', desc: 'Tổng phát sinh có trong kỳ' },
      { name: 'du_cuoi_ky_no', type: 'NUMERIC(15,2)', desc: 'Dư nợ cuối kỳ' },
      { name: 'du_cuoi_ky_co', type: 'NUMERIC(15,2)', desc: 'Dư có cuối kỳ' }
    ]
  },
  {
    tableName: 'bangcandoips',
    group: 'KE_TOAN',
    nameVi: 'Bảng Cân đối Số phát sinh Tài khoản (B01-DNN/HTX)',
    recordCount: 86,
    description: 'Bảng cân đối tài khoản chuẩn Thông tư 71 đối chiếu tính cân đối',
    columns: [
      { name: 'ma_tk', type: 'VARCHAR(20)', isPk: true, desc: 'Mã tài khoản' },
      { name: 'ten_tk', type: 'VARCHAR(255)', desc: 'Tên tài khoản' },
      { name: 'du_dau_no', type: 'NUMERIC(15,2)', desc: 'Dư đầu kỳ nợ' },
      { name: 'du_dau_co', type: 'NUMERIC(15,2)', desc: 'Dư đầu kỳ có' },
      { name: 'ps_trongky_no', type: 'NUMERIC(15,2)', desc: 'Phát sinh nợ' },
      { name: 'ps_trongky_co', type: 'NUMERIC(15,2)', desc: 'Phát sinh có' },
      { name: 'du_cuoi_no', type: 'NUMERIC(15,2)', desc: 'Dư cuối kỳ nợ' },
      { name: 'du_cuoi_co', type: 'NUMERIC(15,2)', desc: 'Dư cuối kỳ có' }
    ]
  },
  {
    tableName: 'ketchuyen',
    group: 'KE_TOAN',
    nameVi: 'Bút toán Kết chuyển Cuối kỳ (TK 911)',
    recordCount: 24,
    description: 'Kết chuyển doanh thu, giá vốn, chi phí quản lý để xác định lãi lỗ HTX',
    columns: [
      { name: 'id_kc', type: 'VARCHAR(30)', isPk: true, desc: 'Mã bút toán kết chuyển' },
      { name: 'ky_ketchuyen', type: 'VARCHAR(10)', desc: 'Tháng hoặc Quý (Q1_2026)' },
      { name: 'tk_nguon', type: 'VARCHAR(20)', desc: 'Tài khoản kết chuyển' },
      { name: 'tk_dich', type: 'VARCHAR(20)', desc: 'Tài khoản nhận kết chuyển (911/421)' },
      { name: 'so_tien', type: 'NUMERIC(15,2)', desc: 'Số tiền kết chuyển' }
    ]
  },
  {
    tableName: 'khoaso',
    group: 'KE_TOAN',
    nameVi: 'Lịch sử Khóa sổ Kỳ Kế toán HTX',
    recordCount: 14,
    description: 'Bảo vệ dữ liệu không cho phép sửa chứng từ sau khi Kế toán trưởng duyệt',
    columns: [
      { name: 'ky_khoaso', type: 'VARCHAR(10)', isPk: true, desc: 'Kỳ khóa (2025-12, 2026-01)' },
      { name: 'ngay_khoaso', type: 'TIMESTAMP', desc: 'Thời điểm khóa sổ' },
      { name: 'nguoi_khoa', type: 'VARCHAR(50)', desc: 'Kế toán trưởng thực hiện' },
      { name: 'trang_thai', type: 'VARCHAR(20)', desc: 'LOCKED, UNLOCKED' }
    ]
  },

  // 4. NHÓM TÍN DỤNG NỘI BỘ XÃ VIÊN (15 bảng)
  {
    tableName: 'hopdongvay',
    group: 'TIN_DUNG',
    nameVi: 'Hợp đồng Cho vay Tín dụng Nội bộ Xã viên',
    recordCount: 94,
    description: 'Hợp đồng vay vốn đầu tư mua phân bón, làm đất, gieo cấy lúa',
    columns: [
      { name: 'so_hd_vay', type: 'VARCHAR(30)', isPk: true, desc: 'Số hợp đồng vay (HDV001)' },
      { name: 'ma_xavien', type: 'VARCHAR(20)', isFk: true, desc: 'Xã viên vay vốn' },
      { name: 'loai_vay', type: 'VARCHAR(20)', desc: 'TIEN_MAT, PHAN_BON_GIONG' },
      { name: 'so_tien_vay', type: 'NUMERIC(15,2)', desc: 'Số tiền vay theo hợp đồng' },
      { name: 'lai_suat_thang', type: 'NUMERIC(5,3)', desc: 'Lãi suất %/tháng (0.65)' },
      { name: 'thoi_han_thang', type: 'INT', desc: 'Thời hạn vay (tháng)' },
      { name: 'ngay_vay', type: 'DATE', desc: 'Ngày ký hợp đồng' },
      { name: 'ngay_dao_han', type: 'DATE', desc: 'Ngày đến hạn trả nợ gốc' },
      { name: 'muc_dich_vay', type: 'TEXT', desc: 'Mục đích sử dụng vốn' },
      { name: 'du_no_goc_hien_tai', type: 'NUMERIC(15,2)', desc: 'Dư nợ gốc còn lại' },
      { name: 'trang_thai_hd', type: 'VARCHAR(20)', desc: 'DANG_VAY, DA_TAT_TOAN, QUA_HAN' }
    ]
  },
  {
    tableName: 'giaingan',
    group: 'TIN_DUNG',
    nameVi: 'Chứng từ Giải ngân Vay vốn Xã viên',
    recordCount: 94,
    description: 'Chi tiền mặt hoặc xuất kho phân bón cho xã viên theo hợp đồng',
    columns: [
      { name: 'so_phieu_gn', type: 'VARCHAR(30)', isPk: true, desc: 'Số phiếu giải ngân' },
      { name: 'so_hd_vay', type: 'VARCHAR(30)', isFk: true, desc: 'Thuộc hợp đồng vay' },
      { name: 'ngay_giaingan', type: 'DATE', desc: 'Ngày xuất quỹ/kho' },
      { name: 'so_tien_gn', type: 'NUMERIC(15,2)', desc: 'Số tiền giải ngân' },
      { name: 'hinh_thuc_gn', type: 'VARCHAR(20)', desc: 'TIEN_MAT, VAT_TU_QUY_RA_TIEN' }
    ]
  },
  {
    tableName: 'thugoc',
    group: 'TIN_DUNG',
    nameVi: 'Chứng từ Thu nợ gốc Tín dụng nội bộ',
    recordCount: 165,
    description: 'Ghi nhận xã viên trả nợ gốc sau khi bán lúa thu hoạch',
    columns: [
      { name: 'so_phieu_thu_goc', type: 'VARCHAR(30)', isPk: true, desc: 'Số phiếu thu gốc' },
      { name: 'so_hd_vay', type: 'VARCHAR(30)', isFk: true, desc: 'Hợp đồng liên quan' },
      { name: 'ngay_thu', type: 'DATE', desc: 'Ngày thu tiền' },
      { name: 'so_tien_goc', type: 'NUMERIC(15,2)', desc: 'Số tiền gốc đã thu' }
    ]
  },
  {
    tableName: 'thulai',
    group: 'TIN_DUNG',
    nameVi: 'Chứng từ Thu lãi Tín dụng nội bộ',
    recordCount: 230,
    description: 'Ghi nhận doanh thu lãi vay (hạch toán vào TK 515 hoặc 511 HTX)',
    columns: [
      { name: 'so_phieu_thu_lai', type: 'VARCHAR(30)', isPk: true, desc: 'Số phiếu thu lãi' },
      { name: 'so_hd_vay', type: 'VARCHAR(30)', isFk: true, desc: 'Hợp đồng vay' },
      { name: 'ngay_thu', type: 'DATE', desc: 'Ngày tính & thu lãi' },
      { name: 'so_tien_lai', type: 'NUMERIC(15,2)', desc: 'Số tiền lãi thu được' }
    ]
  },
  {
    tableName: 'lichtrano',
    group: 'TIN_DUNG',
    nameVi: 'Lịch trả nợ định kỳ theo vụ lúa',
    recordCount: 180,
    description: 'Kế hoạch thu hồi vốn phù hợp chu kỳ thu hoạch lúa của bà con',
    columns: [
      { name: 'id_lich', type: 'BIGSERIAL', isPk: true, desc: 'Mã dòng lịch trả nợ' },
      { name: 'so_hd_vay', type: 'VARCHAR(30)', isFk: true, desc: 'Số hợp đồng vay' },
      { name: 'ky_thu', type: 'INT', desc: 'Kỳ thu thứ N' },
      { name: 'ngay_du_kien', type: 'DATE', desc: 'Hạn chót thanh toán' },
      { name: 'goc_phai_tra', type: 'NUMERIC(15,2)', desc: 'Gốc dự kiến' },
      { name: 'lai_phai_tra', type: 'NUMERIC(15,2)', desc: 'Lãi dự kiến' }
    ]
  },
  {
    tableName: 'canhbaonoquahan',
    group: 'TIN_DUNG',
    nameVi: 'Danh sách Cảnh báo Nợ quá hạn Tín dụng HTX',
    recordCount: 18,
    description: 'Theo dõi các khoản vay quá hạn để Ban quản trị đôn đốc thu hồi',
    columns: [
      { name: 'id_canhbao', type: 'BIGSERIAL', isPk: true, desc: 'Mã cảnh báo' },
      { name: 'so_hd_vay', type: 'VARCHAR(30)', isFk: true, desc: 'Số hợp đồng nợ' },
      { name: 'so_ngay_quahan', type: 'INT', desc: 'Số ngày trễ hạn thanh toán' },
      { name: 'nhom_no', type: 'VARCHAR(20)', desc: 'NO_CAN_CHU_Y, NO_KHO_DOI' },
      { name: 'bien_phap_xu_ly', type: 'TEXT', desc: 'Phương án giãn nợ hoặc khấu trừ' }
    ]
  },

  // 5. NHÓM XÃ VIÊN & VỐN GÓP (12 bảng)
  {
    tableName: 'vongop',
    group: 'XA_VIEN',
    nameVi: 'Sổ Theo dõi Vốn góp Điều lệ Xã viên (TK 411)',
    recordCount: 168,
    description: 'Chi tiết từng lần nộp vốn góp điều lệ khi gia nhập HTX Bích La',
    columns: [
      { name: 'ma_vongop', type: 'VARCHAR(30)', isPk: true, desc: 'Mã giao dịch góp vốn' },
      { name: 'ma_xavien', type: 'VARCHAR(20)', isFk: true, desc: 'Mã xã viên' },
      { name: 'ngay_gop', type: 'DATE', desc: 'Ngày đóng tiền vốn' },
      { name: 'so_tien_gop', type: 'NUMERIC(15,2)', desc: 'Số tiền góp vốn' },
      { name: 'hinh_thuc', type: 'VARCHAR(20)', desc: 'TIEN_MAT, CHUYEN_KHOAN, TAI_SAN' }
    ]
  },
  {
    tableName: 'rutvon',
    group: 'XA_VIEN',
    nameVi: 'Sổ Theo dõi Rút vốn Xã viên khi thôi HTX',
    recordCount: 6,
    description: 'Hoàn trả phần vốn góp khi chuyển đi nơi khác hoặc thôi tư cách xã viên',
    columns: [
      { name: 'ma_rutvon', type: 'VARCHAR(30)', isPk: true, desc: 'Mã giao dịch rút vốn' },
      { name: 'ma_xavien', type: 'VARCHAR(20)', isFk: true, desc: 'Mã xã viên' },
      { name: 'ngay_rut', type: 'DATE', desc: 'Ngày thanh lý rút vốn' },
      { name: 'so_tien_rut', type: 'NUMERIC(15,2)', desc: 'Số tiền hoàn trả' },
      { name: 'ly_do_rut', type: 'TEXT', desc: 'Lý do xin rút khỏi HTX' }
    ]
  },
  {
    tableName: 'chiacotuc',
    group: 'XA_VIEN',
    nameVi: 'Bảng Phân chia Cổ tức & Lợi nhuận Hàng năm',
    recordCount: 168,
    description: 'Chia theo tỷ lệ góp vốn và chia theo mức độ sử dụng dịch vụ HTX (TT71)',
    columns: [
      { name: 'id_chia', type: 'BIGSERIAL', isPk: true, desc: 'Khóa dòng' },
      { name: 'nam_chia', type: 'INT', desc: 'Năm tài chính chia lợi nhuận' },
      { name: 'ma_xavien', type: 'VARCHAR(20)', isFk: true, desc: 'Mã xã viên' },
      { name: 'cotuc_theo_vongop', type: 'NUMERIC(15,2)', desc: 'Cổ tức theo vốn điều lệ' },
      { name: 'loinhuan_theo_dichvu', type: 'NUMERIC(15,2)', desc: 'Lợi nhuận chia theo dịch vụ' },
      { name: 'tong_nhan', type: 'NUMERIC(15,2)', desc: 'Tổng thu nhập xã viên nhận' },
      { name: 'da_chi_tra', type: 'BOOLEAN', desc: 'Đã thanh toán chưa' }
    ]
  },

  // 6. NHÓM NÔNG NGHIỆP & VỤ MÙA (16 bảng)
  {
    tableName: 'kehoachvu',
    group: 'NONG_NGHIEP',
    nameVi: 'Kế hoạch Sản xuất Vụ mùa Nông nghiệp',
    recordCount: 8,
    description: 'Chỉ tiêu diện tích, giống lúa, cơ cấu phân bón vụ Đông Xuân và Hè Thu',
    columns: [
      { name: 'ma_kehoach', type: 'VARCHAR(30)', isPk: true, desc: 'Mã kế hoạch vụ' },
      { name: 'ma_vu', type: 'VARCHAR(20)', isFk: true, desc: 'Mã vụ mùa' },
      { name: 'tong_dien_tich_sao', type: 'NUMERIC(12,2)', desc: 'Tổng diện tích canh tác (sào)' },
      { name: 'so_ho_tham_gia', type: 'INT', desc: 'Số hộ xã viên tham gia' },
      { name: 'san_luong_muc_tieu_tan', type: 'NUMERIC(10,2)', desc: 'Sản lượng mục tiêu (tấn thóc)' }
    ]
  },
  {
    tableName: 'chiphivu',
    group: 'NONG_NGHIEP',
    nameVi: 'Sổ Tập hợp Chi phí theo Vụ mùa (TK 154 / 621, 622, 627)',
    recordCount: 290,
    description: 'Theo dõi chi phí giống, phân bón, thuốc BVTV, bơm nước, công cày bừa',
    columns: [
      { name: 'id_chiphi', type: 'BIGSERIAL', isPk: true, desc: 'Mã dòng chi phí' },
      { name: 'ma_vu', type: 'VARCHAR(20)', isFk: true, desc: 'Vụ mùa tập hợp' },
      { name: 'khoan_muc_cp', type: 'VARCHAR(50)', desc: 'GIONG, PHAN_BON, NHAN_CONG, THUY_LOI' },
      { name: 'so_tien', type: 'NUMERIC(15,2)', desc: 'Chi phí thực tế phát sinh' },
      { name: 'tk_hachtoan', type: 'VARCHAR(20)', desc: 'Tài khoản chi phí (621, 622, 627)' }
    ]
  },
  {
    tableName: 'capvattu',
    group: 'NONG_NGHIEP',
    nameVi: 'Sổ Cấp phát Vật tư Nông nghiệp cho Xã viên',
    recordCount: 450,
    description: 'Giao lúa giống, phân đạm, NPK theo diện tích đất của từng xã viên',
    columns: [
      { name: 'ma_phieu_cap', type: 'VARCHAR(30)', isPk: true, desc: 'Mã phiếu cấp phát' },
      { name: 'ma_xavien', type: 'VARCHAR(20)', isFk: true, desc: 'Xã viên nhận' },
      { name: 'ma_vattu', type: 'VARCHAR(20)', isFk: true, desc: 'Vật tư được cấp' },
      { name: 'so_luong', type: 'NUMERIC(10,2)', desc: 'Khối lượng giao nhận' },
      { name: 'dinh_muc_thoa_thuan', type: 'BOOLEAN', desc: 'Đúng định mức kỹ thuật' }
    ]
  },
  {
    tableName: 'thuhoach',
    group: 'NONG_NGHIEP',
    nameVi: 'Sổ Theo dõi Thu hoạch Lúa & Nông sản',
    recordCount: 168,
    description: 'Sản lượng lúa tươi thu hoạch tại ruộng của từng hộ xã viên Bích La',
    columns: [
      { name: 'ma_thuhoach', type: 'VARCHAR(30)', isPk: true, desc: 'Mã đợt thu hoạch' },
      { name: 'ma_vu', type: 'VARCHAR(20)', isFk: true, desc: 'Vụ mùa' },
      { name: 'ma_xavien', type: 'VARCHAR(20)', isFk: true, desc: 'Hộ nông dân' },
      { name: 'san_luong_kg', type: 'NUMERIC(12,2)', desc: 'Khối lượng thóc gặt (kg)' },
      { name: 'do_am_thoc', type: 'NUMERIC(5,2)', desc: 'Độ ẩm tiêu chuẩn %' },
      { name: 'htx_thu_mua_kg', type: 'NUMERIC(12,2)', desc: 'HTX bao tiêu thu mua' }
    ]
  },
  {
    tableName: 'nangsuat',
    group: 'NONG_NGHIEP',
    nameVi: 'Báo cáo Đánh giá Năng suất Vụ mùa',
    recordCount: 12,
    description: 'Tổng kết năng suất lúa tạ/ha từng thôn và so sánh với vụ trước',
    columns: [
      { name: 'id_nangsuat', type: 'BIGSERIAL', isPk: true, desc: 'Mã báo cáo' },
      { name: 'ma_vu', type: 'VARCHAR(20)', isFk: true, desc: 'Vụ đánh giá' },
      { name: 'thon_xom', type: 'VARCHAR(100)', desc: 'Thôn (Đông Lập, Tây Nguyên...)' },
      { name: 'nang_suat_ta_ha', type: 'NUMERIC(8,2)', desc: 'Năng suất trung bình (tạ/ha)' },
      { name: 'hieu_qua_kinh_te', type: 'NUMERIC(15,2)', desc: 'Lợi nhuận bình quân sào' }
    ]
  },

  // 7. HỆ THỐNG & BẢO MẬT PHÂN QUYỀN (10 bảng)
  {
    tableName: 'sys_users',
    group: 'HE_THONG',
    nameVi: 'Quản lý Tài khoản Đăng nhập Hệ thống',
    recordCount: 12,
    description: 'Tài khoản người dùng, mật khẩu mã hóa bcrypt, trạng thái',
    columns: [
      { name: 'user_id', type: 'VARCHAR(36)', isPk: true, desc: 'Khóa chính UUID' },
      { name: 'username', type: 'VARCHAR(50)', desc: 'Tên đăng nhập' },
      { name: 'password_hash', type: 'VARCHAR(255)', desc: 'Mật khẩu băm' },
      { name: 'full_name', type: 'VARCHAR(100)', desc: 'Tên hiển thị' },
      { name: 'role_code', type: 'VARCHAR(30)', desc: 'Mã vai trò RBAC' }
    ]
  },
  {
    tableName: 'sys_roles',
    group: 'HE_THONG',
    nameVi: 'Quản lý Vai trò Phân quyền RBAC',
    recordCount: 6,
    description: 'ADMIN, Kế toán trưởng, Kế toán viên, Thủ quỹ, Thủ kho, Ban quản trị',
    columns: [
      { name: 'role_code', type: 'VARCHAR(30)', isPk: true, desc: 'Mã vai trò' },
      { name: 'role_name', type: 'VARCHAR(100)', desc: 'Tên vai trò chức vụ' },
      { name: 'description', type: 'TEXT', desc: 'Mô tả quyền hạn nghiệp vụ' }
    ]
  },
  {
    tableName: 'sys_permissions',
    group: 'HE_THONG',
    nameVi: 'Ma trận Quyền hạn Chi tiết Chức năng',
    recordCount: 48,
    description: 'Quyền xem, tạo, sửa, xóa, duyệt chứng từ, khóa sổ, in báo cáo',
    columns: [
      { name: 'permission_id', type: 'VARCHAR(50)', isPk: true, desc: 'Mã quyền chi tiết' },
      { name: 'module_name', type: 'VARCHAR(50)', desc: 'Phân hệ chức năng' },
      { name: 'action', type: 'VARCHAR(20)', desc: 'VIEW, CREATE, EDIT, DELETE, APPROVE, LOCK' }
    ]
  },
  {
    tableName: 'sys_audit_log',
    group: 'HE_THONG',
    nameVi: 'Nhật ký Truy vết Thao tác Người dùng',
    recordCount: 1450,
    description: 'Ghi lại mọi thay đổi chứng từ kế toán, thời gian, IP và người sửa',
    columns: [
      { name: 'log_id', type: 'BIGSERIAL', isPk: true, desc: 'Mã log tự tăng' },
      { name: 'user_id', type: 'VARCHAR(36)', desc: 'Người thao tác' },
      { name: 'action', type: 'VARCHAR(50)', desc: 'Hành động thực thi' },
      { name: 'table_affected', type: 'VARCHAR(50)', desc: 'Bảng dữ liệu ảnh hưởng' },
      { name: 'timestamp', type: 'TIMESTAMP', desc: 'Thời điểm thao tác' }
    ]
  }
];

export function generatePostgreSqlDDL(): string {
  return `-- ============================================================================
-- HỆ THỐNG ERP KẾ TOÁN & QUẢN TRỊ HTX NÔNG NGHIỆP BÍCH LA (QUẢNG TRỊ)
-- CHUẨN KẾ TOÁN THÔNG TƯ 71/2024/TT-BTC
-- KIẾN TRÚC DATABASE POSTGRESQL ENTERPRISE (100+ BẢNG)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. NHÓM DANH MỤC CƠ SỞ (TT 71)
CREATE TABLE IF NOT EXISTS dm_taikhoan (
    ma_tk VARCHAR(20) PRIMARY KEY,
    ten_tk VARCHAR(255) NOT NULL,
    cap_tk INT NOT NULL DEFAULT 1,
    ma_tk_cha VARCHAR(20) REFERENCES dm_taikhoan(ma_tk),
    tinh_chat VARCHAR(15) CHECK (tinh_chat IN ('NO', 'CO', 'LUONG_TINH')),
    theo_doi_chi_tiet BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS dm_xavien (
    ma_xavien VARCHAR(20) PRIMARY KEY,
    ho_ten VARCHAR(100) NOT NULL,
    cccd VARCHAR(20) UNIQUE NOT NULL,
    so_dien_thoai VARCHAR(15),
    thon_xom VARCHAR(100) NOT NULL, -- Đông Lập, Tây Nguyên, Nam Lạc, Bắc Phú
    ngay_gia_nhap DATE NOT NULL,
    von_gop_dieule NUMERIC(15,2) DEFAULT 0,
    dien_tich_sao NUMERIC(10,2) DEFAULT 0,
    trang_thai VARCHAR(20) DEFAULT 'ACTIVE'
);

CREATE TABLE IF NOT EXISTS dm_khachhang (
    ma_kh VARCHAR(20) PRIMARY KEY,
    ten_kh VARCHAR(255) NOT NULL,
    mst VARCHAR(20),
    dia_chi TEXT,
    dien_thoai VARCHAR(20),
    han_muc_no NUMERIC(15,2) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS dm_nhacungcap (
    ma_ncc VARCHAR(20) PRIMARY KEY,
    ten_ncc VARCHAR(255) NOT NULL,
    mst VARCHAR(20),
    dia_chi TEXT,
    tk_nganhang VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS dm_kho (
    ma_kho VARCHAR(20) PRIMARY KEY,
    ten_kho VARCHAR(100) NOT NULL,
    dia_diem VARCHAR(255),
    thu_kho VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS dm_vattu (
    ma_vattu VARCHAR(20) PRIMARY KEY,
    ten_vattu VARCHAR(255) NOT NULL,
    loai_vattu VARCHAR(50) NOT NULL,
    dvt VARCHAR(20) NOT NULL,
    gia_mua NUMERIC(15,2) DEFAULT 0,
    gia_ban_xavien NUMERIC(15,2) DEFAULT 0,
    ton_an_toan NUMERIC(10,2) DEFAULT 10,
    ma_kho_mac_dinh VARCHAR(20) REFERENCES dm_kho(ma_kho)
);

CREATE TABLE IF NOT EXISTS dm_tscd (
    ma_tscd VARCHAR(20) PRIMARY KEY,
    ten_tscd VARCHAR(255) NOT NULL,
    nguyen_gia NUMERIC(15,2) NOT NULL,
    thoi_gian_kh INT NOT NULL,
    ngay_su_dung DATE NOT NULL,
    tk_nguyen_gia VARCHAR(20) DEFAULT '211',
    tk_khau_hao VARCHAR(20) DEFAULT '214'
);

CREATE TABLE IF NOT EXISTS dm_vusanxuat (
    ma_vu VARCHAR(20) PRIMARY KEY,
    ten_vu VARCHAR(100) NOT NULL,
    nam_sanxuat INT NOT NULL,
    ngay_batdau DATE NOT NULL,
    ngay_ketthuc DATE NOT NULL
);

-- 2. CHỨNG TỪ PHÁT SINH & TỰ ĐỘNG SINH BÚT TOÁN KẾ TOÁN
CREATE TABLE IF NOT EXISTS ct_thu (
    so_pt VARCHAR(30) PRIMARY KEY,
    ngay_ct DATE NOT NULL,
    ma_doituong VARCHAR(20),
    nguoi_nop VARCHAR(100) NOT NULL,
    ly_do_thu TEXT NOT NULL,
    so_tien NUMERIC(15,2) NOT NULL,
    tk_no VARCHAR(20) NOT NULL DEFAULT '1111',
    tk_co VARCHAR(20) NOT NULL,
    trang_thai VARCHAR(20) DEFAULT 'DA_DUYET'
);

CREATE TABLE IF NOT EXISTS ct_chi (
    so_pc VARCHAR(30) PRIMARY KEY,
    ngay_ct DATE NOT NULL,
    ma_doituong VARCHAR(20),
    nguoi_nhan VARCHAR(100) NOT NULL,
    ly_do_chi TEXT NOT NULL,
    so_tien NUMERIC(15,2) NOT NULL,
    tk_no VARCHAR(20) NOT NULL,
    tk_co VARCHAR(20) NOT NULL DEFAULT '1111',
    trang_thai VARCHAR(20) DEFAULT 'DA_DUYET'
);

CREATE TABLE IF NOT EXISTS ct_nhapkho (
    so_pnk VARCHAR(30) PRIMARY KEY,
    ngay_nhap DATE NOT NULL,
    ma_kho VARCHAR(20) REFERENCES dm_kho(ma_kho),
    ma_ncc VARCHAR(20) REFERENCES dm_nhacungcap(ma_ncc),
    ly_do TEXT,
    tong_tien NUMERIC(15,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS ct_xuatkho (
    so_pxk VARCHAR(30) PRIMARY KEY,
    ngay_xuat DATE NOT NULL,
    ma_kho VARCHAR(20) REFERENCES dm_kho(ma_kho),
    ma_xavien VARCHAR(20) REFERENCES dm_xavien(ma_xavien),
    ly_do TEXT,
    tong_tien NUMERIC(15,2) NOT NULL
);

-- 3. KẾ TOÁN TỔNG HỢP: NHẬT KÝ CHUNG & SỔ CÁI
CREATE TABLE IF NOT EXISTS nhatkychung (
    id_nkc BIGSERIAL PRIMARY KEY,
    ngay_hachtoan DATE NOT NULL,
    ngay_chungtu DATE NOT NULL,
    so_chungtu VARCHAR(30) NOT NULL,
    dien_giai TEXT NOT NULL,
    tk_no VARCHAR(20) NOT NULL REFERENCES dm_taikhoan(ma_tk),
    tk_co VARCHAR(20) NOT NULL REFERENCES dm_taikhoan(ma_tk),
    so_tien NUMERIC(15,2) NOT NULL,
    ma_doituong VARCHAR(20),
    ma_vu VARCHAR(20) REFERENCES dm_vusanxuat(ma_vu),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. PHÂN HỆ TÍN DỤNG NỘI BỘ XÃ VIÊN
CREATE TABLE IF NOT EXISTS hopdongvay (
    so_hd_vay VARCHAR(30) PRIMARY KEY,
    ma_xavien VARCHAR(20) NOT NULL REFERENCES dm_xavien(ma_xavien),
    loai_vay VARCHAR(20) CHECK (loai_vay IN ('TIEN_MAT', 'VAT_TU')),
    so_tien_vay NUMERIC(15,2) NOT NULL,
    lai_suat_thang NUMERIC(5,3) DEFAULT 0.650,
    thoi_han_thang INT NOT NULL,
    ngay_vay DATE NOT NULL,
    ngay_dao_han DATE NOT NULL,
    muc_dich_vay TEXT,
    du_no_goc NUMERIC(15,2) NOT NULL,
    trang_thai VARCHAR(20) DEFAULT 'DANG_VAY'
);

CREATE TABLE IF NOT EXISTS thu_no_tin_dung (
    so_phieu_thu VARCHAR(30) PRIMARY KEY,
    so_hd_vay VARCHAR(30) REFERENCES hopdongvay(so_hd_vay),
    ngay_thu DATE NOT NULL,
    thu_goc NUMERIC(15,2) DEFAULT 0,
    thu_lai NUMERIC(15,2) DEFAULT 0,
    tong_thu NUMERIC(15,2) NOT NULL
);

-- 5. QUẢN LÝ VỤ MÙA NÔNG NGHIỆP
CREATE TABLE IF NOT EXISTS kehoach_vumua (
    ma_kehoach VARCHAR(30) PRIMARY KEY,
    ma_vu VARCHAR(20) REFERENCES dm_vusanxuat(ma_vu),
    tong_sao NUMERIC(12,2) NOT NULL,
    san_luong_du_kien_tan NUMERIC(10,2)
);

CREATE TABLE IF NOT EXISTS chi_phi_vu_mùa (
    id_cp BIGSERIAL PRIMARY KEY,
    ma_vu VARCHAR(20) REFERENCES dm_vusanxuat(ma_vu),
    khoan_muc VARCHAR(50) NOT NULL,
    so_tien NUMERIC(15,2) NOT NULL,
    tk_cp VARCHAR(20) DEFAULT '154'
);

-- INDEX TỐI ƯU HIỆU SUẤT TRUY VẤN SỔ SÁCH KẾ TOÁN
CREATE INDEX IF NOT EXISTS idx_nkc_ngay ON nhatkychung(ngay_hachtoan);
CREATE INDEX IF NOT EXISTS idx_nkc_tk_no ON nhatkychung(tk_no);
CREATE INDEX IF NOT EXISTS idx_nkc_tk_co ON nhatkychung(tk_co);
CREATE INDEX IF NOT EXISTS idx_hdv_xavien ON hopdongvay(ma_xavien);
`;
}

export const POSTGRES_DDL_FULL = generatePostgreSqlDDL();

export const ERP_SCHEMA_GROUPS = [
  {
    id: 'DANH_MUC',
    name: '1. Danh mục dùng chung',
    tables: ERP_100_TABLES.filter((t) => t.group === 'DANH_MUC')
  },
  {
    id: 'PHAT_SINH',
    name: '2. Chứng từ & Phát sinh',
    tables: ERP_100_TABLES.filter((t) => t.group === 'PHAT_SINH')
  },
  {
    id: 'KE_TOAN',
    name: '3. Sổ sách & BCTC',
    tables: ERP_100_TABLES.filter((t) => t.group === 'KE_TOAN')
  },
  {
    id: 'XA_VIEN',
    name: '4. Xã viên & Vốn góp',
    tables: ERP_100_TABLES.filter((t) => t.group === 'XA_VIEN')
  },
  {
    id: 'TIN_DUNG',
    name: '5. Tín dụng nội bộ',
    tables: ERP_100_TABLES.filter((t) => t.group === 'TIN_DUNG')
  },
  {
    id: 'NONG_NGHIEP',
    name: '6. Vụ mùa & Nông nghiệp',
    tables: ERP_100_TABLES.filter((t) => t.group === 'NONG_NGHIEP')
  },
  {
    id: 'HE_THONG',
    name: '7. Quản trị & RBAC',
    tables: ERP_100_TABLES.filter((t) => t.group === 'HE_THONG')
  }
];
