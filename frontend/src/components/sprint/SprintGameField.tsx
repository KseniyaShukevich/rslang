import React, { useState, useEffect } from 'react';
import { Theme, createStyles, makeStyles, } from '@material-ui/core/styles';
import { Box, Button, Typography, IconButton } from '@material-ui/core';
import CorrectAnswerIcons from './CorrectAnswerIcons';
import ExtraPointsIcons from './ExtraPointsIcons';
import Timer from './Timer';
import PrepareLayout from './PrepareLayout';
import ListenAudioButton from './ListenAudioButton';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import { IWord } from '../../interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '650px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      color: 'white',
    },
    horizontalRow: {
      flex: '0 1 100%',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginBottom: '10px',
      padding: '0px 15px',
    },
    secondRow: {
      flex: '0 1 100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '10px',
      backgroundColor: '#358049',
      border: 'solid 1px white',
      padding: '15px 10px',
    },
    content: {
      margin: '10px 0',
      textAlign: 'center',
    },
    buttonCont: {
      display: 'flex',
      justifyContent: 'center',
      columnGap: '15px',
      margin: '10px 0',
    },
    rotated: {
      transform: 'rotate(180deg)',
    },
  })
);

interface ISprintProps {
  word: IWord,
  step: any,
}

const SprintGameField: React.FC<ISprintProps> = (props) => {
  const { audio, word, wordTranslate, id } = props.word;

  const classes = useStyles();
  const [isPrepareLayout, setIsPrepareLayout] = useState<boolean>(true);
  const [extraPoints, setExtraPoints] = useState<number>(0);
  const [wordSequence, setWordSequence] = useState<number>(0);
  const [superWordSequence, setSuperWordSequence] = useState<number>(1);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        console.log('incorrect');
        props.step();
      } else if (event.key === 'ArrowRight') {
        console.log('correct');
        props.step();
      }
    }

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  const handleClick = () => {
    props.step();
  }

  return (
    <>
    { isPrepareLayout && (<PrepareLayout setIsPrepareLayout={setIsPrepareLayout} />) }
    { !isPrepareLayout && (
    <Box className={classes.root}>
      <Box className={classes.horizontalRow}>
        <Box style={{flex: '0 1 45%', textAlign: 'left'}}>
          <Timer maxValue={60} />
        </Box>
        <Typography variant="h6" style={{flex: '0 1 55%', textAlign: 'left'}}>
          {score}
        </Typography>
      </Box>
      <Box className={classes.secondRow}>
        <Box className={classes.horizontalRow}>
          <div style={{flex: '0 1 60%', textAlign: 'right'}}>
            <CorrectAnswerIcons wordSequence={wordSequence} />
          </div>
          <div style={{flex: '0 1 40%', textAlign: 'right'}}>
            <ListenAudioButton audio={audio} />
          </div>
          <Typography variant="subtitle1" gutterBottom style={{flex: '0 1 100%', textAlign: 'center'}}>
            { !extraPoints ? '' : `+${extraPoints} очков за слово`}
          </Typography>
        </Box>
        <ExtraPointsIcons superWordSequence={superWordSequence} />
        <Box className={classes.content}>
          <Typography variant="h4" gutterBottom>{word}</Typography>
          <Typography variant="subtitle1" gutterBottom>{wordTranslate}</Typography>
        </Box>
        <Box className={classes.buttonCont}>
          <Button onClick={() => handleClick()} variant="contained" color="secondary">
            Неверно
          </Button>
          <Button onClick={() => handleClick()} variant="contained" color="primary">
            Верно
          </Button>
        </Box>
        <Box className={classes.buttonCont}>
          <IconButton onClick={() => handleClick()} aria-label="add to shopping cart">
            <TrendingFlatIcon className={classes.rotated} />
          </IconButton>
          <IconButton onClick={() => handleClick()} aria-label="add to shopping cart">
            <TrendingFlatIcon />
          </IconButton>
        </Box>
      </Box>
    </Box> )}
    </>
  );
}

export default SprintGameField;
