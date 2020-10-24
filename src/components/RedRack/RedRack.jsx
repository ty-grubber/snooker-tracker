/** @jsx jsx */
import { useReactiveVar } from '@apollo/client';
import { css, jsx } from '@emotion/core';
import { sizing } from '../../constants/styles';
import { BallDiv } from '../Ball/Ball';
import { gameInfo } from '../../cache';

export default function RedRack() {
  const container = css`
    height: calc(${sizing.ballDiameter} * 5);
    width: calc(${sizing.ballDiameter} * 5);
  `

  const ballPositioningStyles = [
    css`
      left: 0;
      top: calc(${sizing.ballDiameter} * 2);
    `
  ];

  const currGameInfo = useReactiveVar(gameInfo);

  const reds = [];

  for (var i = 0; i < currGameInfo.redsLeft; i += 1) {
    reds.push(
      <BallDiv css={ballPositioningStyles[i]} key={`Red ${i}`} />
    );
  }

  return (
    <div css={container}>
      {reds}
    </div>
  );
}
