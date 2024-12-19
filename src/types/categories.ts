export interface CategoryProps {
  data: CategoryPropsDaum[];
  meta: Meta;
}

export interface CategoryPropsDaum {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  title: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  keyPageCondition?: string;
  image: Image;
  banners: Banners;
  brands: Brands;
  sub_categories: SubCategories;
  seo: Seo;
}

export interface Image {
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
  thumbnail: Thumbnail;
  small: Small;
  medium: Medium;
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

export interface Banners {
  data?: Daum2[];
}

export interface Daum2 {
  id: number;
  attributes: Attributes3;
}

export interface Attributes3 {
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
  medium: Medium2;
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

export interface Brands {
  data: Daum3[];
}

export interface Daum3 {
  id: number;
  attributes: Attributes4;
}

export interface Attributes4 {
  title: string;
  desc: any;
  size_width: string;
  size_height: string;
  thickness: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  images: Images;
  discount: Discount;
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
  formats: Formats3;
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

export interface Formats3 {
  thumbnail: Thumbnail3;
  small: Small3;
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

export interface Small3 {
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
  data: Daum5[];
}

export interface Daum5 {
  id: number;
  attributes: Attributes6;
}

export interface Attributes6 {
  name: string;
  slug: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  thumbnail: Thumbnail5;
  brands: Brands2;
  wallpaper_items: WallpaperItems;
}

export interface Daum6 {
  id: number;
  attributes: Attributes7;
}

export interface Attributes7 {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: string;
  image: Image2;
}

export interface Image2 {
  data: Data2;
}

export interface Data2 {
  id: number;
  attributes: Attributes8;
}

export interface Attributes8 {
  name: string;
  alternativeText: any;
  caption: any;
  width: number;
  height: number;
  formats: Formats4;
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

export interface Formats4 {
  thumbnail: Thumbnail4;
  small: Small4;
}

export interface Thumbnail4 {
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

export interface Small4 {
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

export interface Thumbnail5 {
  data?: Data3;
}

export interface Data3 {
  id: number;
  attributes: Attributes9;
}

export interface Attributes9 {
  name: string;
  alternativeText: any;
  caption: any;
  width: number;
  height: number;
  formats: Formats5;
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

export interface Formats5 {
  thumbnail: Thumbnail6;
  small?: Small5;
  medium?: Medium3;
}

export interface Thumbnail6 {
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

export interface Small5 {
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

export interface Medium3 {
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

export interface Brands2 {
  data: Daum7[];
}

export interface Daum7 {
  id: number;
  attributes: Attributes10;
}

export interface Attributes10 {
  title: string;
  desc: any;
  size_width: string;
  size_height: string;
  thickness: string;
  price: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  images: Images2;
  discount: Discount2;
}

export interface Images2 {
  data: Daum8[];
}

export interface Daum8 {
  id: number;
  attributes: Attributes11;
}

export interface Attributes11 {
  name: string;
  alternativeText: any;
  caption: any;
  width: number;
  height: number;
  formats: Formats6;
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

export interface Formats6 {
  thumbnail: Thumbnail7;
  small: Small6;
}

export interface Thumbnail7 {
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

export interface Small6 {
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

export interface WallpaperItems {
  data: Daum9[];
}

export interface Daum9 {
  id: number;
  attributes: Attributes12;
}

export interface Attributes12 {
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  thumbnail: Thumbnail8;
}

export interface Thumbnail8 {
  data: Data4;
}

export interface Data4 {
  id: number;
  attributes: Attributes13;
}

export interface Attributes13 {
  name: string;
  alternativeText: any;
  caption: any;
  width: number;
  height: number;
  formats: Formats7;
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

export interface Formats7 {
  thumbnail: Thumbnail9;
  small: Small7;
}

export interface Thumbnail9 {
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

export interface Small7 {
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

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
