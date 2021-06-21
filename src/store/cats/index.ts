import { createSlice } from "@reduxjs/toolkit";
import { CatState, CatFact } from "./types";
import {
  createStartReducer,
  createSuccessReducer,
  createFailReducer
} from "../utils";

const initialState: CatState = {
  catFact: {
    data: null,
    status: "idle",
    error: null
  }
};

export const catSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {
    // ...createAsyncReducers({
    //   name: "fetchCatFacts",
    //   entity: "catFact",
    //   cleanDataWhenStart: true
    // })<any, CatFact[], string>()

    // 이렇게 하면 각각 추론이 되는데, 내부의 asyncEntity는 또 추론이 안됨ㅋ
    // 그치만 이게 나은거같기도...
    fetchCatFacts: createStartReducer("catFact")<any>(),
    successFetchCatFacts: createSuccessReducer("catFact")<CatFact[]>(),
    failFetchCatFacts: createFailReducer("catFact")<string>()
  }
});

export const {
  fetchCatFacts,
  successFetchCatFacts,
  failFetchCatFacts
} = catSlice.actions; // 추론이 잘 안됨...
export default catSlice.reducer;

/*
TypeSafeAction이랑 비슷하게 생겼다..(고차함수를 사용하는것이..)

TypeSafeAction은 액션 객체를 반환하는 함수 여러개 만들지만 slice의 경우에는
함수가 slice의 reducer 프로퍼티의 최상위에 차곡차곡 정리되어 있어야 action이자 reducer로 모두 활용이 가능하다

reducer 객체에 프로퍼티로 또 객체를 넣어버리면 에러난다. reducer객체의 최상위에 함수가 있어야 정상적으로 동작한다
리듀서 로직을 통해 액션 문자열을 만드는 상황에서 reducer 객체에 중구난방 다 넣어버리고 액션 만들어라! 하는게 사실 말이 안되긴 하다

일단 start, success, fail이 모두 action.payload이 있는 것으로 처리된다.
start같은 경우는 reducer에서는 action.payload가지고 뭘 안하기 때문에(Saga에서 뭘 함)
action.payload가 아예 필요 없는 경우가 생길수 있는데 그럴때는 dispatch할때 action.payload로 {}를 넣어준다(깔끔하진 않다..)
*/
