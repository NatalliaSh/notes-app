import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {API_URL} from './api-url'
import {LocalStorageService} from '../services/local-storage-service'

export const noteAPI = createApi({
  reducerPath: 'noteAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL.baseURL,
    prepareHeaders: headers => {
      const token = LocalStorageService.getToken()
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['publicNotes', 'personalNotes'],
})
