import React, { useEffect, useState, useRef } from  'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";
import { Container, Box, Typography, Divider, List } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ListAltTwoToneIcon from '@material-ui/icons/ListAltTwoTone';
import SportsEsportsTwoToneIcon from '@material-ui/icons/SportsEsportsTwoTone';
import { css } from "@emotion/core";

import { fetchWords, selectWords } from "../slices/wordsSlice";
import { setUserGroupPages, selectGroupNonEmptyPagesArr } from '../slices/groupPagesSlice';
import { selectUser } from "../slices/userSlice";
import { theme } from '../mui-style';
import background from "../assets/images/background_1.jpg";
import savanna from "../assets/images/background_3.jpg";
import audioCall from "../assets/images/background_4.jpg";
import sprint from "../assets/images/background_5.jpg";
import ownGame from "../assets/images/background_6.jpg";
import { IWord, IGame, IUserWord } from '../interfaces';
import { INIT_USER_WORD, ID_LOCALE_STORAGE } from '../utils/constants';
import { fetchUserWords, createUserWord, updateUserWord, getWords,} from '../requests';
import WordCard from "../components/WordCard";
import GameCard from "../components/GameCard";
import PageLayout from "../components/PageLayout";
import SubHeader from "../components/SubHeader";

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
    wordListWrapper: {
      backgroundColor: 'rgba(255,255,255,.6)',
      position: 'relative',
      minHeight: 126,
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
    loaderContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: -10,
      opacity: 0,
      background: '#ffffffde',
      display: 'flex',
      justifyContent: 'center',
      paddingTop: theme.spacing(2),
      transition: 'all 300ms',
    },
    showLoaderContainer: {
      zIndex: 1000,
      opacity: 1,
    }
  })
);

const override = css`
  position: absolute;
  flex: 1
  display: block;
  margin: 0 auto;
`;


const TextBookPage: React.FC = () => {
  const classes = useStyles();
  let [loading, setLoading] = useState(false);

  const { book, page } = useParams<Record<string, string>>();
  const words = useSelector(selectWords);
  const user = useSelector(selectUser);

  const nonEmptyPages = useSelector(selectGroupNonEmptyPagesArr)[+book];
  const pagesArr = useSelector(selectGroupNonEmptyPagesArr)[+book]?.map(page => page.number) || Array.from({ length: 30 }).map((_el, i) => i + 1 ); // TODO наблюдать
  const [userWordsInfo, setUserWordsInfo] = useState<IUserWord[]>([]);
  const [userWords, setUserWords] = useState<IWord[] | null>(null);
  const [toggleDelete, setToggleDelete] = useState<boolean>(false);
  const dispatch = useDispatch();
  const wordsForGames = useRef<any>([]);

  const getWordsForGames = async (book: number, page: number) => {
    if (page < 0 || wordsForGames.current.length >= 20) {
      wordsForGames.current = wordsForGames.current.slice(0, 20);
      localStorage.setItem(`${ID_LOCALE_STORAGE}gameWords`, JSON.stringify(wordsForGames.current));
      return;
    }
    const newWords = await getWords(book, page);
    if (user) {
      const userWords = await fetchUserWords(user?.userId, user?.token);
      newWords.forEach((word: IWord) => {
        const userWord = userWords.find((el: any) => el.wordId === word.id);
        if (userWord) {
          if (userWord.optional.mode === 'learning') {
            wordsForGames.current.push(word);
          }
        } else {
          wordsForGames.current.push(word);
        }
      });
    } else {
      wordsForGames.current = newWords;
    }
    getWordsForGames(book, page - 1);
  }

  useEffect(() => {
    if (book !== undefined) {
      wordsForGames.current = [];
      getWordsForGames(Number(book), Number(page));
    }
  }, [book, page, toggleDelete]);

  useEffect(() => {
    setLoading(true)
    dispatch(
      fetchWords({
        group: Number(book),
        page: Number(page),
      })
    );
  }, [book, page]);

  // убираем лоудер, таймаут нужен чтоб и картинки успели подгрузиться // TODO - разобраться с лоудером при первой загрузке страницы
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 300)
  }, [words]);

  useEffect(() => {
    (async () => {
      if (user && user.userId && user.token) {
        const response = await fetchUserWords(user.userId, user.token);
        setUserWordsInfo(prev => response);
      }
    })();
  }, [ user ]);

  useEffect(() => {
    if (words && userWordsInfo.length !== 0) {
      const res = words.map((elem: IWord) => {
        const matchedItem = userWordsInfo!.find((item: IUserWord)  => item.wordId === elem.id);
        if (matchedItem) {
          const isDifficult = (matchedItem.difficulty === 'hard') ? true : false;
          const isDeleted = (matchedItem.optional.mode === 'deleted') ? true : false;
          return {...elem, isDifficult, isDeleted };
        }
        return elem;
      })
      setUserWords(res);
    }
  }, [words, userWordsInfo]);


  const handleDeleteWord = async (wordId: string) => {
    const matchedWord = userWordsInfo!.find(elem => elem.wordId === wordId);
    const newWord = Object.assign(INIT_USER_WORD);
    if (!matchedWord) {
      newWord.optional.mode = 'deleted';
      setUserWordsInfo(prev => [...prev,
        {
          ...newWord,
          wordId,
          userId: user!.userId
        }
      ]);
      await createUserWord(user!.userId, wordId, newWord, user!.token);
    } else if (matchedWord && matchedWord.optional.mode === 'learning') {
      setUserWordsInfo(prev => {
        matchedWord.optional.mode = 'deleted';
        return [...prev];
      });
      matchedWord.optional.mode = 'deleted';
      await updateUserWord(user!.userId, wordId, {
        optional: matchedWord.optional
      }, user!.token);
    }
    setToggleDelete((prev) => !prev);
  };

  const handleChangeWordDifficulty = async (wordId: string) => {
    const matchedWord = userWordsInfo!.find(elem => elem.wordId === wordId);
    const newWord = Object.assign(INIT_USER_WORD);
    if (!matchedWord) {
      newWord.difficulty = 'hard';
      setUserWordsInfo(prev => [...prev,
        {
          ...newWord,
          wordId,
          userId: user!.userId
        }
      ]);
      await createUserWord(user!.userId, wordId, newWord, user!.token);
    } else if (matchedWord) {
      const newDifficulty = (matchedWord.difficulty === 'easy') ? 'hard' : 'easy';
      setUserWordsInfo(prev => {
        matchedWord.difficulty = newDifficulty;
        return [...prev];
      });
      const updatedPart = {
        difficulty: newDifficulty,
        optional: matchedWord.optional
      }
      await updateUserWord(user!.userId, wordId, updatedPart, user!.token);
    }
  };

  // убираем страницу когда с нее удалены все слова
  useEffect(() => {
    if (!!(user && userWords && userWords.filter(w => !w.isDeleted).length === 0)) {
      dispatch(setUserGroupPages([(nonEmptyPages! || []).filter(elem => elem.number !== +page + 1), +book]));
    }
  }, [ userWords ])

  return (
    <PageLayout>
      <Container maxWidth="lg" className={classes.root} disableGutters={true}>
        <Box className={classes.subheaderWrapper}>
          <SubHeader book={book} page={page} pagesArr={pagesArr} goNextPage={!!(user && userWords && userWords.filter(w => !w.isDeleted).length === 0)}/>
        </Box>
        <Box className={classes.wrapper}>
          <Box className={classes.titleWrapper} color="text.primary">
            <ListAltTwoToneIcon style={{ fontSize: 50 }} />
            <Typography gutterBottom variant="h3" style={{ fontWeight: 300 }}>
              Слова
            </Typography>
          </Box>
          <div className={classes.wordListWrapper}>
            <div className={classes.loaderContainer + ' ' + (loading ? classes.showLoaderContainer : '')}>
              <PuffLoader color={theme.palette.primary.main} loading={true} css={override} size={70} />
            </div>
            <List className={classes.wordList}>
              {user && userWords && userWords.map((elem: IWord) => {
                return (
                  <WordCard
                    {...elem}
                    key={elem.id}
                    userWordsInfo={userWordsInfo}
                    handleDeleteWord={handleDeleteWord}
                    handleChangeWordDifficulty={handleChangeWordDifficulty}
                  />
                )
              })}
              {(!user || (user && !userWords)) && words && words.map((elem: IWord) => {
                return (
                  <WordCard
                    {...elem}
                    key={elem.id}
                    userWordsInfo={userWordsInfo}
                    handleDeleteWord={handleDeleteWord}
                    handleChangeWordDifficulty={handleChangeWordDifficulty}
                  />
                )
              })}
            </List>
          </div>
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
