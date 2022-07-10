export const url = 'https://messenger-server-mongo.herokuapp.com'

export const contentType = () => ({
  'Content-Type': 'application/json',
})

export const authorization = () => ({
  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
})

export const allConfigs = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
})
