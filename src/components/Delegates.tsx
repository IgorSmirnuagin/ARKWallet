import React from "react";
import { useSelector } from "react-redux";

import { getListDelegates } from "../store/delegateReducer";
import { getCurrentWallet } from "../store/walletReducer";

const Delegates = () => {
  const delegates = useSelector(getListDelegates);
  const currentWallet = useSelector(getCurrentWallet);

  if (delegates === null) {
    return null;
  }
  return (
    <>
      <h3 className="text-1xl font-bold leading-tight text-gray-900 pt-5 pb-5">
        Delegates
      </h3>
      <p>
        {currentWallet?.vote
          ? `This wallet voiting for ${currentWallet?.vote}`
          : "This wallet is not voting."}
      </p>
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
            {delegates.map((item) => (
              <tr key={item.publicKey}>
                <td className="px-6 py-4 whitespace-no-wrap ">
                  <span className="transaction-id">{item.username}</span>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <span className="transaction-id">{item.publicKey}</span>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <span className="transaction-id">{item.votes}</span>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                  {item.rank}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Delegates;
