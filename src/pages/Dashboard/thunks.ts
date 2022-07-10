import { createAsyncThunk } from '@reduxjs/toolkit'
import { allConfigs, url } from '../../api'
import { IUpdateStatusOnlineDto } from '../../interfaces'

export const updateStatusOnlineThunk = createAsyncThunk(
  'Dashboard/updateStatusOnlineThunk',
  async (updateStatusOnlineDto: IUpdateStatusOnlineDto) => {
    const res = await fetch(`${url}/user/status_online`, {
      method: 'PATCH',
      headers: allConfigs(),
      body: JSON.stringify(updateStatusOnlineDto),
    })
    const data = await res.json()
    return data
  }
)
