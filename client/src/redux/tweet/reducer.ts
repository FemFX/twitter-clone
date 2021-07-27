import produce, { Draft } from "immer";
import { ITweetState, Loading } from "./state";
import { TweetActions, TweetActionsType } from "./action";

const initialState: ITweetState = {
  data: undefined,
  loadingStatus: Loading.NEVER,
};

const tweetsReducer = produce(
  (draft: Draft<ITweetState>, action: TweetActions) => {
    switch (action.type) {
      case TweetActionsType.SET_TWEET:
        draft.data = action.payload;
        draft.loadingStatus = Loading.LOADED;
        break;
      case TweetActionsType.FETCH_TWEET:
        draft.data = undefined;
        draft.loadingStatus = Loading.LOADING;
        break;
      case TweetActionsType.SET_LOADING:
        draft.loadingStatus = action.payload;
        break;
      default:
        break;
    }
  },
  initialState
);

export default tweetsReducer;
