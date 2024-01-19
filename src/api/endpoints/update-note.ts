import {noteAPI} from '../api'
import {showToast} from '../../redux/slices/toast'
import {ToastType} from '../../types/toast'
import {API_URL} from '../api-url'
import {UpdateNote} from '../../types/note'

export const updateNote = noteAPI.injectEndpoints({
  endpoints: builder => ({
    updateNote: builder.mutation<string, UpdateNote>({
      query: note => ({
        url: API_URL.selectedNote(note.id),
        method: 'PUT',
        body: note.data,
        responseHandler: 'text',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled
          dispatch(
            showToast({
              type: ToastType.Success,
              message: data,
            })
          )
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
          dispatch(
            showToast({
              type: ToastType.Error,
              message: 'Something went wrong',
            })
          )
        }
      },

      invalidatesTags: ['personalNotes'],
    }),
  }),
})
