/** @jsx jsx */
import { useReactiveVar } from '@apollo/client';
import { css, jsx } from '@emotion/core';
import { leftPlayerStats, rightPlayerStats, matchStats, gameInfo } from '../../cache';

export default function Scoreboard() {
  const scoreboardStyles = css`
    align-content: center;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    height: 5vh;
    margin: auto;
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
    flex-basis: 75%;
    font-weight: bold;
  `

  const activePlayerStyles = css`
    border-bottom: 3px solid brown;
  `

  const playerScoreStyles = css`
    background-color: lightyellow;
    width: 40px;
  `

  const matchSectionStyles = css`
    border-left: 2px solid black;
    border-right: 2px solid black;
  `

  const lpData = useReactiveVar(leftPlayerStats);
  const rpData = useReactiveVar(rightPlayerStats);
  const matchData = useReactiveVar(matchStats);
  const currGameInfo = useReactiveVar(gameInfo);

  const leftPlayerNameStyles = [playerNameStyles];
  const rightPlayerNameStyles = [playerNameStyles];

  if (currGameInfo.leftPlayerActive) {
    leftPlayerNameStyles.push(activePlayerStyles);
  } else {
    rightPlayerNameStyles.push(activePlayerStyles);
  }

  return (
    <div css={scoreboardStyles}>
      <div css={playerSectionStyles}>
        <div css={leftPlayerNameStyles}>
          <span>{lpData.name}</span>
        </div>
        <div css={playerScoreStyles}>
          <span>{lpData.score || 0}</span>
        </div>
      </div>
      <div css={matchSectionStyles}>
        <span>{`0 - (${matchData.totalFrames || 9}) - 0`}</span>
      </div>
      <div css={playerSectionStyles}>
        <div css={playerScoreStyles}>
          <span>{rpData.score || 0}</span>
        </div>
        <div css={rightPlayerNameStyles}>
          <span>{rpData.name}</span>
        </div>
      </div>
    </div>
  )
}
