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
    <form
      onSubmit={handleSubmit(importWallet)}
      style={{ display: "flex", flexDirection: "column", width: "50%" }}
    >
      <input
        name="name"
        ref={register}
        placeholder="Enter wallet name"
        required
      />
      <input
        name="address"
        ref={register}
        placeholder="Enter wallets address or public key"
        required
      />
      {errors.address && <p>{errors.address.message}</p>}
      <button type="submit">Import wallet</button>
    </form>
  );
};

export default ImportWallet;
