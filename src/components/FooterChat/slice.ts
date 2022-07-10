import { createSlice } from '@reduxjs/toolkit'

const initialState: { content: string } = {
  content: '',
}

export const sliceFooterChat = createSlice({
  name: 'FooterChat',
  initialState,
  reducers: {
    setContent: (state, action) => {
      state.content = action.payload
    },
  },
})
