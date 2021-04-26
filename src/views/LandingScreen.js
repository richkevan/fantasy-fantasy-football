import React from 'react';
import {  Heading, VStack, Text, Box, Center, Grid, Image, Flex, Spacer } from '@chakra-ui/core';
import Navbar from '../components/navigation/Navbar';
import Signup from '../components/auth/Signup'
import Login from '../components/auth/Login'
import GoogleRedirect  from '../components/auth/GoogleRedirect'
import castlePic from '../../src/assets/Images/FFFgif.gif'
const LandingScreen = () => {
  return (
    <>
      <Navbar />
      <Center>
      <VStack>
      <Box textAlign="center" padding="10px">
      <Heading>Welcome to Fantasty Fantasy Football!</Heading>
        <Text>
          You're about to enter a fantasy realm where teams battle for honor,
          reputation, and their survival! Watch this intense battle in the
          safety of your own home and avoid the risk of being incinerated by
          magical spells, transformed into a snake, or trampled by an undead
          horse.... Participate by supporting your favorite team, and betting on
          them to beat their rivals. Watch the season unfold, play by play, day
          by day, until we crown the winner of Fantasy, Fantasy Football!
          A basic account is required to enjoy the festivities, please fill out the form below.
        </Text>
        
        <Box id="castle" boxSize="sm">
        <Image  src={castlePic} alt="Fantasy Logo" 
                paddingTop="10px" 
                paddingBottom="10px"/>
        </Box>
        <Flex direction="row" justify="center" marginTop='10px'>
        <Box padding="10px"><Signup/></Box>
        
        <Box padding="10px"><Login/></Box>
       
        <Box padding="10px"><GoogleRedirect/></Box>
        </Flex>

      </Box>
      </VStack>

      </Center>
    
    </>
  );
};
export default LandingScreen;
 