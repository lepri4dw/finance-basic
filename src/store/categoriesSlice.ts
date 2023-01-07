import {ApiCategoriesList, ApiCategory, Category} from "../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {RootState} from "../app/store";

interface CategoriesState {
  items: Category[];
  fetchLoading: boolean;
  updateLoading: boolean;
  createLoading: boolean;
  deleteLoading: false | string;
  fetchOneLoading: boolean;
  oneCategory: null | ApiCategory;
}

const initialState: CategoriesState = {
  items: [],
  fetchLoading: false,
  updateLoading: false,
  createLoading: false,
  deleteLoading: false,
  fetchOneLoading: false,
  oneCategory: null
}

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

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, {payload: categories}) => {
      state.fetchLoading = false;
      state.items = categories;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(deleteCategory.pending, (state, {meta: {arg: categoryId}}) => {
      state.deleteLoading = categoryId;
    });
    builder.addCase(deleteCategory.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteCategory.rejected, (state) => {
      state.deleteLoading = false;
    })

    builder.addCase(createCategory.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createCategory.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createCategory.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(updateCategory.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(updateCategory.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(updateCategory.rejected, (state) => {
      state.updateLoading = false;
    });

    builder.addCase(fetchCategory.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchCategory.fulfilled, (state, {payload: category}) => {
      state.fetchOneLoading = false;
      state.oneCategory = category;
    });
    builder.addCase(fetchCategory.rejected, (state) => {
      state.fetchOneLoading = false;
    });
  }
});

export const categoriesReducer = categoriesSlice.reducer;

export const selectCategories = (state: RootState) => state.categories.items;
export const selectCategoriesFetchLoading = (state: RootState) => state.categories.fetchLoading;
export const selectCategoryDeleteLoading = (state: RootState) => state.categories.deleteLoading;
export const selectCategoryCreateLoading = (state: RootState) => state.categories.createLoading;
export const selectCategoryUpdateLoading = (state: RootState) => state.categories.updateLoading;
export const selectOneCategoryFetchLoading = (state: RootState) => state.categories.fetchOneLoading;
export const selectOneCategory = (state: RootState) => state.categories.oneCategory;