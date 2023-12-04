import {combineReducers, createStore, applyMiddleware, UnknownAction, Reducer} from 'redux'
import {personalNotesReducer} from './reducers/personalNotes'
import {publicNotesReducer} from './reducers/publicNotes'
import {userReducer} from './reducers/user'
import thunk, {ThunkMiddleware, ThunkAction, ThunkDispatch} from 'redux-thunk'

type State = {
  personalNotes: ReturnType<typeof personalNotesReducer>
  publicNotes: ReturnType<typeof publicNotesReducer>
  user: ReturnType<typeof userReducer>
}

export type Actions<T> = {
  type: string
  payload: T
}

const rootReducer = combineReducers({
  personalNotes: personalNotesReducer,
  publicNotes: publicNotesReducer,
  user: userReducer,
})

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<State, Actions>)
)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
// export type RootState = ReturnType<typeof rootReducer>

export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => RootState): void
}
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, UnknownAction>
