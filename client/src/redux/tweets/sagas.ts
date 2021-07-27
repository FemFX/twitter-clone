import { takeEvery, call, put } from "redux-saga/effects";
import {
  TweetActionsType,
  setLoading,
  setTweets,
  FetchAddTweetActionInterface,
  addTweet,
  setAddForm,
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
  payload: text,
}: FetchAddTweetActionInterface): Generator<any | ITweet> {
  try {
    const item: any = yield call(TweetsApi.addTweet, text);
    yield put(addTweet(item));
  } catch (err) {
    yield put(setAddForm(AddForm.ERROR));
  }
}

export function* tweetsSaga() {
  yield takeEvery(TweetActionsType.FETCH_TWEETS, fetchTweetsRequest);
  yield takeEvery(TweetActionsType.FETCH_ADD_TWEET, fetchAddTweetRequest);
}
