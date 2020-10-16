/** @jsx jsx */
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/core';
import { sizing } from '../../constants/styles';
import { VALUE_TO_DISPLAY_COLOR } from '../../constants/ballValues';
import { leftPlayerStats, rightPlayerStats, gameInfo } from '../../cache';
import { useReactiveVar } from '@apollo/client';

export default function BallMenu({ ballValue, className, isOpen, openDirection }) {
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

  const lpData = useReactiveVar(leftPlayerStats);
  const rpData = useReactiveVar(rightPlayerStats);
  const currGameInfo = useReactiveVar(gameInfo);

  const onMiss = useCallback(() => {
    console.log(`Missed shot on ${VALUE_TO_DISPLAY_COLOR[ballValue]}.`);
    gameInfo({
      ...currGameInfo,
      leftPlayerActive: !currGameInfo.leftPlayerActive,
    });
  }, [ballValue, currGameInfo]);

  const onLongMiss = useCallback(() => {
    console.log(`Missed long shot on ${VALUE_TO_DISPLAY_COLOR[ballValue]}.`);
    gameInfo({
      ...currGameInfo,
      leftPlayerActive: !currGameInfo.leftPlayerActive,
    });
  }, [ballValue, currGameInfo]);

  const onPot = useCallback(() => {
    console.log(`Potted ${VALUE_TO_DISPLAY_COLOR[ballValue]}. ${ballValue} ${ballValue === 1 ? 'point' : 'points'}`);
    if (currGameInfo.leftPlayerActive) {
      leftPlayerStats({
        ...lpData,
        score: lpData.score + ballValue,
      });
    } else {
      rightPlayerStats({
        ...rpData,
        score: rpData.score + ballValue,
      });
    }
  }, [ballValue, currGameInfo.leftPlayerActive, lpData, rpData]);

  const onLongPot = useCallback(() => {
    console.log(`Potted ${VALUE_TO_DISPLAY_COLOR[ballValue]} with long shot. ${ballValue} ${ballValue === 1 ? 'point' : 'points'}`);
    if (currGameInfo.leftPlayerActive) {
      leftPlayerStats({
        ...lpData,
        score: lpData.score + ballValue,
      });
    } else {
      rightPlayerStats({
        ...rpData,
        score: rpData.score + ballValue,
      });
    }
  }, [ballValue, currGameInfo.leftPlayerActive, lpData, rpData]);

  const onSafety = useCallback(() => {
    console.log(`Successful safety on ${VALUE_TO_DISPLAY_COLOR[ballValue]}.`);
  }, [ballValue]);

  const onFoul = useCallback(() => {
    console.log(`Foul on ${VALUE_TO_DISPLAY_COLOR[ballValue]} ball. ${ballValue < 4 ? 4 : ballValue} points awarded to opponent`);
  }, [ballValue]);

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
  openDirection: PropTypes.oneOf(['bottom', 'left', 'right']),
}

BallMenu.defaultProps = {
  className: undefined,
  isOpen: false,
  openDirection: 'bottom',
}
