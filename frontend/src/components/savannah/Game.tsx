import React from 'react';
import {
        Container,
        Button,
        Box
      } from '@material-ui/core'
import {
        Theme,
        createStyles,
        makeStyles,
      } from '@material-ui/core/styles'
import WordBtn from './WordBtn'
import { Image } from 'cloudinary-react'
import CLOUDURL from '../../constants/CLOUDURL'
import CloseIcon from '@material-ui/icons/Close'
import { Fullscreen, FullscreenExit } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import Heart from './Heart'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      height: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      backgroundImage: `url('${CLOUDURL}/rslang/Illustration02_yokda5')`,
      backgroundSize: 'cover',
      backgroundPosition: '0 100%',
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

const Game: React.FC = () => {
  const classes = useStyles();
  const words: Array<string> = ['word', 'dgfg', 'hfghfddsa', 'ghghvdcsa'];
  const lifes: Array<number> = [0,0,0,1,1];

  const fullScreen = () => {
    document!.getElementById("savannah")!.requestFullscreen();
  }

  return (
      <Box className={classes.box} id='savannah'>
        <Box className={classes.topBox}>
          <IconButton
            className={classes.button}
            style={{ marginRight: 5 }}
            aria-label="fullscreen"
            component="span"
            onClick={fullScreen}
          >
            <Fullscreen
              style={{color: 'white'}}
              fontSize="large"
            />
          </IconButton>
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
          <IconButton
            className={classes.button}
            style={{ marginLeft: 7 }}
            aria-label="close"
            component="span"
          >
            <CloseIcon
              style={{color: 'white'}}
              fontSize="large"
            />
          </IconButton>
        </Box>
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
        <Container className={classes.containerGif}>
          <Image publicId="rslang/33Ho_by5kqq" width="90" />
        </Container>
      </Box>
  );
}

export default Game;
