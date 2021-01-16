import { InMemoryCache, makeVar } from "@apollo/client";
import { BALL_VALUES } from "./constants/ball";

export const leftPlayerStats = makeVar({
  name: '',
  score: 0,
  shots: {
    attempted: 0,
    potted: 0,
    longAttempted: 0,
    longPotted: 0
  },
  break: {
    current: 0,
    longest: 0,
  },
  safeties: 0,
  fouls: 0,
});
export const rightPlayerStats = makeVar({
  name: '',
  score: 0,
  shots: {
    attempted: 0,
    potted: 0,
    longAttempted: 0,
    longPotted: 0
  },
  break: {
    current: 0,
    longest: 0,
  },
  safeties: 0,
  fouls: 0,
});
export const matchStats = makeVar({
  totalFrames: 0,
  leftPlayerFramesWon: 0,
  rightPlayerFramesWon: 0,
  gameResults: [],
});
export const gameInfo = makeVar({
  leftPlayerStarted: false,
  leftPlayerActive: true,
  redsLeft: 15,
  pointsLeft: 147, // Points left until snookers is based off this value: ceil(1/2) + opposing player's score
  validBallType: BALL_VALUES.RED,
  reRacks: 0,
  log: [],
});

export const statsCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        leftPlayerStats: {
          read() {
            return leftPlayerStats();
          }
        },
        rightPlayerStats: {
          read() {
            return rightPlayerStats();
          }
        },
        matchStats: {
          read() {
            return matchStats();
          }
        },
        gameInfo: {
          read() {
            return gameInfo();
          }
        }
      }
    }
  }
});
