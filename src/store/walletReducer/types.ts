type multiSignatureType = {
  min: number;
  publicKeys: string[];
};

export type WalletType = {
  name: string;
  address: string;
  attributes: { multiSignature: multiSignatureType };
  balance: string;
  isDelegate: boolean;
  isResigned: boolean;
  multiSignature: multiSignatureType;
  nonce: string;
  publicKey: string;
  vote: string;
};

export type TransactionType = {
  amount: string;
  blockId: string;
  confirmations: number;
  fee: string;
  id: string;
  nonce: string;
  recipient: string;
  sender: string;
  senderPublicKey: string;
  signature: string;
  timestamp: {
    epoch: number;
    unix: number;
    human: string;
  };
  type: number;
  typeGroup: number;
  version: number;
};

export type InitialWalletStateType = {
  walletsInfo: WalletType[];
  transactions: TransactionType[];
};
