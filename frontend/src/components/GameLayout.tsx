import React, { useState, ReactElement } from 'react'
import {
         Button,
        } from '@material-ui/core'
import StartLayout from './StartLayout'

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
            <div style={{color: 'white', textAlign: 'center'}}>
              END LAYOUT
              <Button color='primary'>
                Продолжить тренировку
              </Button>
              <Button color='primary'>
                К списку тренировок
              </Button>
            </div>
          )
        }
      </>
	);
}

export default GameLayout;
