export interface WallpaperByGeneralProps {
  data: WallpaperByGeneralPropsDaum[];
  meta: Meta;
}

export interface WallpaperByGeneralPropsDaum {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  thumbnail: Thumbnail;
  products: Products;
}

export interface Thumbnail {
  data: Data;
}

export interface Data {
  id: number;
  attributes: Attributes2;
}

export interface Attributes2 {
  name: string;
  alternativeText: any;
  caption: any;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: any;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
}

export interface Formats {
  thumbnail: Thumbnail2;
  small: Small;
  medium: Medium;
}

export interface Thumbnail2 {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: any;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Small {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: any;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Medium {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: any;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Products {
  data: Daum2[];
}

export interface Daum2 {
  id: number;
  attributes: Attributes3;
}

export interface Attributes3 {
  title: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  date: string;
  product_code: string;
  stock: number;
  available: boolean;
  brands: Brands;
  wallpaper_by_colors: WallpaperByColors;
  wallpaper_by_styles: WallpaperByStyles;
  wallpaper_by_designers: WallpaperByDesigners;
}

export interface Brands {
  data: Daum3[];
}

export interface Daum3 {
  id: number;
  attributes: Attributes4;
}

export interface Attributes4 {
  title: string;
  desc: string;
  size_width: number;
  size_height: number;
  price: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  unit: string;
  product_weight: number;
  date: string;
  thickness: number;
  sub_categories: SubCategories;
}

export interface SubCategories {
  data: Daum4[];
}

export interface Daum4 {
  id: number;
  attributes: Attributes5;
}

export interface Attributes5 {
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  date: string;
  categories: Categories;
}

export interface Categories {
  data: Daum5[];
}

export interface Daum5 {
  id: number;
  attributes: Attributes6;
}

export interface Attributes6 {
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  keyPageCondition: string;
  date: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface WallpaperByColors {
  data: Daum9[];
}

export interface Daum9 {
  id: number;
  attributes: Attributes9;
}

export interface Attributes9 {
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface WallpaperByStyles {
  data: Daum10[];
}

export interface Daum10 {
  id: number;
  attributes: Attributes10;
}

export interface Attributes10 {
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface WallpaperByDesigners {
  data: Daum11[];
}

export interface Daum11 {
  id: number;
  attributes: Attributes11;
}

export interface Attributes11 {
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
