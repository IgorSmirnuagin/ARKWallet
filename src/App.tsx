import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { clearTransactions, createWallet } from "./store/walletReducer";
import { clearDelegates } from "./store/delegateReducer";
import { RootStateType } from "./store/rootReducer";

import ImportWallet from "./components/ImportWallet";
import Wallet from "./components/Wallet";
import './App.scss';

import share from './assets/images/share.svg';
import plus from './assets/images/plus.svg';
import logo from './assets/images/logo.png';

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
    <>
    <div className="relative">
      <div className="max-w-7xl mx-auto mt-10 mb-10 px-4 pb-6 sm:px-6 container bg-white rounded-md">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="lg:w-0 lg:flex-1">
              <span className="flex">
                <img className="h-8 w-auto sm:h-10" src={logo} alt="logo" />
              </span>
            </div>

            
            <div className="flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
              <button className="btn-head" onClick={OpenCloseImportWallet}>
                <span className="btn-head__icon"><img src={share} alt="icon"/></span>
                Import Wallet</button>
              <span className="inline-flex">
                <button className="btn-head" onClick={CreateNewWallet}>
                <span className="btn-head__icon"><img src={plus} alt="icon" /></span>
                  Create Wallet</button>
              </span>
            </div>
          </div>

          
            <ImportWallet
              {...{
                wallets,
                isImportWalletOpen,
                OpenCloseImportWallet,
              }}
            />

          {wallets.length !== 0 && <Wallet {...{ wallets }} />}

          {Boolean(transactions.length) && 
          <>
            <h3 className="text-1xl font-bold leading-tight text-gray-900 pt-5 pb-5">Transactions</h3>
            <div className="shadow-lg overflow-auto sm:rounded-md mr-2">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      id
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      amount
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      sender
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      version
                    </th>
                  </tr>
                </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map(item => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-no-wrap ">
                        <span className="transaction-id">
                          {item.id}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {item.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <span className="transaction-id">
                          {item.sender}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        {item.version}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>}

          {Boolean(delegates.length) && 
          <>
            <h3 className="text-1xl font-bold leading-tight text-gray-900 pt-5 pb-5">Delegates</h3>
            <div className="shadow-lg overflow-auto sm:rounded-md mr-2">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      PublicKey
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Votes
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                  </tr>
                </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {delegates.map(item => (
                    <tr key={item.publicKey}>
                      <td className="px-6 py-4 whitespace-no-wrap ">
                        <span className="transaction-id">
                          {item.username}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <span className="transaction-id">
                          {item.publicKey}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <span className="transaction-id">
                          {item.votes}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        {item.rank}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>}
        </div>
    </div>
    
      
      
    </>
  );
}

export default App;
