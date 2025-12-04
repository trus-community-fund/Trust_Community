// src/lib/utils.js
// Logic Ported from user-data.js

export const DEFAULT_IMAGE = 'https://i.ibb.co/HTNrbJxD/20250716-222246.png';
const PRIME_MEMBERS = ["Prince Rama", "Amit kumar", "Mithilesh Sahni"];

/**
 * Raw Data ko process karne ka logic (Calculation Engine).
 * Yeh Firebase se aane wale raw data ko UI-friendly format mein badalta hai.
 */
export function processRawData(data) {
    if (!data) return { processedMembers: [], communityStats: {} };

    const allMembersRaw = data.members || {};
    const allTransactionsRaw = data.transactions || {};
    const allActiveLoansRaw = data.activeLoans || {};
    const penaltyWalletRaw = data.penaltyWallet || {};
    const adminSettingsRaw = data.admin || {};
    const notificationsRaw = adminSettingsRaw.notifications || {};
    const manualNotificationsRaw = notificationsRaw.manual || {};
    const automatedQueueRaw = notificationsRaw.automatedQueue || {};
    const allProductsRaw = data.products || {};
    const headerButtonsRaw = adminSettingsRaw.header_buttons || {};

    const processedMembers = {};
    const allTransactions = Object.values(allTransactionsRaw);
    // Loan objects ko array mein convert karo
    const allActiveLoans = Object.values(allActiveLoansRaw);

    // 1. Members Processing loop
    for (const memberId in allMembersRaw) {
        const member = allMembersRaw[memberId];
        // Sirf approved members ko process karo
        if (member.status !== 'Approved' || !member.fullName) continue;

        const memberTransactions = allTransactions.filter(tx => tx.memberId === memberId);

        let totalSipAmount = 0;
        let totalReturn = 0;
        let loanCount = 0;

        memberTransactions.forEach(tx => {
            if (tx.type === 'SIP') {
                totalSipAmount += parseFloat(tx.amount || 0);
            }
            if (tx.type === 'Loan Payment') {
                totalReturn += parseFloat(tx.interestPaid || 0);
            }
            if (tx.type === 'Loan Taken') {
                loanCount++;
            }
        });

        // Calculate Outstanding Loan
        const memberActiveLoans = allActiveLoans.filter(loan => loan.memberId === memberId && loan.status === 'Active');
        const totalOutstandingLoan = memberActiveLoans.reduce((sum, loan) => sum + parseFloat(loan.outstandingAmount || 0), 0);

        // Final Balance Formula: Total SIP - Outstanding Loan
        const displayBalanceOnCard = totalSipAmount - totalOutstandingLoan;

        // Check if SIP is paid for current month
        const now = new Date();
        const currentMonthSip = memberTransactions.find(tx => 
            tx.type === 'SIP' &&
            new Date(tx.date).getMonth() === now.getMonth() &&
            new Date(tx.date).getFullYear() === now.getFullYear()
        );

        processedMembers[memberId] = {
            ...member,
            id: memberId,
            name: member.fullName,
            balance: displayBalanceOnCard,
            totalReturn: totalReturn,
            loanCount: loanCount,
            displayImageUrl: member.profilePicUrl || DEFAULT_IMAGE,
            // Case insensitive check for Prime Members
            isPrime: PRIME_MEMBERS.some(p => p.trim().toLowerCase() === member.fullName.trim().toLowerCase()),
            sipStatus: { 
                paid: !!currentMonthSip, 
                amount: currentMonthSip ? parseFloat(currentMonthSip.amount) : 0 
            }
        };
    }

    // Sort: Ameer members pehle (Descending order of balance)
    const sortedMembers = Object.values(processedMembers).sort((a, b) => b.balance - a.balance);

    // 2. Community Stats Calculation
    const communityStats = calculateCommunityStats(sortedMembers, allTransactions, allActiveLoans, penaltyWalletRaw);

    return {
        processedMembers: sortedMembers,
        allTransactions,
        penaltyWalletData: penaltyWalletRaw,
        adminSettings: adminSettingsRaw,
        communityStats,
        manualNotifications: manualNotificationsRaw,
        automatedQueue: automatedQueueRaw,
        allProducts: allProductsRaw,
        headerButtons: headerButtonsRaw,
    };
}

/**
 * Poore community ke liye aarthik (financial) stats calculate karta hai.
 */
function calculateCommunityStats(processedMembers, allTransactions, allActiveLoans, penaltyWallet) {
    let totalPureSipAmount = 0;

    // Sirf 'SIP' transactions ko jodkar 'Total SIP Amount' banaya jayega.
    allTransactions.forEach(tx => {
        if (tx.type === 'SIP') {
            totalPureSipAmount += parseFloat(tx.amount || 0);
        }
    });

    const totalCurrentLoanAmount = allActiveLoans
        .filter(loan => loan.status === 'Active')
        .reduce((sum, loan) => sum + parseFloat(loan.outstandingAmount || 0), 0);

    // 'Available Community Balance' ki calculation logic.
    // Available = Total Jama Hua Paisa - Total Udhaar Diya Hua Paisa
    const availableCommunityBalance = totalPureSipAmount - totalCurrentLoanAmount;

    const totalInterestReceived = allTransactions
        .filter(tx => tx.type === 'Loan Payment')
        .reduce((sum, tx) => sum + parseFloat(tx.interestPaid || 0), 0);

    const penaltyFromInterest = totalInterestReceived * 0.10; // 10% Deduction

    const penaltyIncomes = Object.values(penaltyWallet.incomes || {});
    const penaltyExpenses = Object.values(penaltyWallet.expenses || {});
    const totalPenaltyIncomes = penaltyIncomes.reduce((sum, income) => sum + income.amount, 0);
    const totalPenaltyExpenses = penaltyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    return {
        totalSipAmount: totalPureSipAmount, // Modal mein dikhane ke liye
        totalCurrentLoanAmount,
        netReturnAmount: totalInterestReceived - penaltyFromInterest,
        availableCommunityBalance: availableCommunityBalance, // Sahi formula ke saath
        totalPenaltyBalance: totalPenaltyIncomes - totalPenaltyExpenses,
        totalLoanDisbursed: allTransactions.filter(tx => tx.type === 'Loan Taken').reduce((sum, tx) => sum + tx.amount, 0)
    };
}

