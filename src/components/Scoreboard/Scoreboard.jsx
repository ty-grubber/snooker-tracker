/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export default function Scoreboard() {
  const scoreboardStyles = css`
    display: flex;
    justify-content: center;
    margin: auto;
    width: 90%;

    & > div {
      display: flex;
      flex-grow: 1;
    }
  `

  const playerSectionStyles = css`
    flex-basis: 40%;

    & > div {
      flex-grow: 1;
    }
  `

  const playerNameStyles = css`
    flex-basis: 75%;
  `

  return (
    <div css={scoreboardStyles}>
      <div css={playerSectionStyles}>
        <div css={playerNameStyles}>
          Player 1 name
        </div>
        <div>
          P1 Score
        </div>
      </div>
      <div>
        Current Match section
      </div>
      <div css={playerSectionStyles}>
        <div>
          P2 Score
        </div>
        <div css={playerNameStyles}>
          Player 2 name
        </div>
      </div>
    </div>
  )
}
