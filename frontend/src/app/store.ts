import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import wordsReducer from '../slices/wordsSlice'
import userReducer from '../slices/userSlice'
import gameWordsReducer from '../slices/gameWordsSlice'
import userSettingsReducer from '../slices/settingsSlice'
import gamesPageReducer from '../slices/gamesPageSlice'
import groupPagesReducer from '../slices/groupPagesSlice'
// ...

const store = configureStore({
  reducer: {
    counter: counterReducer,
    words: wordsReducer,
    user: userReducer,
    gameWords: gameWordsReducer,
    settings: userSettingsReducer,
    gamesPage: gamesPageReducer
    groupPagesArr: groupPagesReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
