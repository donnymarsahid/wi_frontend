export interface PromosProps {
  data: PromosPropsDaum[];
  meta: Meta;
}

export interface PromosPropsDaum {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  date: string;
  thumbnail: Thumbnail;
  products: Products;
  seo: Seo;
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
  large: Large;
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

export interface Large {
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
  brands: Brands;
  images: Images;
  discount?: Discount;
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
  itemsPerBox: string;
  sheetsPerUnit: string;
  price: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  unit: string;
  product_weight: number;
  date: string;
  thickness: number;
  // sub_categories: SubCategories;
  // categories: Categories2;
  discount?: Discount;
  products: Products;
}

export interface Images {
  data: Daum4[];
}

export interface Daum4 {
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
  thumbnail: Thumbnail3;
  small: Small2;
  medium?: Medium2;
}

export interface Thumbnail3 {
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

export interface Medium2 {
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

export interface Seo {
  id: number;
  title: string;
  description: string;
  viewport: string;
  keywords: string;
  robots: string;
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
