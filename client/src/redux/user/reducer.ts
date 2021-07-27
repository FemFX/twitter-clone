import produce, { Draft } from "immer";
import { IUserState } from "./state";
import { UserActions, UserActionsType } from "./action";
import { Loading } from "../tweets/state";

const initialState: IUserState = {
  data: undefined,
  status: Loading.NEVER,
};

const UserReducer = produce((draft: Draft<IUserState>, action: UserActions) => {
  switch (action.type) {
    case UserActionsType.SET_USER:
      draft.data = action.payload;
      draft.status = Loading.SUCCESS;
      break;
    case UserActionsType.SET_LOADING_STATE:
      draft.status = action.payload;
      break;
    default:
      break;
  }
}, initialState);

export default UserReducer;
