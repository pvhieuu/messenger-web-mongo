import { createAsyncThunk } from '@reduxjs/toolkit'
import { authorization, contentType, url } from '../../api'
import { ILoginAccountUserDto } from '../../interfaces'

export const loginAccountUserThunk = createAsyncThunk(
  'FormLogin/loginAccountUserThunk',
  async (loginAccountUserDto: ILoginAccountUserDto) => {
    const res = await fetch(`${url}/user/login`, {
      method: 'POST',
      headers: contentType(),
      body: JSON.stringify(loginAccountUserDto),
    })
    const data = await res.json()
    if (data.success) {
      localStorage.setItem('access_token', data.data.access_token)
    }
    return data
  }
)

export const logoutAccountUserThunk = createAsyncThunk(
  'FormLogin/logoutAccountUser',
  async () => {
    const res = await fetch(`${url}/user/logout`, {
      method: 'PATCH',
      headers: authorization(),
    })
    const data = await res.json()
    if (data.success) {
      localStorage.removeItem('access_token')
    }
    return data
  }
)
