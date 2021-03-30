import React, { ReactElement } from 'react'
import StartLayout from './StartLayout'
import ResultOfMiniGame from './ResultOfMiniGame'

interface IProps {
  isStartLayout: boolean
  isEndLayout: boolean
  setIsEndLayout: (value: boolean) => void
  setIsStartLayout: (value: boolean) => void
  children: ReactElement | Array<ReactElement>
}

const GameLayout: React.FC<IProps> = ({
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
            <StartLayout setIsStartLayout={setIsStartLayout} />
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
              setIsEndLayout={setIsEndLayout}
              setIsStartLayout={setIsEndLayout}
            />
          )
        }
      </>
	);
}

export default GameLayout;
