import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingScreen from '../../views/LandingScreen';
import UpcomingGameScreen from '../../views/UpcomingGameScreen';
import WelcomeScreen from '../../views/WelcomeScreen';
import HomeScreen from '../../views/HomeScreen';
import NotFound from '../../views/NotFound';
import GameScreen from '../../views/GameScreen';
import LeagueScreen from '../../views/LeagueScreen';
import Sandbox from '../../views/Sandbox';
// import NotAuth from '../../views/NotAuth'
import { AuthProvider } from '../../contexts/AuthContext';
import Signup from '../auth/Signup';

import PrivateRoute from './PrivateRoute';
const Routes = () => {
  return (
    <AuthProvider>
      <Switch>
        <Route exact path="/" component={LandingScreen} />
        <Route path="/signup" component={Signup} />
        <Route path="/sandbox" component={Sandbox} />
        <PrivateRoute path="/schedule" component={UpcomingGameScreen} />
        <PrivateRoute path="/home" component={HomeScreen} />
        <PrivateRoute path="/games" component={GameScreen} />
        <PrivateRoute path="/profile" component={WelcomeScreen} />
        <PrivateRoute path="/league" component={LeagueScreen} />
        <Route path="*" component={NotFound} />
      </Switch>
    </AuthProvider>
  );
};

export default Routes;

// exports.reserveBets = functions.firestore
//   .document('records/{gameRecord}')
//   .onCreate(async (snapshot, context) => {
//     const querySnapshot= await db.collectionGroup('bets').where("gameId","==",snapshot.id).get()
//     querySnapshot.forEach(doc =>{
//       if(snapshot.winner.id === doc.data().teamBetOn ){
//        const winnings = doc.data().coins
//        const winner = doc.data().userId
//         const winnerRef = db.collection('users').doc(winner)
//         const winnerDoc =  await winnerRef.get()
//         const currentCoins = winnerDoc.data().coins
//         await winnerRef.update({
//           coins:currentCoins + winnings*2
//         }) 
//       }
//     })
  
//       .then(event => {
//         console.log('BET PAID OUT');
//       })
//       .catch(error => {
//         console.error('Error writing document: ', error);
//       });
//     return 'Init';
//   });