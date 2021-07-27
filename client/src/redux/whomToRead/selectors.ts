import { IUsersState } from "./state";
import { IRootState } from "../store";

export const selectUsers = (state: IRootState): IUsersState => state.users;

export const selectUsersItems = (state: IRootState) => selectUsers(state).items;

