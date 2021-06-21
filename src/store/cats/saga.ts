import { CatFact } from "./types";
import {
  fetchCatFacts,
  successFetchCatFacts,
  failFetchCatFacts
} from "./index";
import { takeEvery } from "redux-saga/effects";
import { createSaga } from "../utils";
import { getCatFacts } from "../../api";

// 프로퍼티를 객체에 명시하지 않아서 유니언타입으로 추론이 되버림
const getCatFactsSaga = createSaga<any, CatFact[], string>(
  successFetchCatFacts,
  failFetchCatFacts,
  getCatFacts
);

export default function* catSaga() {
  yield takeEvery(fetchCatFacts.type, getCatFactsSaga);
}
