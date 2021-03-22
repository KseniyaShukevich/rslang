import { configureStore } from '@reduxjs/toolkit'
import counterRouter from '../features/counter/counterSlice'
import wordsRouter from '../slices/wordsSlice'
// ...

const store = configureStore({
  reducer: {
    counter: counterRouter,
    words: wordsRouter,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
