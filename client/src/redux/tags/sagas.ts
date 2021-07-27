import { takeEvery, call, put } from "redux-saga/effects";
import { TagActionsType, setLoading, setTags } from "./action";
import { TagsApi } from "../../services/api/tags";
import { Loading } from "./state";

export function* fetchTagsRequest(): Generator<any> {
  try {
    const items: any = yield call(TagsApi.fetchTags);
    yield put(setTags(items));
  } catch (err) {
    yield put(setLoading(Loading.ERROR));
  }
}

export function* tagsSaga() {
  yield takeEvery(TagActionsType.FETCH_TAGS, fetchTagsRequest);
}
