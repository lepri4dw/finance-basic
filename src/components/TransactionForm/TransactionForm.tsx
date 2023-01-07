import React, {useEffect, useState} from 'react';
import ButtonSpinner from "../Spinner/ButtonSpinner";
import {TransactionApi, TransactionMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCategories} from "../../store/categoriesSlice";
import {fetchCategories} from "../../store/categoriesThunks";

interface Props {
  onSubmit: (transaction: TransactionApi) => void;
  existingTransaction?: TransactionMutation;
  isLoading?: boolean;
  isEdit?: boolean;
}

const initialState: TransactionMutation = {
  type: '',
  name: '',
  amount: '',
  createdAt: '',
}

const TransactionForm: React.FC<Props> = ({onSubmit, existingTransaction = initialState, isLoading = false, isEdit = false}) => {
  const dispatch = useAppDispatch();
  const [transaction, setTransaction] = useState<TransactionMutation>(existingTransaction);
  const categories = useAppSelector(selectCategories);
  const incomeCategories = categories.filter(category => category.type === 'Income');
  const expenseCategories = categories.filter(category => category.type === 'Expense');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const onTransactionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;

    setTransaction(prev => ({...prev, [name]: value}));
  }

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let categoryId = '';
    categories.forEach(category => {
      if (category.name === transaction.name) {
        categoryId = category.id;
      }
    });
    const date = new Date();
    onSubmit ({
      category: categoryId,
      amount: parseFloat(transaction.amount),
      createdAt: transaction.createdAt || date.toISOString(),
    })

  }
  return (
    <form onSubmit={onFormSubmit}>
      <h4>{isEdit ? 'Edit transaction' : 'Add transaction'}</h4>
      <div className="form-group">
        <label htmlFor="type">Type</label>
        <select id="type" name="type" className="form-control" value={transaction.type} onChange={onTransactionChange} required>
          <option disabled value="">Choose type</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="name">Category</label>
        <select id="name" name="name" className="form-control" value={transaction.name} onChange={onTransactionChange} required>
          <option value="">Choose category</option>
          {transaction.type && transaction.type === 'Income' ? incomeCategories.map(category => (
            <option key={category.id} value={category.name}>{category.name}</option>
          )) : expenseCategories.map(category => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group my-3">
        <label htmlFor="amount">Amount</label>
        <input id="amount" type="number" name="amount" className="form-control" value={transaction.amount} onChange={onTransactionChange} required/>
      </div>
      <button className="btn btn-primary mt-2" type="submit" disabled={isLoading}>{isLoading && <ButtonSpinner/>}Save</button>
    </form>
  );
};


export default TransactionForm;