import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";
import { getAggregatedUserWords } from '../requests';
import { IUserWord } from '../interfaces';
import { selectUser } from "../slices/userSlice";
import { useSelector } from "react-redux";
import WordCard from './WordCard';
import { PaginationItem } from '@material-ui/lab';
import Pagination from '@material-ui/lab/Pagination';
import { updateUserWord } from '../requests';
import BarChart from '@material-ui/icons/BarChart';
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import ModalStatistic from './ModalStatistic';
import { STATISTICS } from '../utils/constants';

const rightIndent = "8px";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      padding: theme.spacing(1),
      minHeight: 400,
      height: "60vh",
      overflowY: "auto",
    },
    paginationContainer: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottom: '1px solid rgba(0,0,0,0.5)',
      height: 40,
    },
    noLearning: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: theme.spacing(2),
      height: 21
    },
    trash: {
      transition: "0.4s",
      marginRight: rightIndent,

      "&:hover": {
        transition: "0.4s",
        color: "red",
        cursor: 'pointer',
      },
    },
    containerStatistics: {
      position: 'absolute',
      right: theme.spacing(2),
      [theme.breakpoints.down(630)]: {
        position: 'static',
      },
    }
  })
);

interface IProps {
  group: number
  mode: string
  text: string
}

const LearningWords: React.FC<IProps> = ({ group, mode, text }: IProps) => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const [allUserWords, setAllUserWords] = useState<any>(null);
  const [userWords, setUserWords] = useState<any>(null);
  const [userWordsInfo, setUserWordsInfo] = useState<Array<IUserWord>>([]);
  const [page, setPage] = useState(1);
  const [pagesArr, setPagesArr] = useState<Array<number>>([]);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [idWord, setIdWord] = useState<string | null>(null);
  const [isInit, setIsInit] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenPageStatistics, setIsOpenPageStatistics] = useState<boolean>(false);
  const [statisticsGroup, setStatisticsGroup] = useState<any>(null);
  const [countWordsGroup, setCountWordsGroup] = useState<number>(0);
  const [statisticsPage, setStatisticsPage] = useState<any>(null);
  const [countWordsPage, setCountWordsPage] = useState<number>(0);

  const handleChange = (value: number) => {
    setPage(value);
  };

  const handleDeleteWord = async (wordId: string) => {
    const matchedWord = userWordsInfo!.find(elem => elem && (elem.wordId === wordId));
    if (matchedWord) {
      matchedWord.optional.mode = 'deleted';
      setIdWord(wordId);
      setIsDeleted(true);
      await updateUserWord(user!.userId, wordId, {
        optional: matchedWord.optional
      }, user!.token);
    }
  }

  const handleChangeWordDifficulty = async (wordId: string) => {
    const matchedWord = allUserWords!.find((elem: any) => elem._id === wordId);
    if (matchedWord) {
      const newDifficulty = (matchedWord.userWord.difficulty === 'easy') ? 'hard' : 'easy';
      if (mode === 'hard') {
        setIdWord(wordId);
        setIsDeleted(true);
      } else {
        setAllUserWords((prev: any) => {
          matchedWord.userWord.difficulty = newDifficulty;
          return [...prev];
        });
      }
      const updatedPart = {
        difficulty: newDifficulty,
        optional: matchedWord.userWord.optional
      }
      await updateUserWord(user!.userId, wordId, updatedPart, user!.token);
    }
  }

  const restoreWord = async (wordId: string) => {
    const matchedWord = allUserWords!.find((elem: any) => elem._id === wordId);
    if (matchedWord) {
      const newBody = JSON.parse(JSON.stringify(matchedWord.userWord));
      newBody.optional.mode = 'learning';
      setAllUserWords((prev: any) => {
        matchedWord.userWord.optional.mode = 'learning';
        return [...prev];
      });
      setIdWord(wordId);
      setIsDeleted(true);
      await updateUserWord(user!.userId, wordId, newBody, user!.token);
    }
  }

  const getUserWords = async () => {
    if (user) {
      const words = await getAggregatedUserWords(
        mode,
        user.userId,
        user.token
      );
      setAllUserWords(words[0].paginatedResults);
    }
  }

  useEffect(() => {
    if (isDeleted) {
      if (allUserWords) {
        const newAllWords = allUserWords.map((word: any) => {
          if (word && (word._id !== idWord)) {
            return word;
          }
        }).filter((cur: any) => cur !== undefined);
        setAllUserWords(newAllWords);
        setIsDeleted(false);
      }
    }
  }, [isDeleted, idWord, allUserWords]);

  useEffect(() => {
    if (userWords) {
      setUserWordsInfo(
        userWords.map((word: any) => {
          return {
            wordId: word._id,
            difficulty: word.userWord.difficulty,
            optional: word.userWord.optional
          }
        })
      );
    }
  }, [userWords]);

  useEffect(() => {
    if (allUserWords) {
      setPagesArr(() => []);
      let init: number = 0;
      for (let i = 0; i < 30; i++) {
        const newPage = allUserWords.filter((word: any) => (word.group === group) && (word.page === i));
        if (!init && !newPage.length) {
          init = i;
        }
        if (newPage.length) {
          setPagesArr((prev) => [ ...prev, i + 1 ]);
        }
      }
      if (isInit) setPage(init + 1);
      setIsInit(false);
    }
  }, [allUserWords, group, isDeleted]);

  useEffect(() => {
    if (!isInit && pagesArr.length && allUserWords &&
      !allUserWords.filter((word: any) => (word.group === group) && (word.page === page - 1)).length) {
        if (pagesArr[pagesArr.indexOf(page) + 1]) {
          setPage(pagesArr[pagesArr.indexOf(page) + 1]);
        } else if (pagesArr[pagesArr.indexOf(page) - 1]) {
          setPage(pagesArr[pagesArr.indexOf(page) - 1]);
        } else {
          setUserWords(null);
        }
    }
  }, [pagesArr, isInit, allUserWords, group, page]);

  useEffect(() => {
    if (allUserWords) {
      const wordsGroup = allUserWords.filter((word: any) => (word.group === group) && (word.page === page - 1));
      setUserWords(wordsGroup);
    }
  }, [group, page, allUserWords]);

  useEffect(() => {
    getUserWords();
  }, [group]);

  const calcStatisticsForGame = (statistics: any, word: any, game: string) => {
    statistics[game].correctAnswers += word.userWord.optional.miniGames[game].correctAnswers;
    statistics[game].wrongAnswers += word.userWord.optional.miniGames[game].wrongAnswers;
  }

  useEffect(() => {
    if (allUserWords) {
      const wordsGroup = allUserWords.filter((word: any) => word.group === group);
      const statistics = JSON.parse(JSON.stringify(STATISTICS));
      if (wordsGroup.length) {
        wordsGroup.forEach((word: any) => {
          calcStatisticsForGame(statistics, word, 'savannah');
          calcStatisticsForGame(statistics, word, 'audio');
          calcStatisticsForGame(statistics, word, 'sprint');
          calcStatisticsForGame(statistics, word, 'ownGame');
        });
        setStatisticsGroup(statistics);
      } else {
        setStatisticsGroup(null);
      }
      setCountWordsGroup(wordsGroup.length);
    }
  }, [group, allUserWords]);

  useEffect(() => {
    if (allUserWords) {
      const wordsPage = allUserWords.filter((word: any) => (word.group === group) && (word.page === page - 1));
      const statistics = JSON.parse(JSON.stringify(STATISTICS));
      if (wordsPage.length) {
        wordsPage.forEach((word: any) => {
          calcStatisticsForGame(statistics, word, 'savannah');
          calcStatisticsForGame(statistics, word, 'audio');
          calcStatisticsForGame(statistics, word, 'sprint');
          calcStatisticsForGame(statistics, word, 'ownGame');
        });
        setStatisticsPage(statistics);
      } else {
        setStatisticsPage(null);
      }
      setCountWordsPage(wordsPage.length);
    }
  }, [group, page, allUserWords]);

  return (
    <>
      {
        pagesArr.length ? (
          <Box className={classes.paginationContainer}>
            <Pagination
              count={pagesArr.length}
              page={pagesArr.indexOf(page)+1}
              siblingCount={2}
              color="primary"
              size="small"
              renderItem = {(item)=> {
                item.page = pagesArr[item.page - 1]
                item.onClick = () => {
                  handleChange(item.page)
                }
                return <PaginationItem {...item}/>
              }}
            />
            {(mode === 'learning') && (
                <Box className={classes.containerStatistics}>
                  <BarChart
                    className={classes.trash}
                    onClick={() => setIsOpen(true)}
                  />
                  <TrendingUpIcon
                    onClick={() => setIsOpenPageStatistics(true)}
                    className={classes.trash}
                  />
                  <ModalStatistic
                    title={`Статистика для ${group + 1} книги`}
                    tittleNoStatistics={`Нет статистики для ${group + 1} книги`}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    countWords={countWordsGroup}
                    wordStatistic={statisticsGroup}
                  />
                  <ModalStatistic
                    title={`Статистика для ${page} страницы`}
                    tittleNoStatistics={`Нет статистики для ${page} страницы`}
                    isOpen={isOpenPageStatistics}
                    setIsOpen={setIsOpenPageStatistics}
                    countWords={countWordsPage}
                    wordStatistic={statisticsPage}
                  />
                </Box>
              )}
          </Box>
        ) : (
          <Typography variant='h6' color='primary' className={classes.noLearning}>
            {text}
          </Typography>
        )
      }
      <Box className={classes.main}>
        {
          userWords && (
            userWords.map((word: any) =>
              {
                let isDeletedWords: boolean = false;
                if (mode === 'deleted') {
                  isDeletedWords = true;
                }
                return (
                  <WordCard
                    {...word}
                    id={word._id}
                    isDifficult={(word.userWord.difficulty === 'hard') ? true : false}
                    userWordsInfo={userWordsInfo}
                    handleDeleteWord={handleDeleteWord}
                    handleChangeWordDifficulty={handleChangeWordDifficulty}
                    restoreWord={restoreWord}
                    isDeletedWords={isDeletedWords}
                    key={word._id}
                  />
                )
              }
            )
          )
        }
      </Box>
    </>
  );
}

export default LearningWords;
