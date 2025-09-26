export interface FooterProps {
  data: FooterPropsData;
  meta: Meta;
}

export interface FooterPropsData {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  office_center: string;
  office_branch: string;
  office_center_link_maps: string;
  office_branch_link_maps: string;
  office_telp: string;
  email: string;
  copyright: string;
  operating_hours: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Meta {}
