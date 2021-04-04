import React from "react";
import { Box, Container, List, makeStyles, Typography } from "@material-ui/core";
import { IGame } from "../interfaces";
import { theme } from "../mui-style";
import GameCard from "./GameCard";
import PageLayout from "./PageLayout";
import savanna from "../assets/images/background_3.jpg";
import audioCall from "../assets/images/background_4.jpg";
import sprint from "../assets/images/background_5.jpg";
import ownGame from "../assets/images/background_6.jpg";
import SportsEsportsTwoTone from "@material-ui/icons/SportsEsportsTwoTone";


const GAMES: IGame[] = [
  {
    name: "Саванна",
    image: savanna,
    description:
      "Чем больше слов ты знаешь, тем легче тебе будет общаться. Игра Саванна лучший помощник для развития словарного запаса",
    href: "/savannah",
  },
  {
    name: "Аудиовызов",
    image: audioCall,
    description: "Игра Аудиовызов улучшает восприятие разговорной речи на слух",
    href: "/audio",
  },
  {
    name: "Спринт",
    image: sprint,
    description:
      "Чем больше слов ты знаешь, тем легче тебе будет общаться. Игра Саванна лучший помощник для развития словарного запаса",
    href: "/sprint",
  },
  {
    name: "Своя игра",
    image: ownGame,
    description:
      "Какой-то крутой и мотивирующий текст, чтобы немедленно начать играть)))",
    href: "/owngame",
  },
];

const useStyles = makeStyles({
  container: {
    // background: "beige",
    height: "100vh",
  },
  miniGamesWrapper: {
    // padding: 30,
    width: "68%",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  gameList: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(3),
    display: "flex",
    flexWrap: "wrap",
    rowGap: theme.spacing(2),
    columnGap: theme.spacing(2),
    justifyContent: "center",
  },
  titleWrapper: {
    display: "flex",
    columnGap: "20px",
    padding: theme.spacing(3, 1, 0),
  },
  customTwoTones: {
    // filter: 'invert(30%) sepia(98%) saturate(1068%) hue-rotate(188deg) brightness(89%) contrast(94%)'
    filter: 'invert(64%) sepia(19%) saturate(5959%) hue-rotate(320deg) brightness(114%) contrast(80%)'
  },
});

const MiniGames: React.FC = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth="lg">
      <PageLayout pageName={'mini-games'} >
        <Box className={classes.titleWrapper} color="text.primary">
          <SportsEsportsTwoTone style={{ fontSize: 50 }} className={classes.customTwoTones}/>
          <Typography gutterBottom variant="h3" style={{ fontWeight: 300 }} color="primary">
            Мини-игры
          </Typography>
        </Box>
        <div className={classes.miniGamesWrapper}>
          <List className={classes.gameList}>
            {GAMES.map((elem: IGame, index: number) => {
              return <GameCard {...elem} key={index} />;
            })}
          </List>
          <span />
        </div>
      </PageLayout>
    </Container>
  );
};

export default MiniGames;
