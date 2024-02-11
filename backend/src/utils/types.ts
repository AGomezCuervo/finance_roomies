export interface UserBody {
  name: string;
}

export interface DebtBody {
  debtor_id: number;
  creditor_id: number;
  currentAmount: number;
  totalAmount: number;
  description: string;
  paid: boolean;
  created_at: string;
} 
