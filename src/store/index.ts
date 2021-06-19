import { all, fork } from "redux-saga/effects";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { combineReducers } from "redux";
import catReducer from "./cats";
import catSaga from "./cats/saga";

const sagaMiddleware = createSagaMiddleware();

export function* rootSaga() {
  yield all([fork(catSaga)]);
}

const reducer = combineReducers({
  catReducer
});

const createStore = () => {
  const store = configureStore({
    reducer,
    devTools: true,
    middleware: [sagaMiddleware]
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

export type RootState = ReturnType<typeof reducer>;
export default createStore;
