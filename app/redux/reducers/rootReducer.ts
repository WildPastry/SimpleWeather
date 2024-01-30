import { Reducer, UnknownAction, combineReducers } from "@reduxjs/toolkit";
import { IData } from "../../types/data.types";
import data from "../slices/dataSlice";

const rootReducer: Reducer<
  {
    data: IData;
  },
  UnknownAction,
  Partial<{
    data: IData | undefined;
  }>
> = combineReducers({
  data,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
