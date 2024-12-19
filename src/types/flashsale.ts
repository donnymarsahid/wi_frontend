export interface FlashSaleProps {
  data: Data;
  meta: Meta;
}

export interface Data {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  active: boolean;
  expiry_date: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  products: Products;
  seo: Seo;
}

export interface Products {
  data: Daum[];
}

export interface Daum {
  id: number;
  attributes: Attributes2;
}

export interface Attributes2 {
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
  images: Images;
}

export interface Brands {
  data: Daum2[];
}

export interface Daum2 {
  id: number;
  attributes: Attributes3;
}

export interface Attributes3 {
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
  itemsPerBox?: number;
  sheetsPerUnit?: number;
  discount?: Discount;
}

export interface Discount {
  id: number;
  type: string;
  value: string;
}

export interface Images {
  data: Daum3[];
}

export interface Daum3 {
  id: number;
  attributes: Attributes4;
}

export interface Attributes4 {
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
  large?: Large;
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

export interface Seo {
  id: number;
  title: string;
  description: string;
  viewport: string;
  keywords: string;
  robots: string;
}

export interface Meta {}
