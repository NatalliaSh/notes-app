import {ModalWindow} from '../../components/modal-window'
import {SubmitButton} from '../../components/submit-button'
import styles from './personal-notes.module.scss'
import {FC, useState} from 'react'
import {createPortal} from 'react-dom'
import {ButtonStyleTypes} from '../../components/submit-button/types'
import {CreateNoteForm} from '../../components/create-note-form'
import {NoteForPersonalPage} from '../../components/note'
import {Link} from 'react-router-dom'
import {ROUTE_PATH} from '../../services/routes-paths'
import {useLocalization} from '../../hooks/useLocalization'
import {useAppDispatch, useAppSelector} from '../../redux/hooks/redux-hooks'
import {NoteDataFromForm} from '../../types/note'
import {addNote} from '../../redux/slices/personalNotes'

export const PersonalNotesPage: FC = () => {
  const [isModal, setIsModal] = useState(false)
  const localization = useLocalization()
  const {notes} = useAppSelector(state => state.personalNotes)
  const dispatch = useAppDispatch()

  const onCreateNote = (data: NoteDataFromForm) => {
    //to do add request and coorect id and owner according to request responce
    dispatch(
      addNote({
        ...data,
        id: 'take id from request resp',
        owner: 'take owner from request resp',
      })
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles['nav-wrapper']}>
        <Link to={ROUTE_PATH['public-notes']}>{localization.toPublic}</Link>
        <SubmitButton text="" onClick={() => setIsModal(true)} styleType={ButtonStyleTypes.Add} />
      </div>
      <div className={styles['notes-container']}>
        {notes.length > 0 &&
          notes.map(note => (
            <NoteForPersonalPage
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
      {isModal &&
        createPortal(
          <ModalWindow onCloseModal={() => setIsModal(false)} isForm={true}>
            <CreateNoteForm onClose={() => setIsModal(false)} onSubmit={onCreateNote} />
          </ModalWindow>,
          document.body
        )}
    </div>
  )
}
