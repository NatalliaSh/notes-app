import {Note} from '../../types/note'
import {Actions} from '../store'
import mockPublicNotes from '../../mockPublicNotes.json'

type State = {notes: Note[] | []}

const initialState: State = {
  notes: mockPublicNotes,
}

export const publicNotesReducer = (state = initialState, action: Actions<Note[]>) => {
  switch (action.type) {
    case 'SET_NOTES':
      return {
        ...state,
        notes: action.payload,
      }

    default:
      return state
  }
}

export const setNotesActionCreator = (notesArr: Note[]) => ({
  type: 'SET_NOTES',
  payload: notesArr,
})
