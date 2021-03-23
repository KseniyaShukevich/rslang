import {
        createSlice,
        PayloadAction,
        createAsyncThunk,
       } from '@reduxjs/toolkit'
import { RootState } from '../app/store'

interface IRequest {
  group: number
  page: number
}

interface IWord {
  id: string
  group: number
  page: number
  word: string
  image: string
  audio: string
  audioMeaning: string
  audioExample: string
  textMeaning: string
  textExample: string
  transcription: string
  wordTranslate: string
  textMeaningTranslate: string
  textExampleTranslate: string
}

export const fetchWords = createAsyncThunk(
  'words/fetchWords.fulfilled',
  async (obj: IRequest): Promise<IWord> => {
    const response = await fetch(`/words?group=${obj.group}&${obj.page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return await response.json();
  }
)

interface IWordsState {
  value: IWord | null
}

const initialState: IWordsState = {
  value: null
}

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
      builder.addCase(fetchWords.fulfilled, (state, action) => {
        state.value = action.payload;
      })
  }
})

export const selectWords = (state: RootState) => state.words.value

export default wordsSlice.reducer;
