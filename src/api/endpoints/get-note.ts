import {noteAPI} from '../api'
import {showToast} from '../../redux/slices/toast'
import {ToastType} from '../../types/toast'
import {API_URL} from '../api-url'
import {Note} from '../../types/note'

export const getNote = noteAPI.injectEndpoints({
  endpoints: builder => ({
    getNote: builder.query<Note | null, string>({
      query: id => ({
        url: API_URL.selectedNote(id),
        method: 'GET',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
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
    }),
  }),
})
