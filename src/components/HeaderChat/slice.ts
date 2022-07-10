import { createSlice } from '@reduxjs/toolkit'
import { IChat } from '../../interfaces'
import { socket } from '../../pages/Dashboard'
import {
  updateBackgroundColorThunk,
  updateColorThunk,
  updateEmojiThunk,
  updateNicknameThunk,
} from './thunks'

const initialState: {
  showChatInfo: boolean
  chatInfo: IChat | null | any
  updatedNickname: { nickname_host?: string; nickname_guest?: string }
  updatedColor: string | null
  updatedBackgroundColor: string | null
  updatedEmoji: string | null
} = {
  showChatInfo: true,
  chatInfo: null,
  updatedNickname: {},
  updatedColor: null,
  updatedBackgroundColor: null,
  updatedEmoji: null,
}

export const sliceHeaderChat = createSlice({
  name: 'HeaderChat',
  initialState,
  reducers: {
    setShowChatInfo: (state, action) => {
      state.showChatInfo = action.payload
    },
    setChatInfo: (state, action) => {
      state.chatInfo = action.payload
    },
    updateGuestChatId: (state, action) => {
      state.chatInfo = state.chatInfo && {
        ...state.chatInfo,
        guest_chat_id: action.payload,
      }
    },
    updateColor: (state, action) => {
      state.updatedColor = action.payload
    },
    updateColorChatInfo: (state, action) => {
      if (state.chatInfo) {
        state.chatInfo = {
          ...state.chatInfo,
          color: action.payload,
        }
      }
    },
    updateBackgroundColor: (state, action) => {
      state.updatedBackgroundColor = action.payload
    },
    updateBackgroundColorChatInfo: (state, action) => {
      if (state.chatInfo) {
        state.chatInfo = {
          ...state.chatInfo,
          background_color: action.payload,
        }
      }
    },
    updateNickname: (state, action) => {
      state.updatedNickname = action.payload
    },
    updateNicknameChatInfo: (state, action) => {
      if (state.chatInfo) {
        state.chatInfo = {
          ...state.chatInfo,
          nickname_host: action.payload.nickname_host,
          nickname_guest: action.payload.nickname_guest,
        }
      }
    },
    updateEmoji: (state, action) => {
      state.updatedEmoji = action.payload
    },
    updateEmojiChatInfo: (state, action) => {
      if (state.chatInfo) {
        state.chatInfo = {
          ...state.chatInfo,
          emoji: action.payload,
        }
      }
    },
    updateStatusOnline: (state, action) => {
      state.chatInfo = {
        ...state.chatInfo,
        guest: {
          ...state.chatInfo?.guest,
          ...action.payload,
        },
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(updateNicknameThunk.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.chatInfo = {
            ...state.chatInfo,
            ...action.payload.data.updated_nickname,
          }
          state.updatedNickname = {
            ...state.updatedNickname,
            ...action.payload.data.updated_nickname,
          }
          socket.emit('change nickname', {
            chat_id: action.payload.data.guest_chat_id,
            updated_nickname: action.payload.data.updated_nickname,
            guest_id: action.payload.data.guest_id,
          })
        }
      })
      .addCase(updateColorThunk.fulfilled, (state, action) => {
        if (action.payload.success) {
          if (state.chatInfo) {
            state.chatInfo = {
              ...state.chatInfo,
              color: action.payload.data.color,
            }
          }
          state.updatedColor = action.payload.data.color
          socket.emit('change color', {
            chat_id: action.payload.data.guest_chat_id,
            color: action.payload.data.color,
            guest_id: action.payload.data.guest_id,
          })
        }
      })
      .addCase(updateBackgroundColorThunk.fulfilled, (state, action) => {
        if (action.payload.success) {
          if (state.chatInfo) {
            state.chatInfo = {
              ...state.chatInfo,
              background_color: action.payload.data.background_color,
            }
          }
          state.updatedBackgroundColor = action.payload.data.background_color
          socket.emit('change background color', {
            chat_id: action.payload.data.guest_chat_id,
            background_color: action.payload.data.background_color,
            guest_id: action.payload.data.guest_id,
          })
        }
      })
      .addCase(updateEmojiThunk.fulfilled, (state, action) => {
        if (action.payload.success) {
          if (state.chatInfo) {
            state.chatInfo = {
              ...state.chatInfo,
              emoji: action.payload.data.emoji,
            }
          }
          state.updatedEmoji = action.payload.data.emoji
          socket.emit('change emoji', {
            chat_id: action.payload.data.guest_chat_id,
            emoji: action.payload.data.emoji,
            guest_id: action.payload.data.guest_id,
          })
        }
      }),
})
