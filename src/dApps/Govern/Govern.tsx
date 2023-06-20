//@ts-nocheck
// Copy over with dropbox
// Run through the videos at work
import React from "react";
// import { ethers } from "ethers";
import DappChainInfo from "../../Components/DappChainInfo";
import DappShell from "../../Components/DappShell";
import DappMain from "../../Components/DappMain";
import DappTitle from "../../Components/DappTitle";
import GovernChainInfo from "./GovernChainInfo";
import GovernDappMain from "./GovernDappMain";

import { useState, useEffect } from "react";
// import ABI from "../Contracts/GovernABI.json";
import ProposalCard from "./GovernProposalCard";
import SubmissionCard from "./GovernSubmissionCard";

const ethers = require("ethers");

function Govern(props) {
  //*** CONSTANTS ***\\
  const contractAddress = "0xffF8b2eE3B23A682319B1Aef44c02c9E90BAC1F6";
  // //*** STATE VARIABLES ***\\
  // const [userAddress, setUserAddress] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [propsPerPage, setPropsPerPage] = useState(5);
  const [availableETH, setAvailableETH] = useState(null);
  const [quorum, setQuorum] = useState(null);
  const [totalProposals, setTotalProposals] = useState(0);

  const [provider, setProvider] = useState('');
  const [signer, setSigner] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [chainID, setChainId] = useState('');
  const [connected, setConnected] = useState(false);
  const [accountBalance, setAccountBalace] = useState('');
  const [nftID, setnftID] = useState('');


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
    }).catch((error) => {
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
    
  
    // Return the provider, signer, and address
    return { provider, signer, address, chain, formattedBalance, isConnected };
  }


  //*** GETTER FUNCTIONS ***\\
  const getAllProposals = async () => {
    console.log("HP GAP: Running getAllProposals");
    console.log("HP GAP: Calling getContract");
    const contract = await connectContract();
    const totalProposals = await getTotalProposals(contract);
    setTotalProposals(totalProposals);
    const firstID = totalProposals - 1 - (pageNumber - 1) * propsPerPage;
    let lastID = totalProposals - pageNumber * propsPerPage;
    if (lastID < 0) lastID = 0;
    if (proposals[0] == firstID) return;
    console.log("HP GAP: pageNumber = ", pageNumber);
    console.log("HP GAP: propsPerPage = ", propsPerPage);
    console.log("HP GAP: totalProposals - 1 = ", totalProposals - 1);
    setProposals([]);
    for (let i = firstID; i >= lastID; i--) {
      console.log("HP GAP: Calling getProposal", i, ", contract)");
      const proposal = await getProposal(i, contract);
      setProposals((allProposals) => [...allProposals, proposal]);
    }
  };
  // const getTotalPages = async(totalProposals) => {
  //     console.log("HP GTP: Running getTotalPages")
  //     const totalPages = Math.ceil((totalProposals - 1) / propsPerPage);
  //     console.log("HP GTP: totalPages = ", totalPages);
  //     return totalPages;
  // }
  // Use to begin array loop from most recent proposals first
  // function getTotalProposals() external view returns(uint256 totalProposals);
  const getTotalProposals = async () => {
    console.log("HP GTP: Running getTotalProposals");
    const contract = await connectContract();
    console.log("HP GTP: Calling getTotalProposals");
    const proposalCount = (await contract.getTotalProposals()).toNumber();
    console.log(proposalCount);
    return proposalCount;
  };
  // This will return each Proposal with its dynamically calculated state
  // function getProposal(uint256 propID) external view returns(ProposalData memory proposal);
  // (contract = null) is an optional variable, which we introduce here to reduce the number
  // of steps required for this function to return a Proposal. Since getAllProposals already
  // runs connectContract, it is unnecessary and inefficient to call it again for every
  // Proposal we retrieve from the contract.
  const getProposal = async (propID, contract = null) => {
    console.log("HP GP: Running getProposal");
    if (contract === null) {
      contract = await connectContract();
    }
    console.log(
      "HP GP: Calling getMemberHasVoted(",
      userAddress,
      ", ",
      propID,
      ")"
    );
    const memberHasVoted = await getMemberHasVoted(userAddress, propID);
    console.log("HP GP: Calling getProposal(", propID, ")");
    let proposal = await contract.getProposal(propID);
    console.log(proposal);
    proposal = formatProposal(proposal, propID, memberHasVoted);
    return proposal;
  };
  // Returns seconds left on Propose stage, may or may not be useful
  // function getReviewTimeRemaining(uint256 propID) external view returns(uint256 timeRemaining);
  const getReviewTimeRemaining = async (propID) => {
    console.log("HP GRTR: Running getReviewTimeRemaining");
    const contract = await connectContract();
    console.log("HP GRTR: Calling getReviewTimeRemaining");
    const reviewTimeRemaining = (
      await contract.getReviewTimeRemaining(propID)
    ).toNumber();
    console.log(reviewTimeRemaining);
    return reviewTimeRemaining;
  };
  // Returns seconds left on Vote stage, may or may not be useful
  // function getVoteTimeRemaining(uint256 propID) external view returns(uint256 timeRemaining);
  const getVoteTimeRemaining = async (propID) => {
    console.log("HP GVTR: Running getVoteTimeRemaining");
    const contract = await connectContract();
    console.log("HP GVTR: Calling getVoteTimeRemaining");
    const voteTimeRemaining = (
      await contract.getVoteTimeRemaining(propID)
    ).toNumber();
    console.log(voteTimeRemaining);
    return voteTimeRemaining;
  };
  // Gets the quorum threshold
  // function getQuorum() external view returns(uint256);
  const getQuorum = async () => {
    console.log("HP GQ: Running getQuorum");
    const contract = await connectContract();
    console.log("HP GQ: Calling getQuorum");
    const quorum = (await contract.getQuorum()).toNumber();
    console.log(quorum);
    setQuorum(quorum);
    return quorum;
  };
  // Gets the current grant amount
  // function getGrantAmount() external view returns(uint256);
  const getGrantAmount = async () => {
    console.log("HP GGA: Running getGrantAmount");
    const contract = await connectContract();
    console.log("HP GGA: Calling getGrantAmount");
    const grantAmount = ethers.utils.formatEther(
      await contract.getGrantAmount()
    );
    console.log(grantAmount);
    return grantAmount;
  };
  // Gets the amount of ETH available for new proposals
  // function availableETH() external view returns(uint256);
  const getAvailableETH = async () => {
    console.log("HP GAETH: Running availableETH");
    const contract = await connectContract();
    console.log("HP GAETH: Calling availableETH");
    const availableETH = ethers.utils.formatEther(
      await contract.availableETH()
    );
    console.log(availableETH);
    setAvailableETH(availableETH);
    return availableETH;
  };
  // Returns true if the member has already voted on a Proposal
  // function memberHasVoted(address account, uint256 propID) external view returns(bool);
  const getMemberHasVoted = async (address, propID) => {
    console.log("HP MHV: Running memberHasVoted");
    const contract = await connectContract();
    console.log("HP MHV: Calling memberHasVoted(", address, propID, ")");
    const memberHasVoted = await contract.memberHasVoted(address, propID);
    console.log("HP MHV: memberHasVoted: ", memberHasVoted);
    return memberHasVoted;
  };
  // //*** CONTRACT CONNECTION ***\\
  const connectContract = async () => {
    console.log("HP CC: Running connectContract");
    console.log("HP CC: Getting provider");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider);
    console.log("HP CC: Getting signer");
    const signer = provider.getSigner();
    console.log(signer);
    console.log("HP CC: Getting contract");
    const contract = new ethers.Contract(contractAddress, signer); // ABI Required
    console.log(contract);
    return contract;
  };
  const connectWallet = async () => {
    console.log("HP CW: Running connectWallet");
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("HP CW: Wallet detected");
      console.log("HP CW: Getting provider:");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider);
      console.log("HP CW: Requesting accounts");
      const accounts = await provider.send("eth_requestAccounts");
      console.log(accounts);
      console.log("HP CW: Getting signer:");
      const signer = provider.getSigner();
      console.log(signer);
      console.log("HP CW: Getting userAddress");
      const address = await signer.getAddress();
      console.log(address);
      console.log("HP CW: Setting userAddress");
      setUserAddress(address);
      return address;
    }
  };
  const loadStateVariables = async () => {
    console.log("HP LSV: Running loadStateVariables");
    await getQuorum();
    await getAvailableETH();
    await getAllProposals();
  };
  //*** HELPER FUNCTIONS ***\\
  // const formatProposal = (proposal, propID, memberHasVoted) => {
  const formatProposal = (proposal, propID, memberHasVoted) => {
    // const formatProposal = (proposal, propID, memberHasVoted) => {
    console.log("HP FP: Running formatProposal");
    proposal = {
      proposalID: propID, // Number
      memberHasVoted: memberHasVoted, // Bool
      voteBegins: formatTimestamp(proposal.voteBegins), // Date
      voteEnds: formatTimestamp(proposal.voteEnds), // Date
      votesFor: proposal.votesFor.toNumber(), // Number
      votesAgainst: proposal.votesAgainst.toNumber(), // Number
      memberVoteCount: proposal.memberVoteCount.toNumber(), // Number
      propState: formatPropState(proposal.propState), // Enum
      propType: formatPropType(proposal.propType), // Enum
      recipient: proposal.recipient, // String
      ethGrant: ethers.utils.formatEther(proposal.ethGrant), // ETH Amount
      newETHGrant: ethers.utils.formatEther(proposal.newETHGrant), // ETH Amount
      description: proposal.description, // String
      voteFor: async function () {
        voteFor(propID);
      },
      voteAgainst: async function () {
        voteAgainst(propID);
      },
      execut: async function () {
        execute(propID);
      },
    };
    console.log(proposal);
    return proposal;
  };
  // Converts a block timestamp into DD-MM-YYY HH:MM format
  const formatTimestamp = (timestamp) => {
    console.log("HP FT: Running formatTimestamp");
    const date = new Date(timestamp * 1000);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    timestamp = `${day}-${month}-${year} ${hours}:${minutes}`;
    // For people who use MM-DD-YYYY dates:
    // timestamp = `${month}-${day}-${year} ${hours}:${minutes}`;
    console.log(timestamp);
    return timestamp;
  };
  // Converts a ProposalState enum ID into a human-readable string name
  const formatPropState = (propState) => {
    propState =
      propState == 0
        ? "Unassigned"
        : propState == 1
        ? "Pending"
        : propState == 2
        ? "Active"
        : propState == 3
        ? "Queued"
        : propState == 4
        ? "Defeated"
        : propState == 5
        ? "Succeeded"
        : propState == 6
        ? "Expired"
        : "ERROR: Invalid Proposal State";
    return propState;
  };
  // Converts a ProposalType enum ID into a human-readable string name
  const formatPropType = (propType) => {
    propType =
      propType == 0
        ? "Issue Grant"
        : propType == 1
        ? "Modify Grant Size"
        : "ERROR: Invalid Proposal Type";
    return propType;
  };
  //*** SETTER FUNCTIONS ***\\
  // function submitNewGrant(address recipient, string memory description) external;
  const submitNewGrant = async () => {
    console.log("HP SNG: Running submitNewGrant");
    const contract = await connectContract();
    const receipt = await contract.submitNewGrant(grantRecipient, description);
    const transaction = await receipt.wait();
    if (transaction.confirmations > 0) {
      loadStateVariables();
    }
  };
  // function submitNewAmountChange(uint256 newGrantAmount, string memory description) external;
  const submitNewGrantAmount = async () => {
    console.log("HP SNAC: Running submitNewAmountChange");
    const contract = await connectContract();
    const receipt = await contract.submitNewAmountChange(
      newGrantAmount,
      description
    );
    const transaction = await receipt.wait();
    if (transaction.confirmations > 0) {
      loadStateVariables();
    }
  };
  // function voteFor(uint256 propID) external;
  const voteFor = async (propID) => {
    console.log("HP VF: Running voteFor");
    const contract = await connectContract();
    const receipt = await contract.voteFor(propID);
    const transaction = await receipt.wait();
    if (transaction.confirmations > 0) {
      loadStateVariables();
    }
  };
  // function voteAgainst(uint256 propID) external;
  const voteAgainst = async (propID) => {
    console.log("HP VA: Running voteAgainst");
    const contract = await connectContract();
    const receipt = await contract.voteAgainst(propID);
    const transaction = await receipt.wait();
    if (transaction.confirmations > 0) {
      loadStateVariables();
    }
  };
  // function execute(uint256 propID) external;
  const execute = async (propID) => {
    console.log("HP E: Running execute");
    const contract = await connectContract();
    const receipt = await contract.execute(propID);
    const transaction = await receipt.wait();
    if (transaction.confirmations > 0) {
      loadStateVariables();
    }
  };
  //*** UI FUNCTIONS ***\\
  // You can build these functions instead if my method isn't intuitive for you
  const nextPage = () => {
    setPageNumber(pageNumber + 1);
  };
  const prevPage = () => {
    setPageNumber(pageNumber - 1);
  };
  // //*** EFFECTS ***\\
  useEffect(() => {
    console.log("HP Effect: pageNumber");
    console.log(pageNumber);
    if (userAddress !== null) {
      getAllProposals();
    }
  }, [pageNumber]);
  useEffect(() => {
    console.log("HP Effect: proposals updated");
    console.log(proposals);
  }, [proposals]);
  useEffect(() => {
    if (userAddress !== null) {
      loadStateVariables();
    }
  }, [userAddress]);
  useEffect(() => {
    window.ethereum.on("accountsChanged", (accounts) => {
      setUserAddress(accounts[0]);
    });
    connectWallet();
  }, []);
  useEffect(() => {
    connectWallet();
  }, []);


  const [selection, setSelection] = useState("");
  const [input, setInput] = useState("");
  const [grantRecipient, setGrantRecipient] = useState("");
  const [description, setDescription] = useState("");
  const [newGrantAmount, setGrantAmount] = useState(0);

  return (
    <DappShell>

      <DappTitle DappTitle="Governance dApp"/>

      <DappChainInfo>
        <GovernChainInfo userAddress={userAddress} chainID={chainID} accountBalance={accountBalance}/>
      </DappChainInfo>
      
      <DappMain>
        <GovernDappMain 
          selection={selection}
          setSelection={setSelection}
          proposals={proposals}
        />
      </DappMain>
    
    </DappShell>
    );
  }
  
  // <div>
  //   <div className="hero">
  //     {/* Next Page Button */}
  //     {pageNumber > 1 && (
  //       <button className="header-cta">
  //         <a href="#" onClick={prevPage}>
  //           Previous Page
  //         </a>
  //       </button>
  //     )}
  //     Available Funds: {availableETH} ETH
  //     {/* Previous Page Button */}
  //     {pageNumber * propsPerPage - 1 < totalProposals && (
  //       <button className="header-cta">
  //         <a href="#" onClick={nextPage}>
  //           Next Page
  //         </a>
  //       </button>
  //     )}
  //   </div>
  //   <div className="cardPresentation">
  //     {proposals.map((data) => {
  //       return <ProposalCard proposal={data} quorum={quorum} />;
  //     })}
  //   </div>
  //   <div className="SubmissionForm">
  //     <hr />
  //     <br />
  //     <p>Submit your proposals here!</p>
  //     <br />
  //     <select
  //       className="SubmissionMenu"
  //       value={selection} // CREATE THIS
  //       key="selection"
  //       onChange={(e) => setSelection(e.target.value)}
  //       name="submissionID"
  //       id="submissionID"
  //     >
  //       <option key="Default">Select Option</option>
  //       <option key="NewGrant" value="NewGrant">
  //         Propose New Grant
  //       </option>
  //       <option key="ModifyGrantSize" value="ModifyGrantSize">
  //         Propose New Grant Amount
  //       </option>
  //     </select>
  //     <br></br>
  //     <div className="NewSubmission">
  //       <SubmissionCard
  //         selection={selection}
  //         recipient={grantRecipient}
  //         description={description}
  //         grantAmount={newGrantAmount}
  //         setGrantAmount={(input) => setGrantAmount(input)}
  //         submitNewGrantAmount={async () => submitNewGrantAmount()}
  //         setGrantRecipient={(input) => setGrantRecipient(input)}
  //         submitNewGrant={async () => submitNewGrant()}
  //         setDescription={(input) => setDescription(input)}
  //       />
  //     </div>
  //   </div>
  // </div>
export default Govern;
