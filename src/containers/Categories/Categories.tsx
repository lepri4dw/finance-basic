import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
  deleteCategory,
  fetchCategories,
  selectCategories,
  selectCategoriesFetchLoading,
  selectCategoryDeleteLoading
} from "../../store/categoriesSlice";
import Spinner from "../../components/Spinner/Spinner";
import {PencilSquare, TrashFill} from "react-bootstrap-icons";
import {Link} from "react-router-dom";

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const fetchLoading = useAppSelector(selectCategoriesFetchLoading);
  const deleteLoading = useAppSelector(selectCategoryDeleteLoading);

  const removeCategory = async (id: string) => {
    await dispatch(deleteCategory(id));
    await dispatch(fetchCategories());
  }


  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch])

  return (
    <div className="container">
      <div className="d-flex justify-content-between w-50">
        <h2>Categories</h2>
        <Link to="/categories/new-category" className="btn btn-outline-dark">Add category</Link>
      </div>
      <div className="mt-3">
        {fetchLoading ? <Spinner/> : categories.map(category => (
          <>
            <div key={category.id} className="card w-50 mb-3">
              <div className="card-body d-flex my-auto justify-content-between">
                <span>{category.name}</span>
                <div className="d-flex my-auto">
                  <span className={category.type === 'Income' ? 'text-success' : 'text-danger'}>{category.type}</span>
                  <Link to={'/categories/edit-category/' + category.id} className="ms-2"><PencilSquare size={25}/></Link>
                  <button className="ms-2 bg-white border-0" disabled={deleteLoading ? deleteLoading === category.id : false} onClick={() => removeCategory(category.id)}><TrashFill size={25}/></button>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>

    </div>
  );
};

export default Categories;