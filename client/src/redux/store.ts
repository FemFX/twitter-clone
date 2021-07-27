import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./rootReducer";
import rootSaga from "./saga";

import { ITweetsState } from "./tweets/state";
import { ITweetState } from "./tweet/state";
import { ITagState } from "./tags/state";
import { IUserState } from "./user/state";
import { IUsersState } from "./whomToRead/state";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const sagaMiddleware = createSagaMiddleware();

export interface IRootState {
  tweets: ITweetsState;
  tweet: ITweetState;
  tags: ITagState;
  user: IUserState;
  users: IUsersState;
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);
