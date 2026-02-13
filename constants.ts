import { LoanState, ConsentDetails } from './types';

export const INITIAL_LOAN_STATE: LoanState = {
  amount: 200000,
  tenure: 12,
  maxAmount: 500000,
  interestRate: 11.5,
};

export const CONSENT_INFO: ConsentDetails = {
  purpose: "To verify your income and approve your loan",
  duration: "30 days",
  dataPoints: ["Bank statements (last 12 months)", "Account Balance"],
  partner: "Secure AA Network"
};

export const MOCK_CHART_DATA = [
  { name: 'Jan', income: 45000, expense: 32000 },
  { name: 'Feb', income: 45000, expense: 34000 },
  { name: 'Mar', income: 48000, expense: 28000 },
  { name: 'Apr', income: 45000, expense: 35000 },
  { name: 'May', income: 52000, expense: 30000 },
  { name: 'Jun', income: 45000, expense: 29000 },
];
