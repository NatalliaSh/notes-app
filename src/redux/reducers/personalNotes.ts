import {Note, NoteDataFromForm} from '../../types/note'
import {Actions} from '../store'
import mockNotes from '../../mockNotes.json'

type State = {notes: Note[] | []}

type EditData = {
  id: string
  newData: NoteDataFromForm
}

const initialState: State = {
  notes: mockNotes,
}

export const personalNotesReducer = (
  state = initialState,
  action: Actions<Note | Note[] | string | EditData>
) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return {
        ...state,
        notes: [...state.notes, action.payload],
      }

    case 'EDIT_NOTE':
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === (action.payload as EditData).id
            ? {...note, ...(action.payload as EditData).newData}
            : note
        ),
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

export const editNoteActionCreator = (data: EditData) => ({
  type: 'EDIT_NOTE',
  payload: data,
})

export const deleteNoteActionCreator = (id: string) => ({
  type: 'DELETE_NOTE',
  payload: id,
})

export const setNotesActionCreator = (notesArr: Note[]) => ({
  type: 'SET_NOTES',
  payload: notesArr,
})
