export enum Screen {
  HOME = 'HOME',
  EDUCATION = 'EDUCATION',
  CONSENT = 'CONSENT',
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

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  type: 'credit' | 'debit';
}