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

export const catSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {
    ...createAsyncReducers({
      name: "fetchCatFacts", // reducer 이름, success와 fail은 앞에 각각 붙음 + 그리고 카멜케이스로 바뀜
      entity: "catFact", // 접근할 initialState의 property이름
      cleanDataWhenStart: true // fetching을 시작할때 자동으로 data를 null로 초기화함
    })<any, CatFact[], string>() // 각각의 payload 타입
  }
});

export const catActions = catSlice.actions;
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
