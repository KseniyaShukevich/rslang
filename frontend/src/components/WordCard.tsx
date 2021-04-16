import React, { useState } from "react";
import ButtonBase from "@material-ui/core/ButtonBase";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircle from "@material-ui/icons/AddCircle";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAlt";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import ModalDeleteWord from "./ModalDeleteWord";
import ModalStatistic from "./ModalStatistic";
import ModalDescrAboutWord from "./ModalDescrAboutWord";
import ListenPlayer from "./ListenPlayer";
import { IWordCard, IMiniGamesStat } from "../interfaces";
import { FILESPATH } from "../constants";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import { ID_LOCALE_STORAGE } from '../utils/constants';
import { selectSettings } from '../slices/settingsSlice';

const rightIndent = "8px";

const useStyles = makeStyles((theme) => ({
  wordCard: {
    width: "100%",
    paddingTop: "4px",
    paddingBottom: "4px",
    borderBottom: "1px solid gray",
    display: "flex",
    justifyContent: "space-between",
  },
  hidden: {
    display: "none",
  },
  trash: {
    transition: "0.4s",
    marginRight: rightIndent,

    "&:hover": {
      transition: "0.4s",
      color: "red",
    },
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    width: "100%",
    textAlign: "center",
    borderRadius: "8px",
    transition: "0.4s",
    "&:hover": {
      transition: "0.4s",
      backgroundColor: "antiquewhite",
    },
  },
  word: {
    color: "#2582e7",
  },
  noDifficult: {
    color: "green",
    marginRight: "10px",
  },
  Difficult: {
    color: "red",
    marginRight: "10px",
  },
  ava: {
    marginRight: rightIndent,
  },
  right: {
    display: "flex",
    alignItems: "center",
  },
  addCircle: {
    color: 'green',
    '&:hover': {
      cursor: 'pointer',
    }
  }
}));

const WordCard: React.FC<IWordCard> = (props) => {
  const {
    audio,
    word,
    wordTranslate,
    image,
    isDifficult: difficult,
    isDeleted,
    id,
    userWordsInfo,
    handleDeleteWord,
    handleChangeWordDifficulty,
    restoreWord,
    isDeletedWords,
  } = props;
  const classes = useStyles();
  const user = useSelector(selectUser);

  const [isListens, setIsListens] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isStatisticOpen, setIsStatisticOpen] = useState<boolean>(false);
  const [isPortal, setIsPortal] = useState<boolean>(false);
  const [isDifficult, setIsDifficult] = useState<boolean>(difficult);
  const [wordStatistic, setWordStatistic] = useState<IMiniGamesStat | null>(
    null
  );
  const userSettings = useSelector(selectSettings);

  const listenWord = () => {
    setIsListens(true);
  };

  const checkStatistics = (currWord: any) => {
    if (
      currWord.optional.miniGames.savannah.correctAnswers === 0 &&
      currWord.optional.miniGames.audio.correctAnswers === 0 &&
      currWord.optional.miniGames.sprint.correctAnswers === 0 &&
      currWord.optional.miniGames.ownGame.correctAnswers === 0 &&
      currWord.optional.miniGames.savannah.wrongAnswers === 0 &&
      currWord.optional.miniGames.audio.wrongAnswers === 0 &&
      currWord.optional.miniGames.sprint.wrongAnswers === 0 &&
      currWord.optional.miniGames.ownGame.wrongAnswers === 0
    ) {
      return null;
    }
    return currWord.optional.miniGames;
  }

  const handleStatisticClick = (wordId: string) => {
    let matchedWord: any;
    if (user) {
      matchedWord = userWordsInfo!.find((elem) => elem.wordId === wordId);
    } else {
      const statisticsWords: string | null = localStorage.getItem(`${ID_LOCALE_STORAGE}statisticsWords`);
      if (statisticsWords) {
        const statistics = JSON.parse(statisticsWords);
        matchedWord = statistics.find((elem: any) => elem.id === wordId);
      }
    }

    matchedWord
      ? setWordStatistic((prev) => checkStatistics(matchedWord))
      : setWordStatistic((prev) => null);
    setIsStatisticOpen(true);
  };

  const toggleDifficulty = async (wordId: string) => {
    await handleChangeWordDifficulty!(wordId);
    setIsDifficult(prev => !prev);
  }

  return isDeleted ? (
    <></>
  ) : (
    <div className={classes.wordCard}>
      <Avatar
        className={classes.ava}
        src={`${FILESPATH}${image}` || ""}
        alt="word img"
      />
      <ListenPlayer
        audio={`${FILESPATH}${audio}`}
        isAudio={isListens}
        setIsAudio={() => setIsListens(false)}
        listenAudio={listenWord}
      />
      <div
        onClick={() => setIsPortal(true)}
        className={classes.flexColumn}
        style={userSettings.optional.isTranslation ? {} : {justifyContent: 'center'}}
      >
        <strong className={classes.word}>{word}</strong>
        {userSettings.optional.isTranslation && <span>{wordTranslate}</span>}
      </div>
        <div className={classes.right} title={isDifficult ? 'Чёт сложно!' : 'Изи!'}>
          {isDeletedWords && restoreWord && (
            <AddCircle
              className={classes.addCircle}
              onClick={() => restoreWord(id)}
            />
          )}
          {!isDeletedWords && user && !isDifficult && (
            <SentimentSatisfiedAltIcon
              onClick={() => {
                if (userSettings.optional.isButtons) {
                  toggleDifficulty(id);
                }
              }}
              className={classes.noDifficult}
              style={userSettings.optional.isButtons ? {cursor: 'pointer'} : {}}
            />
          )}
          {!isDeletedWords && user && !!isDifficult && (
            <SentimentSatisfiedIcon
              onClick={() => {
                if (userSettings.optional.isButtons) {
                  toggleDifficulty(id);
                }
              }}
              className={classes.Difficult}
              style={userSettings.optional.isButtons ? {cursor: 'pointer'} : {}}
            />
          )}
          {!isDeletedWords && (
            <ButtonBase title="Хм... что-то знакомое, или нет...">
              <TrendingUpIcon
                onClick={() => handleStatisticClick(id)}
                className={classes.trash}
              />
            </ButtonBase>
          )}
          {!isDeletedWords && user && userSettings.optional.isButtons && (
            <>
              <ButtonBase title="Выучил, можно удалять!">
                <DeleteIcon
                  onClick={() => setOpen(true)}
                  className={classes.trash}
                />
              </ButtonBase>
              <ModalDeleteWord open={open} setOpen={setOpen} handleDeleteWord={handleDeleteWord} wordId={id} />
            </>
          )}
          <ModalStatistic
            title={'В каждой мини-игре это слово было угадано:'}
            tittleNoStatistics={'Это слово не встречалось в играх.'}
            isOpen={isStatisticOpen}
            setIsOpen={setIsStatisticOpen}
            wordStatistic={wordStatistic}
          />
        </div>
      <ModalDescrAboutWord open={isPortal} setOpen={setIsPortal} {...props} />
    </div>
  );
};

export default WordCard;
