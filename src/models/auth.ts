export interface ILoginParams {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ILoginValidation {
  email: string;
  password: string;
}

export interface ISignUpParams {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  gender: string;
  region: number;
  state: number;
}

export interface IGenderParams {
  label: string;
  value: string;
}

export interface ILocationParams {
  id: number;
  name: string;
  pid: number | null;
}

export interface IStateParams {
  id: number;
  name: string;
  pid: number | null;
  createAt: string;
}
