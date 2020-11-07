/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

export default function Modal({ children, isShowing, onHide }) {
  const overlayStyles = css`
    background-color: #000;
    height: 100vh;
    left: 0;
    opacity: 0.5;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 1040;
  `

  const wrapperStyles = css`
    height: 100%;
    left: 0;
    outline: 0;
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1050;
  `

  const contentStyles = css`
    background: white;
    border-radius: 3px;
    margin: 1.75rem auto;
    max-width: 500px;
    padding: 2rem;
    position: relative;
    z-index: 100;
  `

  if (!isShowing) {
    return null;
  }

  return ReactDOM.createPortal(
    <React.Fragment>
      <div css={overlayStyles} />
      <div css={wrapperStyles} aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div css={contentStyles}>
          <div className="modal-header">
            <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={onHide}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {children}
        </div>
      </div>
    </React.Fragment>, document.body
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  isShowing: PropTypes.bool.isRequired,
  onHide: PropTypes.func,
}

Modal.defaultProps = {
  children: undefined,
  onHide: () => { },
}
