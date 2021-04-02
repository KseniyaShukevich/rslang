import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'

interface IGroupPagesArrState {
  value: { name: string, number: number }[][] | [];
}

const initialState: IGroupPagesArrState = {
  value: []
}

export const groupPagesSlice = createSlice({
  name: 'groupPagesArr',
  initialState,
  reducers: {
    groupNonEmptyPages: (state, action: PayloadAction<[{ name: string, number: number }[], number]>) => {
      state.value[action.payload[1]] = action.payload[0];
    }
  }
})

export const { groupNonEmptyPages } = groupPagesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectGroupNonEmptyPagesArr = (state: RootState) => state.groupPagesArr.value


export default groupPagesSlice.reducer

