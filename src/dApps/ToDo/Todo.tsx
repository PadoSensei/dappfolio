//@ts-nocheck
import { useState, useEffect } from 'react';
import { prepareWriteContract, writeContract } from '@wagmi/core'
import ToDoCard from './ToDoCard';
import { Button, Flex, Center, Container, Space} from '@mantine/core';
import SideInfo from '../../Components/SideInfo';
import DappTitle from '../../Components/DappTitle';
import DappChainInfo from '../../Components/DappChainInfo';
import ToDoChainInfo from './ToDoChainInfo';
import DappMain from '../../Components/DappMain';
import ToDoMain from './ToDoMain';
import DappShell from '../../Components/DappShell';

import { getContract, fetchEnsName } from '@wagmi/core';
import{ useConnect, useAccount, useContractRead,
  useDisconnect,
  useEnsAvatar,
  useEnsName, } from 'wagmi';

import ABI from '../../ABIs/ToDo' 
const ethers = require("ethers")

const Todo = () => {
  const { connect, connectors, error, pendingConnector } = useConnect();
  const { address, connector, isConnected } = useAccount();
  const [provider, setProvider] = useState('');
  const [signer, setSigner] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [chainID, setChainId] = useState('');
  const [connected, setConnected] = useState(false);
  const [accountBalance, setAccountBalace] = useState('');
  const [nftID, setnftID] = useState('');

  // TODO Contract
  const TODOContractAddress = '0x0165878A594ca255338adfa4d48449f69242Eb8F'

  const ToDoContract = getContract({
    address: TODOContractAddress,
    abi: ABI,
  })

  useEffect(() => {
    connectToMetaMask()
    .then(({ provider, signer, address, chain, formattedBalance}) => {
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
    })
    .catch((error) => {
      console.error(error);
    });

    // connectToContract()
    // .then(({ convertedNFTID }) => {
    //   console.log("ChatNFT ID:", convertedNFTID)
    //   setnftID(convertedNFTID);
    // })
  }, []);

    async function connectToMetaMask() {
      // First, check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        throw new Error('Please install MetaMask to use this dApp!');
      }
    
      // Request account access if needed
      // await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
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
  
      const isConnected = window.ethereum.isConnected();
      setConnected(isConnected);
    
      // Return the provider, signer, and address
      return { provider, signer, address, chain, formattedBalance };
    }

  return (
    <>
    <DappShell>

      <DappTitle DappTitle="ToDo dApp"/>

      <DappChainInfo>
        <ToDoChainInfo userAddress={userAddress} chainID={chainID} accountBalance={accountBalance} nftID={nftID} />
      </DappChainInfo>

      <Space />
      
      <DappMain>
        <ToDoMain ToDoContractAddress={TODOContractAddress} ABI={ABI} />
      </DappMain>

    </DappShell>

    <SideInfo data="testing" />
    </>
  )
}

export default Todo