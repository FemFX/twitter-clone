import produce, { Draft } from "immer";
import { ITagState, Loading } from "./state";
import { TagsActions, TagActionsType } from "./action";

const initialState: ITagState = {
  items: [],
  loadingStatus: Loading.NEVER,
};

const tagsReducer = produce((draft: Draft<ITagState>, action: TagsActions) => {
  switch (action.type) {
    case TagActionsType.SET_TAGS:
      draft.items = action.payload;
      draft.loadingStatus = Loading.LOADED;
      break;
    case TagActionsType.FETCH_TAGS:
      draft.items = [];
      draft.loadingStatus = Loading.LOADING;
      break;
    case TagActionsType.SET_LOADING:
      draft.loadingStatus = action.payload;
      break;
    default:
      break;
  }
}, initialState);

export default tagsReducer;
