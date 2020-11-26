/** @jsx jsx */
import { useReactiveVar } from '@apollo/client';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';
import { gameInfo, leftPlayerStats, matchStats, rightPlayerStats } from '../../cache';
import useModal from '../../utils/useModal';
import Modal from '../Modal';

export default function WelcomeModal() {
  const SubmitInput = styled.input`
    background-color: green;
    border: none;
    border-radius: 3px;
    color: white;
    cursor: pointer;
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    text-transform: uppercase;
  `

  const Label = styled.label`
    font-size: 0.9rem;
    font-weight: 600;
  `

  const RadioInput = styled.input`
    margin-right: 1rem;
    margin-top: 1px;
  `

  const RadioLabel = styled(Label)`
    font-weight: 400;
    vertical-align: top;
  `

  const fieldStyles = css`
    align-items: center;
    display: flex;
    justify-content: space-between;
    max-width: 315px;
  `

  const inputStyles = css`
    line-height: 2;
    margin-left: -5px;
    padding-left: 5px;
    width: 145px;
  `

  const formErrorStyles = css`
    color: red;
    font-size: 0.9rem;
  `

  const { isShowing, toggle } = useModal(true);
  const [leftPlayerName, setLeftPlayerName] = useState();
  const [rightPlayerName, setRightPlayerName] = useState();
  const [startingPlayer, setStartingPlayer] = useState();
  const [matchFrames, setMatchFrames] = useState();
  const [formError, setFormError] = useState();

  const lpData = useReactiveVar(leftPlayerStats);
  const rpData = useReactiveVar(rightPlayerStats);
  const currGameInfo = useReactiveVar(gameInfo);
  const matchData = useReactiveVar(matchStats);

  const handleP1InputChange = useCallback(({ target }) => {
    setLeftPlayerName(target?.value || '');
  }, []);

  const handleP2InputChange = useCallback(({ target }) => {
    setRightPlayerName(target?.value || '');
  }, []);

  const handleFramesChange = useCallback(({ target }) => {
    setMatchFrames(target?.value || 0);
  }, []);

  const handleStarterChange = useCallback(({ target }) => {
    setStartingPlayer(target?.value || '');
  }, []);

  const handleSubmission = useCallback((e) => {
    e.preventDefault();
    if (matchFrames > 0) {
      leftPlayerStats({
        ...lpData,
        name: leftPlayerName,
      });

      rightPlayerStats({
        ...rpData,
        name: rightPlayerName,
      });

      gameInfo({
        ...currGameInfo,
        leftPlayerStarted: startingPlayer === 'p1',
        leftPlayerActive: startingPlayer === 'p1',
      });

      matchStats({
        ...matchData,
        totalFrames: matchFrames,
      });

      toggle();
      return;
    }

    setFormError('The number of frames for the match must be greater than 0');
  }, [currGameInfo, leftPlayerName, lpData, matchData, matchFrames, rightPlayerName, rpData, startingPlayer, toggle]);

  return (
    <Modal
      canClose={false}
      isShowing={isShowing}
      title="Snooker Tracker"
    >
      <form onSubmit={handleSubmission}>
        <p>Please enter the following information to begin:</p>
        <div css={fieldStyles}>
          <Label for="p1NameInput">Player 1 Name:</Label>
          <input id="p1NameInput" type="text" name="p1NameInput" css={inputStyles} onChange={handleP1InputChange} required />
        </div>
        <br /><br />
        <div css={fieldStyles}>
          <Label for="p2NameInput">Player 2 Name:</Label>
          <input id="p2NameInput" type="text" name="p2NameInput" css={inputStyles} onChange={handleP2InputChange} required />
        </div>
        <br /><br />
        <div css={fieldStyles}>
          <Label for="framesInput">Number of Frames:</Label>
          <input id="framesInput" type="number" name="framesInput" css={inputStyles} onChange={handleFramesChange} required />
        </div>
        <br />
        <hr />
        <br />
        <Label>Select Player To Break First:</Label>
        <br /><br />
        <div>
          <RadioInput id="p1FirstBreakInput" type="radio" name="firstBreak" value="p1" onClick={handleStarterChange} required checked={startingPlayer === 'p1'} />
          <RadioLabel for="p1FirstBreakInput">{leftPlayerName || 'Player 1'}</RadioLabel>
          <br /><br />
          <RadioInput id="p2FirstBreakInput" type="radio" name="firstBreak" value="p2" onClick={handleStarterChange} required checked={startingPlayer === 'p2'} />
          <RadioLabel for="p2FirstBreakInput">{rightPlayerName || 'Player 2'}</RadioLabel>
        </div>
        {!!formError && (
          <React.Fragment>
            <br /><br />
            <span css={formErrorStyles}>{formError}</span>
          </React.Fragment>
        )}
        <br /><br />
        <SubmitInput type="submit" value="Start!" />
      </form>
    </Modal>
  )
}
