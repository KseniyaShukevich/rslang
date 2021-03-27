import React, { useState } from 'react'
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
import Heart from '../components/savannah/Heart'
import WordBtn from '../components/savannah/WordBtn'
import { Image } from 'cloudinary-react'
import FullscreenBtn from '../components/savannah/FullscreenBtn'
import CloseBtn from '../components/savannah/CloseBtn'
import GameLayout from '../components/GameLayout'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      backgroundImage: `url('${CLOUDURL}/rslang/Illustration02_yokda5')`,
      backgroundSize: 'cover',
      backgroundPosition: '0 100%',
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
  })
);

const Savannah: React.FC = () => {
	const classes = useStyles();
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const words: Array<string> = ['word', 'dgfg', 'hfghfddsa', 'ghghvdcsa'];
  const lifes: Array<number> = [0,0,0,1,1];

  const [isEndLayout, setIsEndLayout] = useState<boolean>(false);

  document.addEventListener('fullscreenchange', (event) => {
    setIsFullscreen(!!document.fullscreenElement);
  });

	return (
			<Box className={classes.box} id='savannah'>
        <Box className={classes.topBox}>
          <FullscreenBtn
            game={'savannah'}
            isFullscreen={isFullscreen}
          />
          <Box className={classes.lifes}>
            {
              lifes.map((life, index) =>
                <Heart
                  life={life}
                  key={index}
                />
              )
            }
          </Box>
          <CloseBtn />
        </Box>
          <GameLayout isEndLayout={isEndLayout} setIsEndLayout={setIsEndLayout}>
            <Container maxWidth='md' className={classes.containerBtn}>
              {
                words.map((word, index) =>
                  <WordBtn
                    word={word}
                    number={index + 1}
                    key={index}
                  />
                )
              }
            </Container>
            <Button color='primary' onClick={() => {setIsEndLayout(true)}}>
              Закончилась игра
            </Button>
            <Container className={classes.containerGif}>
              <Image publicId="rslang/33Ho_by5kqq" width="90" />
            </Container>
          </GameLayout>
      </Box>
	);
}

export default Savannah;
