import styled from '@emotion/styled';
import React from 'react';
import Ball from '../Ball';
import './Table.css';

export default function Table() {
  const PinkBall = styled(Ball)`
    left: 75%;
    top: 50%;
  `
  return (
    <div className="Table-outside">
      <div className="Table-inside">
        <div className="Table-baulk circleTop" />
        <div className="Table-baulk circleBottom" />
        <div className="Table-baulk line" />
        <div className="Table-balls">
          <PinkBall color="pink" />
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
