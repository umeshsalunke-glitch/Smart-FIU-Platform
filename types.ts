export enum Screen {
  HOME = 'HOME',
  EDUCATION = 'EDUCATION',
  AA_LOGIN = 'AA_LOGIN',
  BANK_SELECTION = 'BANK_SELECTION',
  CONSENT = 'CONSENT',
  BANK_OTP = 'BANK_OTP',
  SUCCESS = 'SUCCESS',
  PROCESSING = 'PROCESSING',
  RESULT = 'RESULT',
  TRUST_CENTER = 'TRUST_CENTER'
}

export interface LoanState {
  amount: number;
  tenure: number;
  maxAmount: number;
  interestRate: number;
}

export interface ConsentDetails {
  purpose: string;
  duration: string;
  dataPoints: string[];
  partner: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountType: string;
  mask: string;
  logo: string;
  isLinked: boolean;
}

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  type: 'credit' | 'debit';
}