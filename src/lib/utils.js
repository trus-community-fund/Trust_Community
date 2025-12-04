export const DEFAULT_IMAGE = 'https://i.ibb.co/HTNrbJxD/20250716-222246.png';

export function processRawData(data) {
  if (!data) return { processedMembers: [], communityStats: {} };

  const allMembersRaw = data.members || {};
  const allTransactionsRaw = data.transactions || {};
  const allActiveLoansRaw = data.activeLoans || {};

  const allTransactions = Object.values(allTransactionsRaw);
  const allActiveLoans = Object.values(allActiveLoansRaw);
  const processedMembers = [];

  // 1. Members Processing
  for (const memberId in allMembersRaw) {
    const member = allMembersRaw[memberId];
    if (member.status !== 'Approved') continue;

    const memberTransactions = allTransactions.filter(tx => tx.memberId === memberId);

    // SIP Calculation
    let totalSipAmount = 0;
    memberTransactions.forEach(tx => {
      if (tx.type === 'SIP') totalSipAmount += parseFloat(tx.amount || 0);
    });

    // Active Loan Calculation
    const memberActiveLoans = allActiveLoans.filter(loan => loan.memberId === memberId && loan.status === 'Active');
    const totalOutstanding = memberActiveLoans.reduce((sum, loan) => sum + parseFloat(loan.outstandingAmount || 0), 0);

    // Balance on Card
    const displayBalance = totalSipAmount - totalOutstanding;

    processedMembers.push({
      ...member,
      id: memberId,
      balance: displayBalance,
      displayImageUrl: member.profilePicUrl || DEFAULT_IMAGE,
    });
  }

  // Sorting: Rich members first
  processedMembers.sort((a, b) => b.balance - a.balance);

  // 2. Community Stats Calculation
  let totalPureSip = 0;
  allTransactions.forEach(tx => {
    if (tx.type === 'SIP') totalPureSip += parseFloat(tx.amount || 0);
  });

  const totalCurrentLoans = allActiveLoans
    .filter(loan => loan.status === 'Active')
    .reduce((sum, loan) => sum + parseFloat(loan.outstandingAmount || 0), 0);

  const availableBalance = totalPureSip - totalCurrentLoans;

  return {
    processedMembers,
    communityStats: {
      totalSipAmount: totalPureSip,
      totalCurrentLoanAmount: totalCurrentLoans,
      availableCommunityBalance: availableBalance
    }
  };
}
