const {secp256k1} = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const {toHex} = require("ethereum-cryptography/utils");

const express = require("express");
const app = express();
const cors = require("cors");

const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "57fa512025ea5cc0859d": 100,
  "19fb0906f73c85ea6ad9": 50,
  "947987bf49cc06990db2": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // TODO: get a signature from the client side app
  // recover the public address from the signature 
  // and allow through tx
  // DONE below

  const { sender, amount, recipient, signature, publicKey} = req.body;//,pub

  let transaction = {
    from: sender,
    to: recipient,
    amount: amount.toString()
  };
  console.log(typeof amount, typeof sender, typeof recipient);

  setInitialBalance(sender);
  setInitialBalance(recipient); 


  const utf8EncodeText = new TextEncoder();

  transaction = keccak256(utf8EncodeText.encode(JSON.stringify(transaction)));



  let signatureNew = new secp256k1.Signature( BigInt(signature["r"]),  BigInt(signature["s"]), signature["recovery"]);
  const isSigned = secp256k1.verify(signatureNew, transaction, publicKey);
  
  if (!isSigned) {
    res.status(400).send({ message: "Not Signed!" });
  } else 
  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
