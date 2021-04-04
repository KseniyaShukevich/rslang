import React, { useState, useEffect, useRef } from 'react'
import {
         Box,
         Container,
         Button,
        } from '@material-ui/core'
import {
        Theme,
        createStyles,
        makeStyles,
      } from '@material-ui/core/styles'
import Heart from '../components/Heart'
import FullscreenBtn from '../components/FullscreenBtn'
import CloseBtn from '../components/CloseBtn'
import GameLayout from '../components/GameLayout'
import SprintGameField from '../components/sprint/SprintGameField'
import { fetchWords, selectWords } from '../slices/wordsSlice'
import { useSelector, useDispatch } from 'react-redux'
import { getWordsForGame } from '../generationGameWords'
import jungle from '../assets/images/jungle.jpg';
import ControlSounds from '../components/ControlSounds';
import { IWord } from '../interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      backgroundImage: `url(${jungle})`,
      filter: 'grayscale(0.4)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: 'calc(100vh - 40px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
    },
    containerBtns: {
      display: 'flex',
    },
    topBox: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between'
    },
    containerBtn: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    containerGif: {
      width: 'fit-content',
    },
    button: {
      transition: '0.5s',
      "&:hover": {
         backgroundColor: 'rgba(250,250,250,0.1)'
      },
    },
    timerWrapper: {

    },

  })
);

const Sprint: React.FC = () => {
	const classes = useStyles();
  const nameGame: string = 'СПРИНТ';
  const descriptionGame: string = 'Тренировка Спринт помогает пополнить словарный запас';
  const [isAudio, setIsAudio] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isEndLayout, setIsEndLayout] = useState<boolean>(false);
  const [isStartLayout, setIsStartLayout] = useState<boolean>(true);

  const [currentWord, setCurrentWord] = useState<IWord | null>(null);
  const [auxiliaryWord, setAuxiliaryWord] = useState<IWord | null>(null);

  const wordsArray = useSelector(selectWords);
  const dispatch = useDispatch();

  const corrWords = useRef<any>([]);
  const wrongWords = useRef<any>([]);

  const generationWords = useRef<any>(null);

  useEffect(() => {
    dispatch(fetchWords({
      group: 0,
      page: 0
    }));
  }, []);

  useEffect(() => {
    if (!isStartLayout && !isEndLayout && wordsArray) {
      generationWords.current = getWordsForGame(wordsArray, 2);
      step();
    }
  }, [wordsArray, isStartLayout, isEndLayout]);

  const step = () => {
    if (generationWords.current) {
      const [ word, arrayWords, func ] = generationWords.current;
      console.log(word, arrayWords);
      setCurrentWord(prev => word);
      setAuxiliaryWord(prev => arrayWords[Math.round(Math.random())]);
      generationWords.current = func();
    } else {
      setIsEndLayout(prev => true);
    }
  }

  useEffect(() => {
    const handleFullScreen = () => {
      setIsFullscreen(!!document.fullscreenElement);
    }

    document.addEventListener('fullscreenchange', handleFullScreen);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreen);
    };
  }, []);

	return (
			<Box className={classes.box} id='game'>
        <Box className={classes.topBox}>
          <ControlSounds
            isAudio={isAudio}
            setIsAudio={setIsAudio}
          />
          <Box className={classes.containerBtns}>
            <FullscreenBtn
              game={'game'}
              isFullscreen={isFullscreen}
            />
            <CloseBtn />
          </Box>
        </Box>
          <GameLayout
            corrWords={corrWords.current}
            wrongWords={wrongWords.current}
            nameGame={nameGame}
            descriptionGame={descriptionGame}
            isStartLayout={isStartLayout}
            setIsStartLayout={setIsStartLayout}
            isEndLayout={isEndLayout}
            setIsEndLayout={setIsEndLayout}
          >
            <>
            { currentWord && auxiliaryWord && <SprintGameField word={currentWord} auxWord={auxiliaryWord} step={step} isAudio={isAudio} setIsEndLayout={setIsEndLayout} /> }
            </>

          </GameLayout>
      </Box>
	);
}

export default Sprint;
