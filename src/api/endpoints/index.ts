import {addNote} from './add-note'
import {changePassword} from './change-password'
import {deleteNote} from './delete-note'
import {getPersonalNotes} from './get-personal-notes'
import {getPublicNotes} from './get-public-notes'
import {login} from './login'
import {updateNote} from './update-note'

export const {useLoginMutation} = login
export const {useAddNoteMutation} = addNote
export const {useChangePasswordMutation} = changePassword
export const {useDeleteNoteMutation} = deleteNote
export const {useGetPersonalNotesQuery, useLazyGetPersonalNotesQuery} = getPersonalNotes
export const {useGetPublicNotesQuery, useLazyGetPublicNotesQuery} = getPublicNotes
export const {useUpdateNoteMutation} = updateNote
