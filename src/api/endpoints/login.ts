import {noteAPI} from '../api'
import {UserData, LoginData} from '../../types/user'
import {showToast} from '../../redux/slices/toast'
import {ToastType} from '../../types/toast'
import {API_URL} from '../api-url'
import {logIn} from '../../redux/slices/user'

export const login = noteAPI.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginData, UserData>({
      query: userData => ({
        url: API_URL.auth,
        method: 'POST',
        body: userData,
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled
          dispatch(logIn(data.token))
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
          const {originalStatus} = e.error

          dispatch(
            showToast({
              type: ToastType.Error,
              message:
                originalStatus === 400 || originalStatus === 401
                  ? 'Invalid credentials'
                  : 'Something went wrong',
            })
          )
        }
      },
    }),
  }),
})
