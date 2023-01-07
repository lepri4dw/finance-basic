import React from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectTransactionCreateLoading} from "../../store/transactionsSlice";
import {useNavigate} from "react-router-dom";
import {TransactionApi} from "../../types";
import {createTransaction} from "../../store/transactionsThunks";
import TransactionForm from "../../components/TransactionForm/TransactionForm";

const NewTransaction = () => {
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectTransactionCreateLoading);
  const navigate = useNavigate();

  const onSubmit = async (transaction: TransactionApi) => {
    await dispatch(createTransaction(transaction));
    navigate('/');
  }
  return (
    <div className="mt-2 container">
      <TransactionForm onSubmit={onSubmit} isLoading={createLoading}/>
    </div>
  );
};

export default NewTransaction;