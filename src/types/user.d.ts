export interface ICreateUserInput {
  sb_auth_id: string;
  email: string;
  first_name: string;
  last_name: string;
  dial_code: string;
  phone: string;
  company?: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  role_id: string;
}
