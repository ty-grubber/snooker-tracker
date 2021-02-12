/** @jsx jsx */
import { useReactiveVar } from '@apollo/client';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React, { useCallback, useEffect, useState } from 'react';
import { leftPlayerStats, rightPlayerStats, matchStats, gameInfo } from '../../cache';
import { BALL_VALUES, VALUE_TO_BACKGROUND_COLOR, VALUE_TO_FONT_COLOR } from '../../constants/ball';
import Modal from '../Modal';
import StatPopdown from '../StatPopdown';

export default function Scoreboard() {
  const lpData = useReactiveVar(leftPlayerStats);
  const rpData = useReactiveVar(rightPlayerStats);
  const matchData = useReactiveVar(matchStats);
  const currGameInfo = useReactiveVar(gameInfo);

  const scoreboardStyles = css`
    align-content: center;
    display: flex;
    justify-content: center;
    margin: auto;
    max-width: 1000px;
    width: 75%;

    & > div {
      flex-grow: 1;
    }

    & span {
      line-height: 5vh;
    }
  `

  const playerSectionStyles = css`
    border: 2px solid black;
    border-top: 0 none;
    display: flex;
    flex-basis: 40%;
    flex-wrap: wrap;

    & > div {
      flex-grow: 1;
      max-height: 5vh;
    }
  `

  const playerNameStyles = css`
    background-color: grey;
    color: white;
    cursor: pointer;
    flex-basis: 75%;
    font-weight: bold;
  `

  const activePlayerStyles = css`
    background: ${VALUE_TO_BACKGROUND_COLOR[currGameInfo.validBallType]};
    color: ${VALUE_TO_FONT_COLOR[currGameInfo.validBallType]};
  `

  const playerScoreStyles = css`
    background-color: lightyellow;
    width: 40px;
  `

  const matchSectionStyles = css`
    background-color: #eee;
  `

  const NextFrameButton = styled.button`
    background-color: green;
    border: none;
    border-radius: 3px;
    color: white;
    cursor: pointer;
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    text-transform: uppercase;
  `

  const leftPlayerNameStyles = [playerNameStyles];
  const rightPlayerNameStyles = [playerNameStyles];

  if (currGameInfo.leftPlayerActive) {
    leftPlayerNameStyles.push(activePlayerStyles);
  } else {
    rightPlayerNameStyles.push(activePlayerStyles);
  }

  const [showGameEndModal, setShowGameEndModal] = useState(false);

  // TODO: This will eventually change into a dropdown with menu items
  const onPlayerClick = useCallback((playerData) => {
    const { shots, name } = playerData;
    if (shots.attempted > 0) {
      console.log(`${name}'s Pot Success Rate: ${shots.potted}/${shots.attempted} = ${((shots.potted * 100) / shots.attempted).toFixed(1)}%`);
    }
    if (shots.longAttempted > 0) {
      console.log(`${name}'s Long Pot Success Rate: ${shots.longPotted}/${shots.longAttempted} = ${((shots.longPotted * 100) / shots.longAttempted).toFixed(1)}%`);
    }
  }, []);

  const onLeftPlayerClick = useCallback(() => {
    onPlayerClick(lpData);
  }, [lpData, onPlayerClick]);

  const onRightPlayerClick = useCallback(() => {
    onPlayerClick(rpData);
  }, [rpData, onPlayerClick]);

  useEffect(() => {
    console.log(`${currGameInfo.pointsLeft} points left on table.`)
  }, [currGameInfo.pointsLeft]);

  const onGameFinish = useCallback(() => {
    const lpWon = lpData.score > rpData.score;
    matchStats({
      ...matchData,
      leftPlayerFramesWon: matchData.leftPlayerFramesWon + (lpWon ? 1 : 0),
      rightPlayerFramesWon: matchData.rightPlayerFramesWon + (!lpWon ? 1 : 0),
      gameResults: matchData.gameResults.concat([{
        leftPlayerStarted: currGameInfo.leftPlayerStarted,
        lpScore: lpData.score,
        rpScore: rpData.score,
        winnerBreak: lpWon ? lpData.break.longest : rpData.break.longest,
        reRacks: currGameInfo.reRacks,
      }]),
    });
    setShowGameEndModal(false);

    // Reset scores, breaks, and game info with new starting breaker
    leftPlayerStats({
      ...lpData,
      score: 0,
      break: {
        current: 0,
        longest: 0,
      },
    });
    rightPlayerStats({
      ...rpData,
      score: 0,
      break: {
        current: 0,
        longest: 0,
      }
    });
    gameInfo({
      leftPlayerStarted: !currGameInfo.leftPlayerStarted,
      leftPlayerActive: !currGameInfo.leftPlayerStarted,
      redsLeft: 15,
      pointsLeft: 147,
      validBallType: BALL_VALUES.RED,
      reRacks: 0,
      log: [],
    });
  }, [currGameInfo, lpData, matchData, rpData]);

  useEffect(() => {
    if (currGameInfo.validBallType === BALL_VALUES.CUE) {
      console.log('Game has finished.');
      setShowGameEndModal(true);
    }
  }, [currGameInfo.validBallType]);

  const lpWon = lpData.score > rpData.score;

  return (
    <React.Fragment>
      <div css={scoreboardStyles}>
        <div css={playerSectionStyles}>
          <div css={leftPlayerNameStyles} onClick={onLeftPlayerClick}>
            <span>{lpData.name}</span>
          </div>
          <div css={playerScoreStyles}>
            <span>{lpData.score || 0}</span>
          </div>
          <StatPopdown isActive={currGameInfo.leftPlayerActive} textToDisplay="Some Text" />
        </div>
        <div css={matchSectionStyles}>
          <span>{`${matchData.leftPlayerFramesWon} - (${matchData.totalFrames}) - ${matchData.rightPlayerFramesWon}`}</span>
        </div>
        <div css={playerSectionStyles}>
          <div css={playerScoreStyles}>
            <span>{rpData.score || 0}</span>
          </div>
          <div css={rightPlayerNameStyles} onClick={onRightPlayerClick}>
            <span>{rpData.name}</span>
          </div>
          <StatPopdown isActive={!currGameInfo.leftPlayerActive} textToDisplay="Some Other Text" />
        </div>
      </div>
      <Modal
        canClose={false}
        isShowing={showGameEndModal}
        title={`Frame ${matchData.gameResults.length + 1} Complete`}
      >
        <span>{lpWon ? lpData.name : rpData.name} won</span>
        <br />
        <br />
        <span>{lpWon ? lpData.score : rpData.score} - {lpWon ? rpData.score : lpData.score}</span>
        <br />
        <br />
        <span>Longest break: {lpWon ? lpData.break.longest : rpData.break.longest}</span>
        <br />
        <br />
        <br />
        <NextFrameButton onClick={onGameFinish}>Start Next Frame</NextFrameButton>
        {/* <button onClick={onMatchFinish}>Abandon Match</button> */}
      </Modal>
    </React.Fragment>
  )
}
