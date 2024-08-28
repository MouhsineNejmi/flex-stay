export interface Category {
  id: string;
  icon: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryQuery {
  id?: string;
  icon?: string;
  name?: string;
}
