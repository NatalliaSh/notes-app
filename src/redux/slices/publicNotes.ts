import {Note} from '../../types/note'
import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit/react'

type publicNotesState = {notes: Note[] | []}

const initialState: publicNotesState = {
  notes: [],
}

const publicNotesSlice = createSlice({
  name: 'publicNotes',
  initialState,
  reducers: {
    setNotes(state, action: PayloadAction<Note[]>) {
      state.notes = action.payload
    },
  },
})

export const publicNotesReducer = publicNotesSlice.reducer
export const {setNotes} = publicNotesSlice.actions
