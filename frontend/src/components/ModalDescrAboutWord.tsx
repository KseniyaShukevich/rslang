import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import ReactPlayer from "react-player";



import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import HeadsetIcon from "@material-ui/icons/Headset";


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
        justifyContent:'center',
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
        fontStyle: 'italic',
        wordBreak: 'break-word',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    translatedWord: {
        color: '#995c36',
        cursor: 'pointer'
    }
}));

type Props = {
    open: boolean,
    setOpen: any,
    audio: string,
    word: string,
    translateWord:string,
    ava: string,
    dificult: boolean,
    transcription:string,
    exampleWordText:string,
    aboutWordText:string,


}

const ModalDescrAboutWord: React.FC<Props> = ( props) => {
    const {open, word, audio, translateWord, setOpen, ava, transcription, exampleWordText, aboutWordText } = props
    const classes = useStyles();

    const [isListens, setIsListens] = useState<boolean>(false);


    const handleClose = () => {
        setOpen(false);
    };

    const listenWord = () => {
        setIsListens(true)
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
                                url={audio}
                                playing={isListens}
                                onEnded={() => setIsListens(false)}
                            />
            </span>
                            <div>
                                <img className={classes.imgWord}
                                     src={ava}
                                     alt="word_img"/></div>
                            <div className={classes.center}>
                                <div className={classes.h1}><h2>{word}</h2></div>
                                <div onClick={listenWord} className={classes.transcription}>
                                    <HeadsetIcon  color={isListens ? 'secondary' : 'primary'}/>
                                    <div className={classes.trinfo}>{transcription}</div>
                                </div>
                                <div className={classes.translatedWord}><strong>{translateWord}</strong></div>
                            </div>
                            <div>
                                <div className={classes.exampleText}>{exampleWordText}</div>
                                <div className={classes.exampleText}>{aboutWordText}</div>
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