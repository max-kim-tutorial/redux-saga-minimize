import { createSlice } from "@reduxjs/toolkit";
import { CatState, CatFact } from "./types";
import { createAsyncReducer } from "../utils";

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
    fetchCatFacts: createAsyncReducer({ type: "start", entity: "catFact" }),
    successCatFacts: createAsyncReducer<CatState, CatFact>({
      type: "success",
      entity: "catFact"
    }),
    failCatFacts: createAsyncReducer<CatState, string>({
      type: "fail",
      entity: "catFact"
    })
  }
});

export const catActions = catSlice.actions;
export default catSlice.reducer;
