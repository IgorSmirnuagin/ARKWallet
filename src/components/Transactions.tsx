import React from "react";
import { useSelector } from "react-redux";

import { getTransactions, getCurrentWallet } from "../store/walletReducer";

const Transactions = () => {
  const transactions = useSelector(getTransactions);
  const currentWallet = useSelector(getCurrentWallet);

  if (transactions === null) {
    return null;
  }
  return (
    <>
      <h3 className="text-1xl font-bold leading-tight text-gray-900 pt-5 pb-5">
        {`${currentWallet?.name || ""} transactions`}
      </h3>
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
                recipient
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-no-wrap ">
                  <span className="transaction-id">{item.id}</span>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {item.sender === currentWallet?.address
                    ? `-${item.amount}`
                    : `+${item.amount}`}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <span className="transaction-id">{item.sender}</span>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <span className="transaction-id">{item.recipient}</span>
                </td>
              </tr>
            ))}
          </tbody>
          {transactions.length === 0 && (
            <tfoot>
              <tr>
                <td
                  className="px-6 py-3 text-center font-medium text-gray-500 tracking-wider"
                  colSpan={4}
                >
                  No transactions have been found. The latest transactions will
                  be displayed here.
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </>
  );
};

export default Transactions;
