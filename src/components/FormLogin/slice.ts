import { createSlice } from '@reduxjs/toolkit'
import { loginAccountUserThunk, logoutAccountUserThunk } from './thunks'

export const sliceFormLogin = createSlice({
  name: 'FormLogin',
  initialState: {
    success: false,
    message: '',
    accessToken: localStorage.getItem('access_token'),
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(loginAccountUserThunk.fulfilled, (state, action) => {
        state.success = action.payload.success
        state.message = action.payload.message
        if (action.payload.success) {
          state.accessToken = action.payload.data.access_token
        }
      })
      .addCase(logoutAccountUserThunk.fulfilled, (state, action) => {
        state.accessToken = null
      }),
})
