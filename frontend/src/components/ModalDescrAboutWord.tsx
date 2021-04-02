import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import ReactPlayer from "react-player";


import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import HeadsetIcon from "@material-ui/icons/Headset";
import ListenPlayer from "./ListenPlayer";
import { FILESPATH } from '../constants';
import {
  selectSettings,
} from '../slices/settingsSlice';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgWord: {
    width: '148px',
    height: '148px',
    position: 'relative',
    top: '-80px',
    objectFit: 'cover',
  },
  paper: {
    backgroundColor: '#fafafa',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    width: 'auto',
    minWidth: '412px',
    maxWidth: '412px',
    minHeight: '238px',
    borderRadius: '8px',
    padding: '38px 25px 20px',
    boxSizing: 'border-box',
    textAlign: 'center',
    height: '498px',
  },
  h1: {
    color: '#7e919f',
    fontSize: '16px',
    textAlign: 'center',
  },
  btn: {
    width: '80%',
    marginTop: '30px',
  },
  hidden: {
    display: 'none',
  },
  transcription: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
  },
  center: {
    position: 'relative',
    top: '-80px',
    textAlign: 'center',
  },
  trinfo: {
    marginLeft: '10px',
    color: 'blue',
  },
  exampleText: {
    display: 'flex',
    alignItems: 'center',
    wordBreak: 'break-word',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  translatedWord: {
    color: '#995c36',
    cursor: 'pointer'
  },
  textHover: {
    cursor:'pointer',
    '&:hover': {
      transition: '0.4s',
      color: 'green',
    },
  },

}));

type Props = {
  open: boolean,
  setOpen: any,
  audio: string,
  word: string,
  wordTranslate: string,
  image: string,
  isDifficult: boolean,
  transcription: string,
  textExample: string,
  textMeaning: string,
  audioMeaning: string,
  audioExample: string,
  textMeaningTranslate: string,
  textExampleTranslate:string,
}

const ModalDescrAboutWord: React.FC<Props> = (props) => {
  const {
    open,
    word,
    audio,
    wordTranslate,
    setOpen,
    image,
    transcription,
    textExample,
    textMeaning,
    audioMeaning,
    audioExample,
    textMeaningTranslate,
    textExampleTranslate,
  } = props
  const classes = useStyles();

  const [isListens, setIsListens] = useState<boolean>(false);
  const [isAudioMeaning, setIsAudioMeaning] = useState<boolean>(false);
  const [isAudioExample, setIsAudioExample] = useState<boolean>(false);
  const [translateMeaning, setTranslateMeaning] = useState<boolean>(false)
  const [translateExample, setTranslateExample] = useState<boolean>(false)
  const userSettings = useSelector(selectSettings);

  const handleClose = () => {
    setOpen(false);
    setTranslateExample(false);
    setTranslateMeaning(false);
  };

  const listenWord = () => {
    setIsListens(true)
  }

  const listenAudioMeaning = () => {
    setIsAudioMeaning(true)
  }

  const listenAudioExample = () => {
    setIsAudioExample(true)
  }


  return (
    <div>
      {ReactDOM.createPortal(
        <Modal
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <span className={classes.hidden}><ReactPlayer
                url={`${FILESPATH}${audio}`}
                playing={isListens}
                onEnded={() => setIsListens(false)}
              />
                            </span>
              <div>
                <img className={classes.imgWord}
                     src={`${FILESPATH}${image}`}
                     alt="word_img"/></div>
              <div className={classes.center}>
                <div className={classes.h1}><h2>{word}</h2></div>
                <div onClick={listenWord} className={classes.transcription}>
                  <HeadsetIcon color={isListens ? 'secondary' : 'primary'}/>
                  <div className={classes.trinfo}>{transcription}</div>
                </div>
                {userSettings.optional.isTranslation &&
                <div className={classes.translatedWord}><strong>{wordTranslate}</strong></div>}
              </div>
              <div>
                {!translateExample ?
                  <span  className={classes.exampleText} style={userSettings.optional.isTranslation ? {cursor: 'pointer'} : {}}>
                  <ListenPlayer audio={`${FILESPATH}${audioExample}`}
                                isAudio={isAudioExample}
                                setIsAudio={() => setIsAudioExample(false)}
                                listenAudio={listenAudioExample}
                  />
                    <span className={userSettings.optional.isTranslation ? classes.textHover: ''} onClick={() => {
                      if (userSettings.optional.isTranslation) {
                        setTranslateExample(prev => !prev);
                      }
                    }} dangerouslySetInnerHTML={{__html:
                    textExample}}>
                    </span>
                  </span>
                  :
                  <span className={classes.textHover}
                    style={{height: 44, display: 'flex', alignItems: 'center'}}
                    onClick={() => setTranslateExample(prev => !prev)}
                  >
                    {textExampleTranslate}
                  </span>
                }
                {translateMeaning
                  ? <span className={classes.exampleText}>
                    <span
                      className={classes.textHover}
                      style={{height: 44, display: 'flex', alignItems: 'center'}}
                      onClick={() => setTranslateMeaning(prev => !prev)}
                    >
                      {textMeaningTranslate}</span>
                    </span>
                  : <span className={classes.exampleText}>
                  <ListenPlayer audio={`${FILESPATH}${audioMeaning}`}
                                isAudio={isAudioMeaning}
                                setIsAudio={() => setIsAudioMeaning(false)}
                                listenAudio={listenAudioMeaning}
                  />
                    <span className={userSettings.optional.isTranslation ? classes.textHover : ''} onClick={() => {
                      if (userSettings.optional.isTranslation) {
                        setTranslateMeaning(prev => !prev);
                      }
                    }} dangerouslySetInnerHTML={{__html:
                      textMeaning}}>
                    </span>
                  </span>}

              </div>
              <div>
                <Button className={classes.btn} onClick={() => handleClose()} color="primary">
                  назад
                </Button>
              </div>
            </div>
          </Fade>
        </Modal>, document.getElementById('modal')!
      )
      }
    </div>
  );
};

export default ModalDescrAboutWord;
