export interface CustomerServicesProps {
  data: CustomerServicesPropsDaum[];
  meta: Meta;
}

export interface CustomerServicesPropsDaum {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  name: string;
  whatsapp: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
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
