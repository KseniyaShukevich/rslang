import {
  createSlice,
 } from '@reduxjs/toolkit'
import { RootState } from '../app/store'

interface IGameWords {
  value: Array<any> | null
}

const initialState: IGameWords = {
  value: null
}

export const gameWordsSlice = createSlice({
  name: 'gameWords',
  initialState,
  reducers: {
    setGameWords: (state, action) => {
      state.value = action.payload;
    }
  }
})

export const { setGameWords } = gameWordsSlice.actions

export const selectGameWords = (state: RootState) => state.gameWords.value

export default gameWordsSlice.reducer;
