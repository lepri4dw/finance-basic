import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useNavigate, useParams} from "react-router-dom";
import {
  selectCategoryUpdateLoading,
  selectOneCategory,
  selectOneCategoryFetchLoading,
} from "../../store/categoriesSlice";
import {ApiCategory} from "../../types";
import Spinner from "../../components/Spinner/Spinner";
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import {fetchCategory, updateCategory} from "../../store/categoriesThunks";

const EditCategory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {id} = useParams() as {id: string};
  const updateLoading = useAppSelector(selectCategoryUpdateLoading);
  const fetchOneLoading = useAppSelector(selectOneCategoryFetchLoading);
  const category = useAppSelector(selectOneCategory);

  useEffect(() => {
    dispatch(fetchCategory(id));
  }, [dispatch, id]);

  const onSubmit = async (category: ApiCategory) => {
    await dispatch(updateCategory({id, category}));
    navigate('/categories');
  }

  return (
    <div className="mt-2 container">
      {fetchOneLoading ? <Spinner/> : category && <CategoryForm onSubmit={onSubmit} existingCategory={category} isLoading={updateLoading} isEdit/>}
    </div>
  );
};

export default EditCategory;