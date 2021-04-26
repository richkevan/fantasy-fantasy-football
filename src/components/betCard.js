import React, { useRef, useState, useEffect } from 'react';
import {
  Center,
  VStack,
  Button,
  Input,
  Text,
  HStack,
  Alert,
} from '@chakra-ui/core';
import { db } from '../config/fbConfig';
import { useAuth } from '../contexts/AuthContext';

const BetCard = ({ game }) => {
  const [inputValue, setInputValue] = useState('');
  const [canBet, setCanBet] = useState(true);
  const [disableBet, setDisableBet] = useState(false);
  const { currentUser } = useAuth();
  const betRef = useRef();

  useEffect(() => {
    const unsubscribe = async () => {
      const userBetRef = db
        .collection('users')
        .doc(currentUser.uid)
        .collection('bets');
      const userBets = await userBetRef.where('gameId', '==', game.id).get();
      if (userBets.empty) {
        console.log('user hasnt bet on ' + game.id);
        return;
      }
      setDisableBet(true);
    };
    unsubscribe();
    
  }, [disableBet]);

  const handleBet = async e => {
    e.preventDefault();
    if(Number(inputValue)<1){
        return
    }
    const betIds = e.target.id.split('-');
    const currentUserRef = db.collection('users').doc(currentUser.uid);
    const currentUserDoc = await currentUserRef.get();
    const currentUserData = currentUserDoc.data();
    //coin check
    if (currentUserData.coins < betRef.current.value) {
      setCanBet(false);
      return;
    }
    await currentUserRef.update({
      coins: currentUserData.coins - Number(betRef.current.value),
    });

    await currentUserRef.collection('bets').add({
      gameId: betIds[0],
      teamBetOn: betIds[1],
      TotalBet: Number(betRef.current.value),
      userId: currentUser.uid,
    });
    setInputValue('');
    setDisableBet(true);
  };

  const handleChange = e => {
    setInputValue(e.target.value);
    setCanBet(true);
  };

  return (
    <Center
      bg="lightBlue"
      fontSize={['2xl', '4xl']}
      p={2}
      textAlign="center"
      key={game.id}
      textAlign="center"
    >
      <VStack justifyContent="center">
       
          <Text>{`${game.data.home.teamName} VS ${game.data.away.teamName}`}</Text>

          
            {disableBet ? (
              <Text fontSize="sm">You have already bet on this game</Text>
            ) : (
              <>
                {' '}
                <Input
                  width="xs"
                  value={inputValue}
                  onChange={handleChange}
                  placeholder="Bet Amount"
                  type="number"
                  ref={betRef}
                />{' '}
                <HStack justifyContent="center">
                <Button
                  size="md"
                  type="submit"
                  onClick={handleBet}
                  id={`${game.id}-${game.data.home.id}`}
                >
                  Bet Home
                </Button>
                <Button
                  size="md"
                  type="submit"
                  onClick={handleBet}
                  id={`${game.id}-${game.data.away.id}`}
                >
                  Bet Away
                </Button>
                </HStack>
              </>
            )}
            {canBet ? null : (
              <Text fontSize="xs" status="error">
                {' '}
                You do not have enough coins to make this bet
              </Text>
            )}
          
    
      </VStack>
    </Center>
  );
};

export default BetCard;
