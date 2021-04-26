import React, { useState, useEffect } from 'react';
import { db, streamGames } from '../config/fbConfig';
import Navbar from '../components/navigation/Navbar';
import { GameCard } from '../components/game-card';
import { Text } from '@chakra-ui/core';

//NOTES: This is intially set to handle MVP, my vision for a full league will involve team data being stored in many boxes, such as blaseballs format, allowing the user to scroll through
// the entire page viewing each game as it happens
const GameScreen = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);

  // const gamesRef = db.collection('games').where('gameOver', '==', false);

  // TODO: get all games to display at the same time instead of incrementally

  useEffect(() => {
    const unsubscribe = streamGames({
      next: querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          // const gameRef = db.collection('games').doc(change.doc.id);
          const game = { id: change.doc.id, gameData: change.doc.data() };
          if (games.filter(game => game.id === change.doc.id).length === 0) {
            // console.log('new game found');
            // console.log(games, change.doc.id);
            setGames([...games, game]);
          } else {
            // console.log('updating game');
            // console.log(games, change.doc.id);
            const gameIndex = games.findIndex(
              game => game.id === change.doc.id
            );
            setGames([
              ...games.slice(0, gameIndex),
              game,
              ...games.slice(gameIndex + 1),
            ]);
            // console.log('sliced: ' + games);
          }
        });
      },
      error: err => {
        console.log(err);
        setError(err);
        setMsg(err.msg);
      },
    });
    console.log(games);
    return unsubscribe;
  }, [games]);

  return (
    <>
      <Navbar />
      {games.map(game => {
        return <GameCard game={game} key={game.id} />;
      })}
    </>
  );
};

export default GameScreen;
