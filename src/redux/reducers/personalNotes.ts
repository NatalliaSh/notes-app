import {Note} from '../../types/note'
import {Actions} from '../store'

type State = {notes: Note[] | []}

const initialState: State = {
  notes: [],
}

export const personalNotesReducer = (
  state = initialState,
  action: Actions<Note | Note[] | string>
) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return {
        ...state,
        notes: [...state.notes, action.payload],
      }

    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload),
      }

    case 'SET_NOTES':
      return {
        ...state,
        notes: action.payload,
      }

    default:
      return state
  }
}

export const addNoteActionCreator = (newNote: Note) => ({
  type: 'ADD_NOTE',
  payload: newNote,
})

export const deleteNoteActionCreator = (id: string) => ({
  type: 'DELETE_NOTE',
  payload: id,
})

export const setNotesActionCreator = (notesArr: Note[]) => ({
  type: 'SET_NOTES',
  payload: notesArr,
})
