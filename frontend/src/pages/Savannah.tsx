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
import WordBtn from '../components/WordBtn'
import { Image } from 'cloudinary-react'
import FullscreenBtn from '../components/FullscreenBtn'
import CloseBtn from '../components/CloseBtn'
import GameLayout from '../components/GameLayout'
import { fetchWords, selectWords } from '../slices/wordsSlice'
import { useSelector, useDispatch } from 'react-redux'
import { getWordsForGame } from '../generationGameWords'
import { IWord } from '../interfaces'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      backgroundImage: `url('${CLOUDURL}/rslang/Illustration02_yokda5')`,
      backgroundPosition: '0 100%',
      backgroundSize: 'cover',
      transition: '0.5s',
      height: 'calc(100vh - 40px)',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      padding: 20,
    },
    word: {
      opacity: 0,
      position: 'absolute',
      color: 'white',
      fontSize: 50,
      fontWeight: 'lighter',
      transition: 'opacity 7s, top 0.1s',
      top: '-15%',
    },
    rectangle: {
      width: 4,
      height: 30,
      background: 'white',
      borderRadius: '50%',
      position: 'absolute',
      display: 'none',
      transition: '0.3s'
    },
    circle: {
      width: 70,
      height: 70,
      borderRadius: '50%',
      border: 'solid 1px grey',
      display: 'flex',
      justifyContent: 'center',
      alignItem: 'center',
    },
    wordTime: {
      color: 'grey',
      fontSize: 50,
    },
    startGame: {
      top: 0,
      left: 0,
      position: 'absolute',
      height: '100vh',
      width: '100vw',
      zIndex: 20,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(0,0,0,0.5)',
    },
    startTime: {
      width: 200,
      height: 200,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: `url('${CLOUDURL}/rslang/XZ5V_sywvww')`,
      backgroundSize: 'cover',
      color: 'white',
      fontSize: 60,
    },
    topBox: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    containerBtn: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    containerGif: {
      width: 'fit-content',
      display: 'flex',
      height: 200,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '-15vh',
    },
    succesGif: {
      backgroundSize: 'cover',
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

const Savannah: React.FC = () => {
	const classes = useStyles();
  const gameName: string = 'САВАННА';
  const descriptionGame: string = 'Тренировка Саванна развивает словарный запас.';
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isEndLayout, setIsEndLayout] = useState<boolean>(false);
  const [isStartLayout, setIsStartLayout] = useState<boolean>(true);
  const [currWord, setCurrWord] = useState<IWord | null>(null);
  const [bgPosition, setBgPosition] = useState<number>(100);
  const [step, setStep] = useState<number>(0);
  const [top, setTop] = useState<number>(-15);
  const [isCorrWord, setIsCorrWord] = useState<boolean>(false);
  const [arrayWords, setArrayWords] = useState<Array<IWord> | null>(null)
  const [lifes, setLifes] = useState<number>(5);
  const [isStartTime, setIsStartTime] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(3);
  const [wordTime, setWordTime] = useState<number>(8);

  const words = useSelector(selectWords);
  const dispatch = useDispatch();

  const generationWords = useRef<any>(null);
  const wordEl = useRef<any>(null);
  const container = useRef<any>(null);
  const rectangle = useRef<any>(null);
  const corrBtn = useRef<number>(-1);
  const gif = useRef<any>(null);
  const idInterval = useRef<any>(null);
  const idStartTime = useRef<any>(null);
  const keyBtn = useRef<any>(-1);

  const setNewWords = () => {
    wordEl.current.style.opacity = 1;
    const [ word, newArrWords, func ] = generationWords.current;
    corrBtn.current = newArrWords.indexOf(word);
    setCurrWord(word);
    setArrayWords(newArrWords);
    generationWords.current = func();
  }

  const doStep = () => {
    if (generationWords.current) {
      setTimeout(() => {
        if (wordEl.current) {
          wordEl.current.style.display = '';
          rectangle.current.style.display = '';
        }
      }, 300);
      setNewWords();
    } else {
      clearInterval(idInterval.current);
      setIsEndLayout(true);
    }
  }

  const startWord = () => {
    idInterval.current = setInterval(() => setTop((prev) => prev + 1), 100);
  }

  const addStartTime = () => {
    idStartTime.current = setInterval(() => setStartTime((prev) => prev - 1), 1000);
  }

  const successAnimation = () => {
    gif.current.style.backgroundImage = `url('${CLOUDURL}/rslang/XZ5V_sywvww')`;
    setTimeout(() => {
      if (gif.current) {
        gif.current.style.backgroundImage = '';
      }
    }, 1000);
    wordEl.current.style.display = 'none';
    rectangle.current.style.display = 'block';
    rectangle.current.style.top = `${top}%`;
    if (rectangle.current) {
      setTimeout(() => rectangle.current.style.top = '90%', 0);
    }
    setTop(-15);
    setBgPosition((prev: number) => prev - step);
    doStep();
  }

  const failAnimation = () => {
    setTop(-15);
    wordEl.current.style.opacity = 0;
    wordEl.current.style.opacity = 0;
    wordEl.current.style.transition = '0.3s';
    wordEl.current.style.fontSize = '100px';
    setTimeout(() => {
      if (wordEl.current) {
        wordEl.current.style.fontSize = '';
        wordEl.current.style.transition = '';
        doStep();
      }
    }, 500);
  }

  useEffect(() => {
    if (lifes === 0) {
      setTimeout(() => {
        clearInterval(idInterval.current);
        setIsEndLayout(true);
      }, 300);
    }
  }, [lifes]);

  useEffect(() => {
    const initPosition = 15;
    const forSeconds = 10;
    const time = top + initPosition;

    setWordTime(8 - Math.floor(time / forSeconds));
    if (wordEl.current) {
      wordEl.current.style.top = `${top}%`;
    }
    if (top === 70) {
      setLifes((prev) => prev - 1);
      failAnimation();
    };
  }, [top]);

  useEffect(() => {
    container.current.style.backgroundPosition = `0 ${bgPosition}%`;
  }, [bgPosition]);

  useEffect(() => {
    if (!isStartLayout && !isEndLayout) {
      setIsStartTime(true);
      addStartTime();
      dispatch(fetchWords({
        group: 0,
        page: 0
      }));
    }
  }, [isStartLayout, isEndLayout]);

  useEffect(() => {
    if (startTime === 0 && words) {
      clearInterval(idStartTime.current);
      setIsStartTime(false);
      startWord();
    }
  }, [startTime, words]);

  useEffect(() => {
    if (!isStartLayout && !isEndLayout && words) {
      if (idInterval.current) {
        clearInterval(idInterval.current);
      }
      generationWords.current = getWordsForGame(words, 5);
      setNewWords();
      setStep(100 / words.length);
    }
  }, [words, isStartLayout, isEndLayout]);

  const checkKeyDown = (event: KeyboardEvent) => {
    const key = +event.key;
    if (key) {
      keyBtn.current = key - 1;
    }
  }

  useEffect(() => {
    document.addEventListener('fullscreenchange', (event) => {
      setIsFullscreen(!!document.fullscreenElement);
    });
    document.addEventListener('keydown', checkKeyDown);
  }, []);

	return (
			<div ref={container} className={classes.box} id='savannah'>
        {
          isStartTime && (
            <Box className={classes.startGame}>
              <Box className={classes.startTime}>
                <div>
                  {startTime}
                </div>
              </Box>
            </Box>
          )
        }
        <Box className={classes.topBox}>
          <FullscreenBtn
            game={'savannah'}
            isFullscreen={isFullscreen}
          />
          <Box className={classes.lifes}>
            <Heart lifes={lifes} />
          </Box>
          <CloseBtn />
        </Box>
        <GameLayout
          isStartLayout={isStartLayout}
          setIsStartLayout={setIsStartLayout}
          isEndLayout={isEndLayout}
          setIsEndLayout={setIsEndLayout}
        >
          <Container maxWidth='md' className={classes.containerBtn}>
            <div
              ref={wordEl}
              className={classes.word}
            >
              {currWord ? currWord.wordTranslate : ''}
            </div>
            <div
              ref={rectangle}
              className={classes.rectangle}
            />
            {
              isStartTime ? '' : (
                arrayWords ? arrayWords.map((el, index) =>
                  (corrBtn.current === index) ? (
                    <WordBtn
                    keyBtn={keyBtn}
                    index={index}
                    isCorrWord={isCorrWord}
                    successAnimation={successAnimation}
                    failAnimation={failAnimation}
                    setLifes={setLifes}
                    corrWord={currWord}
                    word={el}
                    number={index + 1}
                    key={index}
                  />
                  ) : (
                    <WordBtn
                    keyBtn={keyBtn}
                    index={index}
                    setIsCorrWord={setIsCorrWord}
                    successAnimation={successAnimation}
                    failAnimation={failAnimation}
                    setLifes={setLifes}
                    corrWord={currWord}
                    word={el}
                    number={index + 1}
                    key={index}
                  />
                  )
                ) : ''
              )
            }
          </Container>
          <Container className={classes.containerGif}>
            {
              !isStartTime && (
                <Box className={classes.circle}>
                  <Box className={classes.wordTime}>
                    {wordTime}
                  </Box>
                </Box>
              )
            }
            <div ref={gif} className={classes.succesGif}>
              <Image publicId="rslang/33Ho_by5kqq" width="90" />
            </div>
          </Container>
        </GameLayout>
      </div>
	);
}

export default Savannah;
