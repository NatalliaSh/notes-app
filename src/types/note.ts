export type Note = {
  color: string
  isPublic: boolean
  owner: string
  tags: string[]
  text: string
  title: string
  id: string
}

export type NoteDataFromForm = {
  title: string
  text: string
  tags: string[]
  isPublic: boolean
  color: string
}
