import React, {useState, useEffect, useRef} from 'react'
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
import {fetchWords, selectWords} from '../slices/wordsSlice'
import {useSelector, useDispatch} from 'react-redux'
import {getWordsForGame} from '../generationGameWords'
import {IWord} from "../interfaces"
import ControlSounds from '../components/ControlSounds'
import StartMusic from "../components/StartMusic";
import WinMusic from "../components/WinMusic";
import LoseMusic from "../components/LoseMusic";
import WordBtn from "../components/WordBtn";
import {Image} from "cloudinary-react";
import {selectUser} from "../slices/userSlice";
import {addStatisticsToDB, addStatisticsToLStorage} from "../calcStatistics";
import ListenPlayer from "../components/ListenPlayer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btnStart: {
      appearance: 'none',
      fontSize: '24px',
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
      position: 'absolute',
      bottom: '0',
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
    word: {
      opacity: 0,
      position: 'absolute',
      color: 'white',
      fontSize: 50,
      fontWeight: 'lighter',
      transition: 'opacity 7s, top 0.1s',
      top: '-15%',
      // text down?
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
    timer: {
      display: 'flex',
      justifyContent: 'center',
      alignItem: 'center',
      width: 'calc(100vw - 90px)',
      padding: 0,
    },
    circle: {
      width: 70,
      height: 70,
      borderRadius: '50%',
      border: 'solid 1px orange',
      display: 'flex',
      justifyContent: 'center',
      alignItem: 'center',
    },
    wordTime: {
      color: 'orange',
      fontSize: 50,
    },
    succesGif: {
      backgroundSize: 'cover',
    },
    mainWord: {
      marginTop: '140px',
    },
    trueWordContainer: {
      fontSize: '32px',
      height: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fafafa',
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
    transcription: {
      opacity: .5,
    },
    onChoose: {
      textAlign: 'center',
    },
    image: {
      width: '350px',
    },
    '@media (max-width: 500px)': {
      succesGif: {
        display: 'none',
      },
      circle: {
        width: 50,
        height: 50,
        borderRadius: '50%',
        border: 'solid 1px orange',
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
      },
      wordTime: {
        color: 'orange',
        fontSize: 30,
      },
      trueWordContainer: {
        fontSize: '16px',
      },
      image: {
        borderRadius: '10px',
      }
    },
  })
);

const OwnGame: React.FC = () => {


  const classes = useStyles();


  const [isChoose, setIsChoose] = useState<boolean>(false);


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
  const [wordTime, setWordTime] = useState<number>(60);
  const [isEndGame, setIsEndGame] = useState<boolean>(false);
  const [isAudio, setIsAudio] = useState<boolean>(true);
  const [isWinMusic, setIsWinMusic] = useState<boolean>(false);
  const [isLoseMusic, setIsLoseMusic] = useState<boolean>(false);
  const [isStartMusic, setIsStartMusic] = useState<boolean>(false);
  const [trueWord, setTrueWord] = useState<any>(null);
  const [isAudioWord, setIsAudioWord] = useState<boolean>(false);
  const [isTranslateText, setIsTranslateText] = useState<boolean>(false);

  const [toggleCorrBtn, setToggleCorrBtn] = useState<boolean>(false);



  const words = useSelector(selectWords);
  const dispatch = useDispatch();

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

  const timer = useRef<any>(null);

  const user = useSelector(selectUser);


  const setNewWords = () => {
    wordEl.current.style.opacity = 1;
    const [word, newArrWords, func] = generationWords.current;
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
      clearInterval(idInterval.current[0]);
      setIsEndGame(true);
      setIsEndLayout(true);
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
    clearInterval(timer.current);
    setIsChoose(false)
    setWordTime(60)
    setTimeout(() => {
      if (gif.current) {
        gif.current.style.backgroundImage = '';

      }
    }, 1000);

    doStep();
  }

  const failAnimation = () => {
    setIsLoseMusic(true);
    keyBtn.current = -1;
    setTrueWord(currWord)
    if (currLongestCorr.current < newLongestCorr.current) {
      currLongestCorr.current = newLongestCorr.current;
      newLongestCorr.current = 0;
    }
    wrongWords.current.push(currWord);

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
        setIsChoose(true)  //add fail isChoose
      }
    }, 500);
  }

  const corrWords = useRef<any>([]);
  const wrongWords = useRef<any>([]);

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
      if (user) {
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

  }, [wordTime, startTime, isChoose]);


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
    if ((startTime <= 0) && words) {
      clearInterval(idStartTime.current);
      setIsStartTime(false);
      startWord();
    }
  }, [startTime, words]);

  useEffect(() => {
    if (!isStartLayout && !isEndLayout && words) {
      if (idInterval.current.length > 1) {
        clearInterval(idInterval.current[0]);
        idInterval.current.shift();
      }
      generationWords.current = getWordsForGame(words, 5);
      setNewWords();
      setStep(100 / words.length);
    }
  }, [words, isStartLayout, isEndLayout]);

  const checkKeyDown = (event: KeyboardEvent) => {


    const key = +event.key;
     //console.log('key', event.key)
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


  const nameGame: string = 'АУДИОВЫЗОВ';
  const descriptionGame: string = 'Тренировка улучшает восприятие речи на слух.';
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
            game={'own game'}
            isFullscreen={isFullscreen}
          />
          <Box className={classes.lifes}>
            <Heart lifes={lifes}/>
          </Box>
          <CloseBtn/>
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
            {!isChoose && !isStartTime && <div className={classes.mainWord}>
              {!currWord ? <span></span>
                : <div>{currWord.word}</div>}</div>}
          </div>
          <div
            ref={rectangle}
            className={classes.rectangle}
          />
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
                            audio={trueWord.audio}/>
            </h3>

            <div><img className={classes.image} src={trueWord.image} alt="word image"/></div>
            <div className={classes.textMeaning}
                 onClick={() => setIsTranslateText(prev => !prev)}>
              <h3>  {!isTranslateText
                ? trueWord.textExample.replace(/<\/?[^>]+(>|$)/g, "")
                : trueWord.textMeaningTranslate.replace(/<\/?[^>]+(>|$)/g, "")}</h3>

            </div>
            <div className={classes.timer}>
              <div onClick={() => {
                setIsChoose(false)
                setWordTime(60)
              }} className={classes.btnStart}>Далее
              </div>
            </div>

          </div>}
        </Container>
        <Container className={classes.containerGif}>
          {
            !isStartTime && !isChoose && (
              <div className={classes.timer}>
                <Box className={classes.circle}>
                  <Box className={classes.wordTime}>
                    {wordTime}
                  </Box>
                </Box>
              </div>
            )
          }
          {!isChoose && !isStartTime && <div ref={gif} className={classes.succesGif}>
            <div className={classes.timer}>
              <Image publicId="rslang/33Ho_by5kqq" width="90"/>
            </div>
          </div>}

        </Container>
      </GameLayout>
    </div>

  );
}

export default OwnGame;
