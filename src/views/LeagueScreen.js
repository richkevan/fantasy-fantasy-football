import React from 'react';
import { Heading, VStack, Text, Box } from '@chakra-ui/core';
import Navbar from '../components/navigation/Navbar';
const LeagueScreen = () => {
  return (
    <>
      {' '}
      <Navbar />{' '}
      <VStack>
        {' '}
        <Heading as="h1">Fantasy Fantasy Football</Heading>{' '}
        <Heading>League Standings</Heading>{' '}
        <Box border="1px" width="50%">
          {' '}
          <Box>
            {' '}
            <Text>Division: Dragon People</Text>{' '}
          </Box>{' '}
          <Box
            bg="lightBlue"
            height="80px"
            fontSize="40px"
            textAlign="center"
            paddingTop="5px"
            border="1px"
          >
            {' '}
            <Text fontSize="md">Team Orc Wins-Loss-Tie </Text>{' '}
          </Box>{' '}
          <Box
            bg="lightBlue"
            height="80px"
            fontSize="40px"
            textAlign="center"
            paddingTop="5px"
            border="1px"
          >
            {' '}
            <Text fontSize="md">Team Dark Elves Wins-Loss-Tie </Text>{' '}
          </Box>{' '}
          <Box
            bg="lightBlue"
            height="80px"
            fontSize="40px"
            textAlign="center"
            paddingTop="5px"
            border="1px"
          >
            {' '}
            <Text fontSize="md">Team Human Wins-Loss-Tie </Text>{' '}
          </Box>{' '}
          <Box
            bg="lightBlue"
            height="80px"
            fontSize="40px"
            textAlign="center"
            paddingTop="5px"
            border="1px"
          >
            {' '}
            <Text fontSize="md">Team Argonian Wins-Loss-Tie </Text>{' '}
          </Box>{' '}
          <Box>
            {' '}
            <Text>Division: IDK IM OUT OF CREATIVE MAGIC NAMES</Text>{' '}
          </Box>{' '}
          <Box
            bg="lightBlue"
            height="80px"
            fontSize="40px"
            textAlign="center"
            paddingTop="5px"
            border="1px"
          >
            {' '}
            <Text fontSize="md">Team High Elf Wins-Loss-Tie </Text>{' '}
          </Box>{' '}
          <Box
            bg="lightBlue"
            height="80px"
            fontSize="40px"
            textAlign="center"
            paddingTop="5px"
            border="1px"
          >
            {' '}
            <Text fontSize="md">Team Dwarf Wins-Loss-Tie </Text>{' '}
          </Box>{' '}
          <Box
            bg="lightBlue"
            height="80px"
            fontSize="40px"
            textAlign="center"
            paddingTop="5px"
            border="1px"
          >
            {' '}
            <Text fontSize="md">Team Preist Wins-Loss-Tie </Text>{' '}
          </Box>{' '}
          <Box
            bg="lightBlue"
            height="80px"
            fontSize="40px"
            textAlign="center"
            paddingTop="5px"
            border="1px"
          >
            {' '}
            <Text fontSize="md">Team Death Knight Wins-Loss-Tie </Text>{' '}
          </Box>{' '}
        </Box>{' '}
      </VStack>{' '}
    </>
  );
};
export default LeagueScreen;
