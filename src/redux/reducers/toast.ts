import {Actions} from '../store'
import {ToastType} from '../../types/toast'

type ToastState = {
  type: ToastType | null
  message: string
}

const initialState: ToastState = {
  type: null,
  message: '',
}

export const toastReducer = (state = initialState, action: Actions<ToastState>) => {
  switch (action.type) {
    case 'SHOW_TOAST':
      return {
        ...state,
        type: action.payload.type,
        message: action.payload.message,
      }

    case 'HIDE_TOAST':
      return {
        ...state,
        type: null,
        message: '',
      }

    default:
      return state
  }
}

export const showToastActionCreator = (toastData: ToastState): Actions<ToastState> => ({
  type: 'SHOW_TOAST',
  payload: toastData,
})

export const hideToastActionCreator = (): Actions<null> => ({
  type: 'HIDE_TOAST',
  payload: null,
})
