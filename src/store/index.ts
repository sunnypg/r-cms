import {
  legacy_createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from "redux";
import reduxThunk from "redux-thunk";
import login from "./login/reducer";
import main from "./main/reducer";

// 组合各个模块的reducer
const reducers = combineReducers({
  login,
  main,
});

// 判断有没有__REDUX_DEVTOOLS_EXTENSION_COMPOSE__这个模块
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose; //rt

// 把仓库数据，浏览器redux-dev-tools，还有reduxThunk插件关联在store中
const store = legacy_createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);
export default store;
