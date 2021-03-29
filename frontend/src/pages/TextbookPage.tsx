import React, { useEffect, useState } from  'react';
import { fetchWords, selectWords } from "../slices/wordsSlice";
import { selectUser } from "../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import WordCard from "../components/WordCard";
import GameCard from "../components/GameCard";
import PageLayout from "../components/PageLayout";
import SubHeader from "../components/SubHeader";
import { fetchUserWords } from '../requests';
import { Container, Box, Typography, Divider, List } from "@material-ui/core";
import { IWord, IGame, IUserWord } from '../interfaces';
import background from "../assets/images/background_1.jpg";
import savanna from "../assets/images/background_3.jpg";
import audioCall from "../assets/images/background_4.jpg";
import sprint from "../assets/images/background_5.jpg";
import ownGame from "../assets/images/background_6.jpg";
import ListAltTwoToneIcon from '@material-ui/icons/ListAltTwoTone';
import SportsEsportsTwoToneIcon from '@material-ui/icons/SportsEsportsTwoTone';

const GAMES: IGame[] = [
  {
    name: 'Саванна',
    image: savanna,
    description: 'Чем больше слов ты знаешь, тем легче тебе будет общаться. Игра Саванна лучший помощник для развития словарного запаса',
    href: '/savannah',
  },
  {
    name: 'Аудиовызов',
    image: audioCall,
    description: 'Игра Аудиовызов улучшает восприятие разговорной речи на слух',
    href: '/audio',
  },
  {
    name: 'Спринт',
    image: sprint,
    description: 'Чем больше слов ты знаешь, тем легче тебе будет общаться. Игра Саванна лучший помощник для развития словарного запаса',
    href: '/sprint',
  },
  {
    name: 'Своя игра',
    image: ownGame,
    description: 'Какой-то крутой и мотивирующий текст, чтобы немедленно начать играть)))',
    href: '/owngame',
  },
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundImage: `url(${background})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      padding: theme.spacing(2, 0),
    },
    subheaderWrapper: {
      width: 'calc(80% + 60px)',
      margin: theme.spacing(0, "auto"),
    },
    wrapper: {
      width: '80%',
      backgroundColor: "rgba(236,240,241,.73)",
      borderRadius: "0px 0px 10px 10px",
      margin: theme.spacing(0, "auto"),
      padding: theme.spacing(3),
    },
    titleWrapper: {
      display: "flex",
      columnGap: "20px",
      padding: theme.spacing(3, 2, 0),
    },
    wordList: {
      backgroundColor: 'rgba(255,255,255,.6)',
      padding: theme.spacing(1),
      marginBottom: theme.spacing(3),
    },
    gameList: {
      padding: theme.spacing(1),
      marginBottom: theme.spacing(3),
      display: 'flex',
      flexWrap: 'wrap',
      rowGap: theme.spacing(2),
      columnGap: theme.spacing(2),
      justifyContent: 'center',
    },
  })
);

const TextBookPage: React.FC = () => {
  const { book, page } = useParams<Record<string, string>>();
  const words = useSelector(selectWords);
  const user = useSelector(selectUser);
  const [userWordsInfo, setUserWordsInfo] = useState<IUserWord[] | null>(null);
  const [userWords, setUserWords] = useState<IWord[] | null>(null);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(
      fetchWords({
        group: Number(book),
        page: Number(page),
      })
    );
  }, [book, page]);

  useEffect(() => {
    console.log(words);
  }, [words, user])

  useEffect(() => {
    (async () => {
      if (user && user.userId && user.token) {
        const response = await fetchUserWords(user.userId, user.token);
        console.log(response);
        setUserWordsInfo(prev => response);
      }
    })();
  }, [user]);

  useEffect(() => {
    console.log('called collaborate words');
    if (words && userWordsInfo) {
      setUserWords(prev => {
        return words.map((elem: IWord) => {
          const matchedItem = userWordsInfo!.find((item: IUserWord)  => item.wordId === elem.id);
          if (matchedItem) {
            const isDifficult = (matchedItem.difficulty === 'easy') ? false : true;
            const isDeleted = (matchedItem.optional.mode === 'deleted') ? true : false;
            return ({...elem, isDifficult, isDeleted });
          }
          return elem;
        });
      })
    }
  }, [words, userWordsInfo])

  return (
    <PageLayout>
      <Container maxWidth="lg" className={classes.root} disableGutters={true}>
        <Box className={classes.subheaderWrapper}>
          <SubHeader book={book} page={page} />
        </Box>
        <Box className={classes.wrapper}>
          <Box className={classes.titleWrapper} color="text.primary">
            <ListAltTwoToneIcon style={{ fontSize: 50 }} />
            <Typography gutterBottom variant="h3" style={{ fontWeight: 300 }}>
              Слова
            </Typography>
          </Box>
          <List className={classes.wordList}>
            {user && userWords && userWords.map((elem: IWord) => {
              return (
                <WordCard
                  {...elem}
                  key={elem.id}
                  userWordsInfo={userWordsInfo}
                />
              )
            })}
            {!user && words && words.map((elem: IWord) => {
              return (
                <WordCard
                  {...elem}
                  key={elem.id}
                />
              )
            })}
          </List>
          <Divider variant="middle" />
          <Box className={classes.titleWrapper} color="text.primary">
            <SportsEsportsTwoToneIcon style={{ fontSize: 50 }} />
            <Typography gutterBottom variant="h3" style={{ fontWeight: 300 }}>
              Игры
            </Typography>
          </Box>
          <List className={classes.gameList}>
            {GAMES.map((elem: IGame, index: number) => {
              return (
                <GameCard
                  {...elem}
                  key={index}
                />
              )
            })}
          </List>
        </Box>
      </Container>
    </PageLayout>
  )
}

export default TextBookPage;
