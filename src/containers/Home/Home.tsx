import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {deleteTransaction, fetchTransactions} from "../../store/transactionsThunks";
import {
  selectTransactionDeleteLoading,
  selectTransactions,
  selectTransactionsFetchLoading
} from "../../store/transactionsSlice";
import Spinner from "../../components/Spinner/Spinner";
import {Link} from "react-router-dom";
import {PencilSquare, TrashFill} from "react-bootstrap-icons";
import dayjs from "dayjs";
import {Transaction} from "../../types";

const Home = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const fetchLoading = useAppSelector(selectTransactionsFetchLoading);
  const deleteLoading = useAppSelector(selectTransactionDeleteLoading);
  const total = transactions.reduce((sum, transaction) => {
    if (transaction.type === 'Income') {
      return sum + transaction.amount;
    } else {
      return sum - transaction.amount;
    }
  }, 0);

  let sortedTransactions: Transaction[] = [];
  if (transactions.length > 0) {
    sortedTransactions = transactions.slice().sort((a, b) => {
      if (b.createdAt < a.createdAt) {
        return -1;
      }
      if (b.createdAt > a.createdAt) {
        return 1;
      }
      return 0;
    });
  }

  const removeTransaction = async (id: string) => {
    await dispatch(deleteTransaction(id));
    await dispatch(fetchTransactions());
  }
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="fs-3 border-dark border border-2 p-4 me-auto w-25">Total: <span className={total >= 0 ? 'text-success' : 'text-danger'}>{total} KGZ</span></div>
      <div className="mt-3">
        {fetchLoading ? <Spinner/> : sortedTransactions.map(transaction => (
          <div key={transaction.id} className="card w-50 mb-3">
            <div className="card-body d-flex my-auto justify-content-between">
              <div>
                <span className="me-4">{dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}</span>
                <span>{transaction.name}</span>
              </div>
              <div className="d-flex my-auto">
                {transaction.type === 'Income' ? <span className="text-success">{transaction.amount}KGZ</span> :
                <span className="text-danger">-{transaction.amount}KGZ</span>}
                <Link to={'/edit-transaction/' + transaction.id} className="ms-2"><PencilSquare size={25}/></Link>
                <button className="ms-2 bg-white border-0" disabled={deleteLoading ? deleteLoading === transaction.id : false} onClick={() => removeTransaction(transaction.id)}><TrashFill size={25}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;