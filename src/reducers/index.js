/** @format */

import { combineReducers } from "redux";
import SendPageReducer from "./SendPage";

const rootReducer = combineReducers({
  sandTags: SendPageReducer,
});

export default rootReducer;
