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
import CLOUDURL from '../constants/CLOUDURL'
import Heart from '../components/Heart'
import FullscreenBtn from '../components/FullscreenBtn'
import CloseBtn from '../components/CloseBtn'
import GameLayout from '../components/GameLayout'
import { fetchWords, selectWords } from '../slices/wordsSlice'
import { useSelector, useDispatch } from 'react-redux'
import { getWordsForGame } from '../generationGameWords'
import OwnGameField from "../components/OwnGameField"
import AudioCallGameField from "../components/AudioCallGameField"
import {IWord} from "../interfaces"
import ControlSounds from '../components/ControlSounds'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      background: 'linear-gradient(81deg, #ddb35f, #7409c7);',
      height: 'calc(100vh - 40px)',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: 20,
    },
    containerBtns: {
      display: 'flex',
    },
    topBox: {
      width: 'calc(100vw - 40px)',
      display: 'flex',
      position: 'absolute',
      padding: 20,
      justifyContent: 'space-between',
      top: 0,
      right: 0
    },
    containerBtn: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    containerGif: {
      width: 'fit-content',
    },
    lifes: {
      display: 'flex',
      alignItems: 'center',
    },
    button: {
      transition: '0.5s',
      "&:hover": {
        backgroundColor: 'rgba(250,250,250,0.1)'
      },
    },
  })
);

const OwnGame: React.FC = () => {
	const classes = useStyles();
  const nameGame: string = 'АУДИОВЫЗОВ';
  const descriptionGame: string = 'Тренировка улучшает восприятие речи на слух.';
  const [isAudio, setIsAudio] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isEndLayout, setIsEndLayout] = useState<boolean>(false);
  const [isStartLayout, setIsStartLayout] = useState<boolean>(true);

  const [lifes, setLifes]= useState<number>(5);
  const [trueWord, setTrueWord] = useState<IWord | null>(null);
  const [wordArray, setWordArray] = useState<Array<IWord> | null>(null);


  const wordsArray = useSelector(selectWords);
  const dispatch = useDispatch();

  const generationWords = useRef<any>(null);

  const corrWords = useRef<any>([]);
  const wrongWords = useRef<any>([]);

  useEffect(() => {
    dispatch(fetchWords({
      group: 0,
      page: 0
    }));
  }, []);

  useEffect(() => {
    if (!isStartLayout && !isEndLayout && wordsArray) {
      generationWords.current = getWordsForGame(wordsArray, 5);
    }
  }, [wordsArray, isStartLayout, isEndLayout]);

  const step = () => {
    if (generationWords.current) {
      const [ word, arrayWords, func ] = generationWords.current;
      setTrueWord(word)
      setWordArray(arrayWords)
      generationWords.current = func();
    } else {
      setIsEndLayout(true)
    }
  }

  document.addEventListener('fullscreenchange', (event) => {
    setIsFullscreen(!!document.fullscreenElement);
  });

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
            <Box className={classes.lifes}>
              <Heart lifes={lifes} />
            </Box>
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

            <Container maxWidth='md' className={classes.containerBtn} >
              <OwnGameField trueWord={trueWord}
                            wordArray={wordArray}
                            setLifes={setLifes}
                            lifes={lifes}
                            step={step}
                            setIsEndLayout={setIsEndLayout} />
              <div style={{position: 'absolute', bottom: 0}}>
                <span>Кнопки для понимания, как это работает</span>
                <Button color='primary' onClick={step}>
                  Ход
                </Button>
                <Button color='primary' onClick={() => {setIsEndLayout(true)}}>
                  Закончилась игра
                </Button>
              </div>
            </Container>

          </GameLayout>
      </Box>
	);
}

export default OwnGame;
