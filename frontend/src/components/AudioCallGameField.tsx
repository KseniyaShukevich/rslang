import React, {useState, useEffect} from 'react';
import cn from 'classnames'

import {makeStyles} from "@material-ui/core/styles";
import DoneIcon from '@material-ui/icons/Done';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import PageviewIcon from '@material-ui/icons/Pageview';

import SoundButton from "./SoundButton";
import ListenPlayer from "./ListenPlayer";
import WinMusic from "./WinMusic";
import LoseMusic from "./LoseMusic";
import { IWord } from '../interfaces';



const useStyles = makeStyles((theme) => ({
  btnStart: {
    appearance: 'none',
    fontSize: '24px',
    lineHeight: '1',
    width:'300px',
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
  AudioCallGame: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    // height: '100%',
  },
  audioListen: {
    backgroundColor: 'hsla(0,0%,100%,.05)',
    width: '80%',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    transition: 'all .15s ease',

  },
  options: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',

  },
  number: {
    color: 'hsla(0,0%,100%,.25)',
    marginRight: '8px',
  },
  wordWithNumber: {
    fontSize: '22px',
    padding: '20px',
    '&:hover': {
      transition: '0.4s',
      backgroundColor: 'hsla(0,0%,100%, 0.25)',
    },

  },
  buttonMisic: {
    marginBottom:'100px',
  },
  '@media (max-width:500px)': {
    buttonMisic: {
      margin:0,
    },
  },
  word: {
    color: '#fff',
    transition: 'all .15s ease',
    wordwrap: 'break-word',
    maxHeight: '108px',
    overflow: 'hidden',
  },
  lineThrough: {
    textDecoration: 'line-through',
    opacity: '0.3'
  },
  win: {
    color: 'red',
  },
  arrow: {
    color: 'green',
    display: 'none',

  },
  hidden: {
    display: 'inline-block',
  },
  btnNext: {},
  image: {
    width:'70px',
    height:'70px',
  },
  flex: {
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  musicIcon: {
    position: 'absolute',
    cursor:'pointer',
    top:'16px',
    left:'16px',
  },
  wrap: {
    height:'100vh',
    width:'100vw',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  podskazka: {
    position:'absolute',
    top:'16px',
    left:'50px',
    cursor:'pointer',
    display:'flex',
    alignItem:'center',
  }
}));

type Props = {

  level:number,
  lifes:number,

  trueWord: IWord | null,
  wordArray: Array<IWord> | null,
  step:() => void,
  setLifes: any,
  setIsEndLayout:any,
}

const AudioCallGameField: React.FC<Props> = (
  { level, trueWord, wordArray, step, setLifes, lifes, setIsEndLayout}) => {
  const classes = useStyles();

  const [isChoice, setIsChoice] = useState<boolean>(false);
  const [isWin, setIsWin] = useState<boolean>(false);
  const [isListen, setIsListen] = useState<boolean>(false);

  const [isWinMusic, setIsWinMusic] = useState<boolean>(false);
  const [isLoseMusic, setIsLoseMusic] = useState<boolean>(false);
  const [isMusicValue, setIsMusicValue] = useState<boolean>(true);

  const [prompt, setPrompt] = useState<number>(3);
  const [isPrompt, setIsPrompt] = useState<boolean>(false);




const key = (event: any) => {
  setIsPrompt(false)
  if (!wordArray || !trueWord) {
    return;
  }
  if (isChoice) {
    if (event.keyCode === 13) {
      setIsChoice(false)
      step()
    } else if (event.keyCode === 32) {
      setIsListen(true)
    } else {
      return
    }
  }
  if ((event.keyCode === 97) || (event.keyCode === 49) ) {
    handleClickOnWord(wordArray[0], trueWord)
  }
  if ((event.keyCode === 50) || (event.keyCode === 98) ) {
    handleClickOnWord(wordArray[1], trueWord)
  }
  if ((event.keyCode === 51) || (event.keyCode === 99) ) {
    handleClickOnWord(wordArray[2], trueWord)
  }
  if ((event.keyCode === 52) || (event.keyCode === 100) ) {
    handleClickOnWord(wordArray[3], trueWord)
  }
  if ((event.keyCode === 53) || (event.keyCode === 101) ) {
    handleClickOnWord(wordArray[4], trueWord)
  }
  if (event.keyCode === 32 ) {
    setIsListen(true)
  }

  if ((event.keyCode === 13) && !isChoice) {
    setIsChoice(true)
    setIsWin(false)
    setIsLoseMusic(true)
    setLifes(lifes - 1)
  }

  //console.log(event.keyCode)
}



  const handleClickOnWord = (element: any, trueWord: IWord) => {
    setIsPrompt(false)
    if (!isChoice) {
      setIsChoice(true)
    }
    if (!isChoice && (trueWord.word === element.word)) {
      setIsWin(true)
      setIsWinMusic(true)
    } else if (!isChoice && (trueWord.word !== element.word)) {
      setIsWin(false)
      setIsLoseMusic(true)
      setLifes(lifes - 1)
    }
  }

  if ((lifes === 0) && !isChoice) {
    setIsEndLayout(true)
  }


  if (!trueWord || !wordArray) {
    return  <div>Загрузка</div>
  }



  //console.log('trueWord.word', trueWord.word)

  return (
    <div className={classes.wrap} onKeyDown={key} tabIndex={0}>
    <div className={classes.AudioCallGame} >
      <div className={classes.musicIcon} onClick={() => setIsMusicValue(prev => !prev)}>
        {isMusicValue &&  <MusicNoteIcon />}
        {!isMusicValue && <MusicOffIcon />}
      </div>
      { (prompt !== 0) && !isPrompt && <div onClick={() => {
        setIsPrompt(true)
        setPrompt(prev => prev - 1)
      }} className={classes.podskazka}>
         <PageviewIcon /> {prompt}/3
      </div>}

      <WinMusic setIsWinMusic={setIsWinMusic} isWinMusic={isWinMusic} isMusicValue={isMusicValue} />
      <LoseMusic isLoseMusic={isLoseMusic} setIsLoseMusic={setIsLoseMusic} isMusicValue={isMusicValue} />
      <span className={classes.buttonMisic}>
              {!isChoice &&  <SoundButton isActive={isListen} setIsActive={setIsListen}
                             urlAudio={trueWord.audio}/>
              }
              {!isChoice && (isPrompt) && <span> Подсказка: <b>{trueWord.word}</b></span>}
              {isChoice && <div>
                <div><img className={classes.image} src={trueWord.image} alt="img word"/></div>
                <div className={classes.flex}>
                  <ListenPlayer setIsAudio={setIsListen}
                                   audio={trueWord.audio}
                                   isAudio={isListen}
                                   listenAudio={() => setIsListen(true)}  />
                                   <b>{trueWord.word}</b>
                </div>
              </div>}

             </span>

      <div className={classes.audioListen}>
        <div className={classes.options}>
          {!!wordArray &&
          wordArray.map((el: any, item: number) => {
              return (
                <div key={el.wordTranslate} onClick={() => handleClickOnWord(el, trueWord)} className={classes.wordWithNumber}>
                  <span className={classes.number}>{item + 1}</span>
                  <span className={cn(classes.arrow,
                    {[classes.hidden]: isChoice && (trueWord.word === el.word) && isWin}
                  )}>
              <DoneIcon/>
            </span>
                  <span className={cn(classes.word,
                    {[classes.lineThrough]: (trueWord.word !== el.word) && isChoice},
                    {[classes.win]: isChoice && (trueWord.word === el.word) && isWin}
                  )}>
                    {el.wordTranslate}
                  </span>
                </div>
              )
            })
          }
        </div>
        {!isChoice && <div onClick={() => {
          setIsChoice(true)
          setIsWin(false)
          setIsLoseMusic(true)
          setLifes(lifes - 1)
        }} className={classes.btnStart}>НЕ ЗНАЮ</div>}
        {isChoice && <div onClick={() => {
          setIsChoice(false)
          step()
        }} className={classes.btnStart}>ДАЛЕЕ</div>}
      </div>
    </div>
    </div>
  );
};

export default AudioCallGameField;
