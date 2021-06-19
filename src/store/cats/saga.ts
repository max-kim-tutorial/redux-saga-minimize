import { catActions } from "./index";
import axios from "axios";
import { takeEvery, put, call } from "redux-saga/effects";

function* getCatFacts() {
  const { successCatFacts, failCatFacts } = catActions;
  try {
    const response = yield call(
      axios.get,
      "https://cat-fact.herokuapp.com/facts"
    );
    yield put(successCatFacts(response.data));
  } catch (e) {
    yield put(failCatFacts(response.data));
  }
}

export default function* catSaga() {
  yield takeEvery(catActions.fetchCatFacts.type, getCatFacts);
}
