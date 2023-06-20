import { Button, Flex } from '@mantine/core';
import { Link } from "react-router-dom";


const NavbarData = () => {
  return (

  <Flex direction="column" wrap="wrap" justify="Flex-start" gap="md">
      <Button component={Link} variant="link" to="/ChatDapp" compact >ChatNFT</Button>
      <Button component={Link} variant="link" to="/Govern" compact>GovernanceDAO</Button>
      <Button component={Link} variant="link" to="/ToDo" compact>ToDo</Button>
      <Button component={Link} variant="link" to="/Market" compact>NFT Marketplace</Button>
  </Flex>
    
  )
}

export default NavbarData