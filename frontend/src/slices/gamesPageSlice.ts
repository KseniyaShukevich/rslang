import {
        createSlice,
       } from '@reduxjs/toolkit'
import { RootState } from '../app/store'

interface IGamesPage {
  value: boolean
}

const initialState: IGamesPage = {
  value: false
}

export const gamesPageSlice = createSlice({
  name: 'gamesPage',
  initialState,
  reducers: {
    setGamesPage: (state, action) => {
      state.value = action.payload;
    }
  }
})

export const { setGamesPage } = gamesPageSlice.actions

export const selectGamesPage = (state: RootState) => state.gamesPage.value

export default gamesPageSlice.reducer;
