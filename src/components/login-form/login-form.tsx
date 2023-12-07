import styles from './login-form.module.scss'
import {FC} from 'react'
import {SubmitButton} from '../submit-button'
import {InputData} from '../input/types'
import {checkEmptyFields} from '../../utils/validation'
import {useInputs} from '../../hooks/inputs-hook'
import {useLocalization} from '../../hooks/useLocalization'
import {useNavigate} from 'react-router-dom'
import {ROUTE_PATH} from '../../services/routes-paths'
import {useAppDispatch, useAppSelector} from '../../redux/hooks/redux-hooks'
import {loginRequest} from '../../redux/slices/user'
import {showToast} from '../../redux/slices/toast'
import {ToastType} from '../../types/toast'

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
  const {isAuth, dataLoadingStatus} = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const localization = useLocalization()
  const navigate = useNavigate()

  if (isAuth) {
    navigate(ROUTE_PATH['personal-notes'])
  }

  if (dataLoadingStatus.isError) {
    dispatch(showToast({type: ToastType.Error, message: 'Invalid credentials'}))
  }

  const logInButtonHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (validate()) return

    dispatch(
      loginRequest({
        username: inputData[USER_NAME_INDEX].value,
        password: inputData[PASSWORD_INDEX].value,
      })
    )
  }

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
            isLoad={dataLoadingStatus.isLoading}
          />
        </form>
      </div>
    </>
  )
}
