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

export interface IGame {
  name: string,
  image: string,
  description: string,
  href: string,
}
