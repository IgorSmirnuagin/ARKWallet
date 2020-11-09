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
    <>
    <h3 className="text-2xl font-bold leading-tight text-gray-900 pt-5 pb-5">Wallets</h3>
    <div className="flex flex-wrap">
      {wallets.map((wallet) => (
        <div className="shadow-lg overflow-hidden sm:rounded-md mr-2 mb-2 wallet">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div key={wallet.publicKey}>
              <p className="mb-2">Wallet: <b>{wallet.name}</b></p>
              <p className="mb-2">Balance: <b>{wallet.balance}</b></p>
              <button id={wallet.publicKey} className="btn btn_sm mr-1" onClick={getTransactions}>
                View transactions
              </button>
              <button id={wallet.publicKey} className="btn btn_sm ml-1" onClick={getDelegatesFromServer}>
                View delegates
              </button>
            </div>
            </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Wallet;
