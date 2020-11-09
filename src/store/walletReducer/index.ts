import { WalletsAPI } from "./../../network/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialWalletStateType, TransactionType, WalletType } from "./types";
import createWalletUtils from "../../utils/createWallet";

export const createWallet = createAsyncThunk(
  "wallet/createWallet",
  async (arg: { name: string }, { rejectWithValue }) => {
    const wallet = createWalletUtils(arg.name);
    console.log(wallet);
  }
);

export const importWalletFromAdress = createAsyncThunk(
  "wallet/importWalletFromAdress",
  async (arg: { name: string; address: string }, { rejectWithValue }) => {
    try {
      const response = await WalletsAPI.getWalletFromAdress(arg.address);
      return { name: arg.name, ...response.data.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getWalletTransactions = createAsyncThunk(
  "wallet/getWalletTransactions",
  async (arg: { publicKey: string }) => {
    const response = await WalletsAPI.getWalletTransactions(arg.publicKey);
    return response.data.data;
  }
);

const initialState: InitialWalletStateType = {
  walletsInfo: [],
  transactions: [],
};

const Wallet = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    clearTransactions(state) {
      state.transactions = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      importWalletFromAdress.fulfilled,
      (state, action: PayloadAction<WalletType>) => {
        state.walletsInfo.push(action.payload);
      }
    );
    builder.addCase(
      getWalletTransactions.fulfilled,
      (state, action: PayloadAction<TransactionType[]>) => {
        state.transactions = action.payload;
      }
    );
  },
});

export const { clearTransactions } = Wallet.actions;
export default Wallet.reducer;
