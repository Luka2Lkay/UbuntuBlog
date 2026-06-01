import {
  useDispatch,
  useSelector,
} from "react-redux";

import type { TypedUseSelectorHook } from "react-redux";

import type {
  RootState,
  AppDispatch,
} from "../redux/store";

export const useAppDispatch =
  useDispatch.withTypes<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;