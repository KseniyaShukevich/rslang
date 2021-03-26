import React, {useState} from 'react';
import cn from 'classnames'

import {makeStyles} from "@material-ui/core/styles";
import DoneIcon from '@material-ui/icons/Done';


import SoundButton from "./SoundButton";
import ListenPlayer from "./ ListenPlayer";

let arr = [
  { id: 0,
    wordTranslate: 'Компасы',
    audio: 'https://freesound.org/data/previews/401/401736_7744890-lq.mp3',
    isRightWord: true,
    word:'Compasses',
    image:'https://avatars.mds.yandex.net/get-zen_doc/175604/pub_5d3edd5d14f98000ad739d66_5d3ede27c49f2900ad0b39f5/scale_1200'
  },
  {id: 1, wordTranslate: 'Применять', audio: '', isRightWord: false,},
  {id: 2, wordTranslate: 'Выполнять', audio: '', isRightWord: false,},
  {id: 3, wordTranslate: 'Проводить', audio: '', isRightWord: false,},
  {id: 4, wordTranslate: 'прихоть', audio: '', isRightWord: false,},
]

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
    height: '100vh',
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
  }
}));

type Props = {
  setProgress: any,
  progress: number,
}

const AudioCallGameField: React.FC<Props> = ({setProgress, progress}) => {
  const classes = useStyles();

  const [isChoice, setIsChoice] = useState<boolean>(false);
  const [isWin, setIsWin] = useState<boolean>(false);
  const [isListen, setIsListen] = useState<boolean>(false)

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
    <div className={classes.AudioCallGame}>
            <span className={classes.buttonMisic}>
              {!isChoice && <SoundButton isActive={isListen} setIsActive={setIsListen}
                             urlAudio={arr.filter(el => !!el.isRightWord)[0].audio}/>
              }
              {isChoice && <div>
                <div><img className={classes.image} src={arr.filter(el => !!el.isRightWord)[0].image} alt="img word"/></div>
                <div className={classes.flex}>
                  <ListenPlayer setIsAudio={setIsListen}
                                   audio={arr.filter(el => !!el.isRightWord)[0].audio}
                                   isAudio={isListen}
                                   listenAudio={() => setIsListen(true)}  />
                                   <b>{arr.filter(el => !!el.isRightWord)[0].word}</b>
                </div>
              </div>}

             </span>

      <div className={classes.audioListen}>
        <div className={classes.options}>
          {
            arr.map(el => {
              return (
                <div key={el.wordTranslate} onClick={() => handleClickOnWord(el)} className={classes.wordWithNumber}>
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
                    {el.wordTranslate}
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
