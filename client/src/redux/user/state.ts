import { Loading } from "../tweets/state";

export interface IUser {
  _id?: string;
  email: string;
  fullname: string;
  username: string;
  password: string;
  confirm_hash: string;
  confirmed?: boolean;
  location?: string;
  about?: string;
  website?: string;
}

export interface IUserState {
  data: IUser | undefined;
  status: Loading;
}
