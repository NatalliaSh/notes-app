//import {AppDispatch} from '../store'
import {LocalStorageService} from '../../services/local-storage-service'
import {Actions} from '../store'

const initialState = {
  isAuth: false,
}

export const userReducer = (state = initialState, action: Actions<string | null>) => {
  switch (action.type) {
    case 'LOG_IN':
      LocalStorageService.setToken(action.payload as string)
      return {
        ...state,
        isAuth: true,
      }

    case 'LOG_OUT':
      LocalStorageService.removeToken()
      return {
        ...state,
        isAuth: false,
      }

    default:
      return state
  }
}

export const logInActionCreator = (token: string): Actions<string> => ({
  type: 'LOG_IN',
  payload: token,
})

export const logOutActionCreator = (): Actions<null> => ({
  type: 'LOG_OUT',
  payload: null,
})

/*export const loginRequest = userId => async (dispatch: AppDispatch) => {
  //await request
  const data = userId
  dispatch(setNotesActionCreator(data))
}*/
