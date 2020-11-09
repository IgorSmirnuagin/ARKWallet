import axios from "./index";

export const WalletsAPI = {
  path: "wallets/",
  getAllWallets() {
    return axios.get(this.path);
  },
  getWalletFromAdress(id: string) {
    return axios.get(`${this.path}${id}`);
  },
  getWalletTransactions(id: string) {
    return axios.get(`${this.path}${id}/transactions`);
  },
};

export const DelegatesAPI = {
  path: "delegates/",
  getAllDelegates() {
    return axios.get(this.path);
  },
};
