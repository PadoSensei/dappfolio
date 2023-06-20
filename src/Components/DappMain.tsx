//@ts-nocheck
import { Center, Container, Flex } from '@mantine/core'
import React from 'react'

const DappMain = ({children}) => {
  return (    
    <Flex direction="column">
        {children}
    </Flex>
  )
}

export default DappMain