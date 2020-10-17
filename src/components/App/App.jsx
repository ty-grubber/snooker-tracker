import React from 'react';
import Scoreboard from '../Scoreboard';
import Table from '../Table';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Scoreboard />
      <br />
      <span>See console for game log.</span>
      <Table />
    </div>
  );
}

