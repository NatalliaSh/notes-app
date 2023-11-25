import styles from './note.module.scss'
import {FC, MouseEvent, useState} from 'react'
import Heart from '../../assets/icons/heart.svg?react'
import classNames from 'classnames'
import {useLocalization} from '../../hooks/useLocalization'

type Props = {
  id: string
  background: string
  title: string
  text: string
  tags: string[]
  isPublic: boolean
  onAddToFavorite: (id: string) => void
  onRemoveFromFavorite: (id: string) => void
}

export const NoteForPublicPage: FC<Props> = ({
  id,
  background,
  title,
  text,
  tags,
  onAddToFavorite,
  onRemoveFromFavorite,
}) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const localization = useLocalization()

  const favoriteHandler = (e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>) => {
    e.stopPropagation()
    if (isFavorite) {
      onRemoveFromFavorite(id)
    } else {
      onAddToFavorite(id)
    }
    setIsFavorite(prev => !prev)
  }

  const readMoreHandler = () => {
    console.log('read more')
  }

  return (
    <>
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
    </>
  )
}
