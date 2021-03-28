import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { IUserResponse } from '../services/authorisation.service'

interface IUserState {
  value: IUserResponse | null;
}

const initialState: IUserState = {
  value: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signedUser: (state, action: PayloadAction<IUserResponse | null>) => {
      localStorage.setItem('token', JSON.stringify(action.payload? action.payload.token : ''));
      localStorage.setItem('refreshToken', JSON.stringify(action.payload? action.payload.refreshToken : ''));
      state.value = action.payload
    }
  }
})

export const { signedUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.value


export default userSlice.reducer

