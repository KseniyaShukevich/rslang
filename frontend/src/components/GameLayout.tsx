import React, { ReactElement } from 'react'
import { CSSTransition } from 'react-transition-group'

import { IWord } from '../interfaces'
import StartLayout from './StartLayout'
import ResultOfMiniGame from './ResultOfMiniGame'

interface IProps {
  corrWords: Array<IWord>,
  wrongWords: Array<IWord>,
  nameGame: string,
  descriptionGame: string,
  isStartLayout: boolean
  isEndLayout: boolean
  setIsEndLayout: (value: boolean) => void
  setIsStartLayout: (value: boolean) => void
  children: ReactElement | Array<ReactElement>
}

const GameLayout: React.FC<IProps> = ({
  corrWords,
  wrongWords,
  nameGame,
  descriptionGame,
  isStartLayout,
  isEndLayout,
  setIsEndLayout,
  setIsStartLayout,
  children
}: IProps) => {

	return (
    <>
      {
        isStartLayout && (
          <StartLayout
            nameGame={nameGame}
            descriptionGame={descriptionGame}
            setIsStartLayout={setIsStartLayout}
          />
        )
      }
      {
        (!isStartLayout && !isEndLayout) && (
          <>
          {children}
          </>
        )
      }
      {
        <CSSTransition in={isEndLayout} timeout={500} classNames="smooth-route" unmountOnExit>
          <ResultOfMiniGame
            corrWords={corrWords}
            wrongWords={wrongWords}
          />
        </CSSTransition>
      }
    </>
	);
}

export default GameLayout;
