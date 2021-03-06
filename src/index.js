import { ApolloClient, ApolloProvider } from '@apollo/client';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { statsCache } from './cache';

const client = new ApolloClient({
  uri: '/graphql',
  cache: statsCache,
});

render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
