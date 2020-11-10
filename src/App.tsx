import React, { useState } from "react";
import { useSelector } from "react-redux";

import { getWallets } from "./store/walletReducer";

import ImportWallet from "./components/ImportWallet";
import Wallet from "./components/Wallet";
import Header from "./components/Header";
import Transactions from "./components/Transactions";
import Delegates from "./components/Delegates";
import CreateWallet from "./components/CreateWallet";

import "./App.scss";

function App() {
  const wallets = useSelector(getWallets);

  const [isImportWalletOpen, setIsImportWalletOpen] = useState(false);
  const OpenCloseImportWallet = () => {
    isCreateWalletOpen && OpenCloseCreateWallet();
    setIsImportWalletOpen((prev) => !prev);
  };

  const [isCreateWalletOpen, setIsCreateWalletOpen] = useState(false);
  const OpenCloseCreateWallet = () => {
    isImportWalletOpen && OpenCloseImportWallet();
    setIsCreateWalletOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto mt-10 mb-10 px-4 pb-6 sm:px-6 container bg-white rounded-md">
        <Header {...{ OpenCloseImportWallet, OpenCloseCreateWallet }} />

        <CreateWallet
          {...{
            wallets,
            isCreateWalletOpen,
            OpenCloseCreateWallet,
          }}
        />

        <ImportWallet
          {...{
            wallets,
            isImportWalletOpen,
            OpenCloseImportWallet,
          }}
        />

        <Wallet {...{ wallets }} />

        <Transactions />

        <Delegates />
      </div>
    </div>
  );
}

export default App;
