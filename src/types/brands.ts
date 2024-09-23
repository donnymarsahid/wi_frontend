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
  desc: any;
  size_width: string;
  size_height: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  unit: string;
  date: string;
  products: Products;
  product_weight: string;
  images: Images;
  discount?: Discount;
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
  size_width: string;
  size_height: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  images: Images;
  discount: Discount;
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

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface DiscountCustom {
  id: number;
  type: string;
  value: number;
}
