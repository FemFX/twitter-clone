import { all } from "redux-saga/effects";
import { tweetsSaga } from "./tweets/sagas";
import { tweetSaga } from "./tweet/sagas";
import { tagsSaga } from "./tags/sagas";
import { userSaga } from "./user/sagas";
import { usersSaga } from "./whomToRead/sagas";

export default function* rootSaga() {
  yield all([tweetsSaga(), tweetSaga(), tagsSaga(), userSaga(), usersSaga()]);
}
