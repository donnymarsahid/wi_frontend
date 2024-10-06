export interface ProductsProps {
  data: ProductsPropsDaum[];
  meta: Meta;
}

export interface ProductsPropsDaum {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  title: string;
  desc: any;
  size_width: string;
  size_height: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  unit: any;
  product_weight: any;
  date: string;
  product_code: any;
  stock: any;
  discount?: Discount;
  images: Images;
  brands: Brands;
}

export interface Discount {
  id: number;
  type: string;
  value: string;
}

export interface Images {
  data: Daum2[];
}

export interface Daum2 {
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
  thumbnail: Thumbnail;
  small: Small;
  medium?: Medium;
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

export interface Brands {
  data: Daum3[];
}

export interface Daum3 {
  id: number;
  attributes: Attributes3;
}

export interface Attributes3 {
  title: string;
  desc: string;
  size_width: string;
  size_height: string;
  price: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  unit: string;
  product_weight: string;
  date: string;
  products: Products;
}

export interface Products {
  data: Daum4[];
}

export interface Daum4 {
  id: number;
  attributes: Attributes4;
}

export interface Attributes4 {
  title: string;
  desc: any;
  size_width: string;
  size_height: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  unit: any;
  product_weight: any;
  date: string;
  product_code: any;
  stock: any;
  images: Images2;
  discount: Discount2;
}

export interface Images2 {
  data: Daum5[];
}

export interface Daum5 {
  id: number;
  attributes: Attributes5;
}

export interface Attributes5 {
  name: string;
  alternativeText: any;
  caption: any;
  width: number;
  height: number;
  formats: Formats2;
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

export interface Formats2 {
  thumbnail: Thumbnail2;
  small: Small2;
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

export interface Small2 {
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

export interface Discount2 {
  id: number;
  type: string;
  value: string;
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
