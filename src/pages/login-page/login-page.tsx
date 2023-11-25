import styles from './login-page.module.scss'
import {FC} from 'react'
import {LoginForm} from '../../components/login-form'
import {useLocalization} from '../../hooks/useLocalization'

export const LoginPage: FC = () => {
  const localization = useLocalization()

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{localization.appTitle}</h1>
      <LoginForm />
    </div>
  )
}
