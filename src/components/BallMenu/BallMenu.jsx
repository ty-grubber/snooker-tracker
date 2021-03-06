/** @jsx jsx */
import { useReactiveVar } from '@apollo/client';
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { gameInfo, leftPlayerStats, rightPlayerStats } from '../../cache';
import { BALL_VALUES, VALUE_TO_DISPLAY_COLOR } from '../../constants/ball';
import { SHOT_TYPES } from '../../constants/shots';
import { sizing } from '../../constants/styles';

export default function BallMenu({ ballValue, className, isOpen, onAction, openDirection }) {
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
    width: ${sizing.ballMenuWidth};
  `

  const rightMenu = css`
    left: calc(${sizing.ballDimension} * 1.5);
  `

  const bottomMenu = css`
    top: calc(100% + calc(${sizing.ballDimension} / 2));
  `

  const leftMenu = css`
    left: calc(-1 * calc(${sizing.ballMenuWidth} + ${sizing.ballDimension}));
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

  const lpData = useReactiveVar(leftPlayerStats);
  const rpData = useReactiveVar(rightPlayerStats);
  const currGameInfo = useReactiveVar(gameInfo);

  const isValidBallType = useMemo(() => {
    if (ballValue === currGameInfo.validBallType) {
      return true;
    }

    if (ballValue !== BALL_VALUES.RED && currGameInfo.validBallType === BALL_VALUES.ANY_COLOR) {
      return true;
    }

    return false;
  }, [ballValue, currGameInfo.validBallType]);

  const createLogEntry = useCallback((logMessage, shotType) => {
    return {
      message: logMessage,
      shotType,
      statsToUndoTo: {
        leftPlayer: { ...lpData },
        rightPlayer: { ...rpData },
        game: { ...currGameInfo },
      }
    }
  }, [currGameInfo, lpData, rpData]);

  const switchPlayer = useCallback((logEntry) => {
    const { pointsLeft: newPointsLeft, validBallType: currValidBall } = currGameInfo;

    let nextValidBall = BALL_VALUES.RED;

    if (currGameInfo.redsLeft === 0) {
      nextValidBall = currValidBall === BALL_VALUES.ANY_COLOR ? BALL_VALUES.YELLOW : currValidBall;
    }

    gameInfo({
      ...currGameInfo,
      leftPlayerActive: !currGameInfo.leftPlayerActive,
      pointsLeft: newPointsLeft - (currValidBall === BALL_VALUES.ANY_COLOR ? 7 : 0),
      validBallType: nextValidBall,
      log: currGameInfo.log.concat([logEntry]),
    });
  }, [currGameInfo]);

  const onMiss = useCallback(() => {
    const logMessage = `Missed shot on ${VALUE_TO_DISPLAY_COLOR[ballValue]}.`
    console.log(logMessage);
    const logEntry = createLogEntry(logMessage, SHOT_TYPES.MISS);

    if (currGameInfo.leftPlayerActive) {
      leftPlayerStats({
        ...lpData,
        shots: {
          ...lpData.shots,
          attempted: lpData.shots.attempted + 1,
        },
        break: {
          ...lpData.break,
          current: 0,
        }
      });
    } else {
      rightPlayerStats({
        ...rpData,
        shots: {
          ...rpData.shots,
          attempted: rpData.shots.attempted + 1,
        },
        break: {
          ...rpData.break,
          current: 0,
        }
      });
    }

    switchPlayer(logEntry);
    onAction();
  }, [ballValue, createLogEntry, currGameInfo.leftPlayerActive, lpData, onAction, rpData, switchPlayer]);

  const onLongMiss = useCallback(() => {
    const logMessage = `Missed long shot on ${VALUE_TO_DISPLAY_COLOR[ballValue]}.`
    console.log(logMessage);
    const logEntry = createLogEntry(logMessage, SHOT_TYPES.LONG_MISS);

    if (currGameInfo.leftPlayerActive) {
      leftPlayerStats({
        ...lpData,
        shots: {
          ...lpData.shots,
          attempted: lpData.shots.attempted + 1,
          longAttempted: lpData.shots.longAttempted + 1,
        },
        break: {
          ...lpData.break,
          current: 0,
        }
      });
    } else {
      rightPlayerStats({
        ...rpData,
        shots: {
          ...rpData.shots,
          attempted: rpData.shots.attempted + 1,
          longAttempted: rpData.shots.longAttempted + 1,
        },
        break: {
          ...rpData.break,
          current: 0,
        }
      });
    }
    switchPlayer(logEntry);
    onAction();
  }, [ballValue, createLogEntry, currGameInfo.leftPlayerActive, lpData, onAction, rpData, switchPlayer]);

  const onPot = useCallback(() => {
    const wasRedPotted = ballValue === BALL_VALUES.RED;
    const logMessage = `Potted ${VALUE_TO_DISPLAY_COLOR[ballValue]}. ${ballValue} ${wasRedPotted ? 'point' : 'points'}.`;
    console.log(logMessage);
    const logEntry = createLogEntry(logMessage, SHOT_TYPES.POT);

    if (currGameInfo.leftPlayerActive) {
      leftPlayerStats({
        ...lpData,
        score: lpData.score + ballValue,
        shots: {
          ...lpData.shots,
          attempted: lpData.shots.attempted + 1,
          potted: lpData.shots.potted + 1,
        },
        break: {
          current: lpData.break.current + ballValue,
          longest: Math.max(lpData.break.current + ballValue, lpData.break.longest),
        },
      });
    } else {
      rightPlayerStats({
        ...rpData,
        score: rpData.score + ballValue,
        shots: {
          ...rpData.shots,
          attempted: rpData.shots.attempted + 1,
          potted: rpData.shots.potted + 1,
        },
        break: {
          current: rpData.break.current + ballValue,
          longest: Math.max(rpData.break.current + ballValue, rpData.break.longest),
        },
      });
    }

    let nextTargetBall = wasRedPotted ? BALL_VALUES.ANY_COLOR : BALL_VALUES.RED;
    // If there are no reds left, then we need to set the next appropriate color as the target ball
    if (!wasRedPotted && currGameInfo.redsLeft === 0) {
      nextTargetBall = currGameInfo.validBallType === BALL_VALUES.ANY_COLOR ? BALL_VALUES.YELLOW : currGameInfo.validBallType + 1;
    }

    if (currGameInfo.validBallType === BALL_VALUES.BLACK && currGameInfo.redsLeft === 0) {
      nextTargetBall = BALL_VALUES.CUE;
    }

    gameInfo({
      ...currGameInfo,
      redsLeft: wasRedPotted ? currGameInfo.redsLeft - 1 : currGameInfo.redsLeft,
      pointsLeft: currGameInfo.pointsLeft - Math.min(currGameInfo.validBallType, BALL_VALUES.BLACK),
      validBallType: nextTargetBall,
      log: currGameInfo.log.concat([logEntry]),
    });
    onAction();
  }, [ballValue, createLogEntry, currGameInfo, lpData, onAction, rpData]);

  const onLongPot = useCallback(() => {
    const wasRedPotted = ballValue === BALL_VALUES.RED;
    const logMessage = `Potted ${VALUE_TO_DISPLAY_COLOR[ballValue]} with long shot. ${ballValue} ${wasRedPotted ? 'point' : 'points'}.`;
    console.log(logMessage);
    const logEntry = createLogEntry(logMessage, SHOT_TYPES.LONG_POT);

    if (currGameInfo.leftPlayerActive) {
      leftPlayerStats({
        ...lpData,
        score: lpData.score + ballValue,
        shots: {
          attempted: lpData.shots.attempted + 1,
          potted: lpData.shots.potted + 1,
          longAttempted: lpData.shots.longAttempted + 1,
          longPotted: lpData.shots.longPotted + 1,
        },
        break: {
          current: lpData.break.current + ballValue,
          longest: Math.max(lpData.break.current + ballValue, lpData.break.longest),
        },
      });
    } else {
      rightPlayerStats({
        ...rpData,
        score: rpData.score + ballValue,
        shots: {
          attempted: rpData.shots.attempted + 1,
          potted: rpData.shots.potted + 1,
          longAttempted: lpData.shots.longAttempted + 1,
          longPotted: lpData.shots.longPotted + 1,
        },
        break: {
          current: rpData.break.current + ballValue,
          longest: Math.max(rpData.break.current + ballValue, rpData.break.longest),
        },
      });
    }

    let nextTargetBall = wasRedPotted ? BALL_VALUES.ANY_COLOR : BALL_VALUES.RED;
    // If there are no reds left, then we need to set the next appropriate color as the target ball
    if (!wasRedPotted && currGameInfo.redsLeft === 0) {
      nextTargetBall = currGameInfo.validBallType === BALL_VALUES.ANY_COLOR ? BALL_VALUES.YELLOW : currGameInfo.validBallType + 1;
    }

    if (currGameInfo.validBallType === BALL_VALUES.BLACK && currGameInfo.redsLeft === 0) {
      nextTargetBall = BALL_VALUES.CUE;
    }

    gameInfo({
      ...currGameInfo,
      redsLeft: wasRedPotted ? currGameInfo.redsLeft - 1 : currGameInfo.redsLeft,
      pointsLeft: currGameInfo.pointsLeft - Math.min(currGameInfo.validBallType, BALL_VALUES.BLACK),
      validBallType: nextTargetBall,
      log: currGameInfo.log.concat([logEntry]),
    });
    onAction();
  }, [ballValue, createLogEntry, currGameInfo, lpData, onAction, rpData]);

  const onSafety = useCallback(() => {
    const logMessage = `Successful safety on ${VALUE_TO_DISPLAY_COLOR[ballValue]}.`;
    console.log(logMessage);
    const logEntry = createLogEntry(logMessage, SHOT_TYPES.SAFETY);

    if (currGameInfo.leftPlayerActive) {
      leftPlayerStats({
        ...lpData,
        break: {
          ...lpData.break,
          current: 0,
        },
        safeties: lpData.safeties + 1,
      });
    } else {
      rightPlayerStats({
        ...rpData,
        break: {
          ...lpData.break,
          current: 0,
        },
        safeties: rpData.safeties + 1,
      })
    }
    switchPlayer(logEntry);
    onAction();
  }, [ballValue, createLogEntry, currGameInfo.leftPlayerActive, lpData, onAction, rpData, switchPlayer]);

  const onFoul = useCallback(() => {
    const foulValue = Math.max(4, ballValue);
    const logMessage = `Foul on ${VALUE_TO_DISPLAY_COLOR[ballValue]} ball. ${foulValue} points awarded to opponent.`;
    console.log(logMessage);
    const logEntry = createLogEntry(logMessage, SHOT_TYPES.FOUL);

    if (currGameInfo.leftPlayerActive) {
      leftPlayerStats({
        ...lpData,
        break: {
          ...lpData.break,
          current: 0,
        },
        fouls: lpData.fouls + 1,
      })
      rightPlayerStats({
        ...rpData,
        score: rpData.score + foulValue,
      });
    } else {
      rightPlayerStats({
        ...rpData,
        break: {
          ...lpData.break,
          current: 0,
        },
        fouls: rpData.fouls + 1,
      })
      leftPlayerStats({
        ...lpData,
        score: lpData.score + foulValue,
      });
    }
    switchPlayer(logEntry);
    onAction();
  }, [ballValue, createLogEntry, currGameInfo.leftPlayerActive, lpData, onAction, rpData, switchPlayer]);

  if (!isOpen) {
    return null;
  }

  const validBallShotResults = [
    {
      name: SHOT_TYPES.MISS,
      onClick: onMiss,
    },
    {
      name: SHOT_TYPES.LONG_MISS,
      onClick: onLongMiss,
    },
    {
      name: SHOT_TYPES.POT,
      onClick: onPot,
    },
    {
      name: SHOT_TYPES.LONG_POT,
      onClick: onLongPot,
    },
    {
      name: SHOT_TYPES.SAFETY,
      onClick: onSafety,
    }
  ];

  const foulShotResult = [
    {
      name: SHOT_TYPES.FOUL,
      onClick: onFoul,
    }
  ];

  const shotResults = isValidBallType ? validBallShotResults.concat(foulShotResult) : foulShotResult;

  return (
    <ul className={className} css={menuStyles}>
      {shotResults.map(({name, onClick}) => (
        <li css={menuItem} key={name} onClick={onClick}>{name}</li>
      ))}
    </ul>
  )
}

BallMenu.propTypes = {
  ballValue: PropTypes.number.isRequired,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  onAction: PropTypes.func,
  openDirection: PropTypes.oneOf(['bottom', 'left', 'right']),
}

BallMenu.defaultProps = {
  className: undefined,
  isOpen: false,
  onAction: () => { },
  openDirection: 'bottom',
}
