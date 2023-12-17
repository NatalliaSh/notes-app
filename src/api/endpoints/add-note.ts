import {noteAPI} from '../api'
import {showToast} from '../../redux/slices/toast'
import {ToastType} from '../../types/toast'
import {API_URL} from '../api-url'
import {Note} from '../../types/note'

export const addNote = noteAPI.injectEndpoints({
  endpoints: builder => ({
    addNote: builder.mutation<void, Omit<Note, 'id' | 'owner'>>({
      query: note => ({
        url: API_URL.notes,
        method: 'POST',
        body: note,
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled
          console.log(data)
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
