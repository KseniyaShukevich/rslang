import { configureStore } from '@reduxjs/toolkit'
import counterSlice from '../features/counter/counterSlice'
// ...

const store = configureStore({
  reducer: {
    counter: counterSlice,
    // two: twoSlice.reducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch