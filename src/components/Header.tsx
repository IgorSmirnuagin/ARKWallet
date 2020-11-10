import React from "react";

import share from "../assets/images/share.svg";
import plus from "../assets/images/plus.svg";
import logo from "../assets/images/logo.png";

type PropsType = {
  OpenCloseImportWallet: () => void;
  OpenCloseCreateWallet: () => void;
};

const Header: React.FC<PropsType> = ({
  OpenCloseImportWallet,
  OpenCloseCreateWallet,
}) => {
  return (
    <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
      <div className="lg:w-0 lg:flex-1">
        <span className="flex">
          <img className="h-8 w-auto sm:h-10" src={logo} alt="logo" />
        </span>
      </div>

      <div className="flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
        <button className="btn-head" onClick={OpenCloseImportWallet}>
          <span className="btn-head__icon">
            <img src={share} alt="icon" />
          </span>
          Import Wallet
        </button>
        <span className="inline-flex">
          <button className="btn-head" onClick={OpenCloseCreateWallet}>
            <span className="btn-head__icon">
              <img src={plus} alt="icon" />
            </span>
            Create Wallet
          </button>
        </span>
      </div>
    </div>
  );
};

export default Header;
