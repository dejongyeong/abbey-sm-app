export interface IInvite {
  email: string;
  first_name: string;
  last_name: string;
  dial_code: string;
  phone: string;
  company_name: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  zip: string | null;
  role_id: string;
}
