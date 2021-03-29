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
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isEndLayout, setIsEndLayout] = useState<boolean>(false);
  const [isStartLayout, setIsStartLayout] = useState<boolean>(true);
  const [currWord, setCurrWord] = useState<IWord | null>(null);
  const [bgPosition, setBgPosition] = useState<number>(100);
  const [step, setStep] = useState<number>(0);
  const [top, setTop] = useState<number>(-15);
  const [isStartGame, setIsStartGame] = useState<boolean>(false);
  const [isCorrWord, setIsCorrWord] = useState<boolean>(false);
  const [arrayWords, setArrayWords] = useState<Array<IWord> | null>(null)
  const [lifes, setLifes] = useState<number>(5);

  const words = useSelector(selectWords);
  const dispatch = useDispatch();

  const generationWords = useRef<any>(null);
  const wordEl = useRef<any>(null);
  const container = useRef<any>(null);
  const rectangle = useRef<any>(null);
  const corrBtn = useRef<number>(-1);
  const idInterval = useRef<any>(null);

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

  const successAnimation = () => {
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
    if (wordEl.current) {
      wordEl.current.style.top = `${top}%`;
    }
    if (top === 70) {
      failAnimation();
    };
  }, [top]);

  useEffect(() => {
    container.current.style.backgroundPosition = `0 ${bgPosition}%`;
  }, [bgPosition]);

  useEffect(() => {
    if (!isStartLayout && !isEndLayout) {
      dispatch(fetchWords({
        group: 0,
        page: 0
      }));
    }
  }, [isStartLayout, isEndLayout]);

  useEffect(() => {
    if (!isStartLayout && !isEndLayout && words) {
      if (idInterval.current) {
        clearInterval(idInterval.current);
      }
      generationWords.current = getWordsForGame(words, 5);
      setNewWords();
      setStep(100 / words.length);
      startWord();
    }
  }, [words, isStartLayout, isEndLayout]);

  document.addEventListener('fullscreenchange', (event) => {
    setIsFullscreen(!!document.fullscreenElement);
  });

	return (
			<div ref={container} className={classes.box} id='savannah'>
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
              arrayWords ? arrayWords.map((el, index) =>
                (corrBtn.current === index) ? (
                  <WordBtn
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
              ) : 'Загрузка'
            }
          </Container>
          <Container className={classes.containerGif}>
            <Image publicId="rslang/33Ho_by5kqq" width="90" />
          </Container>
        </GameLayout>
      </div>
	);
}

export default Savannah;
