import { createAsyncThunk } from '@reduxjs/toolkit'
import { allConfigs, authorization, url } from '../../api'
import {
  ICreateMessageDto,
  IGetListMessagesDto,
  IUpdateMsgEmojiDto,
} from '../../interfaces'

export const getListMessagesThunk = createAsyncThunk(
  'ContentChat/getListMessages',
  async ({ chat_id, page }: IGetListMessagesDto) => {
    const res = await fetch(
      `${url}/message/get?chat_id=${encodeURIComponent(
        chat_id
      )}&page=${encodeURIComponent(page)}`,
      {
        method: 'GET',
        headers: authorization(),
      }
    )
    const data = await res.json()
    return data
  }
)

export const sendMessageThunk = createAsyncThunk(
  'ContentChat/sendMessage',
  async (createMessageDto: ICreateMessageDto) => {
    const res = await fetch(`${url}/message/send`, {
      method: 'POST',
      headers: allConfigs(),
      body: JSON.stringify(createMessageDto),
    })
    const data = await res.json()
    return data
  }
)

export const updateEmojiThunk = createAsyncThunk(
  'ContentChat/updateEmojiThunk',
  async (updateMsgEmojiDto: IUpdateMsgEmojiDto) => {
    const res = await fetch(`${url}/message/emoji`, {
      method: 'PATCH',
      headers: allConfigs(),
      body: JSON.stringify(updateMsgEmojiDto),
    })
    const data = await res.json()
    return data
  }
)
