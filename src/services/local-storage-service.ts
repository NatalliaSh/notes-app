const LSConst = {
  favoriteNotes: 'favoriteNotes',
}

type FavoriteData = string[]

export const LocalStorageService = {
  setFavoriteNote: (id: string) => {
    const data = localStorage.getItem(LSConst.favoriteNotes)
    const currentNotes: FavoriteData | null = data ? JSON.parse(data) : null

    if (currentNotes) {
      if (currentNotes.some(noteId => noteId === id)) return
      currentNotes.push(id)
      localStorage.setItem(LSConst.favoriteNotes, JSON.stringify(currentNotes))
    } else {
      localStorage.setItem(LSConst.favoriteNotes, JSON.stringify([id]))
    }
  },

  removeFromFavoriteNote: (id: string) => {
    const data = localStorage.getItem(LSConst.favoriteNotes)
    const currentNotes: FavoriteData | null = data ? JSON.parse(data) : null

    if (!currentNotes) return

    const newData = currentNotes.filter(noteId => noteId !== id)
    localStorage.setItem(LSConst.favoriteNotes, JSON.stringify(newData))
  },

  getFavoriteNotes: (): FavoriteData | null => {
    const data = localStorage.getItem(LSConst.favoriteNotes)

    return data ? JSON.parse(data) : null
  },
}
