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
  resultWindow: {
    width: "60vw",
    height: "60vh",
    backgroundColor: "beige",
    margin: "150px auto 50px auto",
    alignItems: "center",
    overflowY: 'scroll',
    [theme.breakpoints.down("sm")]: {
      width: "97vw",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
    },
  },
  resultPart: {
    width: "80%",
    height: "40vh",
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(3),
    overflow: "scroll",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "95%",
    },
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
  button: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(3),
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(1),
    },
  },
  buttons: {
    textAlign: 'center',
    marginTop: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
  },
});

const ResultOfMiniGame: React.FC = () => {
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
      <Box className={classes.buttons}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            href="#contained-buttons"
          >
            Продолжить тренировку
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            href="#contained-buttons"
          >
            К списку тренировок
          </Button>
        </Box>
    </Container>
  );
};

export default ResultOfMiniGame;
