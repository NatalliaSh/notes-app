import styles from './login-page.module.scss'
import {FC} from 'react'
import {LoginForm} from '../../components/login-form'

export const LoginPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Notes App</h1>
      <LoginForm />
    </div>
  )
}
