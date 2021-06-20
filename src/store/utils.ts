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
  hasNoStartActionPayload?: boolean;
}

// 한번에 하기
export const createAsyncReducers =
  <State extends { [key: string]: any }>({
    name,
    entity
  }: CreateAsyncReducersParams) =>
  <Start, Success, Fail>() => {
    const result: {
      [key: string]:
        | ((state: State, action: PayloadAction<Start>) => void)
        | ((state: State, action: PayloadAction<Success>) => void)
        | ((state: State, action: PayloadAction<Fail>) => void);
    } = {
      [`${name}`]: (state: State, action: PayloadAction<Start>) => {
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
