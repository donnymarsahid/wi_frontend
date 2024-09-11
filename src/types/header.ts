export interface HeaderProps {
  data: HeaderPropsData;
  meta: Meta;
}

export interface HeaderPropsData {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  office_telp: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Meta {}
