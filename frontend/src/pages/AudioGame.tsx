import React, {useState} from 'react';

import {makeStyles} from "@material-ui/core/styles";


import AudioCallGameField from "../components/AudioCallGameField";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  audioGame: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    background: 'linear-gradient(180deg,#7d5db0 0,#b06d9a 72%,#c584a4)',
  },
  flex:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height:'100vh',
  },
  audioLabel: {
    fontSize: '40px',
    lineHeight: 1,
    marginBottom: '60px',
    color: '#fff',
    opacity: '.8',
    textTransform: 'uppercase',
    letterSpacing: '13px',
    fontWeight: 300,
  },
  audioTextLabel: {
    maxWidth: '565px',
    margin: '0 auto 58px',
    fontSize: '18px',
    lineHeight: '24px',
    fontWeight: 300,
    color: '#fff',
    opacity: '.8',
  },
  btnStart: {
    appearance: 'none',
    fontSize: '24px',
    lineHeight: '1',
    padding: '19px 15px 21px',
    textDecoration: 'none!important',
    minWidth: '162px',
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
  audioListen: {
    width: '120px',
    height: '120px',
    borderRadius: '120px',
    backgroundColor: 'hsla(0,0%,100%,.05)',
    cursor: 'pointer',
    transition: 'all .15s ease',
  },
  progress: {
    width: '100vw',
    position:'fixed',
    bottom:0,
  }

}));

const AudioGame = () => {
  const classes = useStyles();

  const [isFirstScreen, setIsFirstScreen] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0)

  return (
    <div className={classes.audioGame}>


      {!isFirstScreen && <div className={classes.progress}>
        <LinearProgress variant="determinate" value={progress}/>
      </div>}

      <div className={classes.flex}>
        {isFirstScreen &&
        <div>
          <div className={classes.audioLabel}>АУДИОВЫЗОВ</div>
          <div className={classes.audioTextLabel}>Тренировка улучшает восприятие речи на слух.</div>
          <div onClick={() => setIsFirstScreen(false)} className={classes.btnStart}>НАЧАТЬ</div>
        </div>}
        {!isFirstScreen && <AudioCallGameField progress={progress} setProgress={setProgress}/>}
      </div>
    </div>
  );
};

export default AudioGame;
