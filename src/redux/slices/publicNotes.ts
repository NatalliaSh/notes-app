import {Note} from '../../types/note'
import mockPublicNotes from '../../mockPublicNotes.json'
import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit/react'

type publicNotesState = {notes: Note[] | []}

const initialState: publicNotesState = {
  notes: mockPublicNotes,
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
