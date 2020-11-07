import React from 'react';
import useModal from '../../utils/useModal';
import Modal from '../Modal';
import Scoreboard from '../Scoreboard';
import Table from '../Table';
import './App.css';

export default function App() {
  const { isShowing, toggle } = useModal(true);

  return (
    <div className="App">
      <Scoreboard />
      <br />
      <span>See console for game log.</span>
      <Table />
      <Modal
        isShowing={isShowing}
        onHide={toggle}
      >
        <p>Welcome to the Snooker Tracker!</p>
      </Modal>
    </div>
  );
}

