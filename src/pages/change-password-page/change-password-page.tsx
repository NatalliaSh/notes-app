import styles from '../login-page/login-page.module.scss'
import {FC} from 'react'
import {ChangePasswordForm} from '../../components/change-password-form'
import {useLocalization} from '../../hooks/useLocalization'

export const ChangePasswordPage: FC = () => {
  const localization = useLocalization()

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{localization.appTitle}</h1>
      <ChangePasswordForm />
    </div>
  )
}
