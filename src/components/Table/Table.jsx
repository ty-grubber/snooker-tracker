import styled from '@emotion/styled';
import React from 'react';
import Ball from '../Ball';
import './Table.css';

export default function Table() {
  const WhiteBall = styled(Ball)`
    left: calc(10% - calc(25px / 2));
    top: calc(50% - calc(25px / 2));
  `
  const YellowBall = styled(Ball)`
    left: calc(20% - calc(25px / 2));
    top: calc(75% - calc(25px / 2));
  `
  const BrownBall = styled(Ball)`
    left: calc(20% - calc(25px / 2));
    top: calc(50% - calc(25px / 2));
  `
  const GreenBall = styled(Ball)`
    left: calc(20% - calc(25px / 2));
    top: calc(25% - calc(25px / 2));
  `
  const BlueBall = styled(Ball)`
    left: calc(50% - calc(25px / 2));
    top: calc(50% - calc(25px / 2));
  `
  const PinkBall = styled(Ball)`
    left: calc(70% - calc(25px / 2));
    top: calc(50% - calc(25px / 2));
  `
  const RedBall = styled(Ball)`
    left: calc(80% - calc(25px / 2));
    top: calc(50% - calc(25px / 2));
  `
  const BlackBall = styled(Ball)`
    left: calc(90% - calc(25px / 2));
    top: calc(50% - calc(25px / 2));
  `
  return (
    <div className="Table-outside">
      <div className="Table-inside">
        <div className="Table-baulk circleTop" />
        <div className="Table-baulk circleBottom" />
        <div className="Table-baulk line" />
        <div className="Table-balls">
          <WhiteBall color="white" />
          <YellowBall color="yellow" />
          <BrownBall color="brown" />
          <GreenBall color="green" />
          <BlueBall color="blue" />
          <PinkBall color="pink" />
          <RedBall color="red" />
          <BlackBall color="black" />
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
