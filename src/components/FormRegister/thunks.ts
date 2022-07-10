import { createAsyncThunk } from '@reduxjs/toolkit'
import { contentType, url } from '../../api'
import { ICreateUserDto } from '../../interfaces'

export const registerNewUserThunk = createAsyncThunk(
  'FormRegister/registerNewUserThunk',
  async (createUserDto: ICreateUserDto) => {
    const res = await fetch(`${url}/user/register`, {
      method: 'POST',
      headers: contentType(),
      body: JSON.stringify(createUserDto),
    })
    const data = await res.json()
    return data
  }
)
