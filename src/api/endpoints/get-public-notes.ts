import {noteAPI} from '../api'
import {showToast} from '../../redux/slices/toast'
import {ToastType} from '../../types/toast'
import {API_URL} from '../api-url'
import {Note} from '../../types/note'
import {setNotes} from '../../redux/slices/publicNotes'

export const getPublicNotes = noteAPI.injectEndpoints({
  endpoints: builder => ({
    getPublicNotes: builder.query<Note[], void>({
      query: () => ({
        url: API_URL.publicNotes,
        method: 'GET',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled
          dispatch(setNotes(data))
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
      providesTags: () => ['publicNotes'],
    }),
  }),
})
