import React from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCategoryCreateLoading} from "../../store/categoriesSlice";
import {ApiCategory} from "../../types";
import {useNavigate} from "react-router-dom";
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import {createCategory} from "../../store/categoriesThunks";

const NewCategory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const createLoading = useAppSelector(selectCategoryCreateLoading);

  const onSubmit = async (category: ApiCategory) => {
    await dispatch(createCategory(category));
    navigate('/categories');
  }
  return (
    <div className="mt-2 container">
      <CategoryForm onSubmit={onSubmit} isLoading={createLoading}/>
    </div>
  );
};

export default NewCategory;