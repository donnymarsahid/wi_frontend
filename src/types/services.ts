export interface ServiceProps {
  data: ServicePropsDaum[];
  meta: Meta;
}

export interface ServicePropsDaum {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  desc: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  icon: Icon;
}

export interface Icon {
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
  formats: any;
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

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
