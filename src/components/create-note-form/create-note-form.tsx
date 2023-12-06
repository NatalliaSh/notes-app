import styles from './create-note-form.module.scss'
import {FC, useState} from 'react'
import {SubmitButton} from '../submit-button'
import {useInputs} from '../../hooks/inputs-hook'
import {InputData} from '../input/types'
import {checkEmptyFields} from '../../utils/validation'
import {ToggleButton} from '../toggle-button'
import {ButtonStyleTypes} from '../submit-button/types'
import {useLocalization} from '../../hooks/useLocalization'
import {NoteDataFromForm} from '../../types/note'

const inputs: InputData[] = [
  {
    name: 'title',
    value: '',
    maxLength: 30,
    errorMessage: '',
    isRequired: true,
    validationFn: checkEmptyFields,
    type: 'text',
  },
  {
    name: 'text',
    value: '',
    maxLength: 30,
    errorMessage: '',
    isRequired: true,
    validationFn: checkEmptyFields,
    type: 'text',
  },
  {
    name: 'tags',
    value: '',
    maxLength: 30,
    errorMessage: '',
    isRequired: false,
    validationFn: () => '',
    type: 'text',
  },
]

type Props = {
  onClose: () => void
  dataForEditForm?: {
    [inputName: string]: string
  }
  isPublicNote?: boolean
  onSubmit: (data: NoteDataFromForm) => void
}

const TITLE_INDEX = 0
const TEXT_INDEX = 1
const TAGS_INDEX = 2

export const CreateNoteForm: FC<Props> = ({
  onClose,
  dataForEditForm,
  isPublicNote = false,
  onSubmit,
}) => {
  const initInputData = dataForEditForm
    ? inputs.map(input =>
        input.name in dataForEditForm ? {...input, value: dataForEditForm[input.name]} : input
      )
    : inputs

  const {inputData, inputsLayout, validate} = useInputs(initInputData)
  const [isPublic, setIsPublic] = useState(isPublicNote)
  const [bgColor, setBgColor] = useState(dataForEditForm ? dataForEditForm.bgColor : '#CE3A54')
  const localization = useLocalization()

  const addOrEditNoteHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (validate()) return

    onSubmit({
      title: inputData[TITLE_INDEX].value,
      text: inputData[TEXT_INDEX].value,
      tags: inputData[TAGS_INDEX].value.split(','),
      isPublic: isPublic,
      color: bgColor,
    })
    onClose()
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p className={styles.title__main}>
          {dataForEditForm ? localization.editNoteTitle : localization.createNoteTitle}
        </p>
      </div>
      <form className={styles.form}>
        {inputsLayout}
        <div className={styles.settings}>
          <p>{localization.settings}:</p>
          <div className={styles.public}>
            {localization.public}
            <ToggleButton isActive={isPublic} onClick={() => setIsPublic(prev => !prev)} />
          </div>
          <label className={styles['color-picker']}>
            <p>{localization.inputs.label.bgColor}</p>
            <input
              name="bgColor"
              type="color"
              value={bgColor}
              onChange={e => setBgColor(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.button}>
          <SubmitButton
            text={dataForEditForm ? localization.buttons.editNote : localization.buttons.addNote}
            onClick={addOrEditNoteHandler}
            type="submit"
            styleType={ButtonStyleTypes.Small}
          />
          <SubmitButton
            text={localization.buttons.cancel}
            onClick={onClose}
            styleType={ButtonStyleTypes.Secondary_small}
          />
        </div>
      </form>
    </div>
  )
}
