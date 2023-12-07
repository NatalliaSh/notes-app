import {LoginData, login} from '../../api/endpoints/login'
import {LocalStorageService} from '../../services/local-storage-service'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'

type UserState = {
  isAuth: boolean
  dataLoadingStatus: {isLoading: boolean; isError: boolean}
}

const initialState: UserState = {
  isAuth: !!LocalStorageService.getToken(),
  dataLoadingStatus: {isLoading: false, isError: false},
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
  extraReducers: builder => {
    builder.addCase(loginRequest.fulfilled, (state, action: PayloadAction<LoginData>) => {
      state.isAuth = true
      state.dataLoadingStatus = initialState.dataLoadingStatus
      LocalStorageService.setToken(action.payload.token)
    })
    builder.addCase(loginRequest.pending, state => {
      state.dataLoadingStatus = {
        isLoading: true,
        isError: false,
      }
    })
    builder.addCase(loginRequest.rejected, state => {
      state.dataLoadingStatus = {
        isLoading: false,
        isError: true,
      }
    })
  },
})

export const loginRequest = createAsyncThunk('user/login', login)

export const userReducer = userSlice.reducer
export const {logIn, logOut} = userSlice.actions
