import { Action } from "redux";
import { Loading } from "../tweets/state";
import { IUserState, IUser } from "./state";
import { ILoginFormProps } from "../../pages/component/Login";
import { IRegisterFormProps } from "../../pages/component/Register";

export enum UserActionsType {
  SET_USER = "USER/SET_USER",
  FETCH_USER_DATA = "USER/FETCH_USER_DATA",
  FETCH_USER = "USER/FETCH_USER",
  FETCH_SIGNUP = "USER/FETCH_SIGNUP",
  SET_LOADING_STATE = "USER/SET_LOADING_STATE",
}

export interface SetUserActionInterface extends Action<UserActionsType> {
  type: UserActionsType.SET_USER;
  payload: IUser | undefined;
}
export interface FetchUserActionInterface extends Action<UserActionsType> {
  type: UserActionsType.FETCH_USER;
  payload: ILoginFormProps;
}
export interface FetchUserDataActionInterface extends Action<UserActionsType> {
  type: UserActionsType.FETCH_USER_DATA;
}
export interface FetchSignUpActionInterface extends Action<UserActionsType> {
  type: UserActionsType.FETCH_SIGNUP;
  payload: IRegisterFormProps;
}
export interface SetLoadingStateActionInterface
  extends Action<UserActionsType> {
  type: UserActionsType.SET_LOADING_STATE;
  payload: Loading;
}

export const setUser = (
  payload: IUserState["data"]
): SetUserActionInterface => ({
  type: UserActionsType.SET_USER,
  payload,
});
export const fetchUser = (
  payload: ILoginFormProps
): FetchUserActionInterface => ({
  type: UserActionsType.FETCH_USER,
  payload,
});
export const fetchUserData = (): FetchUserDataActionInterface => ({
  type: UserActionsType.FETCH_USER_DATA,
});
export const fetchSignUp = (
  payload: IRegisterFormProps
): FetchSignUpActionInterface => ({
  type: UserActionsType.FETCH_SIGNUP,
  payload,
});

export const setLoadingState = (
  payload: IUserState["status"]
): SetLoadingStateActionInterface => ({
  type: UserActionsType.SET_LOADING_STATE,
  payload,
});

export type UserActions =
  | SetUserActionInterface
  | SetLoadingStateActionInterface
  | FetchUserActionInterface
  | FetchUserDataActionInterface;
