import { createSlice } from '@reduxjs/toolkit'
import { registerNewUserThunk } from './thunks'

export const sliceFormRegister = createSlice({
  name: 'FormRegister',
  initialState: {
    success: false,
    message: '',
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload
    },
  },
  extraReducers: (builder) =>
    builder.addCase(registerNewUserThunk.fulfilled, (state, action) => {
      state.success = action.payload.success
      state.message = action.payload.message
    }),
})
