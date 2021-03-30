import React, { useState} from 'react';
import cn from 'classnames'

import {makeStyles} from "@material-ui/core/styles";
import DoneIcon from "@material-ui/icons/Done";
import {IWord} from "../interfaces";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import MusicOffIcon from "@material-ui/icons/MusicOff";
import WinMusic from "./WinMusic";
import LoseMusic from "./LoseMusic";
import ListenPlayer from "./ ListenPlayer";
import PageviewIcon from "@material-ui/icons/Pageview";

const useStyles = makeStyles((theme) => ({
  owngame: {
    maxWidth: '760px',
    margin: '0 auto',
    textAlign:'center',
  },
  wrap: {
    height:'100vh',
    width:'100vw',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  originalWorld: {
    marginBottom: '30px'
  },
  hidden: {
    visibility: 'hidden',
  },
  options: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  wordWithNumber:{
    fontSize: '22px',
    cursor:'pointer',
    padding: '20px',
    '&:hover': {
      transition: '0.4s',
      backgroundColor: 'hsla(0,0%,100%, 0.25)',
  },
  },
  number: {
    color: 'hsla(0,0%,100%,.25)',
    marginRight: '8px',
  },
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
  word: {
    color: '#fff',
    transition: 'all .15s ease',
    wordwrap: 'break-word',
    maxHeight: '108px',
    overflow: 'hidden',
  },
  arrow: {
    color: 'green',
    display: 'none',

  },
  lineThrough: {
    textDecoration: 'line-through',
    opacity: '0.3'
  },
  win: {
    color: 'red',
  },
  musicIcon: {
    position: 'absolute',
    cursor:'pointer',
    top:'16px',
    left:'16px',
  },
  flex: {
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
  },
  image: {
    width:'100px',
    height:'100px',
  },
  transcription: {
    opacity:'0.5',
    marginBottom:'7px',
  },
  center: {
    display:'flex',
    justifyContent:'center',
  },
  '@media (max-width: 700px)': {
    wordWithNumber: {
      fontSize: '16px',
      padding: '10px',
    }

  }





}));

type Props = {

  lifes:number,

  trueWord: IWord | null,
  wordArray: Array<IWord> | null,
  step:() => void,
  setLifes: any,
  setIsEndLayout:any,
}

const OwnGameField:React.FC<Props> =
  ({ trueWord, wordArray, step, setLifes, lifes, setIsEndLayout}) => {
  const classes = useStyles();

  const [isChoice, setIsChoice] = useState<boolean>(false);
    const [isWin, setIsWin] = useState<boolean>(false);
    const [isListen, setIsListen] = useState<boolean>(false);

    const [isWinMusic, setIsWinMusic] = useState<boolean>(false);
    const [isLoseMusic, setIsLoseMusic] = useState<boolean>(false);
    const [isMusicValue, setIsMusicValue] = useState<boolean>(true);

    const [prompt, setPrompt] = useState<number>(3);
    const [isPrompt, setIsPrompt] = useState<boolean>(false);

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

    if ((lifes === 0) && !isChoice) {
      setIsEndLayout(true)
    }

    if (!trueWord || !wordArray) {
    return <div>zd</div>
  }

  return (
    <>
      <div className={classes.wrap} onKeyDown={key} tabIndex={0}>
      <div className={classes.owngame}>
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

        <div className={classes.originalWorld}>
          <div className={classes.flex}><span>
            <ListenPlayer setIsAudio={setIsListen}
                          audio={trueWord.audio}
                          isAudio={isListen}
                          listenAudio={() => setIsListen(true)}  />
          </span>{trueWord.word}</div>
          <div className={cn( classes.transcription,
            {[classes.hidden]: !isChoice})}>[klˈɒg]</div>

          <img className={cn( classes.image,
            {[classes.hidden]: !isChoice})} src={trueWord.image} alt="t"/>
          <div  className={cn(
            {[classes.hidden]: (!isChoice && !isPrompt)})}>Контекст:
            <div>{ trueWord.textMeaning.replace(/<\/?[a-zA-Z]+>/gi,'')}</div></div>
        </div>
        <div>
          <div >
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
            <div className={classes.center}>
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
      </div>
      </div>
    </>
  );
};

export default OwnGameField;
