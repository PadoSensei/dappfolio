//@ts-nocheck
import React from 'react'
import { Flex,Card, Text, Button, Stack } from '@mantine/core'

const GovernChainInfo = ({userAddress, chainID, accountBalance}) => {
    return (
      <Flex direction="column" justify='space-evenly'>
        <Text>Connected Wallet Address: {userAddress}</Text>
        <Text>Wallet Balance: {accountBalance} Eth</Text>
        <Text> Chain ID: {chainID}</Text>
      </Flex>
    )
  }

export default GovernChainInfo