import { InMemoryCache, makeVar } from "@apollo/client";

export const leftPlayerStats = makeVar({});
export const rightPlayerStats = makeVar({});
export const matchStats = makeVar({});

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
        }
      }
    }
  }
})
