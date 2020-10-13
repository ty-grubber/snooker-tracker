/** @jsx jsx */
import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/core';
import { sizing } from '../../constants/styles';

export default function BallMenu({ className, isOpen, openDirection }) {
  const menu = css`
    background-color: white;
    color: black;
    left: 0;
    margin: 0;
    padding-left: 0;
    position: absolute;
    text-align: left;
    top: 0;
  `

  const menuItem = css`
    border: 1px solid;
    display: block;
    font-size: 1.25rem;
    padding-left: 5px;
    padding-right: 5px;
    width: 100px;
  `

  const rightMenu = css`
    left: calc(${sizing.ballDiameter} + 10px);
  `

  const bottomMenu = css`
    top: calc(100% + 10px);
  `

  const leftMenu = css`
    left: calc(-1 * calc(100px + 20px));
    text-align: right;
  `

  const menuStyles = [menu];

  switch (openDirection) {
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

  const shotResults = ['Miss', 'Long Miss', 'Pot', 'Long Pot', 'Safety', 'Foul'];

  return (
    <ul className={className} css={menuStyles}>
      {shotResults.map(result => (
        <li css={menuItem} key={result}>{result}</li>
      ))}
    </ul>
  )
}

BallMenu.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  openDirection: PropTypes.oneOf(['bottom', 'left', 'right']),
}

BallMenu.defaultProps = {
  className: undefined,
  isOpen: false,
  openDirection: 'bottom',
}
