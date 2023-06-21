//@ts-nocheck
import React from 'react'
import '../App.css';
import {
    Flex,
    Button,
    Group,
    Stack,
    Container,
    Grid
  } from '@mantine/core';

import { Link } from "react-router-dom";

import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import {
  useAccount,
  useConnect,
  // useDisconnect,
  // useEnsAvatar,
  // useEnsName,
} from 'wagmi'
import LightDarkButton from './LightDarkButton';


const HeaderData = () => {
  const { connect, connectors, error, isLoading, pendingConnector } =useConnect()
  const { address, connector, isConnected } = useAccount()

  return (
    <>
   
      <Flex direction={'row'}>
        {/* <Flex className="header-logo-container" direction={"row"} > */}
            <Button component={Link} variant="link" to="/">dAppfolio</Button>
        {/* </Flex> */}
      </Flex>

      <Flex className="header-button-container" direction={"row"} >
          <LightDarkButton />
          {/* <Button component={Link} variant="link" to="/Mint" compact>The Mint Button </Button> */}
          {/* <Button onClick={} compact>The Connect Button</Button>
          <Button onClick={}  compact>Message</Button> */}
         
        {/* <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </button> */}
          {/* {connectors.map((connector) => (
            <button
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
          >{connector.name}</button>
          ))}
    
            {isConnected ? (
              
              <div>Connected to {connector.name}</div>
            ) : (
              <p>no connection</p>
            )
            
          } */}
      </Flex>
    </>
  )
}

export default HeaderData