//@ts-nocheck
import { Avatar, Blockquote, Card, Flex, Text } from '@mantine/core'
import React from 'react'

const ChatDappCard = ({id, senderAddress, timeStamp, message }) => {

  // shape of the message
  // REFACTOR - typescript interface
//   struct message {
//     uint256 ID;
//     address sender;
//     uint256 nftID;
//     string sentMessage;
//     uint256 timestamp;
// }

  return (
    <Card withBorder shadow='sm'>
      <Flex direction='row'>
        <div className="mainWrap">
          <div className="bubbleInfo">
              <Text>Sent at: {timeStamp}</Text>
          </div>


          <Blockquote cite={senderAddress}>
            {message}
          </Blockquote>
        
        </div>
      </Flex>
    </Card>
  )
}

export default ChatDappCard