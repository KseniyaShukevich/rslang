import React, {useState} from "react";


import ButtonBase from '@material-ui/core/ButtonBase';
import {makeStyles} from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';

import ModalDeleteWord from './ModalDeleteWord';
import ModalDescrAboutWord from './ModalDescrAboutWord';
import ListenPlayer from "./ ListenPlayer";

const rightIndent = '8px'


const useStyles = makeStyles((theme) => ({
    wordCard: {
        width: '100%',
        paddingBottom: '4px',
        borderBottom:'1px solid gray',
        display: 'flex',
        justifyContent:'space-between',
    },
    hidden: {
        display: 'none',
    },
    trash: {
        transition: '0.4s',
        marginRight:rightIndent,

        '&:hover': {
            transition: '0.4s',
            color: 'red',
        },
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        width: '100%',
        textAlign:'center',
        borderRadius: '8px',
        transition: '0.4s',
        '&:hover': {
            transition: '0.4s',
            backgroundColor: 'antiquewhite',
        },
    },
    word: {
        color: '#2582e7',
    },
    noDificult: {
        color: 'green',
        cursor: 'pointer',
        paddingTop:'8px',
        marginRight:'10px',


    },
    Dificult: {
        color: 'red',
        cursor: 'pointer',
        paddingTop:'8px',
        marginRight:rightIndent,

    },
    ava: {
        marginRight:rightIndent,

    },
    right: {
        display: 'flex',
    }
}));

type Props = {
    audio: string,
    word: string,
    wordTranslate:string,
    image: string,
    dificult: boolean,
    transcription:string,
    textExample:string,
    textMeaning:string,
    audioMeaning:string,
    audioExample:string,
    textMeaningTranslate:string,
    textExampleTranslate:string,

}

const WordCard: React.FC<Props> = (props: Props) => {
    const {audio, word, wordTranslate, image, dificult} = props;
    const classes = useStyles();


    const [isListens, setIsListens] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [isPortal, setIsPortal] = useState<boolean>(false);
    const [isDificul, setIsDificul] = useState<boolean>(dificult);


    const listenWord = () => {
        setIsListens(true)
    }

    return (
        <div className={classes.wordCard}>
          <ListenPlayer audio={audio}
                        isAudio={isListens}
                        setIsAudio={() => setIsListens(false)}
                        listenAudio={listenWord}
          />
            <div onClick={() => setIsPortal(true)} className={classes.flexColumn}>
                <strong className={classes.word}>{word}</strong>
                <span>{wordTranslate}</span>
            </div>
            <div className={classes.right}>
                <Avatar
                    className={classes.ava}
                    src={image
                    || ''}
                    alt="word img"
                />
                {!isDificul &&
                <SentimentSatisfiedAltIcon onClick={() => setIsDificul(prev => !prev)}
                                           className={classes.noDificult}/>}
                {!!isDificul &&
                <SentimentSatisfiedIcon onClick={() => setIsDificul(prev => !prev)}
                                        className={classes.Dificult}/>}
                <ButtonBase>
                    <DeleteIcon onClick={() => setOpen(true)} className={classes.trash}/>
                </ButtonBase>
                <ModalDeleteWord open={open} setOpen={setOpen}/>
                <ModalDescrAboutWord open={isPortal}
                                     setOpen={setIsPortal}
                                     {...props}
                />
            </div>
        </div>
    );
};

export default WordCard;
