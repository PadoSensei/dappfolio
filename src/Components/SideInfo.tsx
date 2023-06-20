// @ts-nocheck
import { Center, Container, Flex } from '@mantine/core';
import React from 'react';

const SideInfo = (props: any) => {
    
  return (
    <Center>
        <Container>
            <Flex>
                <Container>
                    {props.data}
                </Container>
            </Flex>
        </Container>
    </Center>
  )
}

export default SideInfo