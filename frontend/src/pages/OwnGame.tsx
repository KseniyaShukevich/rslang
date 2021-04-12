import React, {useState, useEffect, useRef} from 'react'
import {
  Box,
  Container,
  IconButton, Typography,
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
import AlarmAddIcon from '@material-ui/icons/AlarmAdd';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import AlarmOffIcon from '@material-ui/icons/AlarmOff';
import {calcStatisticsWordsToDB, calcStatisticsWordsToLS} from "../calcStatisticsWords";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import {FILESPATH} from "../constants";

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
    buttonAddTime: {
      position:'absolute',
      top:'21px',
      left:'180px',
    },
    text: {
      color: 'rgba(250,250,250, 0.5)',
      width: 250,
      textAlign: 'center'
    },
    buttonHint: {
      position:'absolute',
      top:'21px',
      left:'80px',
    },
    textAlign: {
      textAlign: 'center',
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
    containerKeyboard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: theme.spacing(2),
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
      position:'absolute',
      bottom:0,
      marginTop: '-15vh',
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
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
      zIndex: 20,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(0,0,0,0.5)',
    },
    prompt: {
      color:'#fafafa',
      position:'relative',
      left:'20px',
    },
    startTime: {
      width: 200,
      height: 200,
      display: 'flex',
      flexDirection: 'column',

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
    promptText: {
      fontSize:'13px',
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
      flexWrap: 'wrap',
      alignItems: 'center',
      width: 'calc(100vw - 90px)',
      padding: 0,
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
        border: 'solid 1px rgba(250,250,250,0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
      },
      wordTime: {
        color: 'rgba(250,250,250,0.4)',
        fontSize: 30,
      },
      prompt: {
        left:'-33px',
        top:'30px',
      },
      trueWordContainer: {
        fontSize: '16px',
      },
      image: {
        borderRadius: '10px',
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

const OwnGame: React.FC = () => {


  const classes = useStyles();

  const [prompt, setPrompt] = useState<number>(3);
  const [promptTime, setPromptTime] = useState<number>(3);
  const [isPromptTime, setIsPromptTime] = useState<boolean>(false);

  const [isPrompt, setIsPrompt] = useState<boolean>(false);


  const [isChoose, setIsChoose] = useState<boolean>(false);


  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isEndLayout, setIsEndLayout] = useState<boolean>(false);
  const [isStartLayout, setIsStartLayout] = useState<boolean>(true);
  const [currWord, setCurrWord] = useState<IWord | null>(null);
  const [bgPosition, setBgPosition] = useState<number>(100);
  const [restWords, setRestWords] = useState<number>(0);


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
    const [word, newArrWords, func, rest] = generationWords.current;
    corrBtn.current = newArrWords.indexOf(word);
    setCurrWord(word);
    setRestWords(rest + 1);

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
/*    const id = setInterval(() => setTop((prev) => prev + 1), 100);*/
/*
    idInterval.current.push(id);
*/
  }

  const addStartTime = () => {
    setIsStartMusic(true);
    idStartTime.current = setInterval(() => setStartTime((prev) => prev - 1), 1000);
  }

  const successAnimation = () => {
    setIsWinMusic(true);
    setIsPrompt(false)
    setIsPromptTime(false)
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
    setIsPrompt(false);
    setIsPromptTime(false);
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

  useEffect(() => {
    if (lifes === 0) {
      setTimeout(() => {
        clearInterval(idInterval.current[0]);
        setIsEndGame(true);
        setIsEndLayout(true);
      }, 300);
    }
  }, [lifes]);
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
      if (currLongestCorr.current < newLongestCorr.current) {
        currLongestCorr.current = newLongestCorr.current;
        newLongestCorr.current = 0;
      }
      const resultWords = getObjectForStatisticsWords();

      if (user) {
        calcStatisticsWordsToDB(
          'ownGame',
          resultWords,
          user.userId,
          user.token
        );
        addStatisticsToDB(
          user.userId,
          user.token,
          'ownGame',
          corrWords.current.length,
          corrWords.current.length,
          wrongWords.current.length,
          currLongestCorr.current
        );
      } else {
        calcStatisticsWordsToLS(
          'ownGame',
          resultWords,
        );
        addStatisticsToLStorage(
          'ownGame',
          corrWords.current.length,
          corrWords.current.length,
          wrongWords.current.length,
          currLongestCorr.current
        );
      }
    }
  }, [isEndGame]);


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
    }
  }, [words, isStartLayout, isEndLayout]);

  const checkKeyDown = (event: KeyboardEvent) => {


    const key = +event.key;
     //console.log('key', event.key)
    if (key) {
      setToggleCorrBtn((prev) => !prev);
      keyBtn.current = key - 1;
    }
  }

  const getFullScreen = () => {
    setIsFullscreen(!!document.fullscreenElement);
  }

  useEffect(() => {
    document.addEventListener('fullscreenchange', getFullScreen);
    document.addEventListener('keydown', checkKeyDown);
    return function cleanEvents() {
      document.removeEventListener('keydown', checkKeyDown);
      document.removeEventListener('fullscreenchange', getFullScreen);
    }

  }, []);

  const nameGame: string = 'СЛОВО - ПЕРЕВОД';
  const descriptionGame: string = 'Тренировка помогает изучить новые слова, а так же повторить уже изученные';
  return (
    <div ref={container} className={classes.box} id='owngame'>
      {
        isStartTime && (
          <Box className={classes.startGame}>
            <Box className={classes.startTime}>
              <div>
                {startTime}
              </div>
              <div>
                <Box className={classes.containerKeyboard}>
                  <KeyboardIcon
                    fontSize='large'
                    style={{color: 'rgba(250,250,250,0.5)'}}
                  />
                  <Typography variant='body2' className={classes.text}>
                    Используй клавиши 1, 2, 3 и 4, чтобы дать быстрый ответ
                  </Typography>
                </Box>

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
            game={'owngame'}
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
            {!isChoose && !isStartTime && <div className={classes.textAlign}><div className={classes.mainWord}>
              {!currWord ? <span></span>
                : <div>{currWord.word}</div>}
              {isPrompt && currWord && <div className={classes.promptText}>{currWord.textMeaning.replace(/<\/?[^>]+(>|$)/g, "")}</div>}
            </div> </div>}
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
                ? trueWord.textMeaning.replace(/<\/?[^>]+(>|$)/g, "")
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
          {/*{
            !isStartTime && !isChoose && (
              <>
              <div className={classes.timer}>
                <Box className={classes.circle}>
                  <Box className={classes.wordTime}>
                    {wordTime}
                  </Box>
                </Box>
              </div>


              </>
            )
          }*/}
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
