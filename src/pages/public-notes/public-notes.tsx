import styles from './public-notes.module.scss'
import {FC, useState} from 'react'
import {NoteForPublicPage} from '../../components/note'
import {ROUTE_PATH} from '../../services/routes-paths'
import {Link} from 'react-router-dom'
import Favorite from '../../assets/icons/heart.svg?react'
import classNames from 'classnames'
import {LocalStorageService} from '../../services/local-storage-service'
import {useLocalization} from '../../hooks/useLocalization'
import {useAppSelector} from '../../redux/hooks/redux-hooks'
import {useGetPublicNotesQuery} from '../../api/endpoints'

export const PublicNotesPage: FC = () => {
  useGetPublicNotesQuery()
  const [workMode, setWorkMode] = useState<'all' | 'favorite'>('all')
  const {isAuth} = useAppSelector(state => state.user)
  const {notes} = useAppSelector(state => state.publicNotes)
  const localization = useLocalization()

  const favoriteNotesId = LocalStorageService.getFavoriteNotes()

  const showNotes =
    workMode === 'all'
      ? notes
      : favoriteNotesId
        ? notes.filter(note => favoriteNotesId.some(id => id === note.id))
        : null

  return (
    <div className={styles.wrapper}>
      {isAuth && <Link to={ROUTE_PATH['personal-notes']}>{localization.toPersonal}</Link>}
      <Favorite
        className={classNames(styles.favorite, {[styles.active]: workMode === 'favorite'})}
        onClick={() => {
          setWorkMode(prev => (prev === 'all' ? 'favorite' : 'all'))
        }}
      />

      <div className={styles['notes-container']}>
        {showNotes &&
          showNotes.map(note => (
            <NoteForPublicPage
              key={note.id}
              id={note.id}
              background={note.color || '#CE3A54'}
              title={note.title}
              text={note.text}
              tags={note.tags}
              isPublic={note.isPublic}
            />
          ))}
      </div>
    </div>
  )
}
