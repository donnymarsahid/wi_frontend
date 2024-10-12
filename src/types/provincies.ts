export interface ProvinciesProps {
  rajaongkir: ProvinciesDaum;
}

export interface ProvinciesDaum {
  query: any[];
  status: Status;
  results: ResultProvincies[];
}

export interface Status {
  code: number;
  description: string;
}

export interface ResultProvincies {
  province_id: string;
  province: string;
  name: string;
  id: number;
}
