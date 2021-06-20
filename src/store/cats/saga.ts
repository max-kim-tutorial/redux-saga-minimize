import { CatFact } from "./types";
import { catActions } from "./index";
import axios, { AxiosResponse } from "axios";
import { takeEvery, put, call } from "redux-saga/effects";

function* getCatFacts() {
  const { successFetchCatFacts, failFetchCatFacts } = catActions;
  try {
    const response: AxiosResponse<CatFact[]> = yield call(
      axios.get,
      "https://cat-fact.herokuapp.com/facts"
    );
    yield put(successFetchCatFacts(response.data));
  } catch (e) {
    yield put(failFetchCatFacts(e.data));
  }
}

export default function* catSaga() {
  yield takeEvery(catActions.fetchCatFacts.type, getCatFacts);
}
