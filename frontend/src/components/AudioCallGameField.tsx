import React, {useState} from 'react';
import cn from 'classnames'

import {makeStyles} from "@material-ui/core/styles";
import HearingIcon from '@material-ui/icons/Hearing';
import DoneIcon from '@material-ui/icons/Done';


import SoundButton from "./SoundButton";

let arr = [
  {id: 0, word: 'Компасы', audio: '', isRightWord: true,},
  {id: 1, word: 'Применять', audio: '', isRightWord: false,},
  {id: 2, word: 'Выполнять', audio: '', isRightWord: false,},
  {id: 3, word: 'Проводить', audio: '', isRightWord: false,},
  {id: 4, word: 'прихоть', audio: '', isRightWord: false,},
]

const useStyles = makeStyles((theme) => ({
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
    backgroundColor: 'hsla(0,0%,100%,.05)',
    cursor: 'pointer',
    transition: 'all .15s ease',
  },
  options: {
    display: 'flex',
    flexWrapper: 'wrap',
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
}));

type Props = {
  setProgress: any,
  progress: number,
}

const AudioCallGameField: React.FC<Props> = ({setProgress, progress}) => {
  const classes = useStyles();

  const [isChoice, setIsChoice] = useState<boolean>(false)
  const [isWin, setIsWin] = useState<boolean>(false)

  console.log(arr.filter(el => !!el.isRightWord))


  const handleClickOnWord = (element: any) => {
    if (!isChoice) {
      setIsChoice(true)
    }
    if (!isChoice && element.isRightWord) {
      setIsWin(true)
    }

    setProgress(progress + 10)

  }

  return (
    <div>
      <SoundButton />
      <div className={classes.audioListen}>
        <HearingIcon/>
        <div className={classes.options}>
          {
            arr.map(el => {
              return (
                <div onClick={() => handleClickOnWord(el)} className={classes.wordWithNumber}>
                  <span className={classes.number}>{el.id + 1}</span>
                  <span className={cn(classes.arrow,
                    {[classes.hidden]: isChoice && el.isRightWord && isWin}
                  )}>
              <DoneIcon/>
            </span>
                  <span className={cn(classes.word,
                    {[classes.lineThrough]: !el.isRightWord && isChoice},
                    {[classes.win]: isChoice && el.isRightWord && isWin}
                  )}>
                    {el.word}
                  </span>
                </div>
              )
            })
          }
        </div>
        {!isChoice && <div className={classes.btnStart}>НЕ ЗНАЮ</div>}
        {isChoice && <div onClick={() => setIsChoice(false)} className={classes.btnStart}>ДАЛЕЕ</div>}
      </div>
    </div>
  );
};

export default AudioCallGameField;
