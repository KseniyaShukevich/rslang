import React, {useState, useEffect} from 'react';
import cn from 'classnames'

import {makeStyles} from "@material-ui/core/styles";
import DoneIcon from '@material-ui/icons/Done';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';


import SoundButton from "./SoundButton";
import ListenPlayer from "./ ListenPlayer";
import WinMusic from "./WinMusic";
import LoseMusic from "./LoseMusic";

import LinearProgress from "@material-ui/core/LinearProgress";
import {selectWords, fetchWords} from "../slices/wordsSlice";
import {useDispatch, useSelector} from "react-redux";
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
  }
}));

type Props = {

  level:number,
  lifes:number,

  trueWord: IWord | null,
  wordArray: Array<IWord> | null,
  step:() => void,
  setLifes: any
}

const AudioCallGameField: React.FC<Props> = (
  { level, trueWord, wordArray, step, setLifes, lifes}) => {
  const classes = useStyles();

  const [isChoice, setIsChoice] = useState<boolean>(false);
  const [isWin, setIsWin] = useState<boolean>(false);
  const [isListen, setIsListen] = useState<boolean>(false);

  const [isWinMusic, setIsWinMusic] = useState<boolean>(false);
  const [isLoseMusic, setIsLoseMusic] = useState<boolean>(false);
  const [isMusicValue, setIsMusicValue] = useState<boolean>(true);

/*  const words = useSelector(selectWords);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWords({
      group:level,
      page:0,
    }))
  }, [])*/
/*  const size = 4;
  let subarray = [];*/


/*
  if (!!words) {
    for (let i = 0; i <Math.ceil(words.length/size); i++){
      subarray[i] = words.slice((i*size), (i*size) + size);
    }
  }


  let arrWithTrueWord = []
*/



/*  const [random, setRandom] = useState<number>(randomInteger(0, 3));
  useEffect(() => {
    setRandom(randomInteger(0, 3))
  },[progress])

  function randomInteger(min: number, max: number) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }
  if (!!subarray[progress]) {

    const funcTrueWord = (random: number, item: number) => {
      if (random === item) {
        return true
      } else {
        return false
      }
    }
    arrWithTrueWord = subarray[progress].map((el: any, item: number) =>  (
      {
        ...el,
        isRightWord: funcTrueWord(random, item)
      }
    ))
  }*/


    //console.log('arrWithTrueWord', arrWithTrueWord)






  const handleClickOnWord = (element: any, trueWord: IWord) => {
    if (!isChoice) {
      setIsChoice(true)
    }
    if (!isChoice && (trueWord.word === element.word)) {
      setIsWin(true)
      setIsWinMusic(true)
    } else if (!isChoice && (trueWord.word !== element.word)) {
      setIsLoseMusic(true)
      setLifes(lifes - 1)
    }
  }


  if (!trueWord || !wordArray) {
    return  <div>Загрузка</div>
  }



  console.log('trueWord.word', trueWord.word)

  return (
    <div className={classes.AudioCallGame}>
      <div className={classes.musicIcon} onClick={() => setIsMusicValue(prev => !prev)}>
        {isMusicValue &&  <MusicNoteIcon />}
        {!isMusicValue && <MusicOffIcon />}
      </div>
      <WinMusic setIsWinMusic={setIsWinMusic} isWinMusic={isWinMusic} isMusicValue={isMusicValue} />
      <LoseMusic isLoseMusic={isLoseMusic} setIsLoseMusic={setIsLoseMusic} isMusicValue={isMusicValue} />
      <span className={classes.buttonMisic}>
              {!isChoice &&  <SoundButton isActive={isListen} setIsActive={setIsListen}
                             urlAudio={trueWord.audio}/>
              }
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
        {!isChoice && <div className={classes.btnStart}>НЕ ЗНАЮ</div>}
        {isChoice && <div onClick={() => {
          setIsChoice(false)
          step()
        }} className={classes.btnStart}>ДАЛЕЕ</div>}
      </div>
    </div>
  );
};

export default AudioCallGameField;
