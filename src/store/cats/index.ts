import { createSlice } from "@reduxjs/toolkit";
import { CatState, CatFact } from "./types";
import { createAsyncReducers } from "../utils";

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
    ...createAsyncReducers({
      name: "fetchCatFacts", // reducer 이름, success와 fail은 앞에 각각 붙음
      entity: "catFact" // 접근할 initialState의 property이름
    })<any, CatFact[], string>() // 각각의 payload 타입
  }
});

export const catActions = catSlice.actions;
export default catSlice.reducer;
