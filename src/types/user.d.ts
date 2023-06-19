export interface ICreateUserInput {
  email: string;
  first_name: string;
  last_name: string;
  dial_code: string;
  phone: string;
  company?:
    | {
        name: string;
        street: string;
        city: string;
        state: string;
        zip: string;
      }
    | undefined;
  role_id: string;
}
