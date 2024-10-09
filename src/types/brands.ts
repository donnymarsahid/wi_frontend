export interface BrandsProps {
  data: BrandsPropsDaum[];
  meta: Meta;
}

export interface BrandsPropsDaum {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  title: string;
  desc: string;
  size_width: number;
  size_height: number;
  itemsPerBox: number;
  sheetsPerUnit: number;
  price: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  unit: string;
  product_weight: number;
  date: string;
  thickness: any;
  products: Products;
  sub_categories: SubCategories;
  categories: Categories2;
}

export interface Products {
  data: Daum2[];
}

export interface Daum2 {
  id: number;
  attributes: Attributes2;
}

export interface Attributes2 {
  title: string;
  desc: any;
  price: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  unit: any;
  product_weight: number;
  date: string;
  product_code: any;
  stock: any;
  available: boolean;
  images: Images;
  discount: Discount;
}

export interface Images {
  data: Daum3[];
}

export interface Daum3 {
  id: number;
  attributes: Attributes3;
}

export interface Attributes3 {
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
  thumbnail: Thumbnail;
  small: Small;
}

export interface Thumbnail {
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

export interface Discount {
  id: number;
  type: string;
  value: string;
}

export interface SubCategories {
  data: Daum4[];
}

export interface Daum4 {
  id: number;
  attributes: Attributes4;
}

export interface Attributes4 {
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  date?: string;
  categories: Categories;
}

export interface Categories {
  data: Daum5[];
}

export interface Daum5 {
  id: number;
  attributes: Attributes5;
}

export interface Attributes5 {
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  keyPageCondition: string;
  date: string;
}

export interface Categories2 {
  data: Daum6[];
}

export interface Daum6 {
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
