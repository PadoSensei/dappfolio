//@ts-nocheck
import { Container, Flex } from '@mantine/core';
import React from 'react';
import MarketDappCard from './MarketDappCard';
import MarketProductCard from './MarketProductCard';

const MarketDappMain = () => {
  const dummyImage = 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
  const dummyTitle = 'NFT Title Goes Here'
  const dummyAvailable = true
  const dummyDescription = 'The NFT on sale will be described here'
  const dummyNFTAltImage = 'The alt for the posted nft'
  
 
        const bjjClasses = [
          
          {
            imageURL: 'https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            title: "Armbars",
            description: "Master the art of submitting your opponent with armbars.",
            available: true,
            imageAlt: "Armbars technique demonstration"
          },
          {
            imageURL:'https://conceptjiujitsu.com.au/wp-content/uploads/shes-got-him-right-where-she-wants-him-cropped-shot-two-young-martial-artists-practicing-jiu-jitsu-gym.jpg',
            title: "Back Attacks",
            description: "Learn how to take your opponent's back and submit them.",
            available: false,
            imageAlt: "Back attacks technique demonstration"
          },
          {
            imageURL: "https://images.unsplash.com/photo-1677170202299-d2edadfa76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'",
            title: "Guard Passing",
            description: "Develop a strong guard passing game to dominate your opponents.",
            available: true,
            imageAlt:"Guard passing technique demonstration"
          },
          {
            imageURL:'https://cdn.evolve-mma.com/wp-content/uploads/2022/11/BJJ-beginners-guide.jpg',
            title: "Knee On Belly",
            description: "Learn how to maintain control and apply submissions from knee-on-belly.",
            available: true,
            imageAlt:"Knee-on-belly technique demonstration"
          }
          // add more products as needed
        ];

  return (
    <Flex gap='sm'>
        {/* <MarketDappCard dummyNFTAltImage={dummyNFTAltImage} nftDescription={dummyDescription} nftAvailable={dummyAvailable} nftTitle={dummyTitle} nftImage={armbarImage}/>
        <MarketDappCard nftDescription={dummyDescription} nftAvailable={dummyAvailable} nftTitle={dummyTitle} nftImage={kneeOnBellyImage} />
        <MarketDappCard dummyNFTAltImage={dummyNFTAltImage} nftDescription={dummyDescription} nftAvailable={dummyAvailable} nftTitle={dummyTitle} nftImage={bowAndArrowImage}/>
        <MarketDappCard nftDescription={dummyDescription} nftAvailable={dummyAvailable} nftTitle={dummyTitle} nftImage={guardPassImage} /> */}

      {

        bjjClasses.map(({ id, imageURL, title, available, imageAlt, description }) => {
          return (
            <MarketDappCard
            key={id}
            dummyNFTAltImage={imageAlt}
            nftDescription={description}
            nftAvailable={available}
            nftTitle={title}
            nftImage={imageURL}
            />
          )
      })
    }
  
    </Flex>   
    
  )
}

export default MarketDappMain