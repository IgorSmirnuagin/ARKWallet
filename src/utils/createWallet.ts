import { Identities, Crypto } from "@arkecosystem/crypto";
import * as bip39 from "bip39";

const createWallet = (name: string) => {
  const passphrase = bip39.generateMnemonic(
    undefined,
    undefined,
    bip39.wordlists["english"]
  );

  // const wallet = Crypto.HDWallet.fromMnemonic(passphrase);
  // console.log("wallet", wallet);
  // // Throughout this document, the keys object used is:
  const keys = Identities.Keys.fromPassphrase(passphrase);
  // // Throughout this document, the recipientId variable used is:
  const address = Identities.Address.fromPassphrase(passphrase);
  // // Throughout this document, the senderPublicKey variable used is:
  // const senderPublicKey = Identities.PublicKey.fromPassphrase(passphrase);
  // console.log(senderPublicKey, "senderPublicKey");

  return {
    name: name,
    passphrase,
    ...keys,
    address,
  };
};
export default createWallet;
