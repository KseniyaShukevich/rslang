import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import FullscreenBtn from '../components/FullscreenBtn';
import CloseBtn from '../components/CloseBtn';
import GameLayout from '../components/GameLayout';
import SprintGameField from '../components/sprint/SprintGameField';
import { fetchWords, selectWords } from '../slices/wordsSlice';
import { selectUser } from "../slices/userSlice";
import { useSelector, useDispatch } from 'react-redux';
import { getWordsForGame } from '../generationGameWords';
import { addStatisticsToDB, addStatisticsToLStorage } from '../calcStatistics';
import { calcStatisticsWordsToDB, calcStatisticsWordsToLS } from '../calcStatisticsWords';
import jungle from '../assets/images/jungle.jpg';
import ControlSounds from '../components/ControlSounds';
import { IWord } from '../interfaces';
import { ID_LOCALE_STORAGE } from '../utils/constants';

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

const getWords = (): Array<IWord> | undefined => {
  console.log('YES');
  const res: string | null = localStorage.getItem(`${ID_LOCALE_STORAGE}gameWords`);
  if (res) {
    return JSON.parse(res);
  }
}

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
  const [restWords, setRestWords] = useState<number>(0);
  const [isEndGame, setIsEndGame] = useState<boolean>(false);
  const [wordsArray, setWordsArray] = useState<Array<IWord> | undefined>(() => getWords());

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const corrWords = useRef<any>([]);
  const wrongWords = useRef<any>([]);
  const currLongestCorr = useRef<any>(0);
  const newLongestCorr = useRef<any>(0);

  const generationWords = useRef<any>(null);

  useEffect(() => {
    dispatch(fetchWords({
      group: 0,
      page: 0
    }));
  }, [dispatch]);

  useEffect(() => {
    if (!isStartLayout && !isEndLayout && wordsArray) {
      generationWords.current = getWordsForGame(wordsArray, 2);
      step();
    }
  }, [wordsArray, isStartLayout, isEndLayout]);

  const getObjectForStatisticsWords = () => {
    const resultWords: Array<any> = [];
    corrWords.current.forEach((word: any) => {
      resultWords.push({
        ...word,
        correct: 1
      });
    });
    wrongWords.current.forEach((word: any) => {
      resultWords.push({
        ...word,
        wrong: 1
      });
    });
    return resultWords;
  }

  useEffect(() => {
    if (isEndGame) {
      cleanSequence();
      const resultWords = getObjectForStatisticsWords();

      if (user) {
        calcStatisticsWordsToDB(
          'sprint',
          resultWords,
          user.userId,
          user.token
        );
        addStatisticsToDB(
          user.userId,
          user.token,
          'sprint',
          corrWords.current.length + wrongWords.current.length,
          corrWords.current.length,
          wrongWords.current.length,
          currLongestCorr.current
        );
      } else {
        calcStatisticsWordsToLS(
          'sprint',
          resultWords,
        );
        addStatisticsToLStorage(
          'sprint',
          corrWords.current.length + wrongWords.current.length,
          corrWords.current.length,
          wrongWords.current.length,
          currLongestCorr.current
        );
      }
    }
  }, [isEndGame, user]);

  const pushCorrectWord = () => {
    corrWords.current.push(currentWord);
  };

  const pushWrongWord = () => {
    wrongWords.current.push(currentWord);
  };

  const addToSequence = () => {
    newLongestCorr.current += 1;
  }

  const cleanSequence = () => {
    if (currLongestCorr.current < newLongestCorr.current) {
      currLongestCorr.current = newLongestCorr.current;
      newLongestCorr.current = 0;
    }
  }

  const step = () => {
    if (generationWords.current) {
      const [ word, arrayWords, func, rest ] = generationWords.current;
      console.log(word, arrayWords);
      setCurrentWord(prev => word);
      setAuxiliaryWord(prev => arrayWords[Math.round(Math.random())]);
      setRestWords(prev => rest);
      generationWords.current = func();
    } else {
      setIsEndLayout(prev => true);
      setIsEndGame(prev => true);
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
            { currentWord && auxiliaryWord && <SprintGameField
              word={currentWord}
              auxWord={auxiliaryWord}
              restWords={restWords}
              step={step}
              isAudio={isAudio}
              setIsEndGame={setIsEndGame}
              setIsEndLayout={setIsEndLayout}
              pushCorrectWord={pushCorrectWord}
              pushWrongWord={pushWrongWord}
              addToSequence={addToSequence}
              cleanSequence={cleanSequence}
              />
            }
            </>

          </GameLayout>
      </Box>
	);
}

export default Sprint;
