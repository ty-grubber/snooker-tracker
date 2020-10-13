import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

export default function BallMenu({ className, isOpen }) {
  const Menu = styled.div`
    background-color: white;
    color: black;
    height: 40px;
    position: absolute;
    top: -50px;
  `

  if (!isOpen) {
    return null;
  }

  return (
    <Menu className={className}>This is the ball menu.</Menu>
  )
}

BallMenu.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool,
}

BallMenu.defaultProps = {
  className: undefined,
  isOpen: false,
}
