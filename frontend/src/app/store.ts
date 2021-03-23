import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import wordsReducer from '../slices/wordsSlice'
// ...

const store = configureStore({
  reducer: {
    counter: counterReducer,
    // two: twoSlice.reducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
