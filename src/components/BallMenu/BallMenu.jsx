/** @jsx jsx */
import { useReactiveVar } from '@apollo/client';
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { gameInfo, leftPlayerStats, rightPlayerStats } from '../../cache';
import { BALL_VALUES, VALUE_TO_DISPLAY_COLOR } from '../../constants/ballValues';
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

  const switchPlayer = useCallback(() => {
    gameInfo({
      ...currGameInfo,
      leftPlayerActive: !currGameInfo.leftPlayerActive,
    });
  }, [currGameInfo]);

  const onMiss = useCallback(() => {
    console.log(`Missed shot on ${VALUE_TO_DISPLAY_COLOR[ballValue]}.`);
    if (currGameInfo.leftPlayerActive) {
      leftPlayerStats({
        ...lpData,
        shots: {
          ...lpData.shots,
          attempted: lpData.shots.attempted + 1,
        },
      });
    } else {
      rightPlayerStats({
        ...rpData,
        shots: {
          ...rpData.shots,
          attempted: rpData.shots.attempted + 1,
        },
      });
    }
    switchPlayer();
    onAction();
  }, [ballValue, currGameInfo.leftPlayerActive, lpData, onAction, rpData, switchPlayer]);

  const onLongMiss = useCallback(() => {
    console.log(`Missed long shot on ${VALUE_TO_DISPLAY_COLOR[ballValue]}.`);
    if (currGameInfo.leftPlayerActive) {
      leftPlayerStats({
        ...lpData,
        shots: {
          ...lpData.shots,
          attempted: lpData.shots.attempted + 1,
          longAttempted: lpData.shots.longAttempted + 1,
        },
      });
    } else {
      rightPlayerStats({
        ...rpData,
        shots: {
          ...rpData.shots,
          attempted: rpData.shots.attempted + 1,
          longAttempted: rpData.shots.longAttempted + 1,
        },
      });
    }
    switchPlayer();
    onAction();
  }, [ballValue, currGameInfo.leftPlayerActive, lpData, onAction, rpData, switchPlayer]);

  const onPot = useCallback(() => {
    console.log(`Potted ${VALUE_TO_DISPLAY_COLOR[ballValue]}. ${ballValue} ${ballValue === 1 ? 'point' : 'points'}.`);
    if (currGameInfo.leftPlayerActive) {
      leftPlayerStats({
        ...lpData,
        score: lpData.score + ballValue,
        shots: {
          ...lpData.shots,
          attempted: lpData.shots.attempted + 1,
          potted: lpData.shots.potted + 1,
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
      });
    }

    if (ballValue === BALL_VALUES.RED) {
      gameInfo({
        ...currGameInfo,
        redsLeft: currGameInfo.redsLeft - 1,
      })
    }
    onAction();
  }, [ballValue, currGameInfo, lpData, onAction, rpData]);

  const onLongPot = useCallback(() => {
    console.log(`Potted ${VALUE_TO_DISPLAY_COLOR[ballValue]} with long shot. ${ballValue} ${ballValue === 1 ? 'point' : 'points'}.`);
    if (currGameInfo.leftPlayerActive) {
      leftPlayerStats({
        ...lpData,
        score: lpData.score + ballValue,
        shots: {
          ...lpData.shots,
          attempted: lpData.shots.attempted + 1,
          potted: lpData.shots.potted + 1,
          longAttempted: lpData.shots.longAttempted + 1,
          longPotted: lpData.shots.longPotted + 1,
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
          longAttempted: lpData.shots.longAttempted + 1,
          longPotted: lpData.shots.longPotted + 1,
        },
      });
    }

    if (ballValue === BALL_VALUES.RED) {
      gameInfo({
        ...currGameInfo,
        redsLeft: currGameInfo.redsLeft - 1,
      })
    }
    onAction();
  }, [ballValue, currGameInfo, lpData, onAction, rpData]);

  const onSafety = useCallback(() => {
    console.log(`Successful safety on ${VALUE_TO_DISPLAY_COLOR[ballValue]}.`);
    switchPlayer();
    onAction();
  }, [ballValue, onAction, switchPlayer]);

  const onFoul = useCallback(() => {
    const foulValue = Math.max(4, ballValue);
    console.log(`Foul on ${VALUE_TO_DISPLAY_COLOR[ballValue]} ball. ${foulValue} points awarded to opponent.`);
    if (currGameInfo.leftPlayerActive) {
      rightPlayerStats({
        ...rpData,
        score: rpData.score + foulValue,
      });
    } else {
      leftPlayerStats({
        ...lpData,
        score: lpData.score + foulValue,
      });
    }
    switchPlayer();
    onAction();
  }, [ballValue, currGameInfo.leftPlayerActive, lpData, onAction, rpData, switchPlayer]);

  if (!isOpen) {
    return null;
  }

  const shotResults = [
    {
      name: 'Miss',
      onClick: onMiss,
    },
    {
      name: 'Long Miss',
      onClick: onLongMiss,
    },
    {
      name: 'Pot',
      onClick: onPot,
    },
    {
      name: 'Long Pot',
      onClick: onLongPot,
    },
    {
      name: 'Safety',
      onClick: onSafety,
    },
    {
      name: 'Foul',
      onClick: onFoul,
    }
  ];

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
