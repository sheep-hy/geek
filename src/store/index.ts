import { legacy_createStore as createStore, applyMiddleware } from "redux";
// import createStore from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

const middlewares = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(rootReducer, middlewares);
export default store;

// redux 状态的类型
export type RootState = ReturnType<typeof store.getState>;

// redux dispatch的类型
export type RootDispatch = typeof store.dispatch;
// import { configureStore } from '@reduxjs/toolkit'
// import login from './reducers/login'

// const store = configureStore({
//     reducer: {
//       login,
//     },
//     // 为整个 Redux 状态设置默认值
//     // preloadedState: {
//     //   login: getToken(),
//     // },
//   })

//   export default store
