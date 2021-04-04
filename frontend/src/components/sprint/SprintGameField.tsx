import React, { useState, useEffect, useRef } from 'react';
import { Theme, createStyles, makeStyles, } from '@material-ui/core/styles';
import { Box, Button, Typography, IconButton } from '@material-ui/core';
import CorrectAnswerIcons from './CorrectAnswerIcons';
import ExtraPointsIcons from './ExtraPointsIcons';
import Timer from './Timer';
import PrepareLayout from './PrepareLayout';
import ListenAudioButton from './ListenAudioButton';
import WinMusic from '../WinMusic';
import LoseMusic from '../LoseMusic';
import PlayMusic from './PlayMusic';
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
    extraPoints: {
      flex: '0 1 100%',
      textAlign: 'center',
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

const REDSHADOW = '0px 0px 10px 8px rgba(252,13,13,0.8)';
const GREENSHADOW = '0px 0px 10px 8px rgba(121,252,13,0.8)';
const EXTRAPOINTURL = `${process.env.PUBLIC_URL}/extraPoint.mp3`;

interface ISprintProps {
  word: IWord,
  auxWord: IWord,
  step: any,
  isAudio: boolean,
  setIsEndLayout: any,
}

const SprintGameField: React.FC<ISprintProps> = (props) => {
  const { audio, word, id } = props.word;
  const { auxWord, isAudio, setIsEndLayout } = props;

  const classes = useStyles();
  const [isPrepareLayout, setIsPrepareLayout] = useState<boolean>(true);
  const [extraPoints, setExtraPoints] = useState<number>(10);
  const [isSingleSequence, setIsSingleSequence] = useState<boolean>(false);
  const [wordSequence, setWordSequence] = useState<number>(0);
  const [superWordSequence, setSuperWordSequence] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [shadow, setShadow] = useState<string>('none');
  const [isWinMusic, setIsWinMusic] = useState<boolean>(false);
  const [isLoseMusic, setIsLoseMusic] = useState<boolean>(false);
  const [isExtraPointMusic, setIsExtraPointMusic] = useState<boolean>(false);
  const [isEndGame, setIsEndGame] = useState<boolean>(false);

  const currLongestCorr = useRef<any>(0);
  const newLongestCorr = useRef<any>(0);

  const handleCorrectAnswer = () => {
    setIsWinMusic(true);

    newLongestCorr.current += 1;

    setShadow(prev => GREENSHADOW);
    setTimeout(() => setShadow(prev => 'none'), 250);

    setScore(prev => prev + extraPoints);

    if (superWordSequence < 4) {
      if (wordSequence < 3) {
        setWordSequence(prev => prev + 1);
      } else if (wordSequence === 3) {
        setWordSequence(prev => 0);
        setSuperWordSequence(prev => prev + 1);
        setExtraPoints(prev => prev * 2);
        setIsExtraPointMusic(true);
      }
    } else if (superWordSequence === 4) {
      setWordSequence(prev => 1);
      setIsSingleSequence(prev => true);
    }

  };

  const handleIncorrectAnswer = () => {
    setIsLoseMusic(true);

    if (currLongestCorr.current < newLongestCorr.current) {
      currLongestCorr.current = newLongestCorr.current;
      newLongestCorr.current = 0;
    }

    setShadow(prev => REDSHADOW);
    setTimeout(() => setShadow(prev => 'none'), 250);

    setExtraPoints(prev => 10);
    setWordSequence(prev => 0);
    setSuperWordSequence(prev => 1);
    setIsSingleSequence(prev => false);
  };

  const handleClickFalse = () => {
    console.log(id, auxWord.id);
    if (id !== auxWord.id) {
      handleCorrectAnswer();
    } else {
      handleIncorrectAnswer();
    }
    props.step();
  };

  const handleClickTrue = () => {
    console.log(id, auxWord.id);
    if (id === auxWord.id) {
      handleCorrectAnswer();
    } else {
      handleIncorrectAnswer();
    }
    props.step();
  };

  const handleTimerEnd = () => {
    setIsEndGame(true);
    setIsEndLayout(true);
  }

 useEffect(() => {
    if (isEndGame) {
      if (currLongestCorr.current < newLongestCorr.current) {
        currLongestCorr.current = newLongestCorr.current;
        newLongestCorr.current = 0;
      }
    }
  }, [isEndGame]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        console.log(event);
        handleClickFalse();
      } else if (event.key === 'ArrowRight') {
        console.log(event);
        handleClickTrue();
      }
    }
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, );

  return (
    <>
    { isPrepareLayout && (<PrepareLayout setIsPrepareLayout={setIsPrepareLayout} isAudio={isAudio} />) }
    { !isPrepareLayout && (
    <Box className={classes.root}>
      <Box className={classes.horizontalRow}>
        <Box style={{flex: '0 1 50%', textAlign: 'left'}}>
          <Timer maxValue={60} action={handleTimerEnd} isAudio={isAudio} />
        </Box>
        <Typography variant="h6" style={{flex: '0 1 50%', textAlign: 'left'}}>
          {score}
        </Typography>
      </Box>
      <Box className={classes.secondRow} style={{boxShadow: `${shadow}`}}>
        <Box className={classes.horizontalRow}>
          <div style={{flex: '0 1 60%', textAlign: 'right'}}>
            <CorrectAnswerIcons wordSequence={wordSequence} isSingleSequence={isSingleSequence} />
          </div>
          <div style={{flex: '0 1 40%', textAlign: 'right'}}>
            <ListenAudioButton audio={audio} />
          </div>
        </Box>
        <Box className={classes.extraPoints}>
          <Typography variant="subtitle1" gutterBottom style={{height: '28px'}}>
            { extraPoints === 10 ? '' : `+${extraPoints} очков за слово`}
          </Typography>
        </Box>
        <ExtraPointsIcons superWordSequence={superWordSequence} />
        <Box className={classes.content}>
          <Typography variant="h4" gutterBottom>{word}</Typography>
          <Typography variant="subtitle1" gutterBottom>{auxWord.wordTranslate}</Typography>
        </Box>
        <Box className={classes.buttonCont}>
          <Button onClick={() => handleClickFalse()} variant="contained" color="secondary">
            Неверно
          </Button>
          <Button onClick={() => handleClickTrue()} variant="contained" color="primary">
            Верно
          </Button>
        </Box>
        <Box className={classes.buttonCont}>
          <IconButton onClick={() => handleClickFalse()} aria-label="add to shopping cart">
            <TrendingFlatIcon className={classes.rotated} />
          </IconButton>
          <IconButton onClick={() => handleClickTrue()} aria-label="add to shopping cart">
            <TrendingFlatIcon />
          </IconButton>
        </Box>
      </Box>
      <PlayMusic
        url={EXTRAPOINTURL}
        isMusic={isExtraPointMusic}
        setIsMusic={setIsExtraPointMusic}
        isMusicValue={isAudio}
      />
      <WinMusic
        isWinMusic={isWinMusic}
        setIsWinMusic={setIsWinMusic}
        isMusicValue={isAudio}
      />
      <LoseMusic
        isLoseMusic={isLoseMusic}
        setIsLoseMusic={setIsLoseMusic}
        isMusicValue={isAudio}
      />
    </Box> )}
    </>
  );
}

export default SprintGameField;
