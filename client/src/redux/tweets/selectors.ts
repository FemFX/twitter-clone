import { ITweetsState, Loading, AddForm } from "./state";
import { IRootState } from "../store";

export const selectTweets = (state: IRootState): ITweetsState => state.tweets;

export const selectTweetsItems = (state: IRootState) =>
  selectTweets(state).items;

export const selectLoading = (state: IRootState): Loading =>
  selectTweets(state).loadingStatus;

export const selectAddForm = (state: IRootState): AddForm =>
  selectTweets(state).addFormStatus;

export const selectTweetsLoading = (state: IRootState): boolean =>
  selectLoading(state) === Loading.LOADING;
export const selectTweetsLoaded = (state: IRootState): boolean =>
  selectLoading(state) === Loading.LOADED;
