import styles from './note.module.scss'
import {FC, MouseEvent, useState} from 'react'
import Heart from '../../assets/icons/heart.svg?react'
import classNames from 'classnames'
import {useLocalization} from '../../hooks/useLocalization'
import {useNavigate} from 'react-router-dom'
import {LocalStorageService} from '../../services/local-storage-service'

type Props = {
  id: string
  background: string
  title: string
  text: string
  tags: string[]
  isPublic: boolean
}

export const NoteForPublicPage: FC<Props> = ({id, background, title, text, tags}) => {
  const favoriteNotes = LocalStorageService.getFavoriteNotes()

  const [isFavorite, setIsFavorite] = useState(
    favoriteNotes ? favoriteNotes.some(noteID => noteID === id) : false
  )
  const localization = useLocalization()
  const navigate = useNavigate()

  const favoriteHandler = (e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>) => {
    e.stopPropagation()
    if (isFavorite) {
      LocalStorageService.removeFromFavoriteNote(id)
    } else {
      LocalStorageService.setFavoriteNote(id)
    }
    setIsFavorite(prev => !prev)
  }

  const readMoreHandler = () => {
    navigate(`/note/${id}`)
  }

  return (
    <div
      className={styles.wrapper}
      style={{backgroundColor: `${background}`}}
      onClick={readMoreHandler}>
      <div className={styles['icons-container']}>
        <Heart
          className={classNames({[styles.favorite]: isFavorite})}
          onClick={e => favoriteHandler(e)}
        />
      </div>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.text}>{text}</p>
      <div className={styles['tags-wrapper']}>
        <p>{localization.tags}:</p>
        <div className={styles.tags}>
          {tags.map(tag => (
            <div key={tag}>{tag}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
