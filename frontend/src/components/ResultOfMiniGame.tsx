import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { theme } from "../mui-style";
import speaker from "../assets/images/speaker.svg";
import { IWordStat } from "../interfaces";
import { Link } from 'react-router-dom';

const wordsWrong: IWordStat[] = [
  {
    word: "word1",
    translation: "translation1",
  },
  {
    word: "word2",
    translation: "translation2",
  },
  {
    word: "word3",
    translation: "translation3",
  },
  {
    word: "word4",
    translation: "translation4",
  },
];

const wordsKnown = [
  {
    word: "word",
    translation: "translation",
  },
  {
    word: "word",
    translation: "translation",
  },
  {
    word: "word",
    translation: "translation",
  },
  {
    word: "word",
    translation: "translation",
  },
];

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
    alignItems: 'center',
  },
  resultWindow: {
    minHeight: 300,
    height: "60vh",
    backgroundColor: "beige",
    alignItems: "center",
    overflowY: 'scroll',
    width: "60vw",
    [theme.breakpoints.down(900)]: {
      width: "80vw",
    },
    [theme.breakpoints.down(620)]: {
      width: "100vw",
    },
  },
  resultPart: {
    width: "80%",
    height: "40vh",
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(3),
    margin: "0 auto",
  },
  wordStatus: {
    paddingRight: 10,
    fontSize: "1.5rem",
    color: "grey",
  },
  mistakesCount: {
    width: 15,
    backgroundColor: "red",
    borderRadius: "45%",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    background: 'beige',
    width: "60vw",
    borderTop: 'solid 1px grey',
    [theme.breakpoints.down(900)]: {
      width: "80vw",
    },
    [theme.breakpoints.down(620)]: {
      width: "100vw",
    },
  },
  containerButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: "100vw",
    maxWidth: 450,
    alignItems: 'center',
    [theme.breakpoints.down(480)]: {
      justifyContent: 'center',
    },
  }
});

interface IProps {
  setIsEndLayout: (value: boolean) => void
  setIsStartLayout: (value: boolean) => void
}

const ResultOfMiniGame: React.FC<IProps> = ({ setIsEndLayout, setIsStartLayout }: IProps) => {
  const classes = useStyles();

  function renderWrongWords(): React.ReactNode {
    return wordsWrong.map((item: IWordStat) => {
      return (
        <ListItem>
          <ListItemIcon style={{ width: 20, height: 20 }}>
            <img src={speaker}></img>
          </ListItemIcon>
          <ListItemText style={{ fontSize: '35px' }}>
            {item.word} - {item.translation}
          </ListItemText>
        </ListItem>
      );
    });
  }

  function renderKnownWords(): React.ReactNode {
    return wordsKnown.map((item: IWordStat) => {
      return (
        <ListItem>
          <ListItemIcon style={{ width: 20, height: 20 }}>
            <img src={speaker}></img>
          </ListItemIcon>
          <ListItemText style={{ fontSize: "1.2rem" }}>
            {item.word} - {item.translation}
          </ListItemText>
        </ListItem>
      );
    });
  }

  return (
    <>
      <Box className={classes.resultLayout}>
        <Container className={classes.resultWindow}>
          <Box className={classes.resultPart}>
            <Typography style={{ padding: "18px 0 15px 68px" }}>
              <span className={classes.wordStatus}>Ошибок</span>
              <span className={classes.mistakesCount} style={{ fontSize: "1.5rem" }}>
                3
              </span>
            </Typography>
            <Grid>
              <List>{renderWrongWords()}</List>
            </Grid>
            <Typography style={{ padding: "18px 0 15px 68px", borderTop: "2px solid grey"}}>
              <span className={classes.wordStatus}>Знаю</span>{" "}
              <span
                className={classes.mistakesCount}
                style={{ fontSize: "1.5rem", backgroundColor: "green" }}
              >
                5
              </span>
            </Typography>
            <Grid>
              <List>{renderKnownWords()}</List>
            </Grid>
          </Box>
        </Container>
        <Container className={classes.buttons}>
          <Box className={classes.containerButtons}>
            <Button
              variant="contained"
              color="primary"
              href="savannah"
            >
              Продолжить тренировку
            </Button>
            <Link to={'mini-games'}>
              <Button
                variant="contained"
                color="primary"
              >
                 К списку тренировок
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ResultOfMiniGame;
