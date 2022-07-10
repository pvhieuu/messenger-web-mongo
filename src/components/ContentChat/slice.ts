import { createSlice } from '@reduxjs/toolkit'
import { IChat, IMessage } from '../../interfaces'
import { socket } from '../../pages/Dashboard'
import {
  getListMessagesThunk,
  sendMessageThunk,
  updateEmojiThunk,
} from './thunks'

const initialState: {
  listMessages: IMessage[]
  lastMessage: IMessage | null
  newGuestChat: IChat | null
  sending: boolean
  page: number
} = {
  listMessages: [],
  lastMessage: null,
  newGuestChat: null,
  sending: false,
  page: 1,
}

export const sliceContentChat = createSlice({
  name: 'ContentChat',
  initialState,
  reducers: {
    listenMessage: (state, action) => {
      state.listMessages = [...state.listMessages, action.payload]
    },
    setListMessages: (state, action) => {
      state.listMessages = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    updateEmojiMessage: (state, action) => {
      state.listMessages = state.listMessages.map((message: IMessage) =>
        message._id === action.payload.message_id
          ? { ...message, emoji: action.payload.emoji }
          : message
      )
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getListMessagesThunk.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.listMessages = [
            ...action.payload.data.list_messages,
            ...state.listMessages,
          ]
        }
      })
      .addCase(sendMessageThunk.pending, (state) => {
        state.sending = true
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.listMessages = [
            ...state.listMessages,
            action.payload.data.new_message,
          ]
          state.lastMessage = action.payload.data.new_message
          state.sending = false
          socket.emit('send message', action.payload.data.new_guest_message)
          if (action.payload.data.new_guest_chat) {
            state.newGuestChat = action.payload.data.new_guest_chat
            socket.emit('create chat', action.payload.data.new_guest_chat)
          }
        }
      })
      .addCase(updateEmojiThunk.fulfilled, (state, action) => {
        state.listMessages = state.listMessages.map((message: IMessage) =>
          message._id === action.payload.data.message_id
            ? { ...message, emoji: action.payload.data.emoji }
            : message
        )
      }),
})
