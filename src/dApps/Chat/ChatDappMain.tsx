//@ts-nocheck
import { useState, useEffect } from 'react';
import { Button, Flex, Textarea, Text, Select, Space} from '@mantine/core'
import ChatDappCard from './ChatDappCard';
import { connectToRPC, convertToObjectNumber, humanTime, convertMessage } from '../../helpers';

// Hardhat deloyment
const ethers = require("ethers");
const { BigNumber } = require('ethers');

const ChatDappMain = ({ ABI, nftID }) => {
  const [sendMessage, setSendMessage] = useState('');
  const [chainMessages, setChainMessages] = useState([]);

  // it seems this can't be passed down to the contract and has to be declared here?
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  
  useEffect(() => {
    getAllMessages();
  }, []);
  
  const handleClickSend = () => {
    console.log(sendMessage)
    // REFACTOR needs to be chain NFT?
    addMessageToChain(sendMessage, 0)
  }

  const getTotaNumberOflMessages = async () => {
    const { provider, signer, contract } = await connectToRPC(contractAddress, ABI);
    
    const totalMessages = await contract.totalMessages();
    console.log(totalMessages)

  }
  
  const getAllMessages = async () => {
    const { provider, signer, contract } = await connectToRPC(contractAddress, ABI);

    const totalNumberOfMessages = await contract.totalMessages();
    
    setChainMessages([])
    

    for(var i = 0; i < totalNumberOfMessages; i++) {
      const currentMessage = await contract.getMessage(i);
      console.log(currentMessage)
      const convertedMessage = convertMessage(currentMessage)
      setChainMessages(prevMessage => [...prevMessage, convertedMessage])
    }
  }

  const addMessageToChain = async (message, nftID) => {
    const { provider, signer, contract } = await connectToRPC(contractAddress, ABI);

    const sentMessage = await contract.addMessage(message, nftID);
   
  }

 
    // const dummyData = [
    //     {
    //       id: 1,
    //       text: "yo",
    //       timestamp: "Oct 20, 2022 8:12PM",
    //       image:
    //         "https://yt3.ggpht.com/ytc/AMLnZu-2DrkobCQd6ri63wO9SuMFGyTbyMhD5kQ6Up2N=s900-c-k-c0x00ffffff-no-rj",
    //     },
    //     {
    //       id: 2,
    //       text: "Hello",
    //       timestamp: "Oct 21, 2022 9:12PM",
    //       image:
    //         "https://yt3.ggpht.com/ytc/AMLnZu-2DrkobCQd6ri63wO9SuMFGyTbyMhD5kQ6Up2N=s900-c-k-c0x00ffffff-no-rj",
    //     },
    //     {
    //       id: 3,
    //       text: "howdy",
    //       timestamp: "Oct 9, 2022 8:12PM",
    //       image:
    //         "https://yt3.ggpht.com/ytc/AMLnZu-2DrkobCQd6ri63wO9SuMFGyTbyMhD5kQ6Up2N=s900-c-k-c0x00ffffff-no-rj",
    //     },
    //   ];


    // REFACTOR UI to have two imported components
  return (
    <>
        <Flex direction='column' justify={'space-between'} className="">

          { 
            nftID === 0 ? (
              <Text> You do not have the required NFT to send messages to the blockchain.</Text>
            ):(
              <>
              <Textarea
                  className="DescriptionBox"
                  value={sendMessage} 
                  onInput={e => setSendMessage(e.target.value)}
                  size="xl"
                  minRows={2}
                  maxRows={12}
                  placeholder="Type Your Message Here"
                  />

              <Button 
                onClick={handleClickSend} 
                className="buttonStyle sendButton">
                <a href="#">Send</a>
              </Button>
              </>

            )
          }
        </Flex>

        <Space h="md" />

        <Flex direction='column'>
{
          chainMessages.length > 0 ? (
          chainMessages.map(({ id, senderAddress, timeStamp, message }) => (
          <ChatDappCard
          key={id}
          timeStamp={humanTime(timeStamp)}
          senderAddress={senderAddress}
          message={message}
        />
        ))
          ) : (
         <p>There are no messages at this time</p>
          )
        }
        </Flex>

  </>
  )
}

export default ChatDappMain