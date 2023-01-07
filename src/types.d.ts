export interface Transaction {
  type: string;
  name: string;
  amount: number;
  createdAt: string;
  id: string;
}

export interface TransactionApi {
  amount: number;
  category: string;
  createdAt: string;
}

export type OneTransaction = Omit<Transaction, 'id'>

export interface TransactionMutation {
  type: string;
  name: string;
  amount: string;
  createdAt: string;
}

export interface TransactionMedium extends TransactionApi{
  id: string;
}

export interface ApiTransactionsList {
  [id: string]: TransactionApi;
}

export interface Category {
  type: string;
  name: string;
  id: string;
}

export type ApiCategory = Omit<Category, "id">

export interface ApiCategoriesList {
  [id: string]: ApiCategory;
}