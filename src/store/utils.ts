import { AxiosResponse } from "axios";
import { AsyncEntity } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import { put, call } from "redux-saga/effects";

interface CreateAsyncReducerParams {
  type: "start" | "success" | "fail";
  entity: string;
}

export const createStartReducerWithoutPayload = <
  T extends { [key: string]: any }
>({
  entity
}: {
  entity: string;
}) => {
  return (state: T) => {
    state[entity].status = "loading";
  };
};

export const createAsyncReducer =
  <State extends { [key: string]: any }>({
    type,
    entity
  }: CreateAsyncReducerParams) =>
  <R>() => {
    switch (type) {
      case "start":
        return (state: State, action: PayloadAction<R>) => {
          state[entity].status = "loading";
        };
      case "success":
        return (state: State, action: PayloadAction<R>) => {
          state[entity].data = action.payload;
          state[entity].status = "success";
        };
      case "fail":
        return (state: State, action: PayloadAction<R>) => {
          state[entity].error = action.payload;
          state[entity].status = "fail";
        };
      default:
        return (state: State, action: PayloadAction<R>) => {};
    }
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
// 근데 이렇게 하면 제대로 추론을 못함...
export const createAsyncReducers =
  <State extends { [key: string]: any }>({
    name,
    entity,
    cleanDataWhenStart = false
  }: CreateAsyncReducersParams) =>
  <Start, Success, Fail>() => {
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
  success: any, // 이거 추론 잘 안될듯..
  fail: any,
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
