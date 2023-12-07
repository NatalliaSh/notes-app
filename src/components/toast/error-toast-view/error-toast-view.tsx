import {FC} from 'react'
import styles from '../toast.module.scss'

type ErrorToastViewProps = {
  message: string
}
export const ErrorToastView: FC<ErrorToastViewProps> = ({message}) => (
  <>
    <div className={`${styles.toast} ${styles.error}`}>{message}</div>
  </>
)
