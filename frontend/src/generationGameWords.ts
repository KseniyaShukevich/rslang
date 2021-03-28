import { IWord } from './interfaces'

export const getRandomNumber = (min: number, max: number) => {
  const rand: number = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export const getWordsForGame = (allWords: Array<IWord>, count: number) => {
  const words: Array<IWord> = allWords.slice();
  const noAnsweredWords: Array<IWord> = allWords.slice();
  let resArray: Array<IWord> = [];
  function fun() {
    if (!noAnsweredWords.length) return null;

    resArray = [];
    const indexWord: number = getRandomNumber(0, noAnsweredWords.length - 1);
    const word = noAnsweredWords[indexWord];
    const positionWord: number = getRandomNumber(0, count - 1);

    for (let i: number = 1; i < count; i += 1) {
      const newWordIndex: number = getRandomNumber(0, words.length - 1);
      if (
         (words[newWordIndex].id !== word.id) &&
         !resArray.filter((el) => el.id === words[newWordIndex].id).length
         ) {
        resArray.push(words[newWordIndex]);
      } else {
        i -= 1;
      }
    }

    resArray = [
      ...resArray.slice(0, positionWord),
      word,
      ...resArray.slice(positionWord)
    ]

    noAnsweredWords.splice(indexWord, 1);

    return [word, resArray, fun];
  }
  return fun();
}
