import { Link, List, makeStyles } from "@material-ui/core";
import React from "react";
import { IGame } from "../interfaces";
import { theme } from "../mui-style";
import GameCard from "./GameCard";
import PageLayout from "./PageLayout";
import savanna from "../assets/images/background_3.jpg";
import audioCall from "../assets/images/background_4.jpg";
import sprint from "../assets/images/background_5.jpg";
import ownGame from "../assets/images/background_6.jpg";

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

  miniGamesWrapper: {
    width:"80%",
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
});

const MiniGames: React.FC = () => {
  // const smth = 9;
  const classes = useStyles();

  return (
    <PageLayout>
      <div className={classes.miniGamesWrapper}>
        <List className={classes.gameList}>
          {GAMES.map((elem: IGame, index: number) => {
            return <GameCard {...elem} key={index} />;
          })}
        </List>
        <span />
      </div>
    </PageLayout>
  );
};

export default MiniGames;
