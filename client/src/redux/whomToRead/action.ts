import { Action } from "redux";
import { IUser } from "../user/state";

export enum UsersActionsType {
  SET_ITEMS = "USERS/SET_ITEMS",
  FETCH_ITEMS = "USERS/FETCH_ITEMS",
}

export interface SetUsersActionInterface extends Action<UsersActionsType> {
  type: UsersActionsType.SET_ITEMS;
  payload: IUser[];
}
export interface FetchUsersActionInterface extends Action<UsersActionsType> {
  type: UsersActionsType.FETCH_ITEMS;
}

export const setUsers = (payload: IUser[]): SetUsersActionInterface => ({
  type: UsersActionsType.SET_ITEMS,
  payload,
});

export type UsersActions = SetUsersActionInterface | FetchUsersActionInterface;
