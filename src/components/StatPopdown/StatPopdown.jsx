/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';

export default function StatPopdown({ isActive, textToDisplay }) {
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
