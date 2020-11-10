import { Identities } from "@arkecosystem/crypto";
import * as bip39 from "bip39";

const createWallet = (name: string) => {
  const passphrase = bip39.generateMnemonic(
    undefined,
    undefined,
    bip39.wordlists["english"]
  );

  // Throughout this document, the keys object used is:
  const keys = Identities.Keys.fromPassphrase(passphrase);
  // Throughout this document, the recipientId variable used is:
  const address = Identities.Address.fromPassphrase(passphrase);
  // // Throughout this document, the senderPublicKey variable used is:

  return {
    name: name,
    ...keys,
    address,
    balance: "0",
  };
};
export default createWallet;
