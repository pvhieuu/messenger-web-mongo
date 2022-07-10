import { createAsyncThunk } from '@reduxjs/toolkit'
import { allConfigs, authorization, url } from '../../api'
import {
  ICreateChatDto,
  IDeleteChatDto,
  IUpdateReadedDto,
} from '../../interfaces'

export const getListChatsThunk = createAsyncThunk(
  'ContentSidebar/getListChatsThunk',
  async () => {
    const res = await fetch(`${url}/chat/get`, {
      method: 'GET',
      headers: authorization(),
    })
    const data = await res.json()
    return data
  }
)

export const searchListUsersThunk = createAsyncThunk(
  'ContentSidebar/searchListUsersThunk',
  async (contentSearch: string) => {
    const res = await fetch(
      `${url}/user/search?pattern=${encodeURIComponent(contentSearch)}`,
      {
        method: 'GET',
        headers: authorization(),
      }
    )
    const data = await res.json()
    return data
  }
)

export const createNewChatThunk = createAsyncThunk(
  'ContentSidebar/createNewChatThunk',
  async (createChatDto: ICreateChatDto) => {
    const res = await fetch(`${url}/chat/create`, {
      method: 'POST',
      headers: allConfigs(),
      body: JSON.stringify(createChatDto),
    })
    const data = await res.json()
    return data
  }
)

export const deleteChatThunk = createAsyncThunk(
  'ContentSidebar/deleteChatThunk',
  async (deleteChatDto: IDeleteChatDto) => {
    const res = await fetch(
      `${url}/chat/delete?chat_id=${encodeURIComponent(
        deleteChatDto.chat_id
      )}&guest_chat_id=${encodeURIComponent(
        deleteChatDto.guest_chat_id || 'null'
      )}&guest_id=${encodeURIComponent(deleteChatDto.guest_id)}`,
      {
        method: 'DELETE',
        headers: authorization(),
      }
    )
    const data = await res.json()
    return data
  }
)

export const updateReadedThunk = createAsyncThunk(
  'ContentSidebar/updateReaded',
  async (updateReadedDto: IUpdateReadedDto) => {
    const res = await fetch(`${url}/chat/read`, {
      method: 'PATCH',
      headers: allConfigs(),
      body: JSON.stringify(updateReadedDto),
    })
    const data = await res.json()
    return data
  }
)
