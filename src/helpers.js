const { BigNumber } = require("ethers");
const ethers = require("ethers");

export function convertToObjectNumber(obj) {
  if (!obj._hex) {
    throw new Error("Object does not have _hex property");
  }

  const bigNumber = BigNumber.from(obj._hex);
  const number = bigNumber.toNumber();

  return number;
}

export async function connectToRPC(contractAddress, ABI) {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, ABI, signer);
  console.log(contract);
  return { contract, signer, provider };
}

export const convertMessage = (arr) => {
  const result = {};

  result.id = convertToObjectNumber(arr[0]);

  result.senderAddress = arr[1];

  result.nftID = convertToObjectNumber(arr[2]);

  result.message = arr[3];
  result.timeStamp = convertToObjectNumber(arr[4]);
  console.log(result);

  return result;
};

export const humanTime = (timestamp) => {
  const dateObject = new Date(timestamp * 1000); // convert timestamp to milliseconds

  const date = dateObject.toLocaleDateString(); // get date in local time zone
  const time = dateObject.toLocaleTimeString();
  return `${time} on the ${date}`;
};

export async function connectToMetaMask() {
  // First, check if MetaMask is installed
  if (typeof window.ethereum === "undefined") {
    throw new Error("Please install MetaMask to use this dApp!");
  }

  // Request account access if needed
  // await window.ethereum.request({ method: 'eth_requestAccounts' });
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  // Initialize the ethers provider with MetaMask
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  // Get the user's selected address
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  // Get the current network ID (also known as the chain ID)
  const network = await provider.getNetwork();
  const chain = network.chainId;

  // Get the connected wallet's address
  // const connectedAccount = accounts[0];

  // Get the balance of the connected wallet's address
  const balance = await provider.getBalance(address);

  // Return the balance in Ether
  const formattedBalance = ethers.utils.formatEther(balance);

  // REFACTOR so that this function doesn't have the useState. Then is can be decoupled.
  // You call the function and return the isConnected variable
  const isConnected = window.ethereum.isConnected();

  // Return the provider, signer, and address
  return { provider, signer, address, chain, formattedBalance, isConnected };
}
