export interface SeoProps {
  data: Data
  meta: Meta
}

export interface Data {
  id: number
  attributes: Attributes
}

export interface Attributes {
  title: string
  keywords: string
  description: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  metadataBase: string
  language: string
  robots: string
  authors: Authors
}

export interface Authors {
  id: number
  url: string
  name: string
}

export interface Meta {}
