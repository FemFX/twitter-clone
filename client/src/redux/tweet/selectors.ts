import { ITweetState, ITweet, Loading } from "./state";
import { IRootState } from "../store";

export const selectTweet = (state: IRootState): ITweetState => state.tweet;

export const selectTweetItem = (state: IRootState): ITweet | undefined =>
  selectTweet(state).data;

export const selectLoading = (state: IRootState): Loading =>
  selectTweet(state).loadingStatus;

export const selectTweetLoading = (state: IRootState): boolean =>
  selectLoading(state) === Loading.LOADING;

export const selectTweetLoaded = (state: IRootState): boolean =>
  selectLoading(state) === Loading.LOADED;
