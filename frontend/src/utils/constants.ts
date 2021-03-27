import { IStatistics } from '../interfaces';

const CLOUD_URL: string = 'https://res.cloudinary.com';
const CLOUD_NAME: string = 'dshffjhdkjj';
const INIT_USER_WORD: Object = {
  difficulty: "easy",
  optional: {
    mode: "learning",
    miniGames: {
          savannah: {
            correctAnswers: 0,
            wrongAnswers: 0,
          },
          audio: {
            correctAnswers: 0,
            wrongAnswers: 0,
          },
          sprint: {
            correctAnswers: 0,
            wrongAnswers: 0,
          },
          ownGame: {
            correctAnswers: 0,
            wrongAnswers: 0,
          }
        }
  }
}

const INIT_USER_STATISTICS: IStatistics = {
  optional: {
      today: {
        miniGames: {
          savannah: {
            date: 'дата',
            countLearnedWords: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            longestCorrectAnswers: 0
          },
          audio: {
            date: 'дата',
            countLearnedWords: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            longestCorrectAnswers: 0
          },
          sprint: {
            date: 'дата',
            countLearnedWords: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            longestCorrectAnswers: 0
          },
          ownGame: {
            date: 'дата',
            countLearnedWords: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            longestCorrectAnswers: 0
          }
        },
        generalStatistics: {
          date: 'дата',
          totalWordsLearned: 0,
          totalCorrectAnswers: 0,
          totalWrongAnswers: 0
        }
      },
      forAllTime: {
        forEachDay: [
          {
            date: 'Дата',
            countLearnedWords: 0,
          }
        ],
        byDay: [
            {
              date: 'Дата',
              countLearnedWords: 0,
            }
        ]
      }
    }
}
const INIT_USER_SETTINGS = {
  optional: {
  isTranslation: true,
  isButtons: true
}
}
const DEFAULT_AVATAR: string = 'rslang/avatar_ltzdkha_kkfty4';

export {
  CLOUD_URL,
  CLOUD_NAME,
  INIT_USER_WORD,
  DEFAULT_AVATAR,
  INIT_USER_STATISTICS,
  INIT_USER_SETTINGS
}
