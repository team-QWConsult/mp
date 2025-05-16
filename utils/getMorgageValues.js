export const getMorgageValues = (data) => {
  const { homeValue, downPayment, loanTerm, interestRate } = data;

  const loanAmount = homeValue - downPayment;
  const totalLoanMonths = loanTerm * 12;
  const interestPerMonth = interestRate / 100 / 12;
  const monthlyPayment = (
    (loanAmount *
      interestPerMonth *
      (1 + interestPerMonth) ** totalLoanMonths) /
    ((1 + interestPerMonth) ** totalLoanMonths - 1)
  ).toFixed();

  const totalPayments = (monthlyPayment * totalLoanMonths).toFixed();

  const totalInterestGenerated = (
    monthlyPayment * totalLoanMonths -
    loanAmount
  ).toFixed();

  return { monthlyPayment, totalInterestGenerated, totalPayments };
};
