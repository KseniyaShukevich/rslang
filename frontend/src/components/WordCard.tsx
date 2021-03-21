import React, {useState} from "react";
import ReactPlayer from 'react-player'


import HeadsetIcon from '@material-ui/icons/Headset';
import ButtonBase from '@material-ui/core/ButtonBase';
import {makeStyles} from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';

import ModalDeleteWord from './ModalDeleteWord';
import ModalDescrAboutWord from './ModalDescrAboutWord';

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
    translateWord:string,
    ava: string,
    dificult: boolean,
    transcription:string,
    exampleWordText:string,
    aboutWordText:string,

}

const WordCard: React.FC<Props> = (props: Props) => {
    const {audio, word, translateWord, ava, dificult} = props;
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
            <span className={classes.hidden}><ReactPlayer
                url={audio}
                playing={isListens}
                onEnded={() => setIsListens(false)}
            />
            </span>

            <ButtonBase>
                <HeadsetIcon onClick={listenWord} color={isListens ? 'secondary' : 'primary'}/>
            </ButtonBase>
            <div onClick={() => setIsPortal(true)} className={classes.flexColumn}>
                <strong className={classes.word}>{word}</strong>
                <span>{translateWord}</span>
            </div>
            <div className={classes.right}>
                <Avatar
                    className={classes.ava}
                    src={ava
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