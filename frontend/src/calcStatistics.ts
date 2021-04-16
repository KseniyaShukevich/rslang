import {
        getUserStatistics,
        updateUserStatistics,
       } from './requests'
import {
         IStatisticsToday,
         MiniGame,
         IStatisticsAllTime,
         IStatisticsOneDay
        } from './interfaces'
import { ID_LOCALE_STORAGE } from './utils/constants'

const addZero = (value: number): string => value < 10 ? `0${value}` : `${value}`;

export const getDate = (): string => {
  const today: Date = new Date();
  const date: string = addZero(today.getDate());
  const month: string = addZero(today.getMonth() + 1);
  const year: number = today.getFullYear();
  return `${date} ${month} ${year}`;
}

const calcStatisticsForToday = (
  miniGame: MiniGame,
  obj: IStatisticsToday,
  countLearnedWords: number,
  correctAnswers: number,
  wrongAnswers: number,
  longestCorrectAnswers: number
  ) => {
  const dateToday: string = getDate();
  if (dateToday !== obj.miniGames[miniGame].date) {
    obj.miniGames[miniGame].date = dateToday;
    obj.miniGames[miniGame].countLearnedWords = countLearnedWords;
    obj.miniGames[miniGame].correctAnswers = correctAnswers;
    obj.miniGames[miniGame].wrongAnswers = wrongAnswers;
    obj.miniGames[miniGame].longestCorrectAnswers = longestCorrectAnswers;
  } else {
    obj.miniGames[miniGame].countLearnedWords += countLearnedWords;
    obj.miniGames[miniGame].correctAnswers += correctAnswers;
    obj.miniGames[miniGame].wrongAnswers += wrongAnswers;
    if (obj.miniGames[miniGame].longestCorrectAnswers < longestCorrectAnswers) {
      obj.miniGames[miniGame].longestCorrectAnswers = longestCorrectAnswers;
    }
  }
  if (dateToday !== obj.generalStatistics.date) {
    obj.generalStatistics.date = dateToday;
    obj.generalStatistics.totalCorrectAnswers = correctAnswers;
    obj.generalStatistics.totalWordsLearned = countLearnedWords;
    obj.generalStatistics.totalWrongAnswers = wrongAnswers;
  } else {
    obj.generalStatistics.totalCorrectAnswers += correctAnswers;
    obj.generalStatistics.totalWordsLearned += countLearnedWords;
    obj.generalStatistics.totalWrongAnswers += wrongAnswers;
  }
}

const calcByDay = (
  obj: IStatisticsAllTime,
  dateToday: string,
  countLearnedWords: number
) => {
  if (!obj.byDay.length) {
    obj.byDay.push({
      date: dateToday,
      countLearnedWords: countLearnedWords,
    });
    return;
  }

  const lastDay: IStatisticsOneDay = obj.byDay[obj.byDay.length - 1];

  if (dateToday !== lastDay.date) {
    obj.byDay.push({
      date: dateToday,
      countLearnedWords: countLearnedWords,
    });
  } else {
    lastDay.countLearnedWords += countLearnedWords;
    obj.byDay[obj.byDay.length - 1] = lastDay;
  }
}

const calcForEachDay = (
  obj: IStatisticsAllTime,
  dateToday: string,
  countLearnedWords: number
) => {
  if (!obj.forEachDay.length) {
    obj.forEachDay.push({
      date: dateToday,
      countLearnedWords: countLearnedWords,
    });
    return;
  }

  const lastDay: IStatisticsOneDay = obj.forEachDay[obj.forEachDay.length - 1];

  if (dateToday !== lastDay.date) {
    obj.forEachDay.push({
      date: dateToday,
      countLearnedWords: lastDay.countLearnedWords + countLearnedWords,
    });
  } else {
    lastDay.countLearnedWords += countLearnedWords;
    obj.forEachDay[obj.forEachDay.length - 1] = lastDay;
  }
}

const calcStatisticsForAllTime = (
  obj: IStatisticsAllTime,
  countLearnedWords: number,
) => {
  const dateToday: string = getDate();
  calcByDay(
    obj,
    dateToday,
    countLearnedWords
  );
  calcForEachDay(
    obj,
    dateToday,
    countLearnedWords
  );
}

const clearGame = (miniGame: any, today: string) => {
  if (miniGame.date !== today) {
    miniGame.date = today;
    miniGame.countLearnedWords = 0;
    miniGame.correctAnswers = 0;
    miniGame.wrongAnswers = 0;
    miniGame.longestCorrectAnswers = 0;
  }
}

const clearGeneralStatistics = (
  generalStatistics: any,
  today: string
  ) => {
  if (generalStatistics.date !== today) {
    generalStatistics.date = today;
    generalStatistics.totalWordsLearned = 0;
    generalStatistics.totalCorrectAnswers = 0;
    generalStatistics.totalWrongAnswers = 0;
  }
}

const getStatistics = async (
  userId: string | null = null,
  token: string | null = null,
) => {
  if (userId && token) {
    return await getUserStatistics(userId, token);
  } else {
    const lSStatistics: string | null = localStorage.getItem(`${ID_LOCALE_STORAGE}statistics`);
    if (lSStatistics) {
      return JSON.parse(lSStatistics);
    } else {
      return null;
    }
  }
}

const updateStatistics = async (
  userId: string | null,
  token: string | null,
  statistics: any
  ) => {
    if (userId && token) {
      updateUserStatistics(
        userId,
        {
          optional: statistics.optional
        },
        token
      );
    } else {
      localStorage.setItem(`${ID_LOCALE_STORAGE}statistics`, JSON.stringify(statistics));
    }
}

export const clearTodayStatistics = async (
  userId: string | null = null,
  token: string | null = null,
) => {
  const statistics = await getStatistics(userId, token);
  if (!statistics) return null;
  const today = getDate();

  clearGame(statistics.optional.today.miniGames.savannah, today);
  clearGame(statistics.optional.today.miniGames.audio, today);
  clearGame(statistics.optional.today.miniGames.sprint, today);
  clearGame(statistics.optional.today.miniGames.ownGame, today);
  clearGeneralStatistics(statistics.optional.today.generalStatistics, today);
  updateStatistics(userId, token, statistics);
}

export const addStatisticsToDB = async (
  userId: string,
  token: string,
  miniGame: MiniGame,
  countLearnedWords: number,
  correctAnswers: number,
  wrongAnswers: number,
  longestCorrectAnswers: number
  ) => {
    const statistics = await getUserStatistics(userId, token);
    calcStatisticsForToday(
      miniGame,
      statistics.optional.today,
      countLearnedWords,
      correctAnswers,
      wrongAnswers,
      longestCorrectAnswers,
    );
    calcStatisticsForAllTime(
      statistics.optional.forAllTime,
      countLearnedWords,
    );
    updateUserStatistics(
      userId,
      {
        optional: statistics.optional
      },
      token
    );
}

export const addStatisticsToLStorage = (
  miniGame: MiniGame,
  countLearnedWords: number,
  correctAnswers: number,
  wrongAnswers: number,
  longestCorrectAnswers: number
) => {
  const lSStatistics = localStorage.getItem(`${ID_LOCALE_STORAGE}statistics`);
  if (!lSStatistics) return null;
  const statistics = JSON.parse(lSStatistics);
  calcStatisticsForToday(
    miniGame,
    statistics.optional.today,
    countLearnedWords,
    correctAnswers,
    wrongAnswers,
    longestCorrectAnswers,
  );
  localStorage.setItem(`${ID_LOCALE_STORAGE}statistics`, JSON.stringify(statistics));
}
