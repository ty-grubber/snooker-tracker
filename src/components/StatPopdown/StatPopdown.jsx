/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';

export default function StatPopdown({ isActive, textToDisplay }) {
  const structureStyles = css`
    background-color: lightblue;
    height: 0;
    overflow: hidden;
    padding-left: 1rem;
    text-align: left;
    transition: height 1s;
  `

  const activeWrapperStyles = css`
    line-height: 4vh;
    height: 4vh;
  `

  const wrapperStyles = [structureStyles];
  if (isActive) {
    wrapperStyles.push(activeWrapperStyles);
  }

  return (
    <div css={wrapperStyles}>
      {textToDisplay}
    </div>
  )
}

StatPopdown.propTypes = {
  isActive: PropTypes.bool,
  textToDisplay: PropTypes.node,
}

StatPopdown.defaultProps = {
  isActive: false,
  textToDisplay: undefined,
}
