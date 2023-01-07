import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {
  ApiCategoriesList,
  ApiTransactionsList,
  OneTransaction,
  Transaction,
  TransactionApi,
  TransactionMedium
} from "../types";

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchAll',
  async () => {
    const categoriesResponse = await axiosApi.get<ApiCategoriesList | null>('/categories.json');
    const categories = categoriesResponse.data;
    const response = await axiosApi.get<ApiTransactionsList | null>('/transactions.json');
    const transactions = response.data;
    let newTransactions: TransactionMedium[] = [];
    if (transactions) {
      newTransactions = Object.keys(transactions).map(id => {
        return {
          ...transactions[id],
          id
        }
      })
    }

    let lastTransactions: Transaction[] = [];
    if (categories) {
       newTransactions.forEach(transaction => {
        Object.keys(categories).forEach(id => {
          if (transaction.category === id) {
            lastTransactions.push({
              type: categories[id].type,
              name: categories[id].name,
              amount: transaction.amount,
              createdAt: transaction.createdAt,
              id: transaction.id
            })
          }
        })
      })
    }
    return lastTransactions;
  }
)

export const fetchOneTransaction = createAsyncThunk<OneTransaction, string>(
  'transactions/fetchOne',
  async (id) => {
    const categoriesResponse = await axiosApi.get<ApiCategoriesList | null>('/categories.json');
    const categories = categoriesResponse.data;
    const response = await axiosApi.get<TransactionApi | null>('/transactions/' + id + '.json');
    const transaction = response.data;

    if (transaction === null) {
      throw new Error('Not found!');
    }

    let newTransaction: OneTransaction = {
      type: '',
      name: '',
      amount: 0,
      createdAt: ''
    };

    if (categories) {
      Object.keys(categories).forEach(categoryId => {
        if (categoryId === transaction.category) {
          newTransaction = {
            type: categories[categoryId].type,
            name: categories[categoryId].name,
            amount: transaction.amount,
            createdAt: transaction.createdAt,
          }
        }
      })
    }

    return newTransaction;
  }
)

export const createTransaction = createAsyncThunk<void, TransactionApi>(
  'transactions/create',
  async (transaction) => {
    await axiosApi.post('/transactions.json', transaction);
  }
)

export const deleteTransaction = createAsyncThunk<void, string>(
  'transactions/delete',
  async (id) => {
    await axiosApi.delete('/transactions/' + id + '.json');
  }
)

interface UpdateParams {
  id: string;
  transaction: TransactionApi;
}

export const updateTransaction = createAsyncThunk<void, UpdateParams>(
  'transactions/update',
  async (params) => {
    await axiosApi.put('/transactions/' + params.id + '.json', params.transaction)
  }
)