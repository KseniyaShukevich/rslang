import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { IUserResponse } from '../services/authorisation.service'

const initialState: IUserResponse = {
  userId: '',
  imageId: '',
  name: '',
  message: '',
  token: '',
  refreshToken: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSignedIn: (state, action: PayloadAction<IUserResponse>) => {
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      localStorage.setItem('refreshToken', JSON.stringify(action.payload.refreshToken));
      Object.assign(state, action.payload);
    },
    userSignedOut: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      Object.assign(state, initialState);
    }
  }
})

export const { userSignedIn, userSignedOut } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user


export default userSlice.reducer

