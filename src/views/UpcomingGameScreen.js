import React,{useState, useEffect,useRef} from 'react';
import Navbar from '../components/navigation/Navbar';
import { Heading, SimpleGrid, Center, VStack, Button, Input, Text, HStack,FormControl } from '@chakra-ui/core';
import {db} from "../config/fbConfig"
import {useAuth} from "../contexts/AuthContext"
import BetCard from '../components/betCard';
const UpcomingGameScreen = () => {
  //Make Team displays divs? in order to make larger and style, or something within Chakra
 const [upcomingGames, setUpcomingGames] = useState([])
 const game1REf = useRef()
 const {currentUser} = useAuth();
 
  useEffect( () => {

    const unsubscribe = async ()=>{
      const simulation = await db.collection("runtime").doc('simulation').get()
      const currentDay = simulation.data().day
      const scheduleRef = db.collection("schedule")
      const snapshot = await scheduleRef.where("day", "==", currentDay +1 ).get()
      if(snapshot.empty){
        console.log("no matching docs")
        return
      }
      const currentGamesArr = [];
      snapshot.forEach(doc=> currentGamesArr.push({id: doc.data().betId, data: doc.data()}))
      setUpcomingGames(currentGamesArr)      
    }
    unsubscribe()
    

  }, [])

  // const handleBet= async (e)=>{
  //   e.preventDefault()
  //   const betIds = e.target.id.split("-")
  //   const currentUserRef = db.collection('users').doc(currentUser.uid);
  //   const currentUserDoc = await currentUserRef.get();
  //   const currentUserData = currentUserDoc.data();
  //   //TODO: Make sure user has enough coins
  //   await currentUserRef.update({
  //     coins: currentUserData.coins - 500
  //   })
  //   await currentUserRef.collection('bets').add({
  //     gameId: betIds[0] ,
  //     teamBetOn: betIds[1] ,
  //     TotalBet: 500
  //   })
  // }

//TODO set ref to the input for bet total.

  const displayUpcomingGames = ()=>{
    console.log("yee haw")
    console.log(upcomingGames)
   return  upcomingGames.map((game,index)=>{
      return (
        <BetCard game={game} />
    )})
  }

  return (
    <>
      <Navbar />
      <VStack>
        <Heading as="h4" size="lg">
          Upcoming Grudge Matches
        </Heading>
        <SimpleGrid columns={2} spacing={8}>
        {displayUpcomingGames()}
        </SimpleGrid>
      </VStack>
    </>
  );
};

export default UpcomingGameScreen;
