import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { importWalletFromAdress } from "../store/walletReducer";
import { WalletType } from "../store/walletReducer/types";

type PropsType = {
  wallets: WalletType[];
  isImportWalletOpen: boolean;
  OpenCloseImportWallet: () => void;
};

const ImportWallet: React.FC<PropsType> = ({
  wallets,
  isImportWalletOpen,
  OpenCloseImportWallet,
}) => {
  const dispatch = useDispatch();
  const { handleSubmit, register, errors, setError } = useForm();

  const isThisWalletExist = (
    propsField: string,
    walletField: "name" | "address" | "publicKey",
    errorMessage: string
  ) => {
    if (wallets.find((wallet) => wallet[walletField] === propsField)) {
      setError("address", {
        message: errorMessage,
      });
      return true;
    } else return false;
  };

  const importWallet = async (props: any) => {
    if (
      !isThisWalletExist(
        props.address,
        "publicKey",
        "Wallet with this public key already exist"
      ) &&
      !isThisWalletExist(
        props.address,
        "address",
        "Wallet with this address already exist"
      ) &&
      !isThisWalletExist(
        props.name,
        "name",
        "Wallet with this name already exist"
      )
    ) {
      const response = await dispatch(importWalletFromAdress(props));
      //@ts-ignore
      if (response?.error) {
        //@ts-ignore
        setError("address", { message: `${response.payload.message}` });
      } else {
        isImportWalletOpen && OpenCloseImportWallet();
      }
    }
  };

  return (
    <>
    <h3 className="text-2xl font-bold leading-tight text-gray-900 pt-5 pb-5">Import wallet</h3>
    <form
      onSubmit={handleSubmit(importWallet)}
      style={{ display: "flex", flexDirection: "column", width: "100%" }}
    >
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
          <div className="col-span-6 sm:col-span-3 mb-5">
            <input
              name="address"
              ref={register}
              required
              placeholder="Enter wallets address or public key"
              className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />
          </div>
          <button type="submit" className="btn">Import wallet</button>

          {errors.address && <p className="mt-2 text-red-500">{errors.address.message}</p>}
        </div>
      </div>
    </form>
    </>
  );
};

export default ImportWallet;
