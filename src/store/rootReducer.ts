import { combineReducers } from "@reduxjs/toolkit";
import walletReducer from "./walletReducer/index";
import delegateReducer from "./delegateReducer/index";

const rootReducer = combineReducers({
  wallets: walletReducer,
  delegates: delegateReducer,
});

type RootReducerType = typeof rootReducer;
export type RootStateType = ReturnType<RootReducerType>;

export default rootReducer;
