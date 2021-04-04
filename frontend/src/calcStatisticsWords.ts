import {
        createUserWord,
        updateUserWord,
        fetchUserWords
      } from './requests'
import {
        INIT_USER_WORD,
        ID_LOCALE_STORAGE
      } from './utils/constants'

const changeWord = (game: string, userWord: any, word: any) => {
  if (word.wrong) {
    userWord.optional.miniGames[game].wrongAnswers += word.wrong;
    userWord.difficulty = 'hard';
  } else {
    userWord.optional.miniGames[game].correctAnswers += word.correct;
    userWord.difficulty = 'easy';
  }
}

export const calcStatisticsWordsToDB = async (
  game: string,
  words: Array<any>,
  userId: string,
  token: string
  ) => {
  const userWords = await fetchUserWords(userId, token);
  words.forEach((word: any) => {
    const userWord = userWords.find((el: any) => el.wordId === word.id);
    if (userWord) {
      changeWord(game, userWord, word);
      updateUserWord(userId, word.id, {
        difficulty: userWord.difficulty,
        optional: userWord.optional
      }, token);
    } else {
      const newWord = JSON.parse(JSON.stringify(INIT_USER_WORD));
      changeWord(game, newWord, word);
      createUserWord(userId, word.id, newWord, token);
    }
  });
}

export const calcStatisticsWordsToLS = (game: string, words: Array<any>) => {
  const statisticsWords: string | null = localStorage.getItem(`${ID_LOCALE_STORAGE}statisticsWords`);
  let statistics: Array<any> = [];
  if (statisticsWords) {
    statistics = JSON.parse(statisticsWords);
    words.forEach((word: any) => {
      const oldWord = statistics.find((el: any) => el.id === word.id);
      if (oldWord) {
        changeWord(game, oldWord, word);
        statistics = statistics.filter((el: any) => el.id !== word.id);
        statistics = [...statistics, oldWord];
      } else {
        const newWord = JSON.parse(JSON.stringify(INIT_USER_WORD));
        changeWord(game, newWord, word);
        statistics = [...statistics,
          {
            ...newWord,
            id: word.id
          }
        ];
      }
    });
  } else {
    words.forEach((word: any) => {
      const newWord = JSON.parse(JSON.stringify(INIT_USER_WORD));
      changeWord(game, newWord, word);
      statistics.push(
        {
          ...newWord,
          id: word.id
        }
      );
    });
  }
  localStorage.setItem(`${ID_LOCALE_STORAGE}statisticsWords`, JSON.stringify(statistics));
}
