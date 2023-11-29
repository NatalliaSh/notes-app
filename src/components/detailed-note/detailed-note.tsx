import {useLocalization} from '../../hooks/useLocalization'
import styles from './detailed-note.module.scss'
import {FC} from 'react'

type Props = {
  title: string
  text: string
  tags: string[]
  background: string
}

export const DetailedNote: FC<Props> = ({title, text, tags, background}) => {
  const localization = useLocalization()

  return (
    <div className={styles.wrapper} style={{backgroundColor: `${background}`}}>
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
