import {UserData} from '../../types/user'
import {API_URL} from '../api-url'
import {AppDispatch} from '../../redux/store'
import {logInActionCreator} from '../../redux/reducers/user'
import {showToastActionCreator} from '../../redux/reducers/toast'
import {ToastType} from '../../types/toast'
import {setErrorActionCreator, setLoadingActionCreator} from '../../redux/reducers/dataLoad'

type Data = {
  token: string
}

const login = async (body: UserData) => {
  const resp = await fetch(API_URL.auth, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    },
  })

  if (resp.ok) {
    const data: Data = await resp.json()
    return data
  } else {
    throw new Error(`${resp.status}`)
  }
}

export const loginRequest = (credentials: UserData) => async (dispatch: AppDispatch) => {
  dispatch(setLoadingActionCreator(true))
  try {
    const data = await login(credentials)
    dispatch(logInActionCreator(data.token))
    dispatch(setLoadingActionCreator(false))
  } catch (e: unknown) {
    if (e instanceof Error) {
      const message = e.message === '400' ? 'Invalid credentials' : 'Something went wrong'
      dispatch(showToastActionCreator({type: ToastType.Error, message}))
      dispatch(setErrorActionCreator(true))
    }
  }
}
