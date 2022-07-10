import { createSlice } from '@reduxjs/toolkit'
import { changeAvatarThunk, getMyInfoThunk } from './thunks'

export const sliceHeaderSidebar = createSlice({
  name: 'HeaderSidebar',
  initialState: {
    showSearchUsers: false,
    myInfo: {},
    contentSearch: '',
  },
  reducers: {
    setShowSearchUsers: (state, action) => {
      state.showSearchUsers = action.payload
    },
    setContentSearch: (state, action) => {
      state.contentSearch = action.payload
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getMyInfoThunk.fulfilled, (state, action) => {
        state.myInfo = action.payload.data.my_info
      })
      .addCase(changeAvatarThunk.fulfilled, (state, action) => {
        state.myInfo = {
          ...state.myInfo,
          avatar: action.payload.data.new_avatar,
        }
      }),
})
