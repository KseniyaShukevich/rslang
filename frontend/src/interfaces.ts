export interface ITextbookDepartment {
  name: string,
  color: string,
  book: number,
}

export interface IWord {
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string,
  isDifficult: boolean,
  isDeleted: boolean,
}
export interface IWordCard {
  id: string,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string,
  isDifficult: boolean,
  isDeleted: boolean,
  userWordsInfo?: IUserWord[] | null,
}

export interface IGame {
  name: string,
  image: string,
  description: string,
  href: string,
}

// statistics
export interface IStatisticsToday {
  miniGames: {
    savannah: {
      date: string,
      countLearnedWords: number,
      correctAnswers: number,
      wrongAnswers: number,
      longestCorrectAnswers: number
    },
    audio: {
      date: string,
      countLearnedWords: number,
      correctAnswers: number,
      wrongAnswers: number,
      longestCorrectAnswers: number
    },
    sprint: {
      date: string,
      countLearnedWords: number,
      correctAnswers: number,
      wrongAnswers: number,
      longestCorrectAnswers: number
    },
    ownGame: {
      date: string,
      countLearnedWords: number,
      correctAnswers: number,
      wrongAnswers: number,
      longestCorrectAnswers: number
    }
  },
  generalStatistics: {
    date: string,
    totalWordsLearned: number,
    totalCorrectAnswers: number,
    totalWrongAnswers: number
  }
}

export interface IStatisticsOneDay {
  date: string,
  countLearnedWords: number
}

export interface IStatisticsAllTime {
  forEachDay: Array<IStatisticsOneDay>
  byDay: Array<IStatisticsOneDay>
}

export interface IStatistics {
  optional: {
    today: IStatisticsToday
    forAllTime: IStatisticsAllTime
  }
}

export interface IWordStat {
  word: string,
  translation: string
}

// for mini games
export type MiniGame = 'savannah' | 'audio' | 'sprint' | 'ownGame';

interface IOptional {
  mode: string,
  miniGames: IMiniGamesStat
}

export interface IUserWord {
  difficulty: string,
  wordId: string,
  optional: IOptional,
}

export interface IGameStat {
  correctAnswers: number,
  wrongAnswers: number,
}

export interface IMiniGamesStat {
  savannah: IGameStat,
  audio: IGameStat,
  sprint: IGameStat,
  ownGame: IGameStat,
}
