import { takeEvery, call, put } from "redux-saga/effects";
import {
  TweetActionsType,
  setLoading,
  setTweets,
  FetchAddTweetActionInterface,
  addTweet,
  setAddForm,
  removeTweet,
  RemoveTweetActionInterface,
} from "./action";
import { TweetsApi } from "../../services/api/tweets";
import { ITweet, Loading, AddForm } from "./state";

export function* fetchTweetsRequest(): Generator<any> {
  try {
    const items: any = yield call(TweetsApi.fetchTweets);
    yield put(setTweets(items));
  } catch (err) {
    yield put(setLoading(Loading.ERROR));
  }
}
export function* fetchAddTweetRequest({
  payload,
}: FetchAddTweetActionInterface): Generator<any | ITweet> {
  try {
    const item: any = yield call(TweetsApi.addTweet, payload);
    yield put(addTweet(item));
  } catch (err) {
    yield put(setAddForm(AddForm.ERROR));
  }
}
export function* fetchRemoveTweetRequest({
  payload,
}: RemoveTweetActionInterface): Generator<any | ITweet> {
  try {
    yield call(TweetsApi.removeTweet, payload);
    yield put(removeTweet(payload));
  } catch (err) {
    console.log(err);
  }
}

export function* tweetsSaga() {
  yield takeEvery(TweetActionsType.FETCH_TWEETS, fetchTweetsRequest);
  yield takeEvery(TweetActionsType.FETCH_ADD_TWEET, fetchAddTweetRequest);
  yield takeEvery(TweetActionsType.REMOVE_TWEET, fetchRemoveTweetRequest);
}
