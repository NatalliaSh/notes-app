import styles from './login-form.module.scss'
import {FC, useLayoutEffect, useState, useEffect} from 'react'
import {SubmitButton} from '../submit-button'
import {InputData} from '../input/types'
import {checkEmptyFields} from '../../utils/validation'
import {useInputs} from '../../hooks/inputs-hook'
import {useLocalization} from '../../hooks/useLocalization'
import {useAuth} from '../../hooks/useAuth'
import {useNavigate} from 'react-router-dom'
import {ROUTE_PATH} from '../../services/routes-paths'
import {login} from '../../api/endpoints/login'
import {Toast, ToastType} from '../toast'
import {LocalStorageService} from '../../services/local-storage-service'

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

const USER_NAME_INDEX = 0
const PASSWORD_INDEX = 1

export const LoginForm: FC = () => {
  const {inputData, inputsLayout, validate} = useInputs(inputs)
  const [toastMessage, setToastMessage] = useState('')
  const [isLoad, setLoad] = useState(false)
  const localization = useLocalization()
  const auth = useAuth()
  const navigate = useNavigate()

  const logInButtonHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (validate()) return

    setLoad(true)
    try {
      const data = await login({
        username: inputData[USER_NAME_INDEX].value,
        password: inputData[PASSWORD_INDEX].value,
      })

      LocalStorageService.setToken(data.token)
      auth?.setIsAuth(true)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: unknown) {
      if (e instanceof Error) {
        setToastMessage(e.message === '400' ? 'Invalid credentials' : 'Something went wrong')
      }
    }

    setLoad(false)
  }

  useLayoutEffect(() => {
    if (auth?.isAuth) {
      navigate(ROUTE_PATH['personal-notes'])
    }
  }, [auth?.isAuth, navigate])

  useEffect(() => {
    if (toastMessage) {
      const timerId = setTimeout(() => {
        setToastMessage('')
      }, 3000)

      return () => {
        clearTimeout(timerId)
      }
    }
  }, [toastMessage])

  return (
    <>
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
            isLoad={isLoad}
          />
        </form>
      </div>
      {toastMessage && <Toast type={ToastType.Error} message={toastMessage} />}
    </>
  )
}
