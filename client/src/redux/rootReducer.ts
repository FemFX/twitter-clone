import { combineReducers } from "redux";
import tweets from "./tweets/reducer";
import tweet from "./tweet/reducer";
import tags from "./tags/reducer";
import user from "./user/reducer";
import users from "./whomToRead/reducer";

export const rootReducer = combineReducers({
  tweets,
  tweet,
  tags,
  user,
  users,
});
