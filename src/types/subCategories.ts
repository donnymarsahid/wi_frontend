export interface SubCategoryProps {
    data: SubCategoryPropsDaum[]
    meta: Meta
  }
  
  export interface SubCategoryPropsDaum {
    id: number
    attributes: Attributes
  }
  
  export interface Attributes {
    name: string
    slug: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    wallpaper_items: WallpaperItems
  }
  
  export interface WallpaperItems {
    data: Daum2[]
  }
  
  export interface Daum2 {
    id: number
    attributes: Attributes2
  }
  
  export interface Attributes2 {
    name: string
    slug: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    thumbnail: Thumbnail
  }
  
  export interface Thumbnail {
    data: Data
  }
  
  export interface Data {
    id: number
    attributes: Attributes3
  }
  
  export interface Attributes3 {
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
    thumbnail: Thumbnail2
    small: Small
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
  
  export interface Meta {
    pagination: Pagination
  }
  
  export interface Pagination {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
  