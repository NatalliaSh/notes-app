export type Note = {
  color: string
  isPublic: boolean
  owner: string
  tags: string[]
  text: string
  title: string
  id: string
}

export type NoteDataFromForm = Omit<Note, 'owner' | 'id'>

export type UpdateNote = {
  data: NoteDataFromForm
  id: string
}
