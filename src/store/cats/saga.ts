import { CatFact } from "./types";
import {
  fetchCatFacts,
  successFetchCatFacts,
  failFetchCatFacts
} from "./index";
import { takeEvery } from "redux-saga/effects";
import { createSaga } from "../utils";
import { getCatFacts } from "../../api";

const getCatFactsSaga = createSaga<any, CatFact[], string>(
  successFetchCatFacts,
  failFetchCatFacts,
  getCatFacts
);

export default function* catSaga() {
  yield takeEvery(fetchCatFacts.type, getCatFactsSaga);
}
