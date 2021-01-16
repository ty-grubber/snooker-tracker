/** @jsx jsx */
import { useReactiveVar } from '@apollo/client';
import { css, jsx } from '@emotion/core';
import { useCallback, useMemo, useState } from 'react';
import { sizing } from '../../constants/styles';
import { BallDiv } from '../Ball/Ball';
import { gameInfo } from '../../cache';
import BallMenu from '../BallMenu';
import styled from '@emotion/styled';

export default function RedRack() {
  const RedBallDiv = styled(BallDiv)`
    background-color: #ce0317;
  `

  const [isOpen, setIsOpen] = useState(false);
  const onBallClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleAction = useCallback(() => {
    setIsOpen(false);
  }, [])

  const currGameInfo = useReactiveVar(gameInfo);

  const menuVerticalOffsetMultiplier = useMemo(() => {
    switch (true) {
      case currGameInfo.redsLeft > 14:
        return 0;
      case currGameInfo.redsLeft > 9:
        return 0.5;
      case currGameInfo.redsLeft > 5:
        return 1;
      case currGameInfo.redsLeft > 2:
        return 1.5;
      default:
        return 2;
    }
  }, [currGameInfo.redsLeft]);

  const reds = useMemo(() => {
    const redArray = [];
    const ballPositioningStyles = [
      css`
        left: 0;
        top: calc(${sizing.ballDimension} * 2);
      `,
      css`
        left: ${sizing.ballDiameter};
        top: calc(calc(${sizing.ballDimension} * 1.5) - 1px);
      `,
      css`
        left: ${sizing.ballDiameter};
        top: calc(calc(${sizing.ballDimension} * 2.5) + 1px);
      `,
      css`
        left: calc(${sizing.ballDiameter} * 2);
        top: calc(calc(${sizing.ballDimension} * 1) - 2px);
      `,
      css`
        left: calc(${sizing.ballDiameter} * 2);
        top: calc(${sizing.ballDimension} * 2);
      `,
      css`
        left: calc(${sizing.ballDiameter} * 2);
        top: calc(calc(${sizing.ballDimension} * 3) + 2px);
      `,
      css`
        left: calc(${sizing.ballDiameter} * 3);
        top: calc(calc(${sizing.ballDimension} * 0.5) - 3px);
      `,
      css`
        left: calc(${sizing.ballDiameter} * 3);
        top: calc(calc(${sizing.ballDimension} * 1.5) - 1px);
      `,
      css`
        left: calc(${sizing.ballDiameter} * 3);
        top: calc(calc(${sizing.ballDimension} * 2.5) + 1px);
      `,
      css`
        left: calc(${sizing.ballDiameter} * 3);
        top: calc(calc(${sizing.ballDimension} * 3.5) + 3px);
      `,
      css`
        left: calc(${sizing.ballDiameter} * 4);
        top: calc(calc(${sizing.ballDimension} * 0) - 4px);
      `,
      css`
        left: calc(${sizing.ballDiameter} * 4);
        top: calc(calc(${sizing.ballDimension} * 1) - 2px);
      `,
      css`
        left: calc(${sizing.ballDiameter} * 4);
        top: calc(calc(${sizing.ballDimension} * 2) - 0px);
      `,
      css`
        left: calc(${sizing.ballDiameter} * 4);
        top: calc(calc(${sizing.ballDimension} * 3) + 2px);
      `,
      css`
        left: calc(${sizing.ballDiameter} * 4);
        top: calc(calc(${sizing.ballDimension} * 4) + 4px);
      `,
    ];

    for (var i = 0; i < currGameInfo.redsLeft; i += 1) {
      redArray.push(
        <RedBallDiv css={ballPositioningStyles[i]} key={`Red ${i}`} onClick={onBallClick} />
      );
    }

    return redArray;
  }, [currGameInfo.redsLeft, onBallClick]);

  const container = css`
    height: calc(${sizing.ballDimension} * 5);
    left: calc(74% - calc(${sizing.ballDiameter} / 2));
    position: absolute;
    top: calc(50% - calc(${sizing.ballDimension} * 2.5));
    width: calc(${sizing.ballDimension} * 5);

    & > div {
      cursor: pointer;
    }

    & > ul {
      background-color: #ce0317;
      color: #fff;
      cursor: pointer;
      top: calc(100% + calc(${sizing.ballDiameter} / 2) - calc(${sizing.ballDimension} * ${menuVerticalOffsetMultiplier}));
    }
  `

  return (
    <div css={container}>
      {reds}
      <BallMenu ballValue={1} isOpen={isOpen} onAction={handleAction} />
    </div>
  );
}
