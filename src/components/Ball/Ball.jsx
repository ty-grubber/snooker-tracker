import styled from '@emotion/styled';
import React from 'react';

export default function Ball() {
  const BallDiv = styled.div`
    background-color: green;
    border: 1px solid black;
    height: 25px;
    width: 25px;
    border-radius: 25px;
    position: relative;
  `

  return (
    <BallDiv>&nbsp;</BallDiv>
  )
}
