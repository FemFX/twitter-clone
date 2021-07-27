import { IUserState } from "./state";
import { Loading } from "../tweets/state";
import { IRootState } from "../store";

export const selectUserState = (state: IRootState): IUserState => state.user;

export const selectUserStatus = (state: IRootState): IUserState["status"] =>
  selectUserState(state)?.status;

export const selectUserIsLoading = (state: IRootState): boolean =>
  selectUserState(state)?.status === Loading.LOADING;

export const selectUserIsLoaded = (state: IRootState): boolean =>
  selectUserState(state)?.status === Loading.LOADED;

export const selectUserData = (state: IRootState): IUserState["data"] =>
  selectUserState(state).data;

export const selectIsAuth = (state: IRootState): boolean =>
  !!selectUserState(state).data;
