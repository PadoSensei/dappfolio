//@ts-nocheck
import React from 'react'
import { Button, Flex, Center, Container } from '@mantine/core';

const DappShell = ({children}) => {
  return (
  
        <Flex direction="column" justify='space-between' >
          {children}
        </Flex>
  )
}

export default DappShell