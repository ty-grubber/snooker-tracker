/** @jsx jsx */
import { useReactiveVar } from '@apollo/client';
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { leftPlayerStats, rightPlayerStats, matchStats, gameInfo } from '../../cache';
import { BALL_VALUES, VALUE_TO_BACKGROUND_COLOR, VALUE_TO_FONT_COLOR } from '../../constants/ball';

export default function Scoreboard({ onGameFinish }) {
  const lpData = useReactiveVar(leftPlayerStats);
  const rpData = useReactiveVar(rightPlayerStats);
  const matchData = useReactiveVar(matchStats);
  const currGameInfo = useReactiveVar(gameInfo);

  const scoreboardStyles = css`
    align-content: center;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    height: 5vh;
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
    display: flex;
    flex-basis: 40%;

    & > div {
      flex-grow: 1;
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
    border-left: 2px solid black;
    border-right: 2px solid black;
  `

  const leftPlayerNameStyles = [playerNameStyles];
  const rightPlayerNameStyles = [playerNameStyles];

  if (currGameInfo.leftPlayerActive) {
    leftPlayerNameStyles.push(activePlayerStyles);
  } else {
    rightPlayerNameStyles.push(activePlayerStyles);
  }

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

  const logGameData = useCallback(() => {
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
  }, [currGameInfo.leftPlayerStarted, currGameInfo.reRacks, lpData.break.longest, lpData.score, matchData, rpData.break.longest, rpData.score]);

  useEffect(() => {
    if (currGameInfo.validBallType === BALL_VALUES.CUE) {
      console.log('Game has finished.');
      // TODO: final tally of scores, declare winner, trigger modal to start next frame or abandon match
      logGameData();
      onGameFinish();
    }
  }, [currGameInfo.validBallType, logGameData, onGameFinish]);

  return (
    <div css={scoreboardStyles}>
      <div css={playerSectionStyles}>
        <div css={leftPlayerNameStyles} onClick={onLeftPlayerClick}>
          <span>{lpData.name}</span>
        </div>
        <div css={playerScoreStyles}>
          <span>{lpData.score || 0}</span>
        </div>
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
      </div>
    </div>
  )
}

Scoreboard.propTypes = {
  onGameFinish: PropTypes.func,
};

Scoreboard.defaultProps = {
  onGameFinish: () => { },
};
