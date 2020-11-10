import { RootStateType } from "./../rootReducer";
import { InitialDelegateType, DelegateType } from "./types";
import { DelegatesAPI } from "../../network/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getDelegates = createAsyncThunk(
  "delegate/getDelegates",
  async () => {
    const response = await DelegatesAPI.getAllDelegates();
    return response.data.data;
  }
);

const initialState: InitialDelegateType = {
  delegates: null,
};

const Delegate = createSlice({
  name: "delegate",
  initialState,
  reducers: {
    clearDelegates(state) {
      state.delegates = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getDelegates.fulfilled,
      (state, action: PayloadAction<DelegateType[]>) => {
        state.delegates = action.payload;
      }
    );
  },
});

export const getListDelegates = (state: RootStateType) =>
  state.delegates.delegates;

export const { clearDelegates } = Delegate.actions;
export default Delegate.reducer;
