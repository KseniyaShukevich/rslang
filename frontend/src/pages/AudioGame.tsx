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
import AudioCallGameField from "../components/AudioCallGameField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      background: 'linear-gradient(180deg,#7d5db0 0,#b06d9a 72%,#c584a4)',
      height: 'calc(100vh - 40px)',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: 20,
    },
    topBox: {
      display: 'flex',
      position: 'absolute',
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

const AudioGame: React.FC = () => {
	const classes = useStyles();
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isEndLayout, setIsEndLayout] = useState<boolean>(false);
  const [isStartLayout, setIsStartLayout] = useState<boolean>(true);
  const lifes: number = 3;
  const [level, setLevel] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

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
            {/* В котейнере внизу должна быть сама игра */}
            <Container maxWidth='md' className={classes.containerBtn}>
              <div >
                {(progress !== -1) && <AudioCallGameField level={level} progress={progress} setProgress={setProgress}/>}

                <div style={{position: 'absolute', bottom: 0}}>
                  <span>Кнопки для понимания, как это работает</span>
                  <Button color='primary' onClick={step}>
                    Ход
                  </Button>
                  <Button color='primary' onClick={() => {setIsEndLayout(true)}}>
                    Закончилась игра
                  </Button>
                </div>
              </div>
            </Container>

          </GameLayout>
      </Box>
	);
}

export default AudioGame;
