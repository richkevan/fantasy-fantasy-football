//NICOS COMMENTS REGARDING FIRESTORE
// firebase.firestore().settings({ timestampsInSnapshots: true });
// above gave warning inconsole as timestampsInSnapshots is no longer
// probablyrequired needs to be replaced in order to use firestore?
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAzpid0VxyhbdeysgjNKy05WSKKGSlIywY',
  authDomain: 'fantasy-fantasy-football-game.firebaseapp.com',
  databaseURL: 'http://localhost:8080', // PRODUCTION: 'https://fantasy-fantasy-football-game.firebaseio.com',
  projectId: 'fantasy-fantasy-football-game',
  storageBucket: 'fantasy-fantasy-football-game.appspot.com',
  messagingSenderId: '425533444378',
  appId: '1:425533444378:web:5472480f7e5fbda86c1ca3',
  measurementId: 'G-N41VDLBH7V',
});



const db = app.firestore();

if (window.location.hostname === 'localhost') {
  console.log(
    'testing locally -- hitting local functions and firestore emulators'
  );
  app.functions().useFunctionsEmulator('http://localhost:5001');
  db.settings({
    host: 'localhost:8080',
    ssl: false,
  });
}

export const functions = app.functions();

// pattern to pull live data from db
export const streamSimulation = observer => {
  return db.collection('runtime').doc('simulation').onSnapshot(observer);
};

export const streamGames = observer => {
  return db.collection('games').onSnapshot(observer);
};

export { db };

export const auth = app.auth();
export default app;
