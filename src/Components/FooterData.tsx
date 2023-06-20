import React from 'react'
import { Link } from "react-router-dom";
import {
  Button,
} from '@mantine/core';

const FooterData = () => {
  return (
    <Button component={Link} variant="link" to="/Contact">Contact</Button>
  )
}

export default FooterData