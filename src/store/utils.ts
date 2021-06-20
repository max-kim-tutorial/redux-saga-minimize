import { AsyncEntity } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";

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

// state[entity]를 일관성있게 추론해줄 수 있는 방법??

export const createAsyncReducer =
  <T extends { [key: string]: any }>({
    type,
    entity
  }: CreateAsyncReducerParams) =>
  <R>() => {
    switch (type) {
      case "start":
        return (state: T, action: PayloadAction<R>) => {
          state[entity].status = "loading";
        };
      case "success":
        return (state: T, action: PayloadAction<R>) => {
          state[entity].data = action.payload;
          state[entity].status = "success";
        };
      case "fail":
        return (state: T, action: PayloadAction<R>) => {
          state[entity].error = action.payload;
          state[entity].status = "fail";
        };
      default:
        return (state: T, action: PayloadAction<R>) => {};
    }
  };

interface CreateAsyncReducersParams {
  name: string;
  entity: string;
  hasNoStartPayload?: boolean;
}

// 한번에 하기
export const createAsyncReducers =
  <State extends { [key: string]: any }>({
    name,
    entity,
    hasNoStartPayload = false
  }: CreateAsyncReducersParams) =>
  <Start, Success, Fail>() => {
    const result: {
      [key: string]: any;
    } = {};

    if (hasNoStartPayload) {
      result[name] = (state: State) => {
        (state[entity] as AsyncEntity<Success, Fail>).status = "loading";
      };
    } else {
      result[name] = (state: State, action: PayloadAction<Start>) => {
        (state[entity] as AsyncEntity<Success, Fail>).status = "loading";
      };
    }

    result[`success${name}`] = (
      state: State,
      action: PayloadAction<Success>
    ) => {
      (state[entity] as AsyncEntity<Success, Fail>).data = action.payload;
      (state[entity] as AsyncEntity<Success, Fail>).status = "success";
    };

    result[`fail${name}`] = (state: State, action: PayloadAction<Fail>) => {
      (state[entity] as AsyncEntity<Success, Fail>).error = action.payload;
      (state[entity] as AsyncEntity<Success, Fail>).status = "fail";
    };

    return result;
  };
