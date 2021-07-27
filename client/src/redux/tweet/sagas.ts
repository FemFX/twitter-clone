import { takeLatest, call, put } from "redux-saga/effects";
import {
  TweetActionsType,
  setLoading,
  setTweet,
  FetchTweetActionInterface,
} from "./action";
import { TweetsApi } from "../../services/api/tweets";
import { Loading } from "./state";
import { ITweet } from "../tweet/state";

export function* fetchTweetRequest({
  payload: tweetId,
}: FetchTweetActionInterface): Generator<ITweet | any> {
  try {
    const data: ITweet | any = yield call(TweetsApi.fetchTweet, tweetId);
    yield put(setTweet(data));
  } catch (err) {
    yield put(setLoading(Loading.ERROR));
  }
}

export function* tweetSaga() {
  yield takeLatest(TweetActionsType.FETCH_TWEET, fetchTweetRequest);
}
