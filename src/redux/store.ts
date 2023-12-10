import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {personalNotesReducer} from './slices/personalNotes'
import {publicNotesReducer} from './slices/publicNotes'
import {userReducer} from './slices/user'
import {toastReducer} from './slices/toast'
import {noteAPI} from '../api/api'

export type Actions<T> = {
  type: string
  payload: T
}

const rootReducer = combineReducers({
  personalNotes: personalNotesReducer,
  publicNotes: publicNotesReducer,
  toast: toastReducer,
  user: userReducer,
  [noteAPI.reducerPath]: noteAPI.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(noteAPI.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>
