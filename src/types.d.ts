export interface Category {
  type: string;
  name: string;
  id: string;
}

export type ApiCategory = Omit<Category, "id">

export interface ApiCategoriesList {
  [id: string]: ApiCategory;
}