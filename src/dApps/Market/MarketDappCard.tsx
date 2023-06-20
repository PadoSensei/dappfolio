//@ts-nocheck
import React from 'react'
import { Card, Image, Text, Badge, Button, Group, Avatar, Flex } from '@mantine/core';
const MarketDappCard = ({ nftImageAlt, nftDescription, nftImage, nftTitle, nftAvailable }) => {

    return (
      <>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src={nftImage}
              height={160}
              // width={250}
              alt={nftImageAlt}
            />
          </Card.Section>
    
          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{nftTitle}</Text>
            <Badge color="pink" variant="light">
              {nftAvailable ? 'Available' : 'You Already Have This NFT'}
            </Badge>
          </Group>
    
          <Text size="sm" color="dimmed">
           {nftDescription}
          </Text>
    
          <Flex direction='column' justify='space-around' display={nftAvailable} className='BuyBox'>
          
            {/* <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              Buy Now!
            </Button> */}

            <Flex>
              <Avatar
                // onClick={props.payInUSDC}
                className="buyIcon"
                src="https://imgur.com/MQHRBrg.png"
                alt="USDC logo"
                ></Avatar>
            </Flex>

              {/* USDT logo */}
              <Flex justify='space-between'>

              <Avatar
                // onClick={props.payInUSDT}
                className="buyIcon"
                src="https://imgur.com/wndKTZS.png"
                alt="USDT logo"
                ></Avatar>
                    <p className="card__price text__price price__top">
                      stablecoinPrice
                    </p>
              </Flex>


              {/* ETH logo */}
              <Flex justify='space-between'>
                <Avatar
                  // onClick={props.payInETH}
                  className="buyIcon"
                  src="https://imgur.com/sQsv7UD.png"
                  alt="ETH logo"
                  ></Avatar>
                    <div>
                      <p className="card__price text__price price__bottom">
                        ethPrice
                      </p>
                    </div>
              </Flex>
          </Flex>
        </Card>
        </>
      );
}

export default MarketDappCard

{/* <div className="card">
      <div className="card__image-container">
        <img src={props.imageURL} width="400" />
      </div>
      <div className="card__content">
        <p className="card__title text--medium">{props.name}</p>
        <div className="card__info">
          <p className="text--medium">{props.description} </p>
        </div>
        <div>
          {
            props.stablecoinPrice === null ? (
              <div>
                <p>ERROR: itemPrice failed to load</p>
              </div>
            ) : (
              // : props.bought === false ?
              <div>
                <div>
                  {/* USDC logo */}
                  
            // )
            // : <p>User already bought</p>
    //       }
    //     </div>
    //   </div>
    // </div> */}