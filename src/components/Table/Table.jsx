import { useReactiveVar } from '@apollo/client';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { gameInfo } from '../../cache';
import { BALL_VALUES } from '../../constants/ball';
import { sizing } from '../../constants/styles';
import Ball from '../Ball';
import RedRack from '../RedRack';
import './Table.css';

export default function Table() {
  const YellowBall = styled(Ball)`
    background-color: #f9e137;
    left: calc(20% - calc(${sizing.ballDimension} / 2));
    top: calc(75% - calc(${sizing.ballDimension} / 2));

    & > ul {
      background-color: #f9e137;
    }
  `
  const GreenBall = styled(Ball)`
    background-color: #04541d;
    left: calc(20% - calc(${sizing.ballDimension} / 2));
    top: calc(25% - calc(${sizing.ballDimension} / 2));

    & > ul {
      background-color: #04541d;
      color: #fff;
    }
  `
  const BrownBall = styled(Ball)`
    background-color: #624024;
    left: calc(20% - calc(${sizing.ballDimension} / 2));
    top: calc(50% - calc(${sizing.ballDimension} / 2));

    & > ul {
      background-color: #624024;
      color: #fff;
    }
  `
  const BlueBall = styled(Ball)`
    background-color: #0632d0;
    left: calc(50% - calc(${sizing.ballDimension} / 2));
    top: calc(50% - calc(${sizing.ballDimension} / 2));

    & > ul {
      background-color: #0632d0;
      color: #fff;
    }
  `
  const PinkBall = styled(Ball)`
    background-color: #fb6284;
    left: calc(70% - calc(${sizing.ballDimension} / 2));
    top: calc(50% - calc(${sizing.ballDimension} / 2));

    & > ul {
      background-color: #fb6284;
    }
  `

  const BlackBall = styled(Ball)`
    background-color: #000;
    left: calc(90% - calc(${sizing.ballDimension} / 2));
    top: calc(50% - calc(${sizing.ballDimension} / 2));

    & > ul {
      background-color: #000;
      color: #fff;
    }
  `

  const [maxBallValueLeft, setMaxBallValueLeft] = useState(BALL_VALUES.RED);
  const currGameInfo = useReactiveVar(gameInfo);

  useEffect(() => {
    if (currGameInfo.redsLeft === 0 && currGameInfo.validBallType !== BALL_VALUES.CUE) {
      setMaxBallValueLeft(currGameInfo.validBallType);
    }
  }, [currGameInfo.redsLeft, currGameInfo.validBallType]);

  return (
    <div className="Table-outside">
      <div className="Table-inside">
        <div className="Table-baulk circleTop" />
        <div className="Table-baulk circleBottom" />
        <div className="Table-baulk line" />
        <div className="Table-balls">
          {maxBallValueLeft <= BALL_VALUES.GREEN && (
            <GreenBall menuOpenDirection="right" value={BALL_VALUES.GREEN} />
          )}
          {maxBallValueLeft <= BALL_VALUES.BROWN && (
            <BrownBall menuOpenDirection="left" value={BALL_VALUES.BROWN} />
          )}
          {maxBallValueLeft <= BALL_VALUES.YELLOW && (
            <YellowBall menuOpenDirection="right" value={BALL_VALUES.YELLOW} />
          )}
          {maxBallValueLeft <= BALL_VALUES.BLUE && (
            <BlueBall value={BALL_VALUES.BLUE} />
          )}
          {maxBallValueLeft <= BALL_VALUES.PINK && (
            <PinkBall value={BALL_VALUES.PINK} menuOpenDirection="left" />
          )}
          {maxBallValueLeft <= BALL_VALUES.RED && (
            <RedRack />
          )}
          {maxBallValueLeft <= BALL_VALUES.BLACK && (
            <BlackBall value={BALL_VALUES.BLACK} />
          )}
        </div>
      </div>
      <div id="left-top" className="Table-pocket" />
      <div id="center-top" className="Table-pocket" />
      <div id="right-top" className="Table-pocket" />
      <div id="left-bottom" className="Table-pocket" />
      <div id="center-bottom" className="Table-pocket" />
      <div id="right-bottom" className="Table-pocket" />
    </div>
  )
}
