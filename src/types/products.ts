export interface ProductsProps {
  data: ProductsPropsDaum[]
  meta: Meta
}

export interface ProductsPropsDaum {
  id: number
  attributes: Attributes
}

export interface Attributes {
  title: string
  desc: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  slug: string
  date: string
  product_code: string
  stock: number
  available: boolean
  images: Images
  brands: Brands
  wallpaper_by_colors: WallpaperByColors
  wallpaper_by_styles: WallpaperByStyles
  wallpaper_by_designers: WallpaperByDesigners
}

export interface Images {
  data: Daum2[]
}

export interface Daum2 {
  id: number
  attributes: Attributes2
}

export interface Attributes2 {
  name: string
  alternativeText: any
  caption: any
  width: number
  height: number
  formats: Formats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: any
  provider: string
  provider_metadata: any
  createdAt: string
  updatedAt: string
}

export interface Formats {
  thumbnail: Thumbnail
  small: Small
  medium?: Medium
  large?: Large
}

export interface Thumbnail {
  name: string
  hash: string
  ext: string
  mime: string
  path: any
  width: number
  height: number
  size: number
  url: string
}

export interface Small {
  name: string
  hash: string
  ext: string
  mime: string
  path: any
  width: number
  height: number
  size: number
  url: string
}

export interface Medium {
  name: string
  hash: string
  ext: string
  mime: string
  path: any
  width: number
  height: number
  size: number
  url: string
}

export interface Large {
  name: string
  hash: string
  ext: string
  mime: string
  path: any
  width: number
  height: number
  size: number
  url: string
}

export interface Brands {
  data: Daum3[]
}

export interface Daum3 {
  id: number
  attributes: Attributes3
}

export interface Attributes3 {
  title: string
  desc: string
  size_width: number
  size_height: number
  itemsPerBox: number
  sheetsPerUnit: number
  price: string
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  unit: string
  product_weight: number
  date: string
  thickness: number
  sub_categories: SubCategories
  categories: Categories2
  discount?: Discount
  products: Products
}

export interface SubCategories {
  data: Daum4[]
}

export interface Daum4 {
  id: number
  attributes: Attributes4
}

export interface Attributes4 {
  name: string
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  date: string
  categories: Categories
}

export interface Categories {
  data: Daum5[]
}

export interface Daum5 {
  id: number
  attributes: Attributes5
}

export interface Attributes5 {
  title: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  slug: string
  keyPageCondition: string
  date: string
}

export interface Categories2 {
  data: Daum6[]
}

export interface Daum6 {
  id: number
  attributes: Attributes6
}

export interface Attributes6 {
  title: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  slug: string
  keyPageCondition: string
  date: string
}

export interface Discount {
  id: number
  type: string
  value: string
}

export interface Products {
  data: Daum7[]
}

export interface Daum7 {
  id: number
  attributes: Attributes7
}

export interface Attributes7 {
  title: string
  desc: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  slug: string
  date: string
  product_code: string
  stock: number
  available: boolean
  images: Images2
}

export interface Images2 {
  data: Daum8[]
}

export interface Daum8 {
  id: number
  attributes: Attributes8
}

export interface Attributes8 {
  name: string
  alternativeText: any
  caption: any
  width: number
  height: number
  formats: Formats2
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: any
  provider: string
  provider_metadata: any
  createdAt: string
  updatedAt: string
}

export interface Formats2 {
  thumbnail: Thumbnail2
  small: Small2
  medium?: Medium2
  large?: Large2
}

export interface Thumbnail2 {
  name: string
  hash: string
  ext: string
  mime: string
  path: any
  width: number
  height: number
  size: number
  url: string
}

export interface Small2 {
  name: string
  hash: string
  ext: string
  mime: string
  path: any
  width: number
  height: number
  size: number
  url: string
}

export interface Medium2 {
  name: string
  hash: string
  ext: string
  mime: string
  path: any
  width: number
  height: number
  size: number
  url: string
}

export interface Large2 {
  name: string
  hash: string
  ext: string
  mime: string
  path: any
  width: number
  height: number
  size: number
  url: string
}

export interface WallpaperByColors {
  data: Daum9[]
}

export interface Daum9 {
  id: number
  attributes: Attributes9
}

export interface Attributes9 {
  title: string
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface WallpaperByStyles {
  data: Daum10[]
}

export interface Daum10 {
  id: number
  attributes: Attributes10
}

export interface Attributes10 {
  title: string
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface WallpaperByDesigners {
  data: Daum11[]
}

export interface Daum11 {
  id: number
  attributes: Attributes11
}

export interface Attributes11 {
  title: string
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}
