require("dotenv").config();
const { ethers } = require('ethers');
const Payload = require('./artifacts/contracts/Payload.sol/Payload.json');
const Test = require('./artifacts/contracts/Test.sol/Test.json');


const testnetRPC = 'https://data-seed-prebsc-1-s1.bnbchain.org:8545/';

const TestContractAddr = "0xf27eaf60292cD31a6e4cC5438277AD037DD899A0";
const PayloadContractAddr = "0x6E0df6d426348523705E50141eA8A596e9B8F536";

const accountAddr = "0x7952aBCA840f97360DE58FBfe9CD71fEA2DE4ce8";
const privKey = process.env.PRIVATE_KEY;

const provider = new ethers.JsonRpcProvider(testnetRPC);
const wallet = new ethers.Wallet(privKey, provider);

let encodedPayload = new ethers.Interface(Payload.abi).encodeFunctionData("transferFunds", [accountAddr]);
let encodedData = new ethers.Interface(Test.abi).encodeFunctionData('transferFunds', [PayloadContractAddr, encodedPayload]);

const tx = {
    to: TestContractAddr,
    data: encodedData,
};

try {
    wallet.sendTransaction(tx);
} catch (error) {
    console.log(err)
}