// settings / config
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
db.settings({ experimentalForceLongPolling: true });

// TODO: Incorporate stats into battles
// TODO: refactor into separate files

// Firestore Listeners

const gameListeners = [];
let unsub;

const makeGameListeners = () => {
  unsub = db.collection('games').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      const gameRef = db.collection('games').doc(change.doc.id);
      const game = { gameRef, gameData: change.doc.data(), id: change.doc.id };
      if (
        gameListeners.filter(game => game.id === change.doc.id).length === 0
      ) {
        gameListeners.push(game);
      } else {
        const gameIndex = gameListeners.findIndex(
          game => game.id === change.doc.id
        );
        gameListeners[gameIndex] = game;
      }
    });
  });
};

// necessary to avoid stale data from closures when objects are passed by reference
// call this to get the gameData object of the gameListeners[i] game
// will always remain up to date
const getFreshData = i => {
  return gameListeners[i].gameData || 'No data found for that index.';
};

//TEAM & PLAYER FUNCTIONS

const firstNames = [
  'Steven',
  'Rich',
  'Jacob',
  'Nico',
  'Vince',
  'TJ',
  'Kano',
  'Jake',
  'Suri',
  'Chok',
  'Randy',
  'Leeland',
  'Grog',
  'Milkshake',
  'William',
  'Jessica',
  'Ollie',
  'Anime',
  'Dog',
  'Bear',
  'Spark',
  'Mirra',
  'Ziggy',
  'Theo',
  'Shadow',
  'Kate',
  'Leah',
  'Durkon',
  'Alyn',
  'Gaelin',
  'Elon',
  'Rhea',
  'Pristopher',
  'Zero',
  'Griffin',
  'Velvet',
  'Alabaster',
  'Buffy',
  'Sledge',
  'Sage',
  'Etto',
  'Sheena',
  'Gruno',
  'Duck',
  'Juno',
  'Sliq',
  'Murt',
  'Sylvia',
  'Ori',
  'Crud',
  'Badname',
  'Bosco',
  'Bravo',
  'Chidi',
  'Bruno',
  'Bowman',
  'Scarlet',
  'Addi',
  'Goldi',
  'Kora',
  'Page',
  'Boomer',
  'Eagle',
  'Argo',
  'Gex',
  'Dr.',
  'Zuzu',
  'Morgan',
  'Zoe',
  'Newt',
  'Hoshi',
  'Ruby',
  "J'nelle",
  'Leander',
  'Dunk',
  'Duke',
  'Gwendalyn',
  "Lil'",
  'Drogba',
  'Daxx',
  'Thunder',
  'Blade',
  'Gardok',
  'Fortune',
  'Stone',
  'Doobie',
  'Jesus',
  'Abraham',
  'Fester',
  'Finn',
  'Willow',
  'Astro',
  'Lorelai',
  'Big',
  'Baby',
  'Dude',
  'Elna',
  'Swamp',
];
const lastNames = [
  'Delpercio',
  'Kevan',
  'Alfonso',
  'Walker',
  'St. Louis',
  'Hindman',
  'Hershey',
  'Roy',
  'Ooi',
  'Cox',
  'Cunningham',
  'Jazz',
  'Prolumbus',
  'Thunderstruck',
  'Hammerstien',
  'Boulder',
  'Ramone',
  'Hager',
  'Jericho',
  'Christ',
  'Kramer',
  'Jackson',
  'Connor',
  'Forrester',
  'August',
  'Mason',
  'Rider',
  'Fox',
  'Ward',
  'Knight',
  'Young',
  'Poindexter',
  'Fekete',
  'Blackburn',
  'White',
  'Black',
  'Brown',
  'Valentino',
  'Sportsman',
  'Moon',
  'Hart',
  'Smith',
  'Rockman',
  'Woods',
  'Diamond',
  'Fletcher',
  'Badman',
  'Bagman',
  'Badger',
  'Hotcakes',
  'Hotsauceman',
  'Fortune',
  'Potter',
  'Rivers',
  'Swanson',
  'Wright',
  'Vegne',
  'Rodriguez',
  'Alirral',
  'Sully',
  'Tully',
  'Hawkson',
  'Skateboard',
  'Whitman',
  'Marshman',
  'Gaille',
  'Saintinas',
  'Raza',
  'Wildflower',
  'Hellman',
  'Melon',
  'Albion',
  'The Third',
  'Bo',
  'Charra',
  'Asta',
  'Star',
  'Raloth',
  'Kazoo',
  'Khan',
  'Deepwood',
  'Laurel',
  'Taxtaker',
  'Cremont',
  'Freedom',
  'Gameboy',
  'Duchade',
  'Choizi',
  'Irons',
  'Hillman',
  'Anime',
  'Eagle',
  'Applebottom',
  'Diggs',
  'Teapot',
  'Dudeson',
  'Sombrero',
  'Spoon',
];

const playerClans = [
  'Ork',
  'Troll',
  'Ent',
  'Elf',
  'Human',
  'Dwarf',
  'Hobbit',
  'Goblin',
  'Centaur',
  'Fairy',
  'Cyclops',
  'Kobold',
  'Gnome',
  'Zombie',
  'Harpy',
  'Siren',
  'Demon',
  'Demigod',
];

const locations = [
  'Mordor',
  'Gondor',
  'Gallifrey',
  'Azeroth',
  'Barsoom',
  'Dune',
  'Camelot',
  'Dinotopia',
  'Hyrule',
  'Lilliput',
  'Middle-earth',
  'Myst',
  'Narnia',
  'Neverland',
  'Oz',
  'Pern',
  'Rowan',
  'Hoth',
  'Alderan',
  'Whoville',
  'Hogwarts',
  'Wonderland',
  'Asgard',
  'Fire Nation',
  'Altea',
  'Crematoria',
  'Fantasia',
  'Pandora',
  'Third Earth',
  'Arrakis',
  'Giedi Prime',
  'Caladan',
];

const teamNames = [
  'Daggers',
  'Warriors',
  'Forest Fires',
  'Criminals',
  'Town Drunks',
  'Magi',
  'Cellar Rats',
  "Innkeeper's Wives",
  'Dragons',
  'Poison',
  'Scary Ghosts',
  'Liars',
  'Shield Maidens',
  'Squires',
  'Beards',
  'Death Dealers',
  'Returning Kings',
  'Time Wheels',
  'Fellowship',
  'Rodents of Unusual Size',
  'Dread Pirates',
  'Hordes',
  'Shrieking Eels',
  'Dragon Slayers',
  'Ring bearers',
  'Demons',
  'Dragon Riders',
  'Shape Shifters',
  'Giant Killers',
  'Barrel Riders',
  'Balrogs',
  'Ancients',
  'Sorcerers',
  'Witches',
  'Holocruxes',
  'Werewolves',
  'Weary Wizards',
  'Court Jesters',
  'Castle Walls',
];

const generateTeam = () => {
  return {
    teamName:
      // locations[Math.floor(Math.random() * locations.length)] +
      // ' ' +
      teamNames[Math.floor(Math.random() * teamNames.length)],
    Location: locations[Math.floor(Math.random() * locations.length)],
    seasonRecord: {
      win: 0,
      loss: 0,
    },
  };
};

const generatePlayer = () => {
  return {
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    clan: playerClans[Math.floor(Math.random() * playerClans.length)],
    pass: D20(),
    run: D20(),
    catch: D20(),
    runDef: D20(),
    catchDef: D20(),
    luck: D20(),
  };
};

const generateLeague = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const ln = await db
        .collection('leagues')
        .add({ name: 'Lawful Neutral Conference' });
      const cn = await db
        .collection('leagues')
        .add({ name: 'Chaotic Neutral Conference' });

      const dnd = await db
        .collection('leagues')
        .doc(ln.id)
        .collection('divisions')
        .add({ namne: 'D&D Division' });
      const lotr = await db
        .collection('leagues')
        .doc(ln.id)
        .collection('divisions')
        .add({ namne: 'lotR Division' });
      const hogwarts = await db
        .collection('leagues')
        .doc(cn.id)
        .collection('divisions')
        .add({ namne: 'Hogwarts Division' });
      const wot = await db
        .collection('leagues')
        .doc(cn.id)
        .collection('divisions')
        .add({ namne: 'WoT Division' });
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < 5; i++) {
        const dndTeam = await db
          .collection('leagues')
          .doc(ln.id)
          .collection('divisions')
          .doc(dnd.id)
          .collection('teams')
          .add(generateTeam());

        const lotrTeam = await db
          .collection('leagues')
          .doc(ln.id)
          .collection('divisions')
          .doc(lotr.id)
          .collection('teams')
          .add(generateTeam());

        const hogwartsTeam = await db
          .collection('leagues')
          .doc(cn.id)
          .collection('divisions')
          .doc(hogwarts.id)
          .collection('teams')
          .add(generateTeam());

        const wotTeam = await db
          .collection('leagues')
          .doc(cn.id)
          .collection('divisions')
          .doc(wot.id)
          .collection('teams')
          .add(generateTeam());

        for (let i = 0; i < 5; i++) {
          const pos =
            i < 1
              ? 'QB'
              : i < 2
              ? 'RB'
              : i < 3
              ? 'WR1'
              : i < 4
              ? 'WR2'
              : i < 5
              ? 'Center'
              : 'Team Mascot?';
          await db
            .collection('leagues')
            .doc(ln.id)
            .collection('divisions')
            .doc(dnd.id)
            .collection('teams')
            .doc(dndTeam.id)
            .collection('players')
            .add({ ...generatePlayer(), position: pos });
          await db
            .collection('leagues')
            .doc(ln.id)
            .collection('divisions')
            .doc(lotr.id)
            .collection('teams')
            .doc(lotrTeam.id)
            .collection('players')
            .add({ ...generatePlayer(), position: pos });
          await db
            .collection('leagues')
            .doc(cn.id)
            .collection('divisions')
            .doc(hogwarts.id)
            .collection('teams')
            .doc(hogwartsTeam.id)
            .collection('players')
            .add({ ...generatePlayer(), position: pos });
          await db
            .collection('leagues')
            .doc(cn.id)
            .collection('divisions')
            .doc(wot.id)
            .collection('teams')
            .doc(wotTeam.id)
            .collection('players')
            .add({ ...generatePlayer(), position: pos });
        }
      }
    } catch (err) {
      console.error(err, err.msg);
    } finally {
      resolve();
    }
  });
};

const generateSeason = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const teams = [];
      const querySnapshot = await db.collectionGroup('teams').get();
      querySnapshot.forEach(doc => {
        docData = doc.data();
        teams.push({ id: doc.id, teamName: docData.teamName });
      });

      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < 100; i++) {
        const availableTeams = [...teams];
        while (availableTeams.length > 0) {
          const n1 = Math.floor(Math.random() * availableTeams.length);
          const homeTeam = availableTeams[n1];
          availableTeams.splice(n1, 1);
          const n2 = Math.floor(Math.random() * availableTeams.length);
          const awayTeam = availableTeams[n2];
          availableTeams.splice(n2, 1);
          const scheduledGameRef = db.collection('schedule').doc()
          await scheduledGameRef.set({home: homeTeam, away: awayTeam, day: i + 1, betId:scheduledGameRef.id})
            
        }
      }
    } catch (err) {
      console.log(err, err.msg);
    } finally {
      resolve();
    }
  });
};

// HELPER FUNCTIONS

// Promise.all without failing on a rejectd promise
// cite: http://mitchvollebregt.com/snippets-js-promise-minimum-execution-time/
const promiseAllReflect = (promises = []) => {
  const reflect = promise =>
    promise.then(
      value => ({ value, status: 'fulfilled' }),
      error => ({ error, status: 'rejected' })
    );

  return Promise.all(promises.map(reflect));
};

const D20 = () => {
  return Math.floor(Math.random() * (20 - 1 + 1) + 1);
};

const D100 = () => {
  return Math.floor(Math.random() * (100 - 1 + 1) + 1);
};

const Cointoss = () => {
  return Math.floor(Math.random() * (2 - 1 + 1) + 1);
};
// cite: http://mitchvollebregt.com/snippets-js-promise-minimum-execution-time/

const executeAtLeast = (time, func, funcArgs = []) => {
  return promiseAllReflect([
    new Promise(resolve => setTimeout(resolve, time)),
    func(...funcArgs),
  ]);
};

// GAME LOGIC
let inProgress = false;
const gameController = async ticks => {
  try {
    const simRef = db.collection('runtime').doc('simulation');
    const simDoc = await simRef.get();
    const currentDay = simDoc.data().day;

    if (currentDay === 0) {
      // console.log('Initialize Game State');
      await generateLeague();
      await generateSeason();
      await simRef.update({ day: currentDay + 1 });
      // console.log('day++');
    }
    // console.log('out of if');
  } catch (err) {
    console.error('Error getting documents.', err, err.msg);
    return;
  } finally {
    // console.log('finally');
    const simRef = db.collection('runtime').doc('simulation');
    const simDoc = await simRef.get();
    if (!inProgress) {
      inProgress = true;
      // console.log('inProgress: ' + inProgress);
      // console.log('should make the games now');
      const currentDay = simDoc.data().day;
      // console.log(currentDay);
      const currentGames = await db
        .collection('schedule')
        .where('day', '==', currentDay)
        .get();
      currentGames.forEach(async doc => {
        const data = doc.data();
        // console.log(data);
        const docRef = db.collection('games').doc();
        await docRef.set({
          homeTeam: { ...doc.data().home, score: 0 },
          awayTeam: { ...doc.data().away, score: 0 },
          hasStarted: false,
          ballPosition: 0,
          homeTeamPossession: false,
          down: 0,
          yardsGained: 0,
          gameOver: false,
          queueKickoff: false,
          eventLog: [],
          yardsToFirstDown: 10,
          betId: doc.data().betId
        });
      });
      // console.log('current games made.');
      // console.log('making listeners');
      makeGameListeners();
      /* eslint-disable */
      return new Promise((resolve, reject) => resolve());
    }
    if (
      gameListeners.filter(game => game.gameData.gameOver === false).length ===
      0
    ) {
      // console.log('listeners: ' + gameListeners);
      // console.log('unsub');
      unsub();
      /* eslint-disable */
      return new Promise(async (resolve, reject) => {
        /* eslint-disable no-await-in-loop */
        setTimeout(async () => {
          console.log('Advancing to the next day in 10 seconds');
          inProgress = false;
          const currentDay = simDoc.data().day;
          await simRef.update({ day: currentDay + 1 });
          //removes current gameListeners
          gameListeners.splice(0);
          resolve();
        }, 10000);
      });
    } else {
      gameListeners.forEach((game, index) => {
        if (getFreshData(index).gameOver) {
          // console.log('returning');
          return;
        }
        // console.log('run game ' + game.id);
        gameSim({
          gameID: game.id,
          gameRef: game.gameRef,
          index,
        });
      });
    }

    // must return a promise to executeAtLeast
    /* eslint-disable */
    return new Promise((resolve, reject) => resolve());
  }
};

// game mechanics

const playBall = async ({ gameRef, index }) => {
  const result = Cointoss();
  // console.log(`Cointoss result is ${result === 0 ? 'heads' : 'tails'}`);
  if (result === 0) {
    await gameRef.update({
      isHomeTeamReceiving: true,
      queueKickoff: true,
      eventLog: [
        ...getFreshData(index).eventLog,
        `Cointoss result is heads. ${
          getFreshData(index).homeTeam.teamName
        } will recieve. ${
          getFreshData(index).awayTeam.teamName
        } will kick off.`,
      ],
    });
    // console.log(`${getFreshData(index).homeTeam.teamName} will recieve`);
    // console.log(`${getFreshData(index).awayTeam.teamName} will kick off`);
  } else {
    await gameRef.update({
      isHomeTeamReceiving: false,
      queueKickoff: true,
      eventLog: [
        ...getFreshData(index).eventLog,
        `Cointoss result is tails. ${
          getFreshData(index).awayTeam.teamName
        } will recieve. ${
          getFreshData(index).homeTeam.teamName
        } will kick off.`,
      ],
    });
    // console.log(`${getFreshData(index).awayTeam.teamName} will recieve`);
    // console.log(`${getFreshData(index).homeTeam.teamName} will kick off`);
  }

  return 'Game on!';
};

const kickoff = async ({ gameRef, gameData, index }) => {
  try {
    const kickBattle = D100();
    let kickReturn;
    switch (true) {
      case kickBattle > 80:
        if (getFreshData(index).isHomeTeamReceiving) {
          kickReturn = Math.min(Math.max(D100(), 35), 100);
        } else {
          kickReturn = Math.max(Math.min(100 - D100(), 65), 0);
        }
        await gameRef.update({
          ballPosition: kickReturn,
          eventLog: [
            ...getFreshData(index).eventLog,
            `Ball returned to the ${
              getFreshData(index).ballPosition
            } yard line`,
          ],
        });
        // console.log(
          // `Ball returned to the ${getFreshData(index).ballPosition} yard line`
        // );
        break;
      case kickBattle > 40 && kickBattle < 80:
        if (getFreshData(index).isHomeTeamReceiving) {
          kickReturn = Math.max(D20() + D20(), 30);
        } else {
          kickReturn = Math.max(Math.min(100 - (D20() + D20()), 70), 0);
        }
        // console.log(`kickReturn: ${kickReturn}`);
        await gameRef.update({
          ballPosition: kickReturn,
          eventLog: [
            ...getFreshData(index).eventLog,
            `Ball returned to the ${
              getFreshData(index).ballPosition
            } yard line`,
          ],
        });
        // console.log(
        //   `Ball returned to the ${getFreshData(index).ballPosition} yard line`
        // );
        break;
      case kickBattle > 10 && kickBattle < 40:
        if (getFreshData(index).isHomeTeamReceiving) {
          kickReturn = Math.max(D20() + 10, 30);
        } else {
          kickReturn = Math.max(Math.min(100 - (D20() + 10), 70), 0);
        }
        // console.log(`kickReturn: ${kickReturn}`);
        await gameRef.update({
          ballPosition: kickReturn,
          eventLog: [
            ...getFreshData(index).eventLog,
            `Ball returned to the ${
              getFreshData(index).ballPosition
            } yard line`,
          ],
        });
        // console.log(
        //   `Ball returned to the ${getFreshData(index).ballPosition} yard line`
        // );
        break;
      case kickBattle > 0:
        if (getFreshData(index).isHomeTeamReceiving) {
          kickReturn = D20();
        } else {
          kickReturn = 100 - D20();
        }
        // console.log(`kickReturn: ${kickReturn}`);
        await gameRef.update({
          ballPosition: kickReturn,
          eventLog: [
            ...getFreshData(index).eventLog,
            `Ball returned to the ${
              getFreshData(index).ballPosition
            } yard line`,
          ],
        });
        console.log(
          `Ball returned to the ${getFreshData(index).ballPosition} yard line`
        );
        break;
      default:
        // console.log('nothing happens');
        await gameRef.update({
          eventLog: [...getFreshData(index).eventLog, `Nothing happens`],
        });
    }
    gameRef.update({
      down: 1,
      queueKickoff: false,
      homeTeamPossession: getFreshData(index).isHomeTeamReceiving,
      yardsGained: 0,
      yardsToFirstDown: 10,
    });
  } catch (err) {
    console.error(err);
  }
};

const battle = async ({ gameRef, index }) => {
  const offenseRoll = D20();
  const defenseRoll = D20();
  try {
    switch (true) {
      // Offense Success
      case offenseRoll > defenseRoll:
        await gameRef.update({
          yardsGained: D20(),
          eventLog: [
            ...getFreshData(index).eventLog,
            `${
              getFreshData(index).homeTeamPossession
                ? getFreshData(index).homeTeam.teamName
                : getFreshData(index).awayTeam.teamName
            } with a ${getFreshData(index).yardsGained} yard gain`,
          ],
        });
        // console.log(
        //   `${
        //     getFreshData(index).homeTeamPossession
        //       ? getFreshData(index).homeTeam.teamName
        //       : getFreshData(index).awayTeam.teamName
        //   } with a ${getFreshData(index).yardsGained} yard gain`
        // );
        break;

      // Defense Success
      case defenseRoll > offenseRoll:
        await gameRef.update({
          yardsGained: D20() * -1,
          eventLog: [
            ...getFreshData(index).eventLog,
            `${
              getFreshData(index).homeTeamPossession
                ? getFreshData(index).awayTeam.teamName
                : getFreshData(index).homeTeam.teamName
            } with a sack! ${-1 * getFreshData(index).yardsGained} yard loss`,
          ],
        });
        // console.log(
        //   `${
        //     getFreshData(index).homeTeamPossession
        //       ? getFreshData(index).awayTeam.teamName
        //       : getFreshData(index).homeTeam.teamName
        //   } with a sack! ${-1 * getFreshData(index).yardsGained} yard loss`
        // );
        break;

      // Push
      case offenseRoll === defenseRoll:
        // console.log('No yards gained.');
        await gameRef.update({
          yardsGained: 0,
          eventLog: [...getFreshData(index).eventLog, 'No yards gained.'],
        });
        break;

      default:
        await gameRef.update({
          eventLog: [...getFreshData(index).eventLog, 'Nothing happens.'],
        });
        // console.log('nothing happens');
    }

    // Account for which team has posession
    let direction = getFreshData(index).homeTeamPossession ? 1 : -1;

    // console.log(
    //   `hometeamposession: ${
    //     getFreshData(index).homeTeamPossession
    //   } direction: ${direction}, yards gained: ${
    //     getFreshData(index).yardsGained
    //   }`
    // );

    // Update ball position
    const newBallPosition =
      getFreshData(index).ballPosition +
      getFreshData(index).yardsGained * direction;

    const newYardsLeft =
      getFreshData(index).yardsToFirstDown - getFreshData(index).yardsGained;

    await gameRef.update({
      ballPosition: newBallPosition,
      yardsToFirstDown: newYardsLeft,
      eventLog: [
        ...getFreshData(index).eventLog,
        `Ball on the ${getFreshData(index).ballPosition} yard line.`,
      ],
    });
    // console.log(`Ball on the ${getFreshData(index).ballPosition} yard line.`);

    // Home Team Scores
    if (
      getFreshData(index).ballPosition >= 100 &&
      getFreshData(index).homeTeamPossession
    ) {
      await gameRef.update({
        homeTeam: {
          ...getFreshData(index).homeTeam,
          score: getFreshData(index).homeTeam.score + 6,
        },
        isHomeTeamReceiving: false,
        queueKickoff: true,
        eventLog: [
          ...getFreshData(index).eventLog,
          `${getFreshData(index).homeTeam.teamName} touchdown!`,
        ],
      });
      // console.log(`${getFreshData(index).homeTeam.teamName} touchdown!`);
      // console.log(
      //   `The score is ${getFreshData(index).homeTeam.teamName}: ${
      //     getFreshData(index).homeTeam.score
      //   } - ${getFreshData(index).awayTeam.teamName}: ${
      //     getFreshData(index).awayTeam.score
      //   }.`
      // );

      // Away Team Scores
    } else if (
      getFreshData(index).ballPosition <= 0 &&
      !getFreshData(index).homeTeamPossession
    ) {
      await gameRef.update({
        awayTeam: {
          ...getFreshData(index).awayTeam,
          score: getFreshData(index).awayTeam.score + 6,
        },
        isHomeTeamReceiving: true,
        queueKickoff: true,
        eventLog: [
          ...getFreshData(index).eventLog,
          `${getFreshData(index).awayTeam.teamName} touchdown!`,
        ],
      });
      // console.log(`${getFreshData(index).awayTeam.teamName} touchdown!`);
      // console.log(
      //   `The score is ${getFreshData(index).homeTeam.teamName}: ${
      //     getFreshData(index).homeTeam.score
      //   } - ${getFreshData(index).awayTeam.teamName}: ${
      //     getFreshData(index).awayTeam.score
      //   }.`
      // );

      // First Down
    } else if (getFreshData(index).yardsToFirstDown <= 0) {
      await gameRef.update({
        down: 1,
        yardsToFirstDown: 10,
        eventLog: [...getFreshData(index).eventLog, 'First down!'],
      });
      // console.log('First down!');
      return;
    }
    await gameRef.update({ down: getFreshData(index).down + 1 });
  } catch (err) {
    console.error(err);
  }
};

const gameSim = async ({ gameID, gameRef, index }) => {
  // Guard Clauses
  if (!getFreshData(index).homeTeam) {
    console.error('Something went wrong. Exiting gameSim.');
    return;
  }
  if (getFreshData(index).gameOver) {
    // console.log('No currently scheduled games');
    return;
  }

  // Flip Coin
  if (!getFreshData(index).hasStarted) {
    playBall({ gameRef, index });
    await gameRef.update({ hasStarted: true });
    return;
  }

  // Check for Win
  if (
    getFreshData(index).homeTeam.score >= 12 ||
    getFreshData(index).awayTeam.score >= 12
  ) {
    const gameWinner =
      getFreshData(index).homeTeam.score > getFreshData(index).awayTeam.score
        ? getFreshData(index).homeTeam
        : getFreshData(index).awayTeam;

    const gameLoser =
      getFreshData(index).homeTeam.score > getFreshData(index).awayTeam.score
        ? getFreshData(index).awayTeam
        : getFreshData(index).homeTeam;

    await gameRef.update({
      eventLog: [
        ...getFreshData(index).eventLog,
        `${gameWinner.teamName} wins best 2 out of 3!`,
      ],
    });
    // console.log(`${gameWinner.teamName} wins best 2 out of 3!`);
    // console.log(
    //   `Final score is ${getFreshData(index).homeTeam.teamName}: ${
    //     getFreshData(index).homeTeam.score
    //   } - ${getFreshData(index).awayTeam.teamName}: ${
    //     getFreshData(index).awayTeam.score
    //   }.`
    // );
    // console.log('Game over, nerds.');
    await gameRef.update({ gameOver: true });
    await db
      .collection('records')
      .doc(getFreshData(index).betId)
      .set({ winner: gameWinner, loser: gameLoser, betId: getFreshData(index).betId });
    return;
  }

  // Kickoff
  if (getFreshData(index).queueKickoff) {
    kickoff({ gameRef, index });
    return;
  }

  // Announce posesssion & battle
  if (getFreshData(index).down < 5) {
    // console.log(
    //   `It is ${getFreshData(index).down} down and ${
    //     getFreshData(index).yardsToFirstDown
    //   }`
    // );
    // console.log(
    //   `${
    //     getFreshData(index).homeTeamPossession
    //       ? getFreshData(index).homeTeam.teamName
    //       : getFreshData(index).awayTeam.teamName
    //   } has possession of ball`
    // );
    battle({
      gameRef,
      index,
    });

    // Turnover
  } else {
    await gameRef.update({
      homeTeamPossession: !getFreshData(index).homeTeamPossession,
      down: 1,
      yardsToFirstDown: 10,
      eventLog: [...getFreshData(index).eventLog, 'Change of posesssion.'],
    });
    // console.log('Change of possession');
  }
};
// CLOUD FUNCTIONS

const existingGames = [];

exports.initServer = functions.firestore
  .document('runtime/simulation')
  .onCreate((snapshot, context) => {
    db.collection('runtime')
      .doc('simulation')
      .update({
        status: 'initialized',
        ticks: 0,
        season: 1,
        day: 0,
      })
      .then(event => {
        // console.log('Document successfully written!');
        return 'mandatory return';
      })
      .catch(error => {
        console.error('Error writing document: ', error);
      });
    return 'Init';
  });

// GAME LOOP
exports.simulate = functions.firestore
  .document('runtime/simulation')
  .onUpdate((change, context) => {
    const newValue = change.after.data();
    if (newValue.status === 'terminated') {
      // console.log('Terminated.');
      return null;
    }
    const count = newValue.ticks;
    // console.log('tick' + count);

    // firebase functions require returned responses
    // runs all simulation for at least 5 seconds & returns results to DB
    return new Promise((resolve, reject) => {
      executeAtLeast(2000, gameController, [count])
        .then(resolve)
        .catch(err => console.log(err));
    }).then(() => {
      return change.after.ref.set({ ticks: count + 1 }, { merge: true });
    });
  });

exports.reserveBets = functions.firestore
  .document('records/{gameRecord}')
  .onCreate(async (snapshot, context) => {
    const querySnapshot = await db
      .collectionGroup('bets')
      .where('gameId', '==', snapshot.id)
      .get();
      console.log("Grabbed Every Bet")
    querySnapshot
      .forEach(async doc => {
        console.log("Snapshot record id :"+snapshot.id)
        console.log("info inside of the bet :"+ JSON.stringify(doc.data()))
        console.log("bet ID :" + doc.id)
        if (snapshot.data().winner.id === doc.data().teamBetOn) {
          console.log("IF CHECK RUNS")
          const winnings = doc.data().TotalBet;
          const winner = doc.data().userId;
          const winnerRef = db.collection('users').doc(winner);
          const winnerDoc = await winnerRef.get();
          const currentCoins = winnerDoc.data().coins;
          await winnerRef.update({
            coins: currentCoins + winnings * 2,
          });
          console.log(`you win this > ${winnings} user ${winner} `)
        }
      })
    return 'Init';
  });
