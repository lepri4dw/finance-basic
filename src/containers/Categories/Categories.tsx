import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchCategories, selectCategories, selectCategoriesFetchLoading} from "../../store/categoriesSlice";
import Spinner from "../../components/Spinner/Spinner";
import {PencilSquare, TrashFill} from "react-bootstrap-icons";

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const fetchLoading = useAppSelector(selectCategoriesFetchLoading);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch])

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h2>Categories</h2>
        <button className="btn btn-outline-dark">Add category</button>
      </div>
      <div className="mt-3">
        {fetchLoading ? <Spinner/> : categories.map(category => (
          <div key={category.id} className="card w-50 mb-3">
            <div className="card-body d-flex my-auto justify-content-between">
              <span>{category.name}</span>
              <div className="d-flex my-auto">
                <span className={category.type === 'Income' ? 'text-danger' : 'text-success'}>{category.type}</span>
                <span className="ms-2"><PencilSquare size={25}/></span>
                <span className="ms-2"><TrashFill size={25}/></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;