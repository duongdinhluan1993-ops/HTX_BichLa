import React, { useState, useMemo } from 'react';
import { Sidebar, ActiveTab } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardView } from './components/modules/DashboardView';
import { GeneralLedgerView } from './components/modules/GeneralLedgerView';
import { CashBankView } from './components/modules/CashBankView';
import { PurchaseSalesView } from './components/modules/PurchaseSalesView';
import { WarehouseView } from './components/modules/WarehouseView';
import { MembersView } from './components/modules/MembersView';
import { InternalCreditView } from './components/modules/InternalCreditView';
import { AgricultureSeasonsView } from './components/modules/AgricultureSeasonsView';
import { FixedAssetsView } from './components/modules/FixedAssetsView';
import { FinancialReportsView } from './components/modules/FinancialReportsView';
import { DatabaseERDView } from './components/modules/DatabaseERDView';
import { RBACPermissionsView } from './components/modules/RBACPermissionsView';
import { UserGuideView } from './components/modules/UserGuideView';
import { AccountsListView } from './components/modules/AccountsListView';
import { CreateVoucherModal } from './components/modals/CreateVoucherModal';
import { VoucherPrintModal } from './components/modals/VoucherPrintModal';
import { ExcelDataSyncModal } from './components/modals/ExcelDataSyncModal';
import { EditVoucherModal, EditableVoucherData } from './components/modals/EditVoucherModal';
import { ResetDataConfirmModal } from './components/modals/ResetDataConfirmModal';

import {
  Role,
  Account,
  Member,
  Partner,
  MaterialItem,
  LoanContract,
  FixedAsset,
  AgricultureSeason,
  CashBankVoucher,
  JournalEntry
} from './types/erp';

import {
  INITIAL_ACCOUNTS,
  INITIAL_MEMBERS,
  INITIAL_PARTNERS,
  INITIAL_MATERIALS,
  INITIAL_LOANS,
  INITIAL_FIXED_ASSETS,
  INITIAL_SEASONS,
  INITIAL_CASH_BANK_VOUCHERS,
  INITIAL_JOURNAL_ENTRIES
} from './data/mockData';

import { AccountingEngine } from './services/accountingEngine';

export default function App() {
  // Navigation & Role State
  const [activeTab, setActiveTab] = useState<ActiveTab>('DASHBOARD');
  const [currentRole, setCurrentRole] = useState<Role>('CHIEF_ACCOUNTANT');
  const [searchTerm, setSearchTerm] = useState('');

  // Data Store States
  const [accounts, setAccounts] = useState<Account[]>(INITIAL_ACCOUNTS);
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [partners, setPartners] = useState<Partner[]>(INITIAL_PARTNERS);
  const [materials, setMaterials] = useState<MaterialItem[]>(INITIAL_MATERIALS);
  const [loans, setLoans] = useState<LoanContract[]>(INITIAL_LOANS);
  const [fixedAssets, setFixedAssets] = useState<FixedAsset[]>(INITIAL_FIXED_ASSETS);
  const [seasons] = useState<AgricultureSeason[]>(INITIAL_SEASONS);
  const [vouchers, setVouchers] = useState<CashBankVoucher[]>(INITIAL_CASH_BANK_VOUCHERS);
  const [journal, setJournal] = useState<JournalEntry[]>(INITIAL_JOURNAL_ENTRIES);

  // Modal States
  const [isCreateVoucherOpen, setIsCreateVoucherOpen] = useState(false);
  const [voucherToPrint, setVoucherToPrint] = useState<CashBankVoucher | null>(null);
  const [isExcelSyncOpen, setIsExcelSyncOpen] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState<CashBankVoucher | JournalEntry | null>(null);
  const [isEditVoucherOpen, setIsEditVoucherOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // AMATAX V6 4-Core Metrics from Excel file header
  const [excelMetrics, setExcelMetrics] = useState({
    revenue6T: 335300000,
    expense6T: 100955554,
    cashBalance: 145000000,
    bankBalance: 671500000
  });

  const handleUpdateExcelMetrics = (metrics: {
    revenue6T: number;
    expense6T: number;
    cashBalance: number;
    bankBalance: number;
  }) => {
    setExcelMetrics(metrics);
  };

  const handleResetToEmpty = () => {
    setExcelMetrics({
      revenue6T: 0,
      expense6T: 0,
      cashBalance: 0,
      bankBalance: 0
    });
  };

  const handleResetToSample = () => {
    setExcelMetrics({
      revenue6T: 335300000,
      expense6T: 100955554,
      cashBalance: 145000000,
      bankBalance: 671500000
    });
  };

  // SỬA CHỨNG TỪ & HẠCH TOÁN ĐỊNH KHOẢN
  const handleOpenEditVoucher = (voucher: CashBankVoucher | JournalEntry) => {
    setEditingVoucher(voucher);
    setIsEditVoucherOpen(true);
  };

  const handleSaveEditedVoucher = (data: EditableVoucherData) => {
    // Cập nhật trong sổ quỹ (vouchers)
    setVouchers((prev) =>
      prev.map((v) => {
        if (v.id === data.id || v.voucherNo === data.voucherNo) {
          return {
            ...v,
            voucherNo: data.voucherNo,
            type: (data.type as any) || v.type,
            date: data.date,
            partnerName: data.partnerName,
            reason: data.reason,
            debitAccount: data.debitAccount,
            creditAccount: data.creditAccount,
            amount: data.amount
          };
        }
        return v;
      })
    );

    // Cập nhật trong Sổ Nhật ký chung & Sổ cái (journal)
    setJournal((prev) =>
      prev.map((j) => {
        if (j.id === data.id || j.voucherNo === data.voucherNo) {
          return {
            ...j,
            voucherNo: data.voucherNo,
            voucherType: (data.type as any) || j.voucherType,
            date: data.date,
            description: data.reason,
            partnerName: data.partnerName,
            debitAccount: data.debitAccount,
            creditAccount: data.creditAccount,
            amount: data.amount
          };
        }
        return j;
      })
    );
  };

  const handleDeleteVoucherOrEntry = (id: string, voucherNo: string) => {
    setVouchers((prev) => prev.filter((v) => v.id !== id && v.voucherNo !== voucherNo));
    setJournal((prev) => prev.filter((j) => j.id !== id && j.voucherNo !== voucherNo));
  };

  // XÓA DỮ LIỆU & NHẬP LẠI TỪ ĐẦU
  const handleClearTransactionsOnly = () => {
    setVouchers([]);
    setJournal([]);
    setExcelMetrics({
      revenue6T: 0,
      expense6T: 0,
      cashBalance: 0,
      bankBalance: 0
    });
  };

  const handleClearEverything = () => {
    setVouchers([]);
    setJournal([]);
    setPartners([]);
    setMaterials([]);
    setLoans([]);
    setExcelMetrics({
      revenue6T: 0,
      expense6T: 0,
      cashBalance: 0,
      bankBalance: 0
    });
  };

  const handleRestoreSampleData = () => {
    setVouchers(INITIAL_CASH_BANK_VOUCHERS);
    setJournal(INITIAL_JOURNAL_ENTRIES);
    setPartners(INITIAL_PARTNERS);
    setMaterials(INITIAL_MATERIALS);
    setMembers(INITIAL_MEMBERS);
    setLoans(INITIAL_LOANS);
    setAccounts(INITIAL_ACCOUNTS);
    setExcelMetrics({
      revenue6T: 335300000,
      expense6T: 100955554,
      cashBalance: 145000000,
      bankBalance: 671500000
    });
  };

  const handleImportExcelData = (type: 'DM_DOITUONG' | 'DM_VATTU' | 'PHATSINH' | 'DM_TK', rawText: string) => {
    const lines = rawText.split('\n').map((l) => l.trim()).filter(Boolean);
    if (type === 'DM_DOITUONG') {
      const newPartners: Partner[] = [];
      lines.forEach((line, idx) => {
        const cols = line.split(/\t|,|;/).map((c) => c.trim());
        if (cols.length >= 2) {
          newPartners.push({
            id: cols[0] || `DT-${Date.now()}-${idx}`,
            code: cols[0] || `DT-${idx}`,
            name: cols[1] || 'Đối tác mới',
            type: cols[2] === 'NHA_CUNG_CAP' ? 'SUPPLIER' : 'CUSTOMER',
            taxCode: cols[3] || '',
            address: cols[4] || 'Huyện Triệu Phong, Quảng Trị',
            phone: cols[5] || '',
            receivableDebt: 0,
            payableDebt: 0
          });
        }
      });
      if (newPartners.length > 0) {
        setPartners((prev) => [...newPartners, ...prev]);
      }
    } else if (type === 'DM_VATTU') {
      const newMats: MaterialItem[] = [];
      lines.forEach((line, idx) => {
        const cols = line.split(/\t|,|;/).map((c) => c.trim());
        if (cols.length >= 2) {
          newMats.push({
            id: cols[0] || `VT-${Date.now()}-${idx}`,
            code: cols[0] || `VT-${idx}`,
            name: cols[1],
            category: 'FERTILIZER',
            unit: cols[2] || 'kg',
            costPrice: parseFloat(cols[3]) || 15000,
            salePrice: parseFloat(cols[4]) || 18000,
            stockQuantity: parseFloat(cols[5]) || 100,
            minStock: 20,
            warehouseCode: 'KHO-TONG'
          });
        }
      });
      if (newMats.length > 0) {
        setMaterials((prev) => [...newMats, ...prev]);
      }
    } else if (type === 'DM_TK') {
      const newAccs: Account[] = [];
      lines.forEach((line) => {
        const cols = line.split(/\t|,|;/).map((c) => c.trim());
        if (cols.length >= 2) {
          newAccs.push({
            code: cols[0],
            name: cols[1],
            level: cols[0].length <= 3 ? 1 : 2,
            parentCode: cols[2] || undefined,
            nature: (cols[3] as any) || 'DEBIT',
            description: cols[4] || ''
          });
        }
      });
      if (newAccs.length > 0) {
        setAccounts((prev) => [...newAccs, ...prev]);
      }
    } else if (type === 'PHATSINH') {
      const newVouchers: CashBankVoucher[] = [];
      const newJournal: JournalEntry[] = [];
      lines.forEach((line, idx) => {
        const cols = line.split(/\t|,|;/).map((c) => c.trim());
        if (cols.length >= 4) {
          const date = cols[0] || '2026-03-31';
          const vNo = cols[1] || `CT-${Date.now()}-${idx}`;
          const desc = cols[2] || 'Nghiệp vụ phát sinh';
          const debit = cols[3] || '1111';
          const credit = cols[4] || '511';
          const amt = parseFloat(cols[5]) || 0;

          const v: CashBankVoucher = {
            id: `VC-${Date.now()}-${idx}`,
            voucherNo: vNo,
            type: debit.startsWith('111') ? 'PT' : credit.startsWith('111') ? 'PC' : 'UNC',
            date,
            partnerName: cols[6] || 'Giao dịch HTX',
            reason: desc,
            amount: amt,
            debitAccount: debit,
            creditAccount: credit,
            status: 'APPROVED',
            creator: 'Kế toán HTX'
          };
          newVouchers.push(v);
          newJournal.push(AccountingEngine.generateJournalFromVoucher(v));
        }
      });
      if (newVouchers.length > 0) {
        setVouchers((prev) => [...newVouchers, ...prev]);
        setJournal((prev) => [...newJournal, ...prev]);
      }
    }
  };

  // Realtime Financial KPIs calculated by the Accounting Engine
  const kpis = useMemo(() => {
    return AccountingEngine.computeDashboardKPIs(journal, vouchers, loans, members, materials, fixedAssets);
  }, [journal, vouchers, loans, members, materials, fixedAssets]);

  // Automated Accounting Action: Save new voucher
  const handleSaveVoucher = (newVoucher: CashBankVoucher) => {
    // 1. Add voucher to Cash/Bank store
    setVouchers((prev) => [newVoucher, ...prev]);

    // 2. Automatically generate journal entry for General Ledger (Sổ Nhật ký chung)
    const journalEntry = AccountingEngine.generateJournalFromVoucher(newVoucher);
    setJournal((prev) => [journalEntry, ...prev]);
  };

  // Add Member Action
  const handleAddMember = (newMember: Member) => {
    setMembers((prev) => [newMember, ...prev]);

    // Auto generate voucher & journal for capital contribution
    const voucherNo = `PT-2026-${Math.floor(100 + Math.random() * 900)}`;
    const capVoucher: CashBankVoucher = {
      id: `VC-${Date.now()}`,
      voucherNo,
      type: 'PT',
      date: '2026-03-12',
      partnerId: newMember.id,
      partnerName: `${newMember.fullName} (${newMember.hamlet})`,
      reason: `Thu tiền góp vốn điều lệ tham gia HTX Bích La - ${newMember.fullName}`,
      amount: newMember.capitalContributed,
      debitAccount: '1111',
      creditAccount: '4111',
      status: 'APPROVED',
      creator: 'Lê Đình Quang',
      approver: 'Nguyễn Văn Hùng',
      originalDocument: 'Đơn xin gia nhập HTX'
    };

    setVouchers((prev) => [capVoucher, ...prev]);
    const jEntry = AccountingEngine.generateJournalFromVoucher(capVoucher);
    setJournal((prev) => [jEntry, ...prev]);
  };

  // Add Loan Action
  const handleAddLoan = (newLoan: LoanContract) => {
    setLoans((prev) => [newLoan, ...prev]);

    // Auto generate disbursement voucher & journal
    const voucherNo = `PC-2026-${Math.floor(100 + Math.random() * 900)}`;
    const disVoucher: CashBankVoucher = {
      id: `VC-LOAN-${Date.now()}`,
      voucherNo,
      type: 'PC',
      date: newLoan.startDate,
      partnerId: newLoan.memberId,
      partnerName: `${newLoan.memberName} (${newLoan.hamlet})`,
      reason: `Giải ngân cho vay tín dụng nội bộ theo HĐ ${newLoan.contractNo}`,
      amount: newLoan.loanAmount,
      debitAccount: '1281',
      creditAccount: '1111',
      status: 'APPROVED',
      creator: 'Lê Đình Quang',
      approver: 'Nguyễn Văn Hùng',
      originalDocument: `Hợp đồng tín dụng số ${newLoan.contractNo}`
    };

    setVouchers((prev) => [disVoucher, ...prev]);
    const jEntry = AccountingEngine.generateJournalFromVoucher(disVoucher);
    setJournal((prev) => [jEntry, ...prev]);
  };

  // Repay Loan Action
  const handleRepayLoan = (contractNo: string, principal: number, interest: number) => {
    setLoans((prev) =>
      prev.map((l) => {
        if (l.contractNo === contractNo) {
          const newRemaining = Math.max(0, l.remainingPrincipal - principal);
          return {
            ...l,
            remainingPrincipal: newRemaining,
            paidPrincipal: l.paidPrincipal + principal,
            paidInterest: l.paidInterest + interest,
            status: newRemaining === 0 ? 'COMPLETED' : 'NORMAL'
          };
        }
        return l;
      })
    );

    const loanObj = loans.find((l) => l.contractNo === contractNo);
    const mName = loanObj ? `${loanObj.memberName} (${loanObj.hamlet})` : 'Xã viên HTX';

    // Auto voucher for principal repayment
    if (principal > 0) {
      const vPrincipal: CashBankVoucher = {
        id: `VC-REP-P-${Date.now()}`,
        voucherNo: `PT-2026-${Math.floor(100 + Math.random() * 900)}`,
        type: 'PT',
        date: '2026-03-12',
        partnerId: loanObj?.memberId,
        partnerName: mName,
        reason: `Thu hồi nợ gốc tín dụng nội bộ HĐ ${contractNo}`,
        amount: principal,
        debitAccount: '1111',
        creditAccount: '1281',
        status: 'APPROVED',
        creator: 'Lê Đình Quang',
        approver: 'Nguyễn Văn Hùng',
        originalDocument: `HĐ ${contractNo}`
      };
      setVouchers((prev) => [vPrincipal, ...prev]);
      const jEntryP = AccountingEngine.generateJournalFromVoucher(vPrincipal);
      setJournal((prev) => [jEntryP, ...prev]);
    }

    // Auto voucher for interest collection
    if (interest > 0) {
      const vInterest: CashBankVoucher = {
        id: `VC-REP-I-${Date.now()}`,
        voucherNo: `PT-2026-${Math.floor(100 + Math.random() * 900)}`,
        type: 'PT',
        date: '2026-03-12',
        partnerId: loanObj?.memberId,
        partnerName: mName,
        reason: `Thu lãi tiền vay tín dụng nội bộ HĐ ${contractNo}`,
        amount: interest,
        debitAccount: '1111',
        creditAccount: '515',
        status: 'APPROVED',
        creator: 'Lê Đình Quang',
        approver: 'Nguyễn Văn Hùng',
        originalDocument: `Biên lai thu lãi HĐ ${contractNo}`
      };
      setVouchers((prev) => [vInterest, ...prev]);
      const jEntryI = AccountingEngine.generateJournalFromVoucher(vInterest);
      setJournal((prev) => [jEntryI, ...prev]);
    }
  };

  // Stock Issue Action
  const handleIssueStock = (materialId: string, quantity: number) => {
    const mat = materials.find((m) => m.id === materialId);
    if (!mat) return;

    setMaterials((prev) =>
      prev.map((m) => {
        if (m.id === materialId) {
          return {
            ...m,
            stockQuantity: Math.max(0, m.stockQuantity - quantity)
          };
        }
        return m;
      })
    );

    // Auto journal entry: Nợ 621 / Có 152
    const issueEntry: JournalEntry = {
      id: `XK-${Date.now()}`,
      voucherId: `PXK-${Date.now()}`,
      voucherNo: `PXK-2026-${Math.floor(100 + Math.random() * 900)}`,
      voucherType: 'PXK',
      date: '2026-03-12',
      debitAccount: '621',
      creditAccount: '152',
      amount: quantity * mat.costPrice,
      description: `Xuất kho ${quantity} ${mat.unit} ${mat.name} phục vụ chăm bón lúa vụ Đông Xuân`,
      isPosted: true
    };
    setJournal((prev) => [issueEntry, ...prev]);
  };

  // Depreciation Action
  const handleDepreciate = () => {
    const monthlyDep = fixedAssets.reduce((sum, a) => sum + a.monthlyDepreciation, 0);

    setFixedAssets((prev) =>
      prev.map((a) => ({
        ...a,
        accumulatedDepreciation: a.accumulatedDepreciation + a.monthlyDepreciation
      }))
    );

    // Auto journal entry: Nợ 6274 (Khấu hao máy móc sản xuất) / Có 2141
    const depEntry: JournalEntry = {
      id: `KH-${Date.now()}`,
      voucherId: `PKH-${Date.now()}`,
      voucherNo: `PKH-2026-03`,
      voucherType: 'KH',
      date: '2026-03-31',
      debitAccount: '6274',
      creditAccount: '2141',
      amount: monthlyDep,
      description: 'Trích khấu hao TSCĐ (trạm bơm, máy cày, máy gặt) tháng 03/2026',
      isPosted: true
    };
    setJournal((prev) => [depEntry, ...prev]);
  };

  // Find voucher to print from voucher number
  const handleSelectVoucherForPrint = (voucherNo: string) => {
    const found = vouchers.find((v) => v.voucherNo === voucherNo);
    if (found) {
      setVoucherToPrint(found);
    } else {
      // Create a transient printable voucher object from journal
      const j = journal.find((x) => x.voucherNo === voucherNo);
      if (j) {
        setVoucherToPrint({
          id: j.id,
          voucherNo: j.voucherNo,
          type: (j.voucherType as any) || 'PT',
          date: j.date,
          partnerName: 'Đối tác giao dịch HTX Bích La',
          reason: j.description,
          amount: j.amount,
          debitAccount: j.debitAccount,
          creditAccount: j.creditAccount,
          status: 'APPROVED',
          creator: 'Lê Đình Quang',
          approver: 'Nguyễn Văn Hùng'
        });
      }
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans text-slate-800 antialiased">
      {/* 1. Left Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentRole={currentRole}
        onOpenExcelSync={() => setIsExcelSyncOpen(true)}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header
          currentRole={currentRole}
          setCurrentRole={setCurrentRole}
          onOpenCreateVoucher={() => setIsCreateVoucherOpen(true)}
          onOpenExcelSync={() => setIsExcelSyncOpen(true)}
          onOpenResetData={() => setIsResetConfirmOpen(true)}
          onTriggerPrint={() => {
            if (vouchers[0]) {
              setVoucherToPrint(vouchers[0]);
            }
          }}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Dynamic Main Body Scroll Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'DASHBOARD' && (
            <DashboardView
              kpis={kpis}
              members={members}
              loans={loans}
              materials={materials}
              seasons={seasons}
              onNavigateTab={(tab) => setActiveTab(tab)}
              excelMetrics={excelMetrics}
              onOpenExcelSync={() => setIsExcelSyncOpen(true)}
            />
          )}

          {/* 17 AMATAX V6 WORKBOOK SHEETS DIRECT NAVIGATION */}
          {activeTab === 'DM_TK' && (
            <AccountsListView accounts={accounts} />
          )}

          {activeTab === 'DM_DOITUONG' && (
            <PurchaseSalesView
              partners={partners}
              onOpenCreateVoucher={() => setIsCreateVoucherOpen(true)}
            />
          )}

          {activeTab === 'DM_VATTU' && (
            <WarehouseView
              materials={materials}
              onAddStock={(id, q) => {}}
              onIssueStock={handleIssueStock}
            />
          )}

          {activeTab === 'PHATSINH' && (
            <CashBankView
              initialType="CASH"
              vouchers={vouchers}
              onOpenCreateVoucher={() => setIsCreateVoucherOpen(true)}
              onSelectVoucherForPrint={(v) => setVoucherToPrint(v)}
              onEditVoucher={handleOpenEditVoucher}
              onDeleteVoucher={handleDeleteVoucherOrEntry}
            />
          )}

          {activeTab === 'NKC' && (
            <GeneralLedgerView
              accounts={accounts}
              journal={journal}
              onAddJournalEntry={(entry) => setJournal((prev) => [entry, ...prev])}
              onSelectVoucherForPrint={handleSelectVoucherForPrint}
              onEditJournalEntry={handleOpenEditVoucher}
              onDeleteJournalEntry={handleDeleteVoucherOrEntry}
              initialSubTab="NKC"
            />
          )}

          {activeTab === 'SO_CAI' && (
            <GeneralLedgerView
              accounts={accounts}
              journal={journal}
              onAddJournalEntry={(entry) => setJournal((prev) => [entry, ...prev])}
              onSelectVoucherForPrint={handleSelectVoucherForPrint}
              onEditJournalEntry={handleOpenEditVoucher}
              onDeleteJournalEntry={handleDeleteVoucherOrEntry}
              initialSubTab="SO_CAI"
            />
          )}

          {activeTab === 'SO_PHU' && (
            <GeneralLedgerView
              accounts={accounts}
              journal={journal}
              onAddJournalEntry={(entry) => setJournal((prev) => [entry, ...prev])}
              onSelectVoucherForPrint={handleSelectVoucherForPrint}
              onEditJournalEntry={handleOpenEditVoucher}
              onDeleteJournalEntry={handleDeleteVoucherOrEntry}
              initialSubTab="SO_PHU"
            />
          )}

          {activeTab === 'CONG_NO' && (
            <PurchaseSalesView
              partners={partners}
              onOpenCreateVoucher={() => setIsCreateVoucherOpen(true)}
            />
          )}

          {activeTab === 'XNT' && (
            <WarehouseView
              materials={materials}
              onAddStock={(id, q) => {}}
              onIssueStock={handleIssueStock}
            />
          )}

          {activeTab === 'KET_CHUYEN' && (
            <GeneralLedgerView
              accounts={accounts}
              journal={journal}
              onAddJournalEntry={(entry) => setJournal((prev) => [entry, ...prev])}
              onSelectVoucherForPrint={handleSelectVoucherForPrint}
              onEditJournalEntry={handleOpenEditVoucher}
              onDeleteJournalEntry={handleDeleteVoucherOrEntry}
              initialSubTab="KET_CHUYEN"
            />
          )}

          {activeTab === 'BCDPS' && (
            <GeneralLedgerView
              accounts={accounts}
              journal={journal}
              onAddJournalEntry={(entry) => setJournal((prev) => [entry, ...prev])}
              onSelectVoucherForPrint={handleSelectVoucherForPrint}
              onEditJournalEntry={handleOpenEditVoucher}
              onDeleteJournalEntry={handleDeleteVoucherOrEntry}
              initialSubTab="BCDPS"
            />
          )}

          {activeTab === 'KQKD' && (
            <FinancialReportsView
              kpis={kpis}
              onPrint={() => window.print()}
              initialReport="B02_KQKD"
            />
          )}

          {activeTab === 'LCTT' && (
            <FinancialReportsView
              kpis={kpis}
              onPrint={() => window.print()}
              initialReport="B03_LCTT"
            />
          )}

          {activeTab === 'CDKT' && (
            <FinancialReportsView
              kpis={kpis}
              onPrint={() => window.print()}
              initialReport="B01_CDKT"
            />
          )}

          {activeTab === 'TMBCTC' && (
            <FinancialReportsView
              kpis={kpis}
              onPrint={() => window.print()}
              initialReport="TMBCTC"
            />
          )}

          {activeTab === 'HUONG_DAN' && <UserGuideView />}

          {/* STANDARD MODULES */}
          {activeTab === 'GENERAL_LEDGER' && (
            <GeneralLedgerView
              accounts={accounts}
              journal={journal}
              onAddJournalEntry={(entry) => setJournal((prev) => [entry, ...prev])}
              onSelectVoucherForPrint={handleSelectVoucherForPrint}
              onEditJournalEntry={handleOpenEditVoucher}
              onDeleteJournalEntry={handleDeleteVoucherOrEntry}
            />
          )}

          {activeTab === 'CASH' && (
            <CashBankView
              initialType="CASH"
              vouchers={vouchers}
              onOpenCreateVoucher={() => setIsCreateVoucherOpen(true)}
              onSelectVoucherForPrint={(v) => setVoucherToPrint(v)}
              onEditVoucher={handleOpenEditVoucher}
              onDeleteVoucher={handleDeleteVoucherOrEntry}
            />
          )}

          {activeTab === 'BANK' && (
            <CashBankView
              initialType="BANK"
              vouchers={vouchers}
              onOpenCreateVoucher={() => setIsCreateVoucherOpen(true)}
              onSelectVoucherForPrint={(v) => setVoucherToPrint(v)}
              onEditVoucher={handleOpenEditVoucher}
              onDeleteVoucher={handleDeleteVoucherOrEntry}
            />
          )}

          {activeTab === 'PURCHASE_SALES' && (
            <PurchaseSalesView
              partners={partners}
              onOpenCreateVoucher={() => setIsCreateVoucherOpen(true)}
            />
          )}

          {activeTab === 'WAREHOUSE' && (
            <WarehouseView
              materials={materials}
              onAddStock={(id, q) => {}}
              onIssueStock={handleIssueStock}
            />
          )}

          {activeTab === 'MEMBERS' && (
            <MembersView
              members={members}
              onAddMember={handleAddMember}
              onCapitalContribution={(id, amt) => {}}
            />
          )}

          {activeTab === 'INTERNAL_CREDIT' && (
            <InternalCreditView
              loans={loans}
              members={members}
              onAddLoan={handleAddLoan}
              onRepayLoan={handleRepayLoan}
            />
          )}

          {activeTab === 'AGRICULTURE' && (
            <AgricultureSeasonsView seasons={seasons} />
          )}

          {activeTab === 'FIXED_ASSETS' && (
            <FixedAssetsView
              assets={fixedAssets}
              onDepreciate={handleDepreciate}
            />
          )}

          {activeTab === 'FINANCIAL_REPORTS' && (
            <FinancialReportsView
              kpis={kpis}
              onPrint={() => window.print()}
            />
          )}

          {activeTab === 'DATABASE_ERD' && <DatabaseERDView />}

          {activeTab === 'RBAC' && (
            <RBACPermissionsView
              currentRole={currentRole}
              setCurrentRole={setCurrentRole}
            />
          )}

          {activeTab === 'USER_GUIDE' && <UserGuideView />}
        </main>
      </div>

      {/* 3. Global Modals */}
      {/* Create Voucher Modal */}
      <CreateVoucherModal
        isOpen={isCreateVoucherOpen}
        onClose={() => setIsCreateVoucherOpen(false)}
        accounts={accounts}
        members={members}
        partners={partners}
        onSaveVoucher={handleSaveVoucher}
      />

      {/* Voucher Print Modal */}
      <VoucherPrintModal
        voucher={voucherToPrint}
        onClose={() => setVoucherToPrint(null)}
      />

      {/* Excel Data Sync Modal */}
      <ExcelDataSyncModal
        isOpen={isExcelSyncOpen}
        onClose={() => setIsExcelSyncOpen(false)}
        onUpdateMetrics={handleUpdateExcelMetrics}
        onResetToEmpty={handleResetToEmpty}
        onResetToSample={handleResetToSample}
        onClearTransactionsOnly={handleClearTransactionsOnly}
        onClearEverything={handleClearEverything}
        onImportData={handleImportExcelData}
        currentMetrics={excelMetrics}
      />

      {/* Sửa thông tin / Sửa hạch toán chứng từ */}
      <EditVoucherModal
        isOpen={isEditVoucherOpen}
        onClose={() => {
          setIsEditVoucherOpen(false);
          setEditingVoucher(null);
        }}
        voucher={editingVoucher}
        accounts={accounts}
        onSave={handleSaveEditedVoucher}
        onDelete={(id, vNo) => handleDeleteVoucherOrEntry(id, vNo)}
      />

      {/* Xóa toàn bộ dữ liệu & Nhập lại từ đầu */}
      <ResetDataConfirmModal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onClearTransactionsOnly={handleClearTransactionsOnly}
        onClearEverything={handleClearEverything}
        onRestoreSampleData={handleRestoreSampleData}
      />
    </div>
  );
}
