import {noteAPI} from '../api'
import {showToast} from '../../redux/slices/toast'
import {ToastType} from '../../types/toast'
import {API_URL} from '../api-url'
import {Note} from '../../types/note'

export const addNote = noteAPI.injectEndpoints({
  endpoints: builder => ({
    addNote: builder.mutation<string, Omit<Note, 'id' | 'owner'>>({
      query: note => ({
        url: API_URL.notes,
        method: 'POST',
        body: note,
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
          console.log(e)
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
