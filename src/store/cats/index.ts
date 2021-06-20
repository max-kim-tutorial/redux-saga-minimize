import { createSlice } from "@reduxjs/toolkit";
import { CatState, CatFact } from "./types";
import { createAsyncReducer, createStartReducerWithoutPayload } from "../utils";

const initialState: CatState = {
  catFact: {
    data: null,
    status: "idle",
    error: null
  }
};

// TypesafeAction이랑 비슷하게 생기긴 했다
// typesafeAction은 액션 객체를 반환하는 함수 여러개 만들지만 slice의 경우에는
// 함수가 slice의 reducer 프로퍼티의 최상위에 차곡차곡 정리되어 있어야 action, reducer로 모두 활용이 가능하다

export const catSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {
    fetchCatFacts: createStartReducerWithoutPayload({
      entity: "catFact"
    }),
    successFetchCatFacts: createAsyncReducer({
      type: "success",
      entity: "catFact"
    })<CatFact[]>(),
    failFetchCatFacts: createAsyncReducer({
      type: "fail",
      entity: "catFact"
    })<string>()
  }
});

export const catActions = catSlice.actions;
export default catSlice.reducer;
