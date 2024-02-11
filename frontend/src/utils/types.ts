export interface DebtType {
  id: number;
  currentAmount: number;
  totalAmount: number;
  description: string;
  paid: boolean;
  created_at: string;
  debtor: UserType;
  creditor: UserType
}

export interface MainDataType {
  totalAmount: number;
  totalCreditorDebt: number;
  totalDebt: number
}

export interface UserType {
  id: number;
  name: string;
  email: string;
}

export interface DebtStateType {
  allDebts: DebtType[];
  debt: DebtType | null;
  mainData?: MainDataType | null;
}

export interface AuthStateType {
  isAuth: boolean;
  currentUser?: UserType; 
  error: string | null;
}

export interface ErrorsType {
  email: string;
  password: string;
}

export interface EditType {
  currentAmount?: number;
  totalAmount?: number;
  description: string;
}

export interface CreateType {
  debtor_id: number;
  creditor_id: number;
  currentAmount: number;
  totalAmount: number;
  description: string;
}
