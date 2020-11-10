import { RootStateType } from "./../rootReducer";
import { WalletsAPI } from "./../../network/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  InitialWalletStateType,
  TransactionType,
  WalletCreateType,
  WalletImportSendType,
  WalletType,
} from "./types";
import createWalletUtils from "../../utils/createWallet";

export const importWalletFromAdress = createAsyncThunk(
  "wallet/importWalletFromAdress",
  async (arg: WalletImportSendType, { rejectWithValue }) => {
    try {
      const response = await WalletsAPI.getWalletFromAdress(arg.address);
      return { name: arg.name, ...response.data.data };
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue(error.request);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getWalletTransactions = createAsyncThunk(
  "wallet/getWalletTransactions",
  async (publicKey: string) => {
    const response = await WalletsAPI.getWalletTransactions(publicKey);
    return response.data.data;
  }
);

const initialState: InitialWalletStateType = {
  walletsInfo: [],
  transactions: null,
  currentWallet: null,
};

const Wallet = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    createWallet(state, action: PayloadAction<WalletCreateType>) {
      const wallet = createWalletUtils(action.payload.name);
      state.walletsInfo.push(wallet);
    },
    setCurrentWallet(state, action: PayloadAction<WalletType | null>) {
      state.currentWallet = action.payload;
    },
    clearTransactions(state) {
      state.transactions = null;
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
    builder.addCase(getWalletTransactions.rejected, (state) => {
      state.transactions = [];
    });
  },
});

export const getCurrentWallet = (state: RootStateType) =>
  state.wallets.currentWallet;
export const getWallets = (state: RootStateType) => state.wallets.walletsInfo;
export const getTransactions = (state: RootStateType) =>
  state.wallets.transactions;

export const {
  createWallet,
  setCurrentWallet,
  clearTransactions,
} = Wallet.actions;
export default Wallet.reducer;
