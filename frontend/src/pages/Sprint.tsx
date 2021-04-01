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
import Timer from '../components/sprint/Timer'
import SprintGameField from '../components/sprint/SprintGameField'
import { fetchWords, selectWords } from '../slices/wordsSlice'
import { useSelector, useDispatch } from 'react-redux'
import { getWordsForGame } from '../generationGameWords'
import jungle from '../assets/images/jungle.jpg';

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
      justifyContent: 'space-between',
      flexDirection: 'column',
      padding: 20,
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
    timerWrapper: {

    },

  })
);

const Sprint: React.FC = () => {
	const classes = useStyles();
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isEndLayout, setIsEndLayout] = useState<boolean>(false);
  const [isStartLayout, setIsStartLayout] = useState<boolean>(true);
  const lifes: number = 3;

  const wordsArray = useSelector(selectWords);
  const dispatch = useDispatch();

  const generationWords = useRef<any>(null);

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
      console.log(word, arrayWords);
      generationWords.current = func();
    } else {
      console.log('END!');
    }
  }

  document.addEventListener('fullscreenchange', (event) => {
    setIsFullscreen(!!document.fullscreenElement);
  });

	return (
			<Box className={classes.box} id='game'>
        <Box className={classes.topBox}>
          <Box className={classes.timerWrapper}>
            <Timer />
          </Box>
          <FullscreenBtn
            game={'game'}
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
            <SprintGameField />
            <Container maxWidth='md' className={classes.containerBtn} style={{background: 'white'}}>
              <span>Кнопки для понимания, как это работает</span>
              <Button color='primary' onClick={step}>
                Ход
              </Button>
              <Button color='primary' onClick={() => {setIsEndLayout(true)}}>
                Закончилась игра
              </Button>
            </Container>

          </GameLayout>
      </Box>
	);
}

export default Sprint;
