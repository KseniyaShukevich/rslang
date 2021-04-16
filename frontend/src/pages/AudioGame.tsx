import React, { useState, useEffect, useRef } from 'react'
import {
  Box,
  Container,
  Button, Typography, IconButton,
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
import { fetchWords, selectWords } from '../slices/wordsSlice'
import { useSelector, useDispatch } from 'react-redux'
import { getWordsForGame } from '../generationGameWords'
import AudioCallGameField from "../components/AudioCallGameField"
import { IWord } from '../interfaces'
import ControlSounds from '../components/ControlSounds'
import CLOUDURL from "../constants/CLOUDURL";
import {selectUser} from "../slices/userSlice";
import {calcStatisticsWordsToDB, calcStatisticsWordsToLS} from "../calcStatisticsWords";
import {addStatisticsToDB, addStatisticsToLStorage} from "../calcStatistics";
import {ID_LOCALE_STORAGE} from "../utils/constants";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import StartMusic from "../components/StartMusic";
import WinMusic from "../components/WinMusic";
import LoseMusic from "../components/LoseMusic";
import WordBtn from "../components/WordBtn";
import {Image} from "cloudinary-react";
import SoundButton from '../components/SoundButton'
import ListenPlayer from "../components/ListenPlayer";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import AlarmAddIcon from "@material-ui/icons/AlarmAdd";
import AlarmOffIcon from "@material-ui/icons/AlarmOff";
import {FILESPATH} from "../constants";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      //backgroundImage: `url('${CLOUDURL}/rslang/Illustration02_yokda5')`,
      background: 'linear-gradient(180deg,#7d5db0 0,#b06d9a 72%,#c584a4)',
      backgroundPosition: '0 100%',
      backgroundSize: 'cover',
      transition: '0.5s',
      height: 'calc(100vh - 40px)',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      padding: 20,
    },
    buttonAddTime: {
      position:'absolute',
      top:'21px',
      left:'180px',
    },
    trueWordContainer: {
      fontSize: '16px',
    },
    prompt: {
      color:'#fafafa',
      position:'relative',
      left:'20px',
    },
    btnStart: {
      appearance: 'none',
      fontSize: '24px',
      zIndex:999,
      lineHeight: '1',
      width: '300px',
      padding: '19px 15px 21px',
      textDecoration: 'none!important',
      border: '1px solid hsla(0,0%,100%,.2)',
      borderRadius: '3px',
      textAlign: 'center',
      color: 'hsla(0,0%,100%,.7)',
      textTransform: 'uppercase',
      fontWeight: 300,
      cursor: 'pointer',
      transition: 'all .15s ease',
      '&:hover': {
        transition: '0.4s',
        border: '1px #fafafa solid',
      },
    },
    timer: {
      display: 'flex',
      justifyContent: 'center',
      alignItem: 'center',
      width: 'calc(100vw - 90px)',
      padding: 0,
    },
    buttonHint: {
      position:'absolute',
      top:'21px',
      left:'80px',
    },
    transcription: {
      opacity: .5,

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
    textMeaning: {
      bold: 100,
      cursor: 'pointer',
      transition: '1s',
      color: '#fafafa',
      '&:hover': {
        //color:'#fafafa',
        textDecoration: 'underline',
        transition: '1s',
      }
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
    image: {
      width: '350px',
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
    onChoose: {
      textAlign: 'center',
    },
    wordInf: {
      marginTop:'150px',
    },
    wordPrompt: {
      fontSize:'13px',
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
    '@media (max-width: 500px)': {
      succesGif: {
        display: 'none',
      },
      circle: {
        width: 50,
        height: 50,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
      },
      wordTime: {
        fontSize: 30,
      },
      trueWordContainer: {
        fontSize: '16px',
      },
      image: {
        borderRadius: '10px',
      },
      prompt: {
        left:'-33px',
        top:'30px',
      },
      buttonHint: {
        top:'80px',
        left:'20px',
      },
      buttonAddTime: {
        top:'140px',
        left:'20px',
      },
    },

  })
);

const AudioGame: React.FC = () => {
  const classes = useStyles();
  const nameGame: string = 'АУДИОВЫЗОВ';
  const descriptionGame: string = 'Тренировка улучшает восприятие речи на слух.';

  const [isBlockKey, setIsBlockKey] = useState<boolean>(false)


  const [promptTime, setPromptTime] = useState<number>(3);
  const [isPromptTime, setIsPromptTime] = useState<boolean>(false);

  const [prompt, setPrompt] = useState<number>(3);
  const [isPrompt, setIsPrompt] = useState<boolean>(false);

  const [isChoose, setIsChoose] = useState<boolean>(false);
  const [trueWord, setTrueWord] = useState<any>(null);
  const [isTranslateText, setIsTranslateText] = useState<boolean>(false);
  const [isAudioWord, setIsAudioWord] = useState<boolean>(false);

  const timer = useRef<any>(null);


  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
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
  const [wordTime, setWordTime] = useState<number>(60);
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
    setIsBlockKey(true)
    setIsWinMusic(true)
    setIsPrompt(false);
    setIsPromptTime(false);
    newLongestCorr.current += 1;
    corrWords.current.push(currWord);
    gif.current.style.backgroundImage = `url('${CLOUDURL}/rslang/XZ5V_sywvww')`;
    clearInterval(timer.current);
    setIsChoose(false)
    setWordTime(60)
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
          setIsBlockKey(false)
          //
          //setIsActive(true)

        }
      }, 0);
    }
    setTop(-15);
    setBgPosition((prev: number) => prev - step);
    doStep();
    setIsBlockKey(false)
    //
    setIsActive(true)

  }

  const failAnimation = () => {
    setIsBlockKey(true)
    setIsLoseMusic(true)
    setIsPrompt(false);
    setIsPromptTime(false);


    keyBtn.current = -1;
    setTrueWord(currWord);

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
        setIsChoose(true)
        setIsBlockKey(false)

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
          'audio',
          resultWords,
          user.userId,
          user.token
        );
        addStatisticsToDB(
          user.userId,
          user.token,
          'audio',
          corrWords.current.length,
          corrWords.current.length,
          wrongWords.current.length,
          currLongestCorr.current
        );
      } else {
        calcStatisticsWordsToLS(
          'audio',
          resultWords,
        );
        addStatisticsToLStorage(
          'audio',
          corrWords.current.length,
          corrWords.current.length,
          wrongWords.current.length,
          currLongestCorr.current
        );
      }
    }
  }, [isEndGame]);

/*  useEffect(() => {
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
  }, [top]);*/

  useEffect(() => {
    if (!isPromptTime) {
      if (!startTime && !isChoose) {
        if (wordTime !== 0) {
          timer.current = setTimeout(() => {
            setWordTime(prev => prev - 1);
          }, 1000)
        } else {
          setLifes((prev) => prev - 1);
          failAnimation();
        }
      }
    }
  }, [wordTime, startTime, isChoose]);

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

    if (!isBlockKey && !isChoose) {
      const key = +event.key;
      if (key) {
        setToggleCorrBtn((prev) => !prev);
        keyBtn.current = key - 1;
      }
    }
  }

  const getFullScreen = () => {
    setIsFullscreen(!!document.fullscreenElement);
  }

  useEffect(() => {
    document.addEventListener('fullscreenchange', getFullScreen);
    //document.addEventListener('keydown', checkKeyDown);
    return function cleanEvents() {
      //document.removeEventListener('keydown', checkKeyDown);
      document.removeEventListener('fullscreenchange', getFullScreen);
    }
  }, []);

	return (
    <div ref={container} className={classes.box} id='audio'
         onKeyPress={(event: any) => checkKeyDown(event)}
         tabIndex={0}
    >
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
            game={'audio'}
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
            <div className={classes.wordInf} >
              {(!isChoose && !isStartTime) && currWord ? <div >
                <SoundButton setIsActive={setIsActive} isActive={isActive} urlAudio={currWord.audio}  />
                {isPrompt && <span className={classes.wordPrompt}>{currWord.word}</span>}
              </div>: ''}


            </div>
          </div>
          <div
            ref={rectangle}
            className={classes.rectangle}
          />
          {!isChoose && !isStartTime && (prompt !== 0) && <span
            onClick={() =>{
              if (!isPrompt) {
                setPrompt((prev) => prev - 1)
              }
              setIsPrompt(true)
            } }><IconButton
            className={classes.buttonHint}
            aria-label="music"
            component="span"
          >
            {!isPrompt && <ChildCareIcon
              style={{color: 'white'}}
              fontSize="large"
            />}

            {isPrompt &&  <ChildCareIcon
              style={{color: 'orange'}}
              fontSize="large"
            />}

            <span className={classes.prompt}>{prompt}/3</span>

          </IconButton>


          </span> }
          {!isChoose && !isStartTime && (promptTime !== 0) && <span
            onClick={() =>{
              if (!isPromptTime) {
                setPromptTime((prev) => prev - 1)
              }
              setIsPromptTime(true)

              //setIsPrompt(true)
            } }><IconButton
            className={classes.buttonAddTime}
            aria-label="music"
            component="span"
          >
            {!isPromptTime && <AlarmAddIcon
              style={{color: 'white'}}
              fontSize="large"
            />}

            {isPromptTime &&  <AlarmOffIcon
              style={{color: 'orange'}}
              fontSize="large"
            />}

            <span className={classes.prompt}>{promptTime}/3</span>

          </IconButton>


          </span> }
          {
            isStartTime ? '' : (
              !isChoose && arrayWords ? arrayWords.map((el, index) =>
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
          {isChoose && currWord && <div className={classes.onChoose}>
            <h3 className={classes.trueWordContainer}>
              {trueWord.word}
              - {trueWord.wordTranslate}
              - <span className={classes.transcription}>{trueWord.transcription}</span>
              <ListenPlayer listenAudio={() => setIsAudioWord(true)}
                            setIsAudio={setIsAudioWord} isAudio={isAudioWord}
                            audio={`${FILESPATH}${trueWord.audio}`}/>
            </h3>

            <div><img className={classes.image} src={`${FILESPATH}${trueWord.image}`} alt="word image"/></div>
            <div className={classes.textMeaning}
                 onClick={() => setIsTranslateText(prev => !prev)}>
              <h3>  {!isTranslateText
                ? trueWord.textExample.replace(/<\/?[^>]+(>|$)/g, "")
                : trueWord.textExampleTranslate.replace(/<\/?[^>]+(>|$)/g, "")}</h3>

            </div>
            <div className={classes.timer}>
              <div onClick={() => {
                setIsChoose(false)
                setWordTime(60)
                //
                setIsActive(true)
              }} className={classes.btnStart}>Далее
              </div>
            </div>

          </div>}
        </Container>
        <Container className={classes.containerGif}>
          {
            !isStartTime && (
              <>
              {!isChoose && !isStartTime && <Box className={classes.circle}>
                  <Box className={classes.wordTime}>
                    {wordTime}
                  </Box>
                </Box>}
              {!isChoose && <Typography variant='body2' style={{color: 'rgba(250,250,250,0.4)'}}>
                  Осталось {restWords} слов
                </Typography>}
              </>
            )
          }
          {!isChoose && <div ref={gif} className={classes.succesGif}>
            <Image publicId="rslang/33Ho_by5kqq" width="90" />
          </div>}
        </Container>
      </GameLayout>
    </div>
	);
}

export default AudioGame;
