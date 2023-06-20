//@ts-nocheck
import React from 'react';
import { Flex, Text, Card, Stack, Button} from '@mantine/core';


const MarketChainInfo = ({ userAddress, chainID, accountBalance}) => {
    return (
      <Card withBorder shadow='sm'>
      <Stack direction="column" justify='space-evenly'>
        <Text>Connected Wallet Address: {userAddress}</Text>
        <Text>Wallet Balance: {accountBalance} Eth</Text>
        <Text> Chain ID: {chainID}</Text>
      </Stack>
  </Card>
    )
  }

export default MarketChainInfo