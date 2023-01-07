import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {ApiCategoriesList, ApiCategory, Category} from "../types";

export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async () => {
    const response = await axiosApi.get<ApiCategoriesList | null>('/categories.json');
    const categories = response.data;
    let newCategories: Category[] = [];

    if (categories) {
      newCategories = Object.keys(categories).map(id => {
        return {
          ...categories[id],
          id
        }
      });
    }

    return newCategories;
  }
)

export const deleteCategory = createAsyncThunk<void, string>(
  'categories/delete',
  async (categoryId) => {
    await axiosApi.delete('/categories/' + categoryId + '.json');
  }
);

export const createCategory = createAsyncThunk<void, ApiCategory>(
  'categories/create',
  async (apiCategory) => {
    await axiosApi.post('/categories.json', apiCategory);
  }
);

export const fetchCategory = createAsyncThunk<ApiCategory, string>(
  'categories/fetchOne',
  async (id) => {
    const response = await axiosApi.get('/categories/' + id + '.json');
    const category = response.data;

    if (category === null) {
      throw new Error('Not Found!');
    }

    return category;
  }
)

interface UpdateCategoryParams {
  id: string;
  category: ApiCategory;
}

export const updateCategory = createAsyncThunk<void, UpdateCategoryParams>(
  'categories/update',
  async (params) => {
    await axiosApi.put('/categories/' + params.id + '.json', params.category)
  }
)
