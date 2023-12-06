import {Actions} from '../store'

type State = {
  isLoading: boolean
  isError: boolean
}

const initialState: State = {
  isLoading: false,
  isError: false,
}

export const dataLoadReducer = (state = initialState, action: Actions<boolean>) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
        isError: false,
      }

    case 'SET_ERROR':
      return {
        ...state,
        isError: action.payload,
        isLoading: false,
      }

    default:
      return state
  }
}

export const setLoadingActionCreator = (isLoading: boolean): Actions<boolean> => ({
  type: 'SET_LOADING',
  payload: isLoading,
})

export const setErrorActionCreator = (isError: boolean): Actions<boolean> => ({
  type: 'SET_ERROR',
  payload: isError,
})
