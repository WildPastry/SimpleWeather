import type { AppDispatch, AppState } from "./store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Use throughout  app instead of `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
