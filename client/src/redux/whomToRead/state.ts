import { IUser } from "../user/state";
import { Loading } from "../tweets/state";

export interface IUsersState {
  items: IUser[];
  loadingStatus: Loading;
}
