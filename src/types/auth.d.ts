export interface ILogin {
  email: string;
  password: string;
  remember?: boolean;
}

export interface IRecoverPassword {
  email: string;
}

export interface IResetPassword {
  password: string;
}
