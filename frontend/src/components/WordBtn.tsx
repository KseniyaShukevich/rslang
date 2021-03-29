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
  successAnimation: () => void,
  failAnimation: () => void,
  corrWord: IWord | null,
  word: IWord,
  number: number,
}

const WordBtn: React.FC<IProps> = ({
  successAnimation,
  failAnimation,
  corrWord,
  word,
  number ,
}: IProps) => {
  const classes = useStyles();
  const [isWrong, setIsWrong] = useState<boolean>(false);

  const handleClick = () => {
    if (corrWord && (word.id === corrWord.id)) {
      successAnimation();
    } else {
      failAnimation();
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 500);
    }
  }

  return (
    <Typography
      variant='h6'
      className={isWrong ? classes.wrong : classes.box}
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
