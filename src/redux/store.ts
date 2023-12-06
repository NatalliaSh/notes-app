import {combineReducers, legacy_createStore as createStore, applyMiddleware, Action} from 'redux'
import {personalNotesReducer} from './reducers/personalNotes'
import {publicNotesReducer} from './reducers/publicNotes'
import {userReducer} from './reducers/user'
import {thunk, ThunkDispatch} from 'redux-thunk'
import {toastReducer} from './reducers/toast'
import {dataLoadReducer} from './reducers/dataLoad'

export type Actions<T> = {
  type: string
  payload: T
}

const rootReducer = combineReducers({
  personalNotes: personalNotesReducer,
  publicNotes: publicNotesReducer,
  user: userReducer,
  toast: toastReducer,
  dataLoad: dataLoadReducer,
})

export const store = createStore(rootReducer, {}, applyMiddleware(thunk))

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>

export type ThunkAction<R, S, E, A extends Action> = (
  dispatch: ThunkDispatch<S, E, A>,
  getState: () => S,
  extraArgument: E
) => R
