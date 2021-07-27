import { takeEvery, call, put } from "redux-saga/effects";
import { AuthApi } from "../../services/api/auth";
import {
  FetchUserActionInterface,
  FetchSignUpActionInterface,
  setUser,
  setLoadingState,
  UserActionsType,
} from "./action";
import { Loading } from "../tweets/state";

export function* fetchSignInRequest({
  payload,
}: FetchUserActionInterface): Generator<any> {
  try {
    yield put(setLoadingState(Loading.LOADING));
    const { data }: any = yield call(AuthApi.signIn, payload);
    yield put(setUser(data));
    window.localStorage.setItem("token", data.token);
  } catch (err) {
    yield put(setLoadingState(Loading.ERROR));
  }
}
export function* fetchUserDataRequest(): Generator<any> {
  try {
    yield put(setLoadingState(Loading.LOADING));
    const { data }: any = yield call(AuthApi.getMe);
    yield put(setUser(data));
  } catch (err) {
    yield put(setLoadingState(Loading.ERROR));
  }
}
export function* fetchSignUpRequest({
  payload,
}: FetchSignUpActionInterface): Generator<any> {
  try {
    yield put(setLoadingState(Loading.LOADING));
    yield call(AuthApi.signUp, payload);
    yield put(setLoadingState(Loading.SUCCESS));
  } catch (err) {
    yield put(setLoadingState(Loading.ERROR));
  }
}

export function* userSaga() {
  yield takeEvery(UserActionsType.FETCH_USER, fetchSignInRequest);
  yield takeEvery(UserActionsType.FETCH_USER_DATA, fetchUserDataRequest);
  yield takeEvery(UserActionsType.FETCH_SIGNUP, fetchSignUpRequest);
}
