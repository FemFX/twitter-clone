import produce, { Draft } from "immer";
import { Loading } from "../tweets/state";
import { UsersActions, UsersActionsType } from "./action";
import { IUsersState } from "./state";

const initialState: IUsersState = {
  items: [],
  loadingStatus: Loading.NEVER,
};

const usersReducer = produce(
  (draft: Draft<IUsersState>, action: UsersActions) => {
    switch (action.type) {
      case UsersActionsType.SET_ITEMS:
        draft.items = action.payload;
        draft.loadingStatus = Loading.LOADED;
        break;
      case UsersActionsType.FETCH_ITEMS:
        draft.items = [];
        draft.loadingStatus = Loading.LOADING;
        break;

      default:
        break;
    }
  },
  initialState
);

export default usersReducer;
