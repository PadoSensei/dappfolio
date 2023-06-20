//@ts-nocheck
import React from 'react'
import { Button, Text, Stack, Card } from '@mantine/core'

const ChatChainInfo = ({ userAddress, chainID, accountBalance, nftID, mintNFTToCurrentAddress }) => {
    return (
      <Card withBorder shadow='sm'>
        <Stack direction="column" justify='space-evenly'>
          <Text>Connected Wallet Address: {userAddress}</Text>
          <Text>Wallet Balance: {accountBalance} Eth</Text>
          <Text> Chain ID: {chainID}</Text>
          {
            nftID === 0 ? (
              <>
                <Text>NFT ID: {nftID}</Text>
                <Button onClick={mintNFTToCurrentAddress}>Mint ChatNFT to this address</Button>
              </>
            ) : (
                <Text>NFT ID: {nftID}</Text>
            )
          }
        </Stack>

      </Card>
    )
  }

export default ChatChainInfo