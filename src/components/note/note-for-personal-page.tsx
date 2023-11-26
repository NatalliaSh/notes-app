import styles from './note.module.scss'
import {FC, MouseEvent, useState} from 'react'
import LockClosed from '../../assets/icons/lock-closed.svg?react'
import LockOpen from '../../assets/icons/lock-open.svg?react'
import Pencil from '../../assets/icons/pencil.svg?react'
import Trash from '../../assets/icons/trash.svg?react'
import {ModalWindow} from '../modal-window'
import {DeleteNoteForm} from '../delete-note-form'
import {createPortal} from 'react-dom'
import {useLocalization} from '../../hooks/useLocalization'

type Props = {
  id: string
  background: string
  title: string
  text: string
  tags: string[]
  isPublic: boolean
  onDeleteNote: (id: string) => void
}

export const NoteForPersonalPage: FC<Props> = ({
  id,
  background,
  title,
  text,
  tags,
  isPublic,
  onDeleteNote,
}) => {
  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const localization = useLocalization()

  const editHandler = (e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>) => {
    e.stopPropagation()
    console.log('edit')
  }

  const readMoreHandler = () => {
    console.log('read more')
  }

  const onDelete = () => {
    onDeleteNote(id)
    setIsDeleteModal(false)
  }

  return (
    <>
      <div
        className={styles.wrapper}
        style={{backgroundColor: `${background}`}}
        onClick={readMoreHandler}>
        <div className={styles['icons-container']}>
          {isPublic ? (
            <LockOpen onClick={e => e.stopPropagation()} className={styles['non-clickable']} />
          ) : (
            <LockClosed onClick={e => e.stopPropagation()} className={styles['non-clickable']} />
          )}
          <Pencil onClick={e => editHandler(e)} />
          <Trash
            onClick={e => {
              e.stopPropagation()
              setIsDeleteModal(true)
            }}
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
      {isDeleteModal &&
        createPortal(
          <ModalWindow onCloseModal={() => setIsDeleteModal(false)}>
            <DeleteNoteForm
              noteTitle={title}
              onClose={() => setIsDeleteModal(false)}
              onDelete={onDelete}
            />
          </ModalWindow>,
          document.body
        )}
    </>
  )
}
