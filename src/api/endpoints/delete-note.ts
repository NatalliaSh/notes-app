import {noteAPI} from '../api'
import {showToast} from '../../redux/slices/toast'
import {ToastType} from '../../types/toast'
import {API_URL} from '../api-url'

export const deleteNote = noteAPI.injectEndpoints({
  endpoints: builder => ({
    deleteNote: builder.mutation<void, string>({
      query: id => ({
        url: API_URL.selectedNote(id),
        method: 'DELETE',
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
