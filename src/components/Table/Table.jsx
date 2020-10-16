import styled from '@emotion/styled';
import React from 'react';
import { BALL_VALUES } from '../../constants/ballValues';
import { sizing } from '../../constants/styles';
import Ball from '../Ball';
import Scoreboard from '../Scoreboard';
import './Table.css';

export default function Table() {
  const YellowBall = styled(Ball)`
    background-color: #f9e137;
    left: calc(20% - calc(${sizing.ballDiameter} / 2));
    top: calc(75% - calc(${sizing.ballDiameter} / 2));

    & > ul {
      background-color: #f9e137;
    }
  `
  const GreenBall = styled(Ball)`
    background-color: #04541d;
    left: calc(20% - calc(${sizing.ballDiameter} / 2));
    top: calc(25% - calc(${sizing.ballDiameter} / 2));

    & > ul {
      background-color: #04541d;
      color: #fff;
    }
  `
  const BrownBall = styled(Ball)`
    background-color: #624024;
    left: calc(20% - calc(${sizing.ballDiameter} / 2));
    top: calc(50% - calc(${sizing.ballDiameter} / 2));

    & > ul {
      background-color: #624024;
      color: #fff;
    }
  `
  const BlueBall = styled(Ball)`
    background-color: #0632d0;
    left: calc(50% - calc(${sizing.ballDiameter} / 2));
    top: calc(50% - calc(${sizing.ballDiameter} / 2));

    & > ul {
      background-color: #0632d0;
      color: #fff;
    }
  `
  const PinkBall = styled(Ball)`
    background-color: #fb6284;
    left: calc(70% - calc(${sizing.ballDiameter} / 2));
    top: calc(50% - calc(${sizing.ballDiameter} / 2));

    & > ul {
      background-color: #fb6284;
    }
  `
  const RedBall = styled(Ball)`
    background-color: #ce0317;
    left: calc(80% - calc(${sizing.ballDiameter} / 2));
    top: calc(50% - calc(${sizing.ballDiameter} / 2));

    & > ul {
      background-color: #ce0317;
      color: #fff;
    }
  `
  const BlackBall = styled(Ball)`
    background-color: #000;
    left: calc(90% - calc(${sizing.ballDiameter} / 2));
    top: calc(50% - calc(${sizing.ballDiameter} / 2));

    & > ul {
      background-color: #000;
      color: #fff;
    }
  `
  return (
    <div>
      <div className="Scoreboard">
        <Scoreboard />
      </div>
      <div className="Table-outside">
        <div className="Table-inside">
          <div className="Table-baulk circleTop" />
          <div className="Table-baulk circleBottom" />
          <div className="Table-baulk line" />
          <div className="Table-balls">
            <GreenBall menuOpenDirection="right" value={BALL_VALUES.GREEN} />
            <BrownBall menuOpenDirection="left" value={BALL_VALUES.BROWN} />
            <YellowBall menuOpenDirection="bottom" value={BALL_VALUES.YELLOW} />
            <BlueBall value={BALL_VALUES.BLUE} />
            <PinkBall value={BALL_VALUES.PINK} />
            <RedBall value={BALL_VALUES.RED} />
            <BlackBall value={BALL_VALUES.BLACK} />
          </div>
        </div>
        <div id="left-top" className="Table-pocket" />
        <div id="center-top" className="Table-pocket" />
        <div id="right-top" className="Table-pocket" />
        <div id="left-bottom" className="Table-pocket" />
        <div id="center-bottom" className="Table-pocket" />
        <div id="right-bottom" className="Table-pocket" />
      </div>
    </div>
  )
}
