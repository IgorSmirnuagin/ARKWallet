import React from "react";
import { useDispatch } from "react-redux";

import { WalletType } from "../store/walletReducer/types";
import {
  clearTransactions,
  getWalletTransactions,
} from "../store/walletReducer";
import { getDelegates, clearDelegates } from "../store/delegateReducer";

type PropsType = {
  wallets: WalletType[];
};

const Wallet: React.FC<PropsType> = ({ wallets }) => {
  const dispatch = useDispatch();
  const getTransactions = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    dispatch(getWalletTransactions({ publicKey: e.currentTarget.id }));
    dispatch(clearDelegates());
  };

  const getDelegatesFromServer = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    dispatch(getDelegates());
    dispatch(clearTransactions());
  };

  return (
    <div style={{ display: "flex" }}>
      {wallets.map((wallet) => (
        <div key={wallet.publicKey}>
          <p>Wallet: {wallet.name}</p>
          <p>Balance: {wallet.balance}</p>
          <button id={wallet.publicKey} onClick={getTransactions}>
            View transactions
          </button>
          <button id={wallet.publicKey} onClick={getDelegatesFromServer}>
            View delegates
          </button>
        </div>
      ))}
    </div>
  );
};

export default Wallet;
