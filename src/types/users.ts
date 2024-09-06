export interface UserProps {
  id: number;
  username: string;
  fullname?: string;
  phone?: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  address: string;
  province: any;
  city: any;
  subdistrict: any;
  role: any;
}
