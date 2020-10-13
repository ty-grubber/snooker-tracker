import styled from '@emotion/styled';
import React from 'react';
import Ball from '../Ball';
import { sizing } from '../../constants/styles';
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
    <div className="Table-outside">
      <div className="Table-inside">
        <div className="Table-baulk circleTop" />
        <div className="Table-baulk circleBottom" />
        <div className="Table-baulk line" />
        <div className="Table-balls">
          <YellowBall menuOpenDirection="bottom" />
          <BrownBall menuOpenDirection="left" />
          <GreenBall menuOpenDirection="right" />
          <BlueBall />
          <PinkBall />
          <RedBall />
          <BlackBall />
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
