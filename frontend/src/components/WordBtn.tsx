import React from 'react';
import { Typography } from '@material-ui/core'
import {
        Theme,
        createStyles,
        makeStyles,
      } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      padding: 10,
      margin: 20,
      color: 'white',
      transition: 'background 0.5s',
      '&:hover': {
        cursor: 'pointer',
        background: 'rgba(250,250,250,0.1)',
      }
    },
  })
);

interface IProps {
  word: string,
  number: number,
}

const WordBtn: React.FC<IProps> = ({ word, number }: IProps) => {
  const f = 7;
  const classes = useStyles();

  return (
    <Typography variant='h6' className={classes.box}>
      <span style={{fontSize: 14, paddingRight: 7, opacity: 0.7}}>
        {number}
      </span>
      {word}
    </Typography>
  );
}

export default WordBtn;
