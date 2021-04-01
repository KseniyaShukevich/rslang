import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core'
import {
        Theme,
        createStyles,
        makeStyles,
      } from '@material-ui/core/styles'
import { IWord } from '../interfaces'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrong: {
      padding: 10,
      margin: 20,
      background: 'rgba(50, 0, 0, 0.5)',
      color: 'white',
      transition: 'background 0.2s',
      zIndex: 10,
    },
    correct: {
      padding: 10,
      margin: 20,
      background: 'rgba(0, 50, 0, 0.5)',
      color: 'white',
      transition: 'background 0.2s',
      zIndex: 10,
    },
    box: {
      padding: 10,
      margin: 20,
      color: 'white',
      transition: 'background 0.5s',
      zIndex: 10,
      '&:hover': {
        cursor: 'pointer',
        background: 'rgba(250,250,250,0.1)',
      }
    },
  })
);

interface IProps {
  keyBtn: any,
  index: number,
  isCorrWord?: boolean,
  setIsCorrWord?: (value: boolean) => void
  successAnimation: () => void,
  failAnimation: () => void,
  setLifes: any,
  corrWord: IWord | null,
  word: IWord,
  number: number,
}

const WordBtn: React.FC<IProps> = ({
  keyBtn,
  index,
  isCorrWord,
  setIsCorrWord,
  successAnimation,
  failAnimation,
  setLifes,
  corrWord,
  word,
  number ,
}: IProps) => {
  const classes = useStyles();
  const [isWrong, setIsWrong] = useState<boolean>(false);

  const step = () => {
    if (corrWord && (word.id === corrWord.id)) {
      successAnimation();
    } else {
      failAnimation();
      setLifes((prev: number) => prev - 1);
      setIsWrong(true);
      if (setIsCorrWord) setIsCorrWord(true);
      setTimeout(() => {
        setIsWrong(false);
        if (setIsCorrWord) setIsCorrWord(false);
      }, 500);
    }
  }

  const handleClick = () => {
    step();
  }

  useEffect(() => {
    if (keyBtn.current === index) {
      step();
    }
  }, [keyBtn.current]);

  return (
    <Typography
      variant='h6'
      className={isCorrWord ? classes.correct : (isWrong ? classes.wrong : classes.box)}
      onClick={handleClick}
    >
      <span style={{fontSize: 14, paddingRight: 7, opacity: 0.7}}>
        {number}
      </span>
      {word.wordTranslate}
    </Typography>
  );
}

export default WordBtn;
