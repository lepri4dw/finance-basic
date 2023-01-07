import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useNavigate, useParams} from "react-router-dom";
import {
  selectFetchOneTransactionLoading,
  selectOneTransaction,
  selectTransactionUpdateLoading
} from "../../store/transactionsSlice";
import {TransactionApi} from "../../types";
import {fetchOneTransaction, updateTransaction} from "../../store/transactionsThunks";
import Spinner from "../../components/Spinner/Spinner";
import TransactionForm from "../../components/TransactionForm/TransactionForm";

const EditTransaction = () => {
  const dispatch = useAppDispatch();
  const {trId} = useParams() as {trId: string};
  const navigate = useNavigate();
  const updateLoading = useAppSelector(selectTransactionUpdateLoading);
  const fetchOneLoading = useAppSelector(selectFetchOneTransactionLoading);
  const transaction = useAppSelector(selectOneTransaction);

  const onSubmit = async (transaction: TransactionApi) => {
    await dispatch(updateTransaction({id: trId, transaction}));
    navigate('/');
  }

  useEffect(() => {
    dispatch(fetchOneTransaction(trId));
  }, [dispatch, trId]);

  return (
    <div className="mt-2 container">
      {fetchOneLoading ? <Spinner/> : transaction &&
        <TransactionForm onSubmit={onSubmit} isLoading={updateLoading} isEdit existingTransaction={{...transaction, amount: transaction.amount.toString()}}/> }
    </div>
  );
};

export default EditTransaction;