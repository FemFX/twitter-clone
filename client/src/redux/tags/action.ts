import { Action } from "redux";
import { ITagState, Loading } from "./state";

export enum TagActionsType {
  SET_TAGS = "TAGS/SET_TAGS",
  FETCH_TAGS = "TAGS/FETCH_TAGS",
  SET_LOADING = "TAGS/SET_LOADING",
}

export interface SetTagsActionInterface extends Action<TagActionsType> {
  type: TagActionsType.SET_TAGS;
  payload: ITagState["items"];
}
export interface FetchTagsActionInterface extends Action<TagActionsType> {
  type: TagActionsType.FETCH_TAGS;
}
export interface SetTagsLoadingInterface extends Action<TagActionsType> {
  type: TagActionsType.SET_LOADING;
  payload: Loading;
}

export const setTags = (
  payload: ITagState["items"]
): SetTagsActionInterface => ({
  type: TagActionsType.SET_TAGS,
  payload,
});
export const fetchTags = (): FetchTagsActionInterface => ({
  type: TagActionsType.FETCH_TAGS,
});
export const setLoading = (payload: Loading): SetTagsLoadingInterface => ({
  type: TagActionsType.SET_LOADING,
  payload,
});

export type TagsActions =
  | SetTagsActionInterface
  | FetchTagsActionInterface
  | SetTagsLoadingInterface;
