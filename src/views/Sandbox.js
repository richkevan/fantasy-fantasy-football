import React, { useState, useEffect } from 'react';
import { db, streamSimulation } from '../config/fbConfig';
import { Center, Text, Button, Heading, Box } from '@chakra-ui/core';
import Navbar from '../components/navigation/Navbar';

const Sandbox = () => {
  // start pattern to pull live data from db
  const [gameData, setGameData] = useState(null);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);

  const gameRef = db.collection('runtime').doc('simulation');

  useEffect(() => {
    const unsubscribe = streamSimulation({
      next: querySnapshot => {
        const updatedSimulation = querySnapshot.data();
        setGameData(updatedSimulation);
      },
      error: err => {
        console.log(err);
        setError(err);
        setMsg(err.msg);
      },
    });
    return unsubscribe;
  }, []);
  // end pattern to pull live data from db

  // start simulation
  const init = async () => {
    try {
      await gameRef.delete();
      console.log('old game cleared');
      await gameRef.set({ status: 'N/A', ticks: 'N/A' });
      console.log('game document created =)');
    } catch (err) {
      console.log(err, err.message);
    }
  };
  //end simulation
  const terminate = async () => {
    try {
      await gameRef.update({ status: 'terminated' });
      console.log('game simulation terminated =)');
    } catch (err) {
      console.log(err, err.message);
    }
  };

  const handleClick = e => {
    if (e.target.id === 'simulate') {
      init();
    } else {
      terminate();
    }
  };

  return (
    <>
      <Navbar />
      <Box bg="blue.500" color="white" m={4} p={4} textAlign="center">
        <Center>
          <Button
            color="black"
            bg="green.500"
            onClick={handleClick}
            id="simulate"
          >
            Simulate
          </Button>
          <Button
            ml={4}
            color="black"
            bg="red.500"
            onClick={handleClick}
            id="terminate"
          >
            Terminate
          </Button>
        </Center>
        <Heading as="h1" p={6}>
          Game Broadcast
        </Heading>
        <Heading as="h2">Game Status</Heading>
        <Text as="p">{gameData ? gameData.status : 'N/A'}</Text>
        <Heading as="h1">Game Ticks</Heading>
        <Text as="p">{gameData ? gameData.ticks : 'N/A'}</Text>
        <Text as="p" color="red">
          {error && msg}
        </Text>
      </Box>
    </>
  );
};

export default Sandbox;
