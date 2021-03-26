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
import { IWordCard } from '../interfaces';
import { FILESPATH } from '../constants';

const rightIndent = '8px'


const useStyles = makeStyles((theme) => ({
    wordCard: {
        width: '100%',
        paddingTop: '4px',
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
    noDifficult: {
        color: 'green',
        cursor: 'pointer',
        marginRight:'10px',


    },
    Difficult: {
        color: 'red',
        cursor: 'pointer',
        paddingTop:'8px',
        marginRight: rightIndent,

    },
    ava: {
        marginRight: rightIndent,

    },
    right: {
        display: 'flex',
        alignItems: 'center',
    }
}));

const WordCard: React.FC<IWordCard> = (props) => {
    const {audio, word, wordTranslate, image, isDifficult: difficult} = props;
    const classes = useStyles();


    const [isListens, setIsListens] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [isPortal, setIsPortal] = useState<boolean>(false);
    const [isDifficult, setIsDifficult] = useState(difficult);


    const listenWord = () => {
        setIsListens(true)
    }

    return (
        <div className={classes.wordCard}>
          <ListenPlayer audio={`${FILESPATH}${audio}`}
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
                    src={`${FILESPATH}${image}`
                    || ''}
                    alt="word img"
                />
                {!isDifficult &&
                <SentimentSatisfiedAltIcon onClick={() => setIsDifficult(prev => !prev)}
                                           className={classes.noDifficult}/>}
                {!!isDifficult &&
                <SentimentSatisfiedIcon onClick={() => setIsDifficult(prev => !prev)}
                                        className={classes.Difficult}/>}
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
