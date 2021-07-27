import { Action } from "redux";
import {  Loading, ITweet } from "./state";

export enum TweetActionsType {
  SET_TWEET = "TWEET/SET_TWEET",
  FETCH_TWEET = "TWEET/FETCH_TWEET",
  SET_LOADING = "TWEET/SET_LOADING",
}

export interface SetTweetActionInterface extends Action<TweetActionsType> {
  type: TweetActionsType.SET_TWEET;
  payload: ITweet;
}
export interface FetchTweetActionInterface extends Action<TweetActionsType> {
  type: TweetActionsType.FETCH_TWEET;
  payload: string;
}
export interface SetTweetsLoadingInterface extends Action<TweetActionsType> {
  type: TweetActionsType.SET_LOADING;
  payload: Loading;
}

export const setTweet = (payload: ITweet): SetTweetActionInterface => ({
  type: TweetActionsType.SET_TWEET,
  payload,
});
export const fetchTweet = (payload: string): FetchTweetActionInterface => ({
  type: TweetActionsType.FETCH_TWEET,
  payload,
});
export const setLoading = (payload: Loading): SetTweetsLoadingInterface => ({
  type: TweetActionsType.SET_LOADING,
  payload,
});

export type TweetActions =
  | SetTweetActionInterface
  | SetTweetsLoadingInterface
  | FetchTweetActionInterface;
