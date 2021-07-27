import { Action } from "redux";
import { ITweetsState, Loading, ITweet, AddForm } from "./state";

export enum TweetActionsType {
  SET_TWEETS = "TWEETS/SET_TWEETS",
  ADD_TWEET = "TWEETS/ADD_TWEET",
  FETCH_ADD_TWEET = "TWEETS/FETCH_ADD_TWEET",
  FETCH_TWEETS = "TWEETS/FETCH_TWEETS",
  SET_LOADING = "TWEETS/SET_LOADING",
  SET_ADD_FORM_STATE = "TWEETS/SET_ADD_FORM_STATE",
}

export interface SetTweetsActionInterface extends Action<TweetActionsType> {
  type: TweetActionsType.SET_TWEETS;
  payload: ITweetsState["items"];
}
export interface AddTweetActionInterface extends Action<TweetActionsType> {
  type: TweetActionsType.ADD_TWEET;
  payload: ITweet;
}
export interface FetchAddTweetActionInterface extends Action<TweetActionsType> {
  type: TweetActionsType.FETCH_ADD_TWEET;
  payload: string;
}
export interface FetchTweetsActionInterface extends Action<TweetActionsType> {
  type: TweetActionsType.FETCH_TWEETS;
}
export interface SetTweetsLoadingInterface extends Action<TweetActionsType> {
  type: TweetActionsType.SET_LOADING;
  payload: Loading;
}
export interface SetAddFormInterface extends Action<TweetActionsType> {
  type: TweetActionsType.SET_ADD_FORM_STATE;
  payload: AddForm;
}

export const setTweets = (
  payload: ITweetsState["items"]
): SetTweetsActionInterface => ({
  type: TweetActionsType.SET_TWEETS,
  payload,
});
export const addTweet = (payload: ITweet): AddTweetActionInterface => ({
  type: TweetActionsType.ADD_TWEET,
  payload,
});
export const fetchAddTweet = (
  payload: string
): FetchAddTweetActionInterface => ({
  type: TweetActionsType.FETCH_ADD_TWEET,
  payload,
});
export const fetchTweets = (): FetchTweetsActionInterface => ({
  type: TweetActionsType.FETCH_TWEETS,
});
export const setLoading = (payload: Loading): SetTweetsLoadingInterface => ({
  type: TweetActionsType.SET_LOADING,
  payload,
});
export const setAddForm = (payload: AddForm): SetAddFormInterface => ({
  type: TweetActionsType.SET_ADD_FORM_STATE,
  payload,
});

export type TweetsActions =
  | SetTweetsActionInterface
  | SetTweetsLoadingInterface
  | FetchTweetsActionInterface
  | FetchAddTweetActionInterface
  | AddTweetActionInterface
  | SetAddFormInterface;
