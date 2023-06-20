//@ts-nocheck
import { Button, Container, Flex, Space } from '@mantine/core';
import { useState, useEffect, memo} from 'react';

import { connectToRPC, humanTime, convertMessage } from '../../helpers';

// import { connect, readContract, getContract, writeContract, prepareWriteContract } from '@wagmi/core';
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask'; 

import ToDoCard from './ToDoCard';
import { convertToObjectNumber } from '../../helpers';
const ethers = require("ethers");
const { BigNumber } = require('ethers');

const ToDoMain = ({ToDoOContractAddress, ABI}) => {
  
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTaskData();
  }, []);

  // ToDo Contract needs to be declared here. It seems it can't be passed

  const contractAddress = '0x0165878A594ca255338adfa4d48449f69242Eb8F'

  const addToChain = async () => {
    // const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
    // // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // const contract = new ethers.Contract('0x09635F643e140090A9A8Dcd712eD6285858ceBef', ABI, signer);

    const { provider, signer, contract } = await connectToRPC(contractAddress, ABI);
    
    console.log("Adding task to chain....")
    const createdTask = await contract.createTask(input)
    console.log(createdTask)
    
  }

  const getTotalTasks = async () => {
    // const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
    // // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // const contract = new ethers.Contract("0x09635F643e140090A9A8Dcd712eD6285858ceBef", ABI, signer);

    const { provider, signer, contract } = await connectToRPC(contractAddress, ABI);

    const totalTasks = await contract.totalTasks();
    // console.log(totalTasks)
    // console.log(Number(totalTasks))
    return (Number(totalTasks))
  }

  const setTaskToDone = async (indexOfTask) => {
   
    const { provider, signer, contract } = await connectToRPC(contractAddress, ABI);

    await contract.toggleTask(indexOfTask);
  }
    
  const getAllTasks = async () => {
    const { provider, signer, contract } = await connectToRPC(contractAddress, ABI);
    const allTasksTuple = await contract.getAllTasks();

    // convert tuple to mappableArray
    const mappableArray = Array.from(allTasksTuple);
    
    setTasks(mappableArray)
    console.log(mappableArray)
    console.log(allTasksTuple, 'data')
    console.log(tasks)
  }

  const getTaskData = async () => {
    const { provider, signer, contract } = await connectToRPC(contractAddress, ABI);

    const totalNumberOfTasks = await contract.totalTasks()
    
    setTasks([])
    
    for(var i = 0; i < totalNumberOfTasks; i++) {
      const currentTask = await contract.taskList(i);
      console.log(currentTask)
      const convertedTask = convertTaskData(currentTask)
      setTasks(prevTask => [...prevTask, convertedTask])
    }
  }

  const convertTaskData = (arr) => {
    const result = {};

    const idObject = arr[0];
    result.id = convertToObjectNumber(idObject)

    const timeStampObject = arr[3];
    result.completedTimeStamp = convertToObjectNumber(timeStampObject);
    
    result.isCompleted = arr[2];
    result.taskName = arr[1];
    console.log(result)
    return result
  }

  return (
    <Flex direction='column' gap="xl">
        <Flex direction="column" gap="xl">
        <input 
            value={input} 
            onInput={e => setInput(e.target.value)} 
            />
        <Button
         onClick={addToChain}
        >Add Task To Blockchain</Button>

        </Flex>
        <button onClick={getTaskData}>Update</button>
        <Flex direction="column" className='todoCard-container'>
        {
          tasks ? (
          tasks.map(({ id, taskName, completedTimeStamp, isCompleted }) => (
          <ToDoCard
          setTaskToDone={setTaskToDone}
          key={id}
          id={id}
          name={taskName}
          done={isCompleted}
          completedTime={completedTimeStamp}
        />
        ))
          ) : (
         <p>There are no tasks at this time</p>
          )
        }
        </Flex>
    </Flex>
  )
}

export default ToDoMain