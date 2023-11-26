import styles from './public-notes.module.scss'
import {FC} from 'react'
import mockPublicNotes from '../../mockPublicNotes.json'
import {NoteForPublicPage} from '../../components/note'

export const PublicNotesPage: FC = () => {
  const onAddToFavoriteHandler = (id: string) => {
    console.log(`Add to favorite note with id: ${id}`)
    //TODO add BE request
  }

  const onRemoveFromFavorite = (id: string) => {
    console.log(`Remove from favorite note with id: ${id}`)
    //TODO add BE request
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles['notes-container']}>
        {mockPublicNotes.map(note => (
          <NoteForPublicPage
            key={note.id}
            id={note.id}
            background={note.color || '#CE3A54'}
            title={note.title}
            text={note.text}
            tags={note.tags}
            isPublic={note.isPublic}
            onAddToFavorite={onAddToFavoriteHandler}
            onRemoveFromFavorite={onRemoveFromFavorite}
          />
        ))}
      </div>
    </div>
  )
}
