import styled from '@emotion/styled';
import React from 'react';
import PropTypes from 'prop-types';
import { sizing } from '../../constants/styles';

export default function Ball({className}) {
  const BallDiv = styled.div`
    border: 1px solid #000;
    border-radius: ${sizing.ballDiameter};
    cursor: pointer;
    height: ${sizing.ballDiameter};
    position: absolute;
    width: ${sizing.ballDiameter};
  `

  return (
    <BallDiv className={className}>&nbsp;</BallDiv>
  );
}

Ball.propTypes = {
  className: PropTypes.string,
}

Ball.defaultProps = {
  className: undefined,
}
