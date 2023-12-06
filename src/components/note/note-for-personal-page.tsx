import styles from './note.module.scss'
import {FC, useState} from 'react'
import LockClosed from '../../assets/icons/lock-closed.svg?react'
import LockOpen from '../../assets/icons/lock-open.svg?react'
import Pencil from '../../assets/icons/pencil.svg?react'
import Trash from '../../assets/icons/trash.svg?react'
import {ModalWindow} from '../modal-window'
import {DeleteNoteForm} from '../delete-note-form'
import {createPortal} from 'react-dom'
import {useLocalization} from '../../hooks/useLocalization'
import {useNavigate} from 'react-router-dom'
import {CreateNoteForm} from '../create-note-form'
import {NoteDataFromForm} from '../../types/note'
import {useAppDispatch} from '../../redux/hooks/redux-hooks'
import {editNoteActionCreator, deleteNoteActionCreator} from '../../redux/reducers/personalNotes'

type Props = {
  id: string
  background: string
  title: string
  text: string
  tags: string[]
  isPublic: boolean
}

export const NoteForPersonalPage: FC<Props> = ({id, background, title, text, tags, isPublic}) => {
  const [modalContent, setModalContent] = useState<null | 'edit' | 'delete'>(null)
  const localization = useLocalization()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const readMoreHandler = () => {
    navigate(`/note/${id}`)
  }

  const onDelete = () => {
    //TODO make edit reques
    dispatch(deleteNoteActionCreator(id))
    setModalContent(null)
  }

  const onEditNote = (data: NoteDataFromForm) => {
    //TODO make edit reques
    dispatch(editNoteActionCreator({id, newData: data}))
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
          <Pencil
            onClick={e => {
              e.stopPropagation()
              setModalContent('edit')
            }}
          />
          <Trash
            onClick={e => {
              e.stopPropagation()
              setModalContent('delete')
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
      {modalContent &&
        createPortal(
          <ModalWindow onCloseModal={() => setModalContent(null)}>
            {modalContent === 'delete' && (
              <DeleteNoteForm
                noteTitle={title}
                onClose={() => setModalContent(null)}
                onDelete={onDelete}
              />
            )}
            {modalContent === 'edit' && (
              <CreateNoteForm
                onClose={() => setModalContent(null)}
                dataForEditForm={{title, text, tags: tags.join(', '), bgColor: background}}
                isPublicNote={isPublic}
                onSubmit={onEditNote}
              />
            )}
          </ModalWindow>,
          document.body
        )}
    </>
  )
}
