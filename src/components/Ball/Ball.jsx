import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { sizing } from '../../constants/styles';
import BallMenu from '../BallMenu';

export const BallDiv = styled.div`
  border: ${sizing.ballBorder} solid #000;
  border-radius: ${sizing.ballDiameter};
  cursor: pointer;
  height: ${sizing.ballDiameter};
  position: absolute;
  width: ${sizing.ballDiameter};
`

export default function Ball({className, menuOpenDirection, value}) {
  const [isOpen, setIsOpen] = useState(false);
  const onBallClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleAction = useCallback(() => {
    setIsOpen(false);
  }, [])

  return (
    <BallDiv className={className} onClick={onBallClick}>
      <BallMenu ballValue={value} isOpen={isOpen} onAction={handleAction} openDirection={menuOpenDirection} />
    </BallDiv>
  );
}

Ball.propTypes = {
  className: PropTypes.string,
  menuOpenDirection: PropTypes.oneOf(['bottom', 'left', 'right']),
  value: PropTypes.number.isRequired,
}

Ball.defaultProps = {
  className: undefined,
  menuOpenDirection: 'bottom',
}
