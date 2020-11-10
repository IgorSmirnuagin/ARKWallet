import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { createWallet } from "../store/walletReducer";
import { WalletCreateType, WalletType } from "../store/walletReducer/types";

type PropsType = {
  wallets: WalletType[];
  isCreateWalletOpen: boolean;
  OpenCloseCreateWallet: () => void;
};

const CreateWallet: React.FC<PropsType> = ({
  wallets,
  isCreateWalletOpen,
  OpenCloseCreateWallet,
}) => {
  const dispatch = useDispatch();
  const { handleSubmit, register, errors, setError } = useForm();

  if (!isCreateWalletOpen) {
    return null;
  }

  const isThisWalletExist = (
    propsField: string,
    walletField: "name" | "address" | "publicKey",
    errorMessage: string
  ) => {
    if (wallets.find((wallet) => wallet[walletField] === propsField)) {
      setError("name", { message: errorMessage });
      return true;
    } else {
      return false;
    }
  };

  const importWallet = async (props: WalletCreateType) => {
    const isSuccess = !isThisWalletExist(
      props.name,
      "name",
      "Wallet with this name already exist"
    );
    if (isSuccess) {
      dispatch(createWallet({ name: props.name }));
      isCreateWalletOpen && OpenCloseCreateWallet();
    }
  };
  return (
    <>
      <h3 className="text-2xl font-bold leading-tight text-gray-900 pt-5 pb-5 pl-5">
        Create wallet
      </h3>
      <form onSubmit={handleSubmit(importWallet)}>
        <div className="shadow-lg overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="col-span-6 sm:col-span-3 mb-5">
              <input
                id="name"
                name="name"
                ref={register}
                required
                placeholder="Enter wallet name"
                className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>

            <button type="submit" className="btn">
              Create wallet
            </button>

            {errors.name && (
              <p className="mt-2 text-red-500">{errors.name.message}</p>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateWallet;
