export interface HowToShopProps {
  data: HowToShopPropsData;
  meta: Meta;
}

export interface HowToShopPropsData {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Meta {}
