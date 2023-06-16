export interface ILogin {
  email: string;
  password: string;
  remember?: boolean;
}

export interface IRecover {
  email: string;
}
