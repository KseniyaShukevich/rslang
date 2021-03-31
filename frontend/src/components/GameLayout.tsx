import React, { ReactElement } from 'react'
import StartLayout from './StartLayout'
import ResultOfMiniGame from './ResultOfMiniGame'
import { IWord } from '../interfaces'

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
          isEndLayout && (
            <ResultOfMiniGame
              corrWords={corrWords}
              wrongWords={wrongWords}
            />
          )
        }
      </>
	);
}

export default GameLayout;
