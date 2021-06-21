import { AsyncEntity } from "./types";
import { PayloadAction, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { put, call } from "redux-saga/effects";

export const createStartReducerWithoutPayload = <
  State extends { [key: string]: any }
>({
  entity
}: {
  entity: string;
}) => {
  return (state: State) => {
    state[entity].status = "loading";
  };
};

export const createStartReducer = <State extends { [key: string]: any }>(
  entity: string
) => <PayloadType>() => {
  return (state: State, action: PayloadAction<PayloadType>) => {
    state[entity].status = "loading";
  };
};

export const createSuccessReducer = <State extends { [key: string]: any }>(
  entity: string
) => <PayloadType>() => {
  return (state: State, action: PayloadAction<PayloadType>) => {
    state[entity].data = action.payload;
    state[entity].status = "success";
  };
};

export const createFailReducer = <State extends { [key: string]: any }>(
  entity: string
) => <PayloadType>() => {
  return (state: State, action: PayloadAction<PayloadType>) => {
    state[entity].error = action.payload;
    state[entity].status = "fail";
  };
};

const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};

interface CreateAsyncReducersParams {
  name: string;
  entity: string;
  cleanDataWhenStart?: boolean;
}

// 한번에 하기
// 시나리오 보충
// 근데 이 함수의 리턴값이 유니언 타입으로 추론되기 때문에 createSaga단에서 타입오류가 남
export const createAsyncReducers = <State extends { [key: string]: any }>({
  name,
  entity,
  cleanDataWhenStart = false
}: CreateAsyncReducersParams) => <Start, Success, Fail>() => {
  const result: {
    [key: string]:
      | ((state: State, action: PayloadAction<Start>) => void)
      | ((state: State, action: PayloadAction<Success>) => void)
      | ((state: State, action: PayloadAction<Fail>) => void);
  } = {
    [`${name}`]: (state: State, action: PayloadAction<Start>) => {
      if (cleanDataWhenStart) {
        (state[entity] as AsyncEntity<Success, Fail>).data = null;
      }
      (state[entity] as AsyncEntity<Success, Fail>).status = "loading";
    },
    [`success${capitalize(name)}`]: (
      state: State,
      action: PayloadAction<Success>
    ) => {
      (state[entity] as AsyncEntity<Success, Fail>).data = action.payload;
      (state[entity] as AsyncEntity<Success, Fail>).status = "success";
    },
    [`fail${capitalize(name)}`]: (
      state: State,
      action: PayloadAction<Fail>
    ) => {
      (state[entity] as AsyncEntity<Success, Fail>).error = action.payload;
      (state[entity] as AsyncEntity<Success, Fail>).status = "fail";
    }
  };
  return result;
};

export const createSaga = <Start, Success, Fail>(
  success: ActionCreatorWithPayload<Success>,
  fail: ActionCreatorWithPayload<Fail>,
  req: any
) => {
  return function* (action: PayloadAction<Start>) {
    try {
      const response: Success = yield call(req, action.payload);
      yield put(success(response));
    } catch (error) {
      yield put(fail(error.toString() as Fail));
    }
  };
};
