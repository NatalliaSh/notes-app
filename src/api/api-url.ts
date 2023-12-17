export const API_URL = {
  baseURL: 'https://dull-pear-haddock-belt.cyclic.app',
  auth: '/auth',
  notes: '/notes',
  personalNotes: '/notes?type=personal',
  publicNotes: '/notes?type=public',
  selectedNote: (id: string) => `/notes?id=${id}`,
}
