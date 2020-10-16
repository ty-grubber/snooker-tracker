/** @jsx jsx */
import { css, jsx } from '@emotion/core';

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

  const playerScoreStyles = css`
    background-color: lightyellow;
  `

  const matchSectionStyles = css`
    border-left: 2px solid black;
    border-right: 2px solid black;
  `

  return (
    <div css={scoreboardStyles}>
      <div css={playerSectionStyles}>
        <div css={playerNameStyles}>
          <span>Player 1 name</span>
        </div>
        <div css={playerScoreStyles}>
          <span>P1 Score</span>
        </div>
      </div>
      <div css={matchSectionStyles}>
        <span>Current Match section</span>
      </div>
      <div css={playerSectionStyles}>
        <div css={playerScoreStyles}>
          <span>P2 Score</span>
        </div>
        <div css={playerNameStyles}>
          <span>Player 2 name</span>
        </div>
      </div>
    </div>
  )
}
