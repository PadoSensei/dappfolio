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
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme,
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

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


// Ethers web3 
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

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme', 
    defaultValue: 'light',
  });

  const toggleColorScheme = (value?: ColorScheme) =>
  setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+j', () => toggleColorScheme()]])

  return (
    <Router>      
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme ={{colorScheme}}>

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
      </MantineProvider>
      </ColorSchemeProvider>
    </Router>

  );
}

export default App;
