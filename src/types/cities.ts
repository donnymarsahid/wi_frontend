export interface CitiesProps {
  rajaongkir: RajaongkirDaum;
}

export interface RajaongkirDaum {
  query: any[];
  status: Status;
  results: Result[];
}

export interface Status {
  code: number;
  description: string;
}

export interface Result {
  id: number;
  city_id: string;
  name: string;
  province_id: string;
  province: string;
  type: string;
  city_name: string;
  postal_code: string;
}
