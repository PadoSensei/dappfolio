//@ts-nocheck
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import { useState, useEffect } from "react";

// Wagmi
import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

// Mantine
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';

// Components
import Govern from "./dApps/Govern/Govern";
import NavbarData from "./Components/NavbarData";
import HeaderData from "./Components/HeaderData";
import ChatDapp from "./dApps/Chat/ChatDapp";
import WelcomeMessage from "./Components/WelcomeMessage";
import Todo from "./dApps/ToDo/Todo";
import Market from "./dApps/Market/Market";
import FooterData from "./Components/FooterData";
import Mint from './Components/Mint'
import SideInfo from "./Components/SideInfo";

const ethers = require("ethers")

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()],
)

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    // new CoinbaseWalletConnector({
    //   chains,
    //   options: {
    //     appName: 'wagmi',
    //   },
    // }),
    // new WalletConnectConnector({
    //   chains,
    //   options: {
    //     projectId: '...',
    //   },
    // }),
    // new InjectedConnector({
    //   chains,
    //   options: {
    //     name: 'Injected',
    //     shimDisconnect: true,
//   },
// }),
],
provider,
webSocketProvider,
})
function App() {

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <Router>      
      <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
            <NavbarData />
            
          </Navbar>
        }
        // aside={
        //   <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
        //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
        //       {/* <Text>dApp Information sidebar</Text> */}
        //       <SideInfo />
        //     </Aside>
        //   </MediaQuery>
        // }
        footer={
          <Footer height={60} p="md">
            <FooterData />
          </Footer>
        }
        header={
          <Header height={{ base: 50, md: 70 }} p="md">
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <HeaderData />
            </div>
          </Header>
        }
      >
     
     <WagmiConfig client={client}>

      <Routes>
        <Route
              path="/"
              element={<WelcomeMessage/>}
              // userAddress={userAddress}
              // connectWallet={async () => connectWallet()}
            />
        <Route
              path="/ChatDapp"
              element={<ChatDapp/>}
              // userAddress={userAddress}
              // connectWallet={async () => connectWallet()}
            />
        <Route
            path="/Govern"
            element={<Govern />}
            // userAddress={userAddress}
            // connectWallet={async () => connectWallet()}
          />
        <Route
            path="/ToDo"
            element={<Todo />}
            // userAddress={userAddress}
            // connectWallet={async () => connectWallet()}
          />
        <Route
            path="/Market"
            element={<Market />}
            // userAddress={userAddress}
            // connectWallet={async () => connectWallet()}
          />
        <Route
            path="/Contact"
            element={<FooterData />}
            // userAddress={userAddress}
            // connectWallet={async () => connectWallet()}
          />
        <Route
            path="/Mint"
            element={<Mint />}
            // userAddress={userAddress}
            // connectWallet={async () => connectWallet()}
          />
      </Routes>
        </WagmiConfig>
      </AppShell>
    </Router>

  );

  // const [userAddress, setUserAddress] = useState(null);

  // const connectWallet = async () => {
    //   console.log("Running Connect-Wallet");
    
    //   if (window.ethereum && window.ethereum.isMetamask) {
      //     const provider = new ethers.providers.Web3Provider(window.ethereum);
      //     console.log(provider);
  //     const accounts = await provider.send("eth_requestAccounts");
  //     console.log(accounts);
  //     const signer = provider.getSigner();
  //     console.log(signer);
  //     const address = await signer.getAddress();
  //     console.log(address);

  //     setUserAddress(address);
  //   }
  // };

  // const checkConnection = async () => {
  //   console.log("App CC: Running Check  Connection");
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const accounts = await provider.listAccounts();

  //   console.log("App CC: Accounts:", accounts);

  //   const signer = provider.getSigner();
  //   console.log("App CC Signer:", signer);

  //   try {
  //     const address = await signer.getAddress();
  //     console.log("App CC: Address", address);
  //   } catch {
  //     console.log("App CC: No connection found");
  //     accounts[0] = null;
  //   }
  // };

  // useEffect(() => {
  //   console.log("App Effect: user Address");
  //   console.log(userAddress);
  // }, [userAddress]);

//   return (
//     <div className="App">
//       <header>
//         <nav>
//           <div>
//             <h1>
//               <a href="#">Dappfolio </a>
//             </h1>
//           </div>
//           {/* REFACTOR */}
//           {/* userAddress */}
//           { 1!==1 ? (
//             <li className="nav-cta">
//               {/* <a onClick={connectWallet} href="#"> */}
//                 Connect
//               {/* </a> */}
//             </li>
//           ) : (
//             <ul>
//               <li className="dropdown">
//                 <a className="dropdown-menu" href="/">
//                   Choose a dApp
//                 </a>
//                 <div className="dropdown-content">
//                   <a href="./VotingApp">DAO Voting dApp</a>
//                   <br />
//                   <a href="./ChatApp">NFT Chat dApp</a>
//                   <br />
//                   {/* <a href="./VotingApp">DAO Voting App</a>
//                   <br />
//                   <a href="./VotingApp">DAO Voting App</a>
//                   <br /> */}
//                 </div>
//               </li>
//             </ul>
//           )}
//           <div className="logo">
//             <h1>
//               <a href="/"> Web3 Dappfolio</a>
//             </h1>
//           </div>
//         </nav>
//       </header>

      
//     </div>
//   );
}

export default App;
