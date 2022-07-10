import { createAsyncThunk } from '@reduxjs/toolkit'
import { allConfigs, url } from '../../api'
import {
  IUpdateBackgroundColorDto,
  IUpdateColorDto,
  IUpdateEmojiDto,
  IUpdateNicknameDto,
} from '../../interfaces'

export const updateNicknameThunk = createAsyncThunk(
  'HeaderChat/updateNicknameThunk',
  async (updateNicknameDto: IUpdateNicknameDto) => {
    const res = await fetch(`${url}/chat/nickname`, {
      method: 'PATCH',
      headers: allConfigs(),
      body: JSON.stringify(updateNicknameDto),
    })
    const data = await res.json()
    return data
  }
)

export const updateColorThunk = createAsyncThunk(
  'HeaderChat/updateColorThunk',
  async (updateColorDto: IUpdateColorDto) => {
    const res = await fetch(`${url}/chat/color`, {
      method: 'PATCH',
      headers: allConfigs(),
      body: JSON.stringify(updateColorDto),
    })
    const data = await res.json()
    return data
  }
)

export const updateBackgroundColorThunk = createAsyncThunk(
  'HeaderChat/updateBackgroundColorThunk',
  async (updateBackgroundColorDto: IUpdateBackgroundColorDto) => {
    const res = await fetch(`${url}/chat/background_color`, {
      method: 'PATCH',
      headers: allConfigs(),
      body: JSON.stringify(updateBackgroundColorDto),
    })
    const data = await res.json()
    return data
  }
)

export const updateEmojiThunk = createAsyncThunk(
  'HeaderChat/updateEmojiThunk',
  async (updateEmojiDto: IUpdateEmojiDto) => {
    const res = await fetch(`${url}/chat/emoji`, {
      method: 'PATCH',
      headers: allConfigs(),
      body: JSON.stringify(updateEmojiDto),
    })
    const data = await res.json()
    return data
  }
)
