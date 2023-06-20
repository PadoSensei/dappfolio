//@ts-nocheck
import { Flex, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import ABI from '../../ABIs/ToDo' ;
import { humanTime } from '../../helpers';
const ethers = require("ethers");

const ToDoCard = ({ id, done, name, completedTime }) => {
    const [checked, setChecked] = useState(done)
    const [isDisabled, setIsDisabled] = useState(done)

    const contractAddress = '0x0165878A594ca255338adfa4d48449f69242Eb8F'

    useEffect(() => {
        isCompleted();
      }, [isDisabled]);


    
    const alreadyDoneAlert = () => {
        alert('This task has already been completed and cannot be unchecked')
    }

    const toggle = async () => {
        setIsDisabled(!isDisabled);

        const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer);

        const completeTask = await contract.toggleTask(id);
        const receipt = await completeTask.wait();
        if (receipt.confirmations > 0) {
            setChecked(!checked);
            isCompleted()
        }
    }

    const isCompleted = () => {
        if (done) {
            return (
                <Text>
                    Completed at {humanTime(completedTime)}
                </Text>
            )
        } else {
            return (
                <Text>
                    Incomplete
                </Text>
            )
        }
    }

    const isDone = () => {
        if (done === true){
            return <input onChange={alreadyDoneAlert} type="checkbox" checked={checked}/>
        } else {
            return <input onClick={toggle} disabled={isDisabled} type="checkbox" />
        }
    }

    // const humanTime = (timestamp) =>{
    //     const dateObject = new Date(timestamp * 1000); // convert timestamp to milliseconds

    //     const date = dateObject.toLocaleDateString(); // get date in local time zone
    //     const time = dateObject.toLocaleTimeString()
    //     return `${time} on the ${date}`
    // }

  return (
    <Flex direction="row" justify="space-between" align="center" className='ToDoItem'>
        <Text>
             Task ID: {id} - {name}
        </Text>
       
        {isCompleted()}

        {isDone()}
    </Flex>
  )
}

export default ToDoCard;