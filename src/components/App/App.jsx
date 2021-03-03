import React from 'react';
import Scoreboard from '../Scoreboard';
import Table from '../Table';
import WelcomeModal from '../WelcomeModal';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Scoreboard />
      <Table />
      <br />
      <span>See console for game log.</span>
      <WelcomeModal />
    </div>
  );
}

