/** @jsx jsx */
import { jsx } from '@emotion/core';
import useModal from '../../utils/useModal';
import Modal from '../Modal';

export default function WelcomeModal() {
  const { isShowing, toggle } = useModal(true);
  return (
    <Modal
      isShowing={isShowing}
      onHide={toggle}
      title="Snooker Tracker"
    >
      <p>Please enter the competitors names:</p>
    </Modal>
  )
}
