import {LocalStorageService} from '../../services/local-storage-service'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type UserState = {
  isAuth: boolean
}

const initialState: UserState = {
  isAuth: !!LocalStorageService.getToken(),
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn(state, action: PayloadAction<string>) {
      state.isAuth = true
      LocalStorageService.setToken(action.payload)
    },
    logOut(state) {
      state.isAuth = false
      LocalStorageService.removeToken()
    },
  },
})

export const userReducer = userSlice.reducer
export const {logIn, logOut} = userSlice.actions
