import React from "react";
import { useDispatch } from "react-redux";

import { WalletType } from "../store/walletReducer/types";
import {
  clearTransactions,
  getWalletTransactions,
  setCurrentWallet,
} from "../store/walletReducer";
import { getDelegates, clearDelegates } from "../store/delegateReducer";

type PropsType = {
  wallets: WalletType[];
};

const Wallet: React.FC<PropsType> = ({ wallets }) => {
  const dispatch = useDispatch();

  if (wallets.length === 0) {
    return null;
  }

  const getTransactions = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const currentWallet =
      wallets.find((wallet) => wallet.publicKey === e.currentTarget.id) || null;
    dispatch(getWalletTransactions(e.currentTarget.id));
    dispatch(setCurrentWallet(currentWallet));
    dispatch(clearDelegates());
  };

  const getDelegatesFromServer = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const currentWallet =
      wallets.find((wallet) => wallet.publicKey === e.currentTarget.id) || null;
    dispatch(getDelegates());
    dispatch(setCurrentWallet(currentWallet));
    dispatch(clearTransactions());
  };

  return (
    <>
      <h3 className="text-2xl font-bold leading-tight text-gray-900 pt-5 pb-5">
        Wallets
      </h3>
      <div className="flex flex-wrap">
        {wallets.map((wallet) => (
          <div
            key={wallet.address}
            className="shadow-lg overflow-hidden sm:rounded-md mr-2 mb-2 wallet"
          >
            <div className="px-4 py-5 bg-white sm:p-6">
              <div key={wallet.publicKey}>
                <p className="mb-2">
                  Wallet: <b>{wallet.name}</b>
                </p>
                <p className="mb-2">
                  Balance: <b>{wallet.balance}</b>
                </p>
                <button
                  id={wallet.publicKey}
                  className="btn btn_sm mr-1"
                  onClick={getTransactions}
                >
                  View transactions
                </button>
                <button
                  id={wallet.publicKey}
                  className="btn btn_sm ml-1"
                  onClick={getDelegatesFromServer}
                >
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
