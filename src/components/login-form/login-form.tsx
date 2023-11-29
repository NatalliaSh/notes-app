import styles from './login-form.module.scss'
import {FC, useLayoutEffect} from 'react'
import {SubmitButton} from '../submit-button'
import {InputData} from '../input/types'
import {checkEmptyFields} from '../../utils/validation'
import {useInputs} from '../../hooks/inputs-hook'
import {useLocalization} from '../../hooks/useLocalization'
import {useAuth} from '../../hooks/useAuth'
import {useNavigate} from 'react-router-dom'
import {ROUTE_PATH} from '../../services/routes-paths'

const inputs: InputData[] = [
  {
    name: 'userName',
    value: '',
    maxLength: 30,
    errorMessage: '',
    isRequired: true,
    validationFn: checkEmptyFields,
    type: 'text',
  },
  {
    name: 'password',
    value: '',
    maxLength: 30,
    errorMessage: '',
    isRequired: true,
    validationFn: checkEmptyFields,
    type: 'password',
  },
]

export const LoginForm: FC = () => {
  const {inputsLayout, validate} = useInputs(inputs)
  const localization = useLocalization()
  const auth = useAuth()
  const navigate = useNavigate()

  const logInButtonHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (validate()) return

    //TODO Add BE request for login and wrap setIsAuth(true) into success case
    auth?.setIsAuth(true)
  }

  useLayoutEffect(() => {
    if (auth?.isAuth) {
      navigate(ROUTE_PATH['personal-notes'])
    }
  }, [auth?.isAuth, navigate])

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p className={styles.title__main}>{localization.loginMainTitle}</p>
        <p className={styles.title__additional}>{localization.loginAdditionalTitle}</p>
      </div>
      <form className={styles.form}>
        {inputsLayout}
        <SubmitButton
          text={localization.buttons.login}
          onClick={logInButtonHandler}
          type="submit"
        />
      </form>
    </div>
  )
}
