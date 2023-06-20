//@ts-nocheck
import { useEffect, useState } from "react";
import DappChainInfo from "../../Components/DappChainInfo";
import DappShell from "../../Components/DappShell";
import DappMain from "../../Components/DappMain";
import DappTitle from "../../Components/DappTitle";
import ChatDappMain from "./ChatDappMain";
import ChatChainInfo from "./ChatChainInfo";
import ABI from '../../ABIs/ChatNFT.json';
import { Text, Space } from "@mantine/core";
import { convertToObjectNumber, connectToMetaMask } from  '../../helpers';

const ethers = require("ethers");
const { BigNumber } = require('ethers');

// const contractAddress = process.env.CHAT_CONTRACT_ADDRESS;
// const contractABI = JSON.parse(process.env.CONTRACT_ABI);

// make connection to wallet and blockchain at top of app
// pass down details to each view
// import helper functions

function ChatDapp() {

  const [provider, setProvider] = useState('');
  const [signer, setSigner] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [chainID, setChainId] = useState('');
  const [connected, setConnected] = useState(false);
  const [accountBalance, setAccountBalace] = useState('');
  const [nftID, setnftID] = useState('');

    //*** CONSTANTS ***\\
    // This can be the deployed contract on hardhat or through remix
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3" 

  useEffect(() => {

    // Boilerplate setup
    // Connect to metamask, take the chain details
    connectToMetaMask()
    .then(({ provider, signer, address, chain, formattedBalance, isConnected}) => {
      console.log('Connected to MetaMask!');

      console.log('Provider:', provider);
      setProvider(provider);

      console.log('Signer:', signer);
      setSigner(signer);

      console.log('Address:', address);
      setUserAddress(address);

      console.log('Chain ID', chain);
      setChainId(chain);

      console.log('Account Balance', formattedBalance);
      setAccountBalace(formattedBalance);

      console.log('App is connected to MetaMask:', isConnected);
      setConnected(isConnected);
    })
    .catch((error) => {
      console.error(error);
    });

    // connect to contract, take details
    connectToContract()
    .then(({ convertedNFTID }) => {
      console.log("ChatNFT ID:", convertedNFTID)
      setnftID(convertedNFTID);
    })
  }, []);
 
  async function connectToContract(){

    // Initialize the ethers provider with MetaMask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
  
    // Get the user's selected address
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    
    // REFACTOR - is the nftID the same as the balanceof? 
    const contract = new ethers.Contract(contractAddress, ABI, signer);
    const nftID = await contract.balanceOf(address);
    const convertedNFTID = convertToObjectNumber(nftID);
    return { convertedNFTID }
  }
  
  async function mintNFTToCurrentAddress() {
    // Initialize the ethers provider with MetaMask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    // Get the user's selected address
    // REFACTOR for function that connects to metamask, returns signer, price, contract as variables
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    
    const contract = new ethers.Contract(contractAddress, ABI, signer);
    
    const price = await contract.price()

    // REFACTOR 
    // const getActiveMetaAccountDetails = (contractAddress, ABI) => {
      
    //   const signer = provider.getSigner();
    //   const address = await signer.getAddress();
      
    //   const contract = new ethers.Contract(contractAddress, ABI, signer);
    //   return {signer, address, contract}
    // }

    // async getActiveMetaAccountDetails = 

    console.log(price)
    const mintNFT = await contract.safeMint({ value: price })
  }

  return (

    <DappShell>

      <DappTitle DappTitle="Chat dApp"/>

      <DappChainInfo>
        {
          connected ? (
          <ChatChainInfo userAddress={userAddress} contractAddress={contractAddress} chainID={chainID} accountBalance={accountBalance} nftID={nftID} mintNFTToCurrentAddress={mintNFTToCurrentAddress} />
          ) : (
            <Text>Waiting for Metamask connection...</Text>
          )
        }
       
      </DappChainInfo>

      <Space />
      
      <DappMain>
        <ChatDappMain nftID={nftID} ABI={ABI}/>
      </DappMain>

    </DappShell>

  );
}

export default ChatDapp;
