import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import ReactPlayer from "react-player";
import {
  Box,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import HeadsetIcon from "@material-ui/icons/Headset";

import { theme } from "../mui-style";
import { IWord } from '../interfaces';
import { FILESPATH } from "../constants";


const useStyles = makeStyles({
  resultLayout: {
    position: 'absolute',
    height: '100vh',
    width: '100vw',
    top: 0,
    left: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  resultWindow: {
    height: "70vh",
    backgroundColor: 'white',
    width: "60vw",
    overflowY: 'auto',
    [theme.breakpoints.down(900)]: {
      width: "80vw",
    },
    [theme.breakpoints.down(620)]: {
      width: "95vw",
    },
  },
  resultWrapper: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1.5),
    margin: "0 auto",
  },
  record: {
    width: "100%",
    paddingTop: "4px",
    paddingBottom: "4px",
    display: "flex",
    justifyContent: "flex-start",
  },
  recordWord: {
    fontSize: '1.5rem'
  },
  recordWordTranses: {
    color: '#7f7f7f'
  },
  divider: {
    borderTop: 'solid 1px grey',
    margin: theme.spacing(2, 0),
  },
  buttonsWrapper: {
    borderTop: 'solid 1px grey',
    display: 'flex',
    justifyContent: 'center',
    columnGap: theme.spacing(1.5),
    flexWrap: 'wrap',
    maxHeight: 77,
    padding: 20,
    backgroundColor: 'white',
    width: "60vw",
    [theme.breakpoints.down(900)]: {
      width: "80vw",
    },
    [theme.breakpoints.down(620)]: {
      height: "95vh",
      width: "95vw",
    },
  },
  button: {
    width: 270,
  },
  hidden: {
    display: 'none',
  },
  audioIconWrapper: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
  },
});

interface IProps {
  corrWords: Array<IWord>;
  wrongWords: Array<IWord>;
}

const ResultOfMiniGame: React.FC<IProps> = ({ corrWords, wrongWords }: IProps) => {
  const classes = useStyles();
  const [isListened, setIsListened] = useState({state: false, word: ''});

  const onListenWord = (_e: any, state: boolean, word: string) => {
    setIsListened({state, word});
  };

  const path = useLocation().pathname

  const renderWords = (words: IWord[]): React.ReactNode => {
    return words.map(word => {
      return (
        <ListItem className={classes.record} key={word.audio}>
          <span onClick={(e) => onListenWord(e, true, word.audio)}
            className={classes.audioIconWrapper}
            title="Говори со мной!"
          >
            <HeadsetIcon color={isListened.word === word.audio && isListened.state ? "secondary" : "primary"} />
            <span className={classes.hidden}>
              <ReactPlayer
                url={`${FILESPATH}${word.audio}`}
                playing={isListened.word === word.audio && isListened.state}
                onEnded={() => setIsListened({state: false, word: ''})}
              />
            </span>
          </span>
          <ListItemText>
            <span className={classes.recordWord}>
              {word.word} &nbsp;
            </span>
            <span className={classes.recordWordTranses}>
              <em>{word.transcription}</em> - {word.wordTranslate}
            </span>
          </ListItemText>
        </ListItem>
      );
    });
  }

  useEffect(() => {
    console.log(corrWords, wrongWords);
  }, []);

  return (
    <Box className={classes.resultLayout}>
      <Container className={classes.resultWindow}>
        <Box className={classes.resultWrapper}>
          <Typography variant="h4" color="secondary">
            <span>Ошибок: </span>
            <span><strong>{wrongWords.length}</strong></span>
          </Typography>
          <List>{renderWords(wrongWords)}</List>

          <Divider variant="fullWidth"  className={classes.divider} />

          <Typography variant="h4" color="primary">
            <span>Знаю / угадано: </span>
            <span><strong>{corrWords.length}</strong></span>
          </Typography>
          <List>{renderWords(corrWords)}</List>
        </Box>
      </Container>

      <Container className={classes.buttonsWrapper}>
        <Button  className={classes.button} variant="contained" color="primary" href={path}>
          Продолжить тренировку
        </Button>
      <Link to={'mini-games'}>
        <Button className={classes.button} variant="contained" color="primary">
          К списку тренировок
        </Button>
      </Link>
      </Container>
    </Box>
  );
};

export default ResultOfMiniGame;
