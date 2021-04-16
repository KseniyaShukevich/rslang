import {
  createSlice,
  createAsyncThunk,
 } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { getUserSettings, updateUserSettings } from '../requests'

interface IRequest {
  userId: string
  body?: Object
  token: string
}

interface IUserSettings {
  value: any
}


// dispatch(fetchUserSettings({
//   userId: '6058ece36fab9b1ffdc9ae71',
//   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNThlY2UzNmZhYjliMWZmZGM5YWU3MSIsImlhdCI6MTYxNjY2OTgwMSwiZXhwIjoxNjE2Njg0MjAxfQ.6BRThUZOHJkrn8lQ-TecmNLIoqmoagWen9bTGd6bXCE'
// }));
export const fetchUserSettings = createAsyncThunk(
  'words/fetchUserSettings.fulfilled',
  async (obj: IRequest): Promise<IUserSettings> => {
    const response = await getUserSettings(obj.userId, obj.token);
    return response;
  }
)


// dispatch(updateSettings({
//   userId: '6058ece36fab9b1ffdc9ae71',
//   body: {
//           optional: {
//             isTranslation: true,
//             isButtons: true
//           }
//         },
//   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNThlY2UzNmZhYjliMWZmZGM5YWU3MSIsImlhdCI6MTYxNjY2OTgwMSwiZXhwIjoxNjE2Njg0MjAxfQ.6BRThUZOHJkrn8lQ-TecmNLIoqmoagWen9bTGd6bXCE'
// }));
export const updateSettings = createAsyncThunk(
  'words/updateSettings.fulfilled',
  async (obj: IRequest): Promise<IUserSettings> => {
    const response = await updateUserSettings(obj.userId, obj.body, obj.token);
    return response;
  }
)

const initialState: IUserSettings = {
  value: null
}

export const settingsSlice = createSlice({
name: 'settings',
initialState,
reducers: {
  setLStorageSettings: (state, action) => {
    state.value = action.payload;
  }
},
extraReducers: builder => {
    builder.addCase(fetchUserSettings.fulfilled, (state, action) => {
      state.value = action.payload;
    })
    builder.addCase(updateSettings.fulfilled, (state, action) => {
      state.value = action.payload;
    })
  }
})

export const { setLStorageSettings } = settingsSlice.actions

export const selectSettings = (state: RootState) => state.settings.value

export default settingsSlice.reducer;
