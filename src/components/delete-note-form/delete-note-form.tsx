import styles from './delete-note-form.module.scss'
import {FC} from 'react'
import {SubmitButton} from '../submit-button'
import {ButtonStyleTypes} from '../submit-button/types'
import {useLocalization} from '../../hooks/useLocalization'

type Props = {
  noteTitle: string
  onClose: () => void
  onDelete: () => void
}

export const DeleteNoteForm: FC<Props> = ({noteTitle, onClose, onDelete}) => {
  const localization = useLocalization()

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{`${localization.deleteNoteTitle} "${noteTitle}"?`}</div>
      <div className={styles.buttons}>
        <SubmitButton
          text={localization.buttons.deleteNote}
          onClick={onDelete}
          type="submit"
          styleType={ButtonStyleTypes.Small}
        />
        <SubmitButton
          text={localization.buttons.cancel}
          onClick={onClose}
          styleType={ButtonStyleTypes.Secondary_small}
        />
      </div>
    </div>
  )
}
