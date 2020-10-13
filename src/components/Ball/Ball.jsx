import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { sizing } from '../../constants/styles';
import BallMenu from '../BallMenu';

export default function Ball({className, menuOpenDirection}) {
  const BallDiv = styled.div`
    border: 1px solid #000;
    border-radius: ${sizing.ballDiameter};
    cursor: pointer;
    height: ${sizing.ballDiameter};
    position: absolute;
    width: ${sizing.ballDiameter};
  `
  const [isOpen, setIsOpen] = useState(false);
  const onBallClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <BallDiv className={className} onClick={onBallClick}>
      <BallMenu isOpen={isOpen} openDirection={menuOpenDirection} />
    </BallDiv>
  );
}

Ball.propTypes = {
  className: PropTypes.string,
  menuOpenDirection: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
}

Ball.defaultProps = {
  className: undefined,
  menuOpenDirection: 'bottom',
}
