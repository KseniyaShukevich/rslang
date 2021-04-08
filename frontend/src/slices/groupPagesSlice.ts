import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'

export interface IGroupPagesArrState {
  value: ({ name: string, number: number }[] | null)[] | [];
}

const initialState: IGroupPagesArrState = {
  value: []
}

export const groupPagesSlice = createSlice({
  name: 'groupPagesArr',
  initialState,
  reducers: {
    setUserGroupPages: (state, action: PayloadAction<[{ name: string, number: number }[] | null, number | null]>) => {
      if (action.payload[1] !== null) {
        state.value[action.payload[1]] = action.payload[0];
      } else {
        state.value = []
      }
    }
  }
})

export const { setUserGroupPages } = groupPagesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectGroupNonEmptyPagesArr = (state: RootState) => state.groupPagesArr.value


export default groupPagesSlice.reducer

