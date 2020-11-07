import { useState } from 'react';

export default function useModal(isShowingInit = false) {
  const [isShowing, setIsShowing] = useState(isShowingInit);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
  }
};
