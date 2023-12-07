import {ToastType} from '../../types/toast'
import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit/react'

type ToastState = {
  type: ToastType | null
  message: string
}

const initialState: ToastState = {
  type: null,
  message: '',
}

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast(state, action: PayloadAction<ToastState>) {
      state.type = action.payload.type
      state.message = action.payload.message
    },
    hideToast: () => initialState,
  },
})

export const toastReducer = toastSlice.reducer
export const {showToast, hideToast} = toastSlice.actions
