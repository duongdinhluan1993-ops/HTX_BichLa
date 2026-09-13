export type Role = 'ADMIN' | 'CHIEF_ACCOUNTANT' | 'ACCOUNTANT' | 'TREASURER' | 'WAREHOUSE_KEEPER' | 'BOARD_DIRECTOR';

export interface UserProfile {
  id: string;
  name: string;
  role: Role;
  roleTitle: string;
  department: string;
  avatar: string;
}

export interface Account {
  code: string;
  name: string;
  level: number;
  parentCode?: string;
  nature: 'DEBIT' | 'CREDIT' | 'DUAL';
  description?: string;
}

export interface Member {
  id: string;
  code: string;
  fullName: string;
  idCard: string;
  phone: string;
  hamlet: string; // Thôn (Đông Lập, Tây Nguyên, Nam Lạc, Bắc Phú - Bích La)
  joinDate: string;
  capitalContributed: number; // Vốn góp điều lệ (VND)
  landAreaSao: number; // Diện tích canh tác (sào)
  landAreaHa: number; // Diện tích (ha)
  creditLimit: number; // Hạn mức vay tín dụng nội bộ
  currentDebt: number; // Dư nợ hiện tại
  status: 'ACTIVE' | 'INACTIVE';
  patronagePoints: number; // Điểm sử dụng dịch vụ HTX
}

export interface MaterialItem {
  id: string;
  code: string;
  name: string;
  category: 'SEED' | 'FERTILIZER' | 'PESTICIDE' | 'PRODUCT' | 'TOOL';
  unit: string;
  costPrice: number;
  salePrice: number;
  stockQuantity: number;
  minStock: number;
  warehouseCode: string;
}

export interface Warehouse {
  code: string;
  name: string;
  location: string;
  keeperName: string;
}

export interface Partner {
  id: string;
  code: string;
  name: string;
  type: 'CUSTOMER' | 'SUPPLIER' | 'BOTH';
  taxCode?: string;
  address: string;
  phone: string;
  receivableDebt: number; // Phải thu 131
  payableDebt: number; // Phải trả 331
}

export interface JournalEntry {
  id: string;
  voucherId: string;
  voucherNo: string;
  voucherType: 'PT' | 'PC' | 'UNC' | 'GBC' | 'GBN' | 'PNK' | 'PXK' | 'HD' | 'HDV' | 'KC' | 'KH';
  date: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
  description: string;
  partnerId?: string;
  partnerName?: string;
  seasonId?: string;
  isPosted: boolean;
}

export interface CashBankVoucher {
  id: string;
  voucherNo: string;
  type: 'PT' | 'PC' | 'UNC' | 'GBC' | 'GBN';
  date: string;
  partnerId?: string;
  partnerName: string;
  address?: string;
  reason: string;
  amount: number;
  debitAccount: string;
  creditAccount: string;
  bankAccount?: string;
  bankName?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  creator: string;
  approver?: string;
  originalDocument?: string;
}

export interface InventoryVoucher {
  id: string;
  voucherNo: string;
  type: 'PNK' | 'PXK' | 'PCK';
  date: string;
  warehouseCode: string;
  toWarehouseCode?: string;
  partnerName: string;
  partnerId?: string;
  reason: string;
  totalAmount: number;
  status: 'POSTED' | 'DRAFT';
  items: {
    materialId: string;
    materialCode: string;
    materialName: string;
    unit: string;
    quantity: number;
    unitPrice: number;
    amount: number;
    debitAccount: string;
    creditAccount: string;
  }[];
}

export interface LoanContract {
  id: string;
  contractNo: string;
  memberId: string;
  memberName: string;
  hamlet: string;
  loanType: 'CASH' | 'MATERIAL'; // Vay tiền mặt hoặc Vay phân bón vật tư
  loanAmount: number; // Số tiền vay gốc
  interestRateMonthly: number; // Lãi suất tháng (vd: 0.65%/tháng)
  termMonths: number; // Thời hạn (tháng, thường theo vụ lúa 4-6 tháng)
  startDate: string;
  dueDate: string;
  purpose: string;
  disbursedAmount: number; // Đã giải ngân
  paidPrincipal: number; // Đã trả gốc
  paidInterest: number; // Đã trả lãi
  remainingPrincipal: number; // Dư nợ gốc còn lại
  accruedInterest: number; // Lãi dự thu luỹ kế
  status: 'NORMAL' | 'OVERDUE' | 'COMPLETED';
  overdueDays: number;
  seasonId?: string;
}

export interface AgricultureSeason {
  id: string;
  code: string;
  name: string;
  cropType: string; // Lúa TBR225, Lúa Đài Thơm 8, Hoa cúc, Sen Bích La
  year: number;
  startDate: string;
  endDate: string;
  totalAreaHa: number;
  participatingMembers: number;
  targetYieldTonsPerHa: number; // Năng suất mục tiêu (tấn/ha)
  actualYieldTonsPerHa?: number; // Năng suất thực tế
  estimatedRevenue: number;
  actualRevenue?: number;
  totalCost: number;
  status: 'PLANNING' | 'IN_PROGRESS' | 'HARVESTED' | 'SETTLED';
}

export interface FixedAsset {
  id: string;
  code: string;
  name: string;
  category: 'MACHINERY' | 'BUILDING' | 'IRRIGATION' | 'TRANSPORT';
  originalCost: number; // Nguyên giá
  depreciationMonths: number; // Thời gian trích KH (tháng)
  monthlyDepreciation: number; // Mức KH tháng
  accumulatedDepreciation: number; // Đã trích KH
  bookValue: number; // Giá trị còn lại
  usageDepartment: string;
  costAccount: string; // 627, 642
  startDate: string;
  status: 'USING' | 'LIQUIDATED';
}

export interface SalaryRecord {
  id: string;
  month: string;
  employeeName: string;
  position: string;
  baseSalary: number;
  workDays: number;
  allowance: number;
  insuranceDeduction: number;
  personalTax: number;
  netSalary: number;
  isPaid: boolean;
}

export interface TableMeta {
  tableName: string;
  group: 'DANH_MUC' | 'PHAT_SINH' | 'KE_TOAN' | 'TIN_DUNG' | 'XA_VIEN' | 'NONG_NGHIEP' | 'HE_THONG';
  nameVi: string;
  recordCount: number;
  description: string;
  columns: { name: string; type: string; isPk?: boolean; isFk?: boolean; desc: string }[];
}
