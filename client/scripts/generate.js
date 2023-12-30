import * as secp from "ethereum-cryptography/secp256k1";
import {toHex} from "ethereum-cryptography/utils";

// const privateKey = secp.secp256k1.utils.randomPrivateKey();

const publicKey = secp.secp256k1.getPublicKey("62503d3fc0d35cfc1a74a1d5a3ac8107a4e0a90a8b004db4962ffd3adecd5a4c");

// const address = toHex(publicKey.slice(1)).slice(-20);
export const addressPriv = {
    "57fa512025ea5cc0859d": "5ac901eaeabeefba85a674c3d2f3cb5095972c499b77977b69f07d3e6a562b9f",
    "19fb0906f73c85ea6ad9": "4d3c86f4fe506782d601437bb9a9d4d6bfb5721343b3b84bba42cc62b4ea2965",
    "947987bf49cc06990db2": "62503d3fc0d35cfc1a74a1d5a3ac8107a4e0a90a8b004db4962ffd3adecd5a4c"
};

export const addressPub = {
"57fa512025ea5cc0859d":"0217d3b6ed2eda7df44fed316399f6e2ba8a06cdf035eb57fa512025ea5cc0859d",
"19fb0906f73c85ea6ad9":"030a10b1da097dd053c8568c56b0074860092ab3b551e019fb0906f73c85ea6ad9",
"947987bf49cc06990db2":"037a2cc2f6049492e3ff5846ac0e39b19dddcadc9969ad947987bf49cc06990db2"
}

// console.log('address', address);
