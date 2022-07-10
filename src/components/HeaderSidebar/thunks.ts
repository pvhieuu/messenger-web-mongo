import { createAsyncThunk } from '@reduxjs/toolkit'
import { allConfigs, authorization, url } from '../../api'
import { IChangeAvatarDto } from '../../interfaces'

export const getMyInfoThunk = createAsyncThunk(
  'HeaderSidebar/getMyInfoThunk',
  async () => {
    const res = await fetch(`${url}/user/me`, {
      method: 'GET',
      headers: authorization(),
    })
    const data = await res.json()
    return data
  }
)

export const changeAvatarThunk = createAsyncThunk(
  'HeaderSidebar/changeAvatarThunk',
  async (changeAvatarDto: IChangeAvatarDto) => {
    const res = await fetch(`${url}/user/avatar`, {
      method: 'PATCH',
      headers: allConfigs(),
      body: JSON.stringify(changeAvatarDto),
    })
    const data = await res.json()
    if (data.success) {
      alert(data.message)
    }
    return data
  }
)
