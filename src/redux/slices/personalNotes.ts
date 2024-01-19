import {Note, NoteDataFromForm} from '../../types/note'
import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit/react'

type personalNotesState = {notes: Note[] | []}

type EditData = {
  id: string
  newData: NoteDataFromForm
}

const initialState: personalNotesState = {
  notes: [],
}

const personalNotesSlice = createSlice({
  name: 'personalNotes',
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<Note>) {
      state.notes = [...state.notes, action.payload]
    },
    editNote(state, action: PayloadAction<EditData>) {
      state.notes = state.notes.map(note =>
        note.id === action.payload.id ? {...note, ...action.payload.newData} : note
      )
    },
    deleteNote(state, action: PayloadAction<string>) {
      state.notes = state.notes.filter(note => note.id !== action.payload)
    },
    setNotes(state, action: PayloadAction<Note[]>) {
      state.notes = action.payload
    },
  },
})

export const personalNotesReducer = personalNotesSlice.reducer
export const {addNote, editNote, deleteNote, setNotes} = personalNotesSlice.actions
