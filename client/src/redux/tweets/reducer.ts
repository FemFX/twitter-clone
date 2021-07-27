import produce, { Draft } from "immer";
import { ITweetsState, Loading, AddForm } from "./state";
import { TweetsActions, TweetActionsType } from "./action";

const initialState: ITweetsState = {
  items: [],
  addFormStatus: AddForm.NEVER,
  loadingStatus: Loading.NEVER,
};

const tweetsReducer = produce(
  (draft: Draft<ITweetsState>, action: TweetsActions) => {
    switch (action.type) {
      case TweetActionsType.SET_TWEETS:
        draft.items = action.payload;
        draft.loadingStatus = Loading.LOADED;
        break;
      case TweetActionsType.FETCH_TWEETS:
        draft.items = [];
        draft.loadingStatus = Loading.LOADING;
        break;
      case TweetActionsType.FETCH_ADD_TWEET:
        draft.addFormStatus = AddForm.LOADING;
        break;
      case TweetActionsType.ADD_TWEET:
        draft.items.push(action.payload);
        draft.addFormStatus = AddForm.NEVER;
        break;
      case TweetActionsType.SET_LOADING:
        draft.loadingStatus = action.payload;
        break;
      case TweetActionsType.SET_ADD_FORM_STATE:
        draft.addFormStatus = action.payload;
        break;
      default:
        break;
    }
  },
  initialState
);

export default tweetsReducer;
