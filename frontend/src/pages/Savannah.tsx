import React,
       {
         useState,
         useEffect,
         useRef
       } from 'react'
import {
         Box,
         Container,
         Typography
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
import { useSelector } from 'react-redux'
import { getWordsForGame } from '../generationGameWords'
import { IWord } from '../interfaces'
import { selectUser } from "../slices/userSlice"
import {
        addStatisticsToDB,
        addStatisticsToLStorage
      } from '../calcStatistics'
import ControlSounds from '../components/ControlSounds'
import WinMusic from '../components/WinMusic'
import LoseMusic from '../components/LoseMusic'
import StartMusic from '../components/StartMusic'
import {
        calcStatisticsWordsToDB,
        calcStatisticsWordsToLS
      } from '../calcStatisticsWords'
import KeyboardIcon from '@material-ui/icons/Keyboard'
import { ID_LOCALE_STORAGE } from '../utils/constants';

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
    containerBtns: {
      display: 'flex',
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
      border: 'solid 1px rgba(250,250,250,0.4)',
      display: 'flex',
      justifyContent: 'center',
      alignItem: 'center',
    },
    wordTime: {
      color: 'rgba(250,250,250,0.4)',
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
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(0,0,0,0.5)',
    },
    containerKeyboard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: theme.spacing(2),
    },
    text: {
      color: 'rgba(250,250,250, 0.5)',
      width: 250,
      textAlign: 'center'
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
      justifyContent: 'space-between'
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
  const nameGame: string = 'САВАННА';
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
  const [wordTime, setWordTime] = useState<number>(9);
  const [isEndGame, setIsEndGame] = useState<boolean>(false);
  const [isAudio, setIsAudio] = useState<boolean>(true);
  const [isWinMusic, setIsWinMusic] = useState<boolean>(false);
  const [isLoseMusic, setIsLoseMusic] = useState<boolean>(false);
  const [isStartMusic, setIsStartMusic] = useState<boolean>(false);
  const [toggleCorrBtn, setToggleCorrBtn] = useState<boolean>(false);
  const [restWords, setRestWords] = useState<number>(0);

  const generationWords = useRef<any>(null);
  const wordEl = useRef<any>(null);
  const container = useRef<any>(null);
  const rectangle = useRef<any>(null);
  const corrBtn = useRef<number>(-1);
  const gif = useRef<any>(null);
  const idInterval = useRef<any>([]);
  const idStartTime = useRef<any>(null);
  const keyBtn = useRef<any>(-1);
  const corrWords = useRef<any>([]);
  const wrongWords = useRef<any>([]);
  const currLongestCorr = useRef<any>(0);
  const newLongestCorr = useRef<any>(0);
  const words = useRef<any>(null);

  const user = useSelector(selectUser);

  const setNewWords = () => {
    wordEl.current.style.opacity = 1;
    const [ word, newArrWords, func, rest ] = generationWords.current;
    setCurrWord(word);
    setRestWords(rest + 1);
    corrBtn.current = newArrWords.indexOf(word);
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
      setTimeout(() => {
        clearInterval(idInterval.current[0]);
        setIsEndGame(true);
        setIsEndLayout(true);
      }, 300);
    }
  }

  const startWord = () => {
    const id = setInterval(() => setTop((prev) => prev + 1), 100);
    idInterval.current.push(id);
  }

  const addStartTime = () => {
    setIsStartMusic(true);
    idStartTime.current = setInterval(() => setStartTime((prev) => prev - 1), 1000);
  }

  const successAnimation = () => {
    setIsWinMusic(true);
    newLongestCorr.current += 1;
    corrWords.current.push(currWord);
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
      setTimeout(() => {
        if (rectangle.current) {
          rectangle.current.style.top = '90%'
        }
      }, 0);
    }
    setTop(-15);
    setBgPosition((prev: number) => prev - step);
    doStep();
  }

  const failAnimation = () => {
    setIsLoseMusic(true);
    if (currLongestCorr.current < newLongestCorr.current) {
      currLongestCorr.current = newLongestCorr.current;
      newLongestCorr.current = 0;
    }
    wrongWords.current.push(currWord);
    setTop(-15);
    if (wordEl.current) {
      wordEl.current.style.opacity = 0;
      wordEl.current.style.opacity = 0;
      wordEl.current.style.transition = '0.3s';
      wordEl.current.style.fontSize = '100px';
    }
    setTimeout(() => {
      if (wordEl.current) {
        wordEl.current.style.fontSize = '';
        wordEl.current.style.transition = '';
        doStep();
      }
    }, 500);
  }

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
    if (lifes === 0) {
      setTimeout(() => {
        clearInterval(idInterval.current[0]);
        setIsEndGame(true);
        setIsEndLayout(true);
      }, 300);
    }
  }, [lifes]);

  useEffect(() => {
    if (isEndGame) {
      if (currLongestCorr.current < newLongestCorr.current) {
        currLongestCorr.current = newLongestCorr.current;
        newLongestCorr.current = 0;
      }
      const resultWords = getObjectForStatisticsWords();
      if (user) {
        calcStatisticsWordsToDB(
          'savannah',
          resultWords,
          user.userId,
          user.token
        );
        addStatisticsToDB(
          user.userId,
          user.token,
          'savannah',
          corrWords.current.length,
          corrWords.current.length,
          wrongWords.current.length,
          currLongestCorr.current
        );
      } else {
        calcStatisticsWordsToLS(
          'savannah',
          resultWords,
        );
        addStatisticsToLStorage(
          'savannah',
          corrWords.current.length,
          corrWords.current.length,
          wrongWords.current.length,
          currLongestCorr.current
        );
      }
    }
  }, [isEndGame]);

  useEffect(() => {
    const initPosition = 15;
    const forSeconds = 10;
    const time = top + initPosition;

    setWordTime(9 - Math.floor(time / forSeconds));
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
      const res: string | null = localStorage.getItem(`${ID_LOCALE_STORAGE}gameWords`);
      if (res) {
        words.current = JSON.parse(res);
      }
    }
  }, [isStartLayout, isEndLayout]);

  useEffect(() => {
    if ((startTime <= 0) && words.current) {
      clearInterval(idStartTime.current);
      setIsStartTime(false);
      startWord();
    }
  }, [startTime, words.current]);

  useEffect(() => {
    if (!isStartLayout && !isEndLayout && words) {
      if (idInterval.current.length > 1) {
        clearInterval(idInterval.current[0]);
        idInterval.current.shift();
      }
      generationWords.current = getWordsForGame(words.current, 4);
      setNewWords();
      setStep(100 / words.current.length);
    }
  }, [words.current, isStartLayout, isEndLayout]);

  const checkKeyDown = (event: KeyboardEvent) => {
    const key = +event.key;
    if (key) {
      setToggleCorrBtn((prev) => !prev);
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
              <Box className={classes.containerKeyboard}>
                <KeyboardIcon
                  fontSize='large'
                  style={{color: 'rgba(250,250,250,0.5)'}}
                />
                <Typography variant='body2' className={classes.text}>
                  Используй клавиши 1, 2, 3 и 4, чтобы дать быстрый ответ
                </Typography>
              </Box>
            </Box>
          )
        }
        <Box className={classes.topBox}>
          <StartMusic
            isStartMusic={isStartMusic}
            setIsStartMusic={setIsStartMusic}
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
          <ControlSounds
            isAudio={isAudio}
            setIsAudio={setIsAudio}
          />
          <Box className={classes.containerBtns}>
            <FullscreenBtn
              game={'savannah'}
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
          <Container maxWidth='md' className={classes.containerBtn}>
            <div
              ref={wordEl}
              className={classes.word}
            >
              {currWord ? currWord.word : ''}
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
                      toggleCorrBtn={toggleCorrBtn}
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
                      toggleCorrBtn={toggleCorrBtn}
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
                <>
                  <Box className={classes.circle}>
                    <Box className={classes.wordTime}>
                      {wordTime}
                    </Box>
                  </Box>
                  <Typography variant='body2' style={{color: 'rgba(250,250,250,0.4)'}}>
                    Осталось {restWords} слов
                  </Typography>
                </>
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
