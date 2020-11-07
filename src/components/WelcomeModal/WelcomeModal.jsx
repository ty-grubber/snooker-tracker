/** @jsx jsx */
import { useReactiveVar } from '@apollo/client';
import { jsx } from '@emotion/core';
import { useCallback } from 'react';
import { useState } from 'react';
import { leftPlayerStats, matchStats, rightPlayerStats } from '../../cache';
import useModal from '../../utils/useModal';
import Modal from '../Modal';

export default function WelcomeModal() {
  const { isShowing, toggle } = useModal(true);
  const [ leftPlayerName, setLeftPlayerName ] = useState();
  const [ rightPlayerName, setRightPlayerName ] = useState();
  const [ matchFrames, setMatchFrames ] = useState();

  const lpData = useReactiveVar(leftPlayerStats);
  const rpData = useReactiveVar(rightPlayerStats);
  const matchData = useReactiveVar(matchStats);

  const handleP1InputChange = useCallback(({ target }) => {
    setLeftPlayerName(target?.value || '');
  }, [setLeftPlayerName]);

  const handleP2InputChange = useCallback(({ target }) => {
    setRightPlayerName(target?.value || '');
  }, [setRightPlayerName]);

  const handleFramesChange = useCallback(({ target }) => {
    setMatchFrames(target?.value || 0);
  }, [setMatchFrames]);

  const handleSubmission = useCallback((e) => {
    e.preventDefault();
    leftPlayerStats({
      ...lpData,
      name: leftPlayerName,
    });

    rightPlayerStats({
      ...rpData,
      name: rightPlayerName,
    });

    matchStats({
      ...matchData,
      totalFrames: matchFrames,
    });

    toggle();
  }, [leftPlayerName, lpData, matchData, matchFrames, rightPlayerName, rpData, toggle]);

  return (
    <Modal
      isShowing={isShowing}
      onHide={toggle}
      title="Snooker Tracker"
    >
      <form onSubmit={handleSubmission}>
        <p>Please enter the following information to begin:</p>
        <label for="p1NameInput">Player 1 Name:</label>
        <input id="p1NameInput" type="text" name="p1NameInput" onChange={handleP1InputChange} />
        <br /><br />
        <label for="p2NameInput">Player 2 Name:</label>
        <input id="p2NameInput" type="text" name="p2NameInput" onChange={handleP2InputChange} />
        <br /><br />
        <label for="framesInput">Number of Frames:</label>
        <input id="framesInput" type="number" name="framesInput" onChange={handleFramesChange} />
        <br /><br />
        <input type="submit" value="Start!" />
      </form>
    </Modal>
  )
}
