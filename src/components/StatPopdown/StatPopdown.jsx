/** @jsx jsx */
import { css, jsx, keyframes } from '@emotion/core';
import PropTypes from 'prop-types';
import { ALT_STAT_DISPLAY_LENGTH_IN_SEC } from '../../constants/misc';

export default function StatPopdown({ isActive, messageArray }) {
  const structureStyles = css`
    background-color: lightblue;
    border-top: 0;
    height: 0;
    line-height: 5vh;
    margin-bottom: 5vh;
    overflow: hidden;
    padding-left: 1rem;
    text-align: left;
    transition: all 1s;
    transition-delay: ${ALT_STAT_DISPLAY_LENGTH_IN_SEC - 1}s;
    width: 100%;
  `

  const activeWrapperStyles = css`
    border-top: 1px solid lightblue;
    height: 5vh;
    margin-bottom: 0;
  `

  const wrapperStyles = [structureStyles];
  if (isActive) {
    wrapperStyles.push(activeWrapperStyles);
  }

  if (!messageArray.length) {
    return null;
  }

  const twoMessages = keyframes`
    0%, 5%, 100% {
      transform: translate3d(0, 0, 0);
    }

    15%, 95% {
      transform: translate3d(0, -50%, 0);
    }
  `;

  const listStyles = css`
    animation-duration: ${ALT_STAT_DISPLAY_LENGTH_IN_SEC}s;
    animation-iteration-count: 1;
    animation-name: ${twoMessages};
    list-style: none;
    margin-top: 0;
    padding-left: 0;
  `

  return (
    <div css={wrapperStyles}>
      {messageArray.length === 1
        ? messageArray[0]
        : (
          <ul css={listStyles}>
            {messageArray.map(message => (
              <li key={message}>
                {message}
              </li>
            ))}
          </ul>
        )
      }
    </div>
  )
}

StatPopdown.propTypes = {
  isActive: PropTypes.bool,
  messageArray: PropTypes.arrayOf(PropTypes.string),
}

StatPopdown.defaultProps = {
  isActive: false,
  messageArray: [],
}
