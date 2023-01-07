import {OneTransaction, Transaction} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {
  createTransaction,
  deleteTransaction,
  fetchOneTransaction,
  fetchTransactions,
  updateTransaction
} from "./transactionsThunks";
import {RootState} from "../app/store";


interface TransactionsState {
  items: Transaction[];
  fetchLoading: boolean;
  updateLoading: boolean;
  createLoading: boolean;
  deleteLoading: false | string;
  fetchOneLoading: boolean;
  oneTransaction: null | OneTransaction;
}

const initialState: TransactionsState = {
  items: [],
  fetchLoading: false,
  updateLoading: false,
  createLoading: false,
  deleteLoading: false,
  fetchOneLoading: false,
  oneTransaction: null,
}

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, state => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchTransactions.fulfilled, (state,{payload: transactions}) => {
      state.fetchLoading = false;
      state.items = transactions;
    });
    builder.addCase(fetchTransactions.rejected, state => {
      state.fetchLoading = false;
    });

    builder.addCase(createTransaction.pending, state => {
      state.createLoading = true;
    });
    builder.addCase(createTransaction.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createTransaction.rejected, state => {
      state.createLoading = false;
    });

    builder.addCase(fetchOneTransaction.pending, state => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneTransaction.fulfilled, (state, {payload: transaction}) => {
      state.oneTransaction = transaction;
      state.fetchOneLoading = false;
    });
    builder.addCase(fetchOneTransaction.rejected, state => {
      state.fetchOneLoading = false;
    });

    builder.addCase(deleteTransaction.pending, (state, {meta: {arg: id}}) => {
      state.deleteLoading = id;
    });
    builder.addCase(deleteTransaction.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteTransaction.rejected, state => {
      state.deleteLoading = false;
    });

    builder.addCase(updateTransaction.pending, state => {
      state.updateLoading = true;
    });
    builder.addCase(updateTransaction.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(updateTransaction.rejected, state => {
      state.updateLoading = false;
    });
  }
})

export const transactionsReducer = transactionsSlice.reducer;

export const selectTransactions = (state: RootState) => state.transactions.items;
export const selectTransactionsFetchLoading = (state: RootState) => state.transactions.fetchLoading;
export const selectTransactionDeleteLoading = (state: RootState) => state.transactions.deleteLoading;
export const selectTransactionUpdateLoading = (state: RootState) => state.transactions.updateLoading;
export const selectOneTransaction = (state: RootState) => state.transactions.oneTransaction;
export const selectFetchOneTransactionLoading = (state: RootState) => state.transactions.fetchOneLoading;
export const selectTransactionCreateLoading = (state: RootState) => state.transactions.createLoading;