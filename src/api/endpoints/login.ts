import {UserData} from '../../types/user'
import {API_URL} from '../api-url'

export type LoginData = {
  token: string
}

export const login = async (body: UserData) => {
  const resp = await fetch(API_URL.auth, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    },
  })

  if (resp.ok) {
    const data: LoginData = await resp.json()
    return data
  } else {
    throw new Error(`${resp.status}`)
  }
}
