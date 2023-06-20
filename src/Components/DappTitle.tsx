//@ts-nocheck
import { Center, Container, Title } from '@mantine/core'
import React from 'react'

const DappTitle = ({DappTitle}) => {
  return (
    <Center>
        <Container>
          <Title order={2}>
            {DappTitle}
          </Title>
        </Container>

    </Center>
  )
}

export default DappTitle