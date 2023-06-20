//@ts-nocheck
import React from "react";
// TODO Landing page around the market items
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import ABI from '../../ABIs/Market.json';
import MarketProductCard from './MarketProductCard';
import DappChainInfo from "../../Components/DappChainInfo";
import DappMain from "../../Components/DappMain";
import DappTitle from "../../Components/DappTitle";
import DappShell from "../../Components/DappShell";
import MarketChainInfo from "./MarketChainInfo";
import MarketDappMain from "./MarketDappMain";

function Marketplace(props) {

  const [provider, setProvider] = useState('');
  const [signer, setSigner] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [chainID, setChainId] = useState('');
  const [connected, setConnected] = useState(false);
  const [accountBalance, setAccountBalace] = useState('');
  const [nftID, setnftID] = useState('');

  const contractAddress = "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0";

  const usdcAddress = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e";
  const usdtAddress = "0x27D324cddb6782221c6d5E1DFAa9B2b0C6673184";

  const [bought, setBought] = useState(false);
  const [stablecoinPrice, setPrice] = useState(null);

  useEffect(() => {
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

      console.log('is Connected?', isConnected)
      setConnected(isConnected);
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

  // REFACTOR - LIFT OUT TO HELPER FILE
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
    
  
    // Return the provider, signer, and address
    return { provider, signer, address, chain, formattedBalance, isConnected };
  }


  const connectContract = (contractAddress, contractABI) => {
    console.log("HP CM: Running connectMarketplace");

    console.log("HP CM: Getting provider");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider);

    console.log("HP CM: Getting signer");
    const signer = provider.getSigner();
    console.log(signer);

    console.log("HP CM: Getting contract");
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    console.log(contract);

    return contract;
  };

  const connectUSDC = () => {
    console.log("HP CUSDC: Running connectUSDC");
    const contract = connectContract(usdcAddress, TokenABI);

    return contract;
  };

  const connectUSDT = () => {
    console.log("HP CUSDC: Running connectUSDC");
    const contract = connectContract(usdtAddress, TokenABI);

    return contract;
  };

  const connectMarketplace = () => {
    console.log("HP CUSDC: Running connectUSDC");
    const contract = connectContract(contractAddress, ABI);

    return contract;
  };

  const checkBought = async () => {
    const contract = connectMarketplace();

    const bought = await contract.alreadyBought(props.userAddress);

    setBought(bought);
    console.log(bought);
  };

  const payInETH = async () => {
    const contract = connectMarketplace();
    const balance = props.userBalance;

    const formattedBalance = ethers.utils.formatEther(balance);
    console.log(formattedBalance);

    const ethPrice = await contract.priceInETH();
    const formattedPrice = ethers.utils.formatEther(ethPrice);

    if (formattedBalance < formattedPrice) {
      alert("Insufficient ETH: " + formattedBalance + " < " + formattedPrice);
      return;
    }

    console.log("Calling Marketplace.payInETH{value: ", formattedPrice, "}");
    const receipt = await contract.payInETH({ value: ethPrice });

    const transaction = await receipt.wait();
    if (transaction.confirmations > 0) await checkBought();
  };

  const payInUSDC = async () => {
    const tokenContract = connectUSDC();
    const marketContract = connectMarketplace();

    const userUSDCBalance = (
      await tokenContract.balanceOf(props.userAddress)
    ).toNumber();
    const userUSDCAllowance = (
      await tokenContract.allowance(props.userAddress, contractAddress)
    ).toNumber();
    const stablecoinPrice = 0.1
    // const stablecoinPrice = (await marketContract.itemPrice()).toNumber();

    console.log("Market PIUSDC: userUSDCBalance:", userUSDCBalance);
    console.log("Market PIUSDC: userUSDCAllowance:", userUSDCAllowance);
    console.log("Market PIUSDC: stablecoinPrice:", stablecoinPrice);

    console.log("Market PIUSDC: Checking Balance:");
    if (userUSDCBalance < stablecoinPrice) {
      alert("Insufficient USDC: " + userUSDCBalance + " < " + stablecoinPrice);
      return;
    }

    console.log("Market PIUSDC: Checking Allowance:");
    if (userUSDCAllowance < stablecoinPrice) {
      console.log(
        "Market PIUSDC: Calling contract.approve(",
        contractAddress,
        stablecoinPrice,
        ")"
      );
      const receipt = await tokenContract.approve(
        contractAddress,
        stablecoinPrice
      );

      const transaction = await receipt.wait();
      if (transaction.confirmations > 0) {
        await payInUSDC();
        return;
      }
    }

    console.log("Market PIUSDC: Calling contract.payInUSDC");
    const receipt = await marketContract.payInUSDC();

    const transaction = await receipt.wait();
    if (transaction.confirmations > 0) await checkBought();
  };

  const payInUSDT = async () => {
    const tokenContract = connectUSDT();
    const marketContract = connectMarketplace();

    const userUSDTBalance = (
      await tokenContract.balanceOf(props.userAddress)
    ).toNumber();
    const userUSDTAllowance = (
      await tokenContract.allowance(props.userAddress, contractAddress)
    ).toNumber();
    // const stablecoinPrice = (await marketContract.itemPrice()).toNumber();
    const stablecoinPrice = 1

    console.log("Market PIUSDT: userUSDTBalance:", userUSDTBalance);
    console.log("Market PIUSDT: userUSDTAllowance:", userUSDTAllowance);
    console.log("Market PIUSDT: stablecoinPrice:", stablecoinPrice);

    console.log("Market PIUSDT: Checking Balance:");
    if (userUSDTBalance < stablecoinPrice) {
      alert("Insufficient USDT: " + userUSDTBalance + " < " + stablecoinPrice);
      return;
    }

    console.log("Market PIUSDT: Checking Allowance:");
    if (userUSDTAllowance < stablecoinPrice) {
      console.log(
        "Market PIUSDT: Calling contract.approve(",
        contractAddress,
        stablecoinPrice,
        ")"
      );
      const receipt = await tokenContract.approve(
        contractAddress,
        stablecoinPrice
      );

      const transaction = await receipt.wait();
      if (transaction.confirmations > 0) {
        await payInUSDT();
        return;
      }
    }

    console.log("Market PIUSDT: Calling contract.payInUSDT");
    const receipt = await marketContract.payInUSDT();

    const transaction = await receipt.wait();
    if (transaction.confirmations > 0) await checkBought();
  };

  const [ethPrice, setETHPrice] = useState(null);

  const getPrices = async () => {
    console.log("Market GP: Running getPrices");
    const contract = connectMarketplace();

    console.log("Market GP: Calling contract.itemPrice:");
    const stablecoinPrice = 1
    const formattedStablecoinPrice =
      "$" + (stablecoinPrice / 10 ** 6).toFixed(2);
    console.log(formattedStablecoinPrice);

    console.log("Market GP: Calling contract.getETHPrice:");
    const ethPrice = ethers.utils.formatEther(await contract.priceInETH());
    const formattedETHPrice = parseFloat(ethPrice).toFixed(7) + " ETH";
    console.log(formattedETHPrice);

    setPrice(formattedStablecoinPrice);
    setETHPrice(formattedETHPrice);
  };

  useEffect(() => {
    getPrices();
    checkBought();
  }, []);

  return (

    <DappShell>

    <DappTitle DappTitle="MarketPlace dApp"/>

    <DappChainInfo>
      <MarketChainInfo userAddress={userAddress} chainID={chainID} accountBalance={accountBalance} />
    </DappChainInfo>
    
    <DappMain>
      <MarketDappMain />
    </DappMain>
    
    </DappShell>
    // <div>
    //   <main>
    //     <section className="cards">
    //       <MarketProductCard
    //         // name="Alien City"
    //         // imageURL={AlienCityImg}
    //         description="A beautiful AI-generated image"
    //         stablecoinPrice={stablecoinPrice}
    //         ethPrice={ethPrice}
    //         bought={bought}
    //         payInETH={async () => payInETH()}
    //         payInUSDC={async () => payInUSDC()}
    //         payInUSDT={async () => payInUSDT()}
    //       />

    //       <MarketProductCard
    //         // name="Cyberpunk City"
    //         // imageURL={CyberpunkCityImg}
    //         description="A beautiful AI-generated image"
    //         stablecoinPrice={stablecoinPrice}
    //         ethPrice={ethPrice}
    //         bought={bought}
    //         payInETH={async () => payInETH()}
    //         payInUSDC={async () => payInUSDC()}
    //         payInUSDT={async () => payInUSDT()}
    //       />
    //     </section>
    //   </main>
    // </div>
  );
}

export default Marketplace;
