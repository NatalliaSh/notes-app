import {noteAPI} from '../api'
import {showToast} from '../../redux/slices/toast'
import {ToastType} from '../../types/toast'
import {API_URL} from '../api-url'

export const changePassword = noteAPI.injectEndpoints({
  endpoints: builder => ({
    changePassword: builder.mutation<void, string>({
      query: password => ({
        url: API_URL.auth,
        method: 'PUT',
        body: {password},
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
    }),
  }),
})
