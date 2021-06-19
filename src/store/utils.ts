import { PayloadAction } from "@reduxjs/toolkit";

interface CreateAsyncReducerParams {
  type: "start" | "success" | "fail";
  entity: string;
}

export const createAsyncReducer = <State, ActionPayload>({
  type,
  entity
}: CreateAsyncReducerParams) => {
  switch (type) {
    case "start":
      return (state: State, action: PayloadAction<ActionPayload>) => {
        state[entity].status = "loading";
      };
    case "success":
      return (state: State, action: PayloadAction<ActionPayload>) => {
        state[entity].data = action.payload;
        state[entity].status = "success";
      };
    case "fail":
      return (state: State, action: PayloadAction<ActionPayload>) => {
        state[entity].error = action.payload;
        state[entity].status = "fail";
      };
    default:
      return (state, action: PayloadAction<ActionPayload>) => {};
  }
};
