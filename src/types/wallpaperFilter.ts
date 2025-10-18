export interface WallpaperFilterProps {
  base: Base;
  filters: Filter[];
  products: Product[];
}

export interface Base {
  category: string;
  value: string[];
  totalProducts: number;
}

export interface Filter {
  category: string;
  value: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
}
