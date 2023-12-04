import {ModalWindow} from '../../components/modal-window'
import {SubmitButton} from '../../components/submit-button'
import styles from './personal-notes.module.scss'
import {FC, useState} from 'react'
import {createPortal} from 'react-dom'
import {ButtonStyleTypes} from '../../components/submit-button/types'
import {CreateNoteForm} from '../../components/create-note-form'
import mockNotes from '../../mockNotes.json'
import {NoteForPersonalPage} from '../../components/note'
import {Link} from 'react-router-dom'
import {ROUTE_PATH} from '../../services/routes-paths'
import {useLocalization} from '../../hooks/useLocalization'

export const PersonalNotesPage: FC = () => {
  const [isModal, setIsModal] = useState(false)
  const localization = useLocalization()

  const onDeleteNote = (id: string) => {
    console.log(`Delete note with id: ${id}`)
    //TODO: make BE request for note delete
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles['nav-wrapper']}>
        <Link to={ROUTE_PATH['public-notes']}>{localization.toPublic}</Link>
        <SubmitButton text="" onClick={() => setIsModal(true)} styleType={ButtonStyleTypes.Add} />
      </div>
      <div className={styles['notes-container']}>
        {mockNotes.map(note => (
          <NoteForPersonalPage
            key={note.id}
            id={note.id}
            background={note.color || '#CE3A54'}
            title={note.title}
            text={note.text}
            tags={note.tags}
            isPublic={note.isPublic}
            onDeleteNote={onDeleteNote}
          />
        ))}
      </div>
      {isModal &&
        createPortal(
          <ModalWindow onCloseModal={() => setIsModal(false)} isForm={true}>
            <CreateNoteForm onClose={() => setIsModal(false)} />
          </ModalWindow>,
          document.body
        )}
    </div>
  )
}
