/*
Dump space for code removed from firebase

----- REMOVED FROM functions/index.js -----

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const account = require('../private_key.json');
admin.initializeApp({
  credential: admin.credential.cert(account),
  databaseURL: 'https://fantasy-fantasy-football-game.firebaseio.com',
});
const db = admin.firestore();
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.supBruh = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Sup, Bruh?');
});


----- REMOVED FROM src/config/fbConfig.js -----
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyAzpid0VxyhbdeysgjNKy05WSKKGSlIywY',
  authDomain: 'fantasy-fantasy-football-game.firebaseapp.com',
  databaseURL: 'https://fantasy-fantasy-football-game.firebaseio.com',
  projectId: 'fantasy-fantasy-football-game',
  storageBucket: 'fantasy-fantasy-football-game.appspot.com',
  messagingSenderId: '425533444378',
  appId: '1:425533444378:web:5472480f7e5fbda86c1ca3',
  measurementId: 'G-N41VDLBH7V',
});

// Initialize Analytics, Auth, and Firebase Firestore
firebase.analytics();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const firebaseAuth = firebase.auth;
export const db = firebase
  .firestore()
  .settings({ timestampsInSnapshots: true });
export default firebase;


----- REMOVED FROM /.firebaserc -----
{
  "projects": {
    "default": "fantasy-fantasy-football-game"
  }
}


----- REMOVED FROM /package.json -----
{
  "name": "fantasy-fantasy-football",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@chakra-ui/core": "^1.0.0-rc.5",
    "@chakra-ui/theme": "^1.0.0-rc.5",
    "@chakra-ui/theme-tools": "^1.0.0-rc.5",
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^10.4.9",
    "@testing-library/user-event": "^12.1.6",
    "dotenv": "^8.2.0",
    "esm": "^3.2.25",
    "firebase": "^7.22.1",
    "nodemon": "^2.0.4",
    "npm-run-all": "^4.1.5",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-icons": "^3.11.0",
    "react-router": "^5.2.0",
    "react-router-dom": "^5.2.0",
    "react-scripts": "3.4.3",
    "uuid": "^8.3.0",
    "web-vitals": "^0.2.4"
  },
  "scripts": {
    "dev": "run-p --race dev:firebase start",
    "dev:firebase": "firebase emulators:start",
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}




*/
