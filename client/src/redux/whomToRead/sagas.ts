import { takeEvery, call, put } from "redux-saga/effects";
import { TagsApi } from "../../services/api/tags";


export function* fetchUsersRequest(): Generator<any> {
  // try {
  //   const items: any = yield call(TagsApi.fetchTags);
  //   yield put(setTags(items));
  // } catch (err) {
  //   yield put(setLoading(Loading.ERROR));
  // }
}

export function* usersSaga() {
  // yield takeEvery(TagActionsType.FETCH_TAGS, fetchUsersRequest);
}
