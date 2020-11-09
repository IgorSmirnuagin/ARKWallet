import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { clearTransactions, createWallet } from "./store/walletReducer";
import { clearDelegates } from "./store/delegateReducer";
import { RootStateType } from "./store/rootReducer";

import ImportWallet from "./components/ImportWallet";
import Wallet from "./components/Wallet";

function App() {
  const dispatch = useDispatch();
  const wallets = useSelector(
    (state: RootStateType) => state.wallets.walletsInfo
  );
  const transactions = useSelector(
    (state: RootStateType) => state.wallets.transactions
  );
  const delegates = useSelector(
    (state: RootStateType) => state.delegates.delegates
  );
  const [isImportWalletOpen, setIsImportWalletOpen] = useState(false);

  const OpenCloseImportWallet = () => {
    setIsImportWalletOpen((prev) => !prev);
    dispatch(clearTransactions());
    dispatch(clearDelegates());
  };

  const CreateNewWallet = () => dispatch(createWallet({ name: "New Wallet" }));

  console.log("transactions", transactions);
  console.log("delegates", delegates);

  return (
    <div>
      <button onClick={OpenCloseImportWallet}>Import Wallet</button>
      <button onClick={CreateNewWallet}>Create Wallet</button>
      {isImportWalletOpen && (
        <ImportWallet
          {...{
            wallets,
            isImportWalletOpen,
            OpenCloseImportWallet,
          }}
        />
      )}
      {wallets.length !== 0 && <Wallet {...{ wallets }} />}
    </div>
  );
}

export default App;
