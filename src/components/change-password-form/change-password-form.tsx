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
import {useChangePasswordMutation} from '../../api/endpoints'

const inputs: InputData[] = [
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

const NEW_PASS_INDEX = 0

export const ChangePasswordForm: FC = () => {
  const {inputData, inputsLayout, validate} = useInputs(inputs)
  const localization = useLocalization()
  const [changePasswordTrigger, {isLoading}] = useChangePasswordMutation()
  const navigate = useNavigate()

  const onChangePassword = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    if (validate()) return

    try {
      await changePasswordTrigger(inputData[NEW_PASS_INDEX].value).unwrap()

      navigate(-1)
    } catch (e) {
      console.log(e)
    }
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
              isLoad={isLoading}
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
