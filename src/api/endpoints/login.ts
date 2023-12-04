import {API_URL} from '../api-url'

type UserData = {
  username: string
  password: string
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
    const data = await resp.json()
    return data
  } else {
    throw new Error(`${resp.status}`)
  }
}
