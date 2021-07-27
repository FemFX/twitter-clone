import { ITagState, Loading } from "./state";
import { IRootState } from "../store";

export const selectTags = (state: IRootState): ITagState => state.tags;

export const selectTagsItems = (state: IRootState) => selectTags(state).items;

export const selectLoading = (state: IRootState): Loading =>
  selectTags(state).loadingStatus;

export const selectTagsLoading = (state: IRootState): boolean =>
  selectLoading(state) === Loading.LOADING;
export const selectTagsLoaded = (state: IRootState): boolean =>
  selectLoading(state) === Loading.LOADED;
