import { InMemoryCache, makeVar } from "@apollo/client";

export const leftPlayerStats = makeVar({
  name: 'Tyler',
  score: 0
});
export const rightPlayerStats = makeVar({
  name: 'George',
  score: 0
});
export const matchStats = makeVar({
  totalFrames: 9
});
export const gameInfo = makeVar({
  leftPlayerActive: true,
})

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
          leftPlayerActive: true,
        }
      }
    }
  }
})
