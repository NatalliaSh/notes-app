import styles from '../login-form/login-form.module.scss'
import selfStyles from './change-password-form.module.scss'
import {FC, useState, MouseEvent, useEffect} from 'react'
import {SubmitButton} from '../submit-button'
import {InputData} from '../input/types'
import {checkEmptyFields} from '../../utils/validation'
import {useInputs} from '../../hooks/inputs-hook'
import {useLocalization} from '../../hooks/useLocalization'
import {useNavigate} from 'react-router-dom'
import {ButtonStyleTypes} from '../submit-button/types'
import {Toast, ToastType} from '../toast'

const inputs: InputData[] = [
  {
    name: 'password',
    value: '',
    maxLength: 30,
    errorMessage: '',
    isRequired: true,
    validationFn: checkEmptyFields,
    type: 'password',
  },
  {
    name: 'newPassword',
    value: '',
    maxLength: 30,
    errorMessage: '',
    isRequired: true,
    validationFn: checkEmptyFields,
    type: 'password',
  },
]

const NEW_PASS_INDEX = 1

export const ChangePasswordForm: FC = () => {
  const {inputData, inputsLayout, validate} = useInputs(inputs)
  const [successMessage, setSuccessMessage] = useState('')
  const localization = useLocalization()
  const navigate = useNavigate()

  const onChangePassword = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    if (validate()) return

    //TODO Add BE request for change password
    console.log(`new password: ${inputData[NEW_PASS_INDEX].value}`)
    setSuccessMessage(localization.changedPasswordMessage)
  }

  useEffect(() => {
    if (successMessage) {
      const timerId = setTimeout(() => {
        navigate(-1)
      }, 2000)

      return () => {
        clearTimeout(timerId)
      }
    }
  }, [successMessage, navigate])

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <p className={styles.title__main}>{localization.changePassword}</p>
        </div>
        <form className={styles.form}>
          {inputsLayout}
          <div className={selfStyles['buttons-container']}>
            <SubmitButton
              text={localization.buttons.changePassword}
              onClick={e => onChangePassword(e)}
              type="submit"
              styleType={ButtonStyleTypes.Small}
            />
            <SubmitButton
              text={localization.buttons.cancel}
              onClick={() => navigate(-1)}
              styleType={ButtonStyleTypes.Secondary_small}
            />
          </div>
        </form>
      </div>
      {successMessage && <Toast type={ToastType.Success} message={successMessage} />}
    </>
  )
}
