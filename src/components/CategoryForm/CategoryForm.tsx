import React, {useState} from 'react';
import {ApiCategory} from "../../types";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
  onSubmit: (newCategory: ApiCategory) => void;
  existingCategory?: ApiCategory;
  isLoading?: boolean;
  isEdit?: boolean;
}

const initialState = {
  type: '',
  name: ''
}

const CategoryForm: React.FC<Props> = ({onSubmit, existingCategory = initialState, isLoading = false, isEdit = false}) => {
  const [category, setCategory] = useState<ApiCategory>(existingCategory);

  const onCategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;

    setCategory(prev => ({...prev, [name]: value}));
  }

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(category);
  }
  return (
    <form onSubmit={onFormSubmit}>
      <h4>{isEdit ? 'Edit category' : 'Add category'}</h4>
      <div className="form-group">
        <label htmlFor="type">Type</label>
        <select id="type" name="type" className="form-control" value={category.type} onChange={onCategoryChange} required>
          <option disabled value="">Choose type</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>
      <div className="form-group my-3">
        <label htmlFor="name">Name</label>
        <input id="name" type="text" name="name" className="form-control" value={category.name} onChange={onCategoryChange} required/>
      </div>
      <button className="btn btn-primary mt-2" type="submit" disabled={isLoading}>{isLoading && <ButtonSpinner/>}Save</button>
    </form>
  );
};

export default CategoryForm;