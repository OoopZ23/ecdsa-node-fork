import { useState } from "react";
import server from "./server";

import { secp256k1 } from "ethereum-cryptography/secp256k1";
import {toHex, utf8ToBytes, hexToBytes, bytesToHex} from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
import {addressPriv, addressPub} from "../scripts/generate.js"

BigInt.prototype.toJSON = function() { return this.toString() }

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  
  const setValue = (setter) => (evt) => setter(evt.target.value);


  async function transfer(evt) {
    evt.preventDefault();

    const utf8EncodeText = new TextEncoder();

    try {
      let transaction = {
        from: address,
        to: recipient,
        amount: sendAmount
      };
      transaction = keccak256(utf8EncodeText.encode(JSON.stringify(transaction)));
      let sign; 
      sign = secp256k1.sign(transaction, addressPriv[address]);

      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient: recipient,
        signature: sign, 
        publicKey: addressPub[address]
      });
      setBalance(balance);
    } catch (ex) {
      ex.response.data.message;
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>
      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
