import React from 'react';
import Ball from '../Ball';
import './Table.css';

export default function Table() {
  return (
    <div className="Table-outside">
      <div className="Table-bumpers">
        <div className="Table-baulk circleTop" />
        <div className="Table-baulk circleBottom" />
        <div className="Table-baulk line" />
      </div>
      <div id="left-top" className="Table-pocket" />
      <div id="center-top" className="Table-pocket" />
      <div id="right-top" className="Table-pocket" />
      <div id="left-bottom" className="Table-pocket" />
      <div id="center-bottom" className="Table-pocket" />
      <div id="right-bottom" className="Table-pocket" />
      <div className="Table-balls">
        <Ball />
      </div>
    </div>
  )
}
