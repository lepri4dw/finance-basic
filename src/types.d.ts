export interface Category {
  type: string;
  name: string;
  id: string;
}

export interface ApiCategory {
  type: string;
  name: string;
}

export interface ApiCategoriesList {
  [id: string]: ApiCategory;
}