/** @jsx jsx */
import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/core';
import { sizing } from '../../constants/styles';

export default function BallMenu({ className, isOpen, openDirection }) {
  const menu = css`
    background-color: white;
    color: black;
    height: 40px;
    max-width: 40px;
    position: absolute;
    top: 0;
    left: 0;
  `

  const rightMenu = css`
    left: calc(${sizing.ballDiameter} + 10px);
  `

  const bottomMenu = css`
    top: calc(100% + 10px);
  `

  const leftMenu = css`
    left: calc(-1 * calc(${sizing.ballDiameter} * 2));
  `

  const topMenu = css`
    top: calc(100% + 10px * -1);
  `

  const menuStyles = [menu];

  switch (openDirection) {
    case 'top':
      menuStyles.push(topMenu);
      break;

    case 'right':
      menuStyles.push(rightMenu);
      break;

    case 'bottom':
      menuStyles.push(bottomMenu);
      break;

    case 'left':
      menuStyles.push(leftMenu);
      break;

    default:
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className={className} css={menuStyles}>This is the ball menu.</div>
  )
}

BallMenu.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  openDirection: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
}

BallMenu.defaultProps = {
  className: undefined,
  isOpen: false,
  openDirection: 'bottom',
}
