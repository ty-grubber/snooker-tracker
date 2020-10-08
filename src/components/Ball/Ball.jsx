import styled from '@emotion/styled';
import React from 'react';
import PropTypes from 'prop-types';

const COLOR_MAP = {
  white: '#fff',
  red: '#ce0317',
  yellow: '#f9e137',
  green: '#04541d',
  brown: '#624024',
  blue: '#0632d0',
  pink: '#fb6284',
  black: '#000',
}

export default function Ball({className, color}) {
  const BallDiv = styled.div`
    background-color: ${props => COLOR_MAP[props.color]};
    border: 1px solid black;
    border-radius: 25px;
    cursor: pointer;
    height: 25px;
    position: absolute;
    width: 25px;
  `

  return (
    <BallDiv className={className} color={color}>&nbsp;</BallDiv>
  );
}

Ball.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
}

Ball.defaultProps = {
  className: undefined,
  color: 'red',
}
