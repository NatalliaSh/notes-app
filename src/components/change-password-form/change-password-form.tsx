import styles from '../login-form/login-form.module.scss'
import selfStyles from './change-password-form.module.scss'
import {FC, MouseEvent} from 'react'
import {SubmitButton} from '../submit-button'
import {InputData} from '../input/types'
import {checkPassword} from '../../utils/validation'
import {useInputs} from '../../hooks/inputs-hook'
import {useLocalization} from '../../hooks/useLocalization'
import {useNavigate} from 'react-router-dom'
import {ButtonStyleTypes} from '../submit-button/types'
import {useAppDispatch} from '../../redux/hooks/redux-hooks'
import {showToast} from '../../redux/slices/toast'
import {ToastType} from '../../types/toast'

const inputs: InputData[] = [
  {
    name: 'password',
    value: '',
    maxLength: 30,
    errorMessage: '',
    isRequired: true,
    validationFn: checkPassword,
    type: 'password',
  },
  {
    name: 'newPassword',
    value: '',
    maxLength: 30,
    errorMessage: '',
    isRequired: true,
    validationFn: checkPassword,
    type: 'password',
  },
]

const NEW_PASS_INDEX = 1

export const ChangePasswordForm: FC = () => {
  const {inputData, inputsLayout, validate} = useInputs(inputs)
  const localization = useLocalization()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onChangePassword = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    if (validate()) return

    //TODO Add BE request for change password
    console.log(`new password: ${inputData[NEW_PASS_INDEX].value}`)
    dispatch(
      showToast({
        type: ToastType.Success,
        message: localization.changedPasswordMessage,
      })
    )
    navigate(-1)
  }

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
    </>
  )
}
