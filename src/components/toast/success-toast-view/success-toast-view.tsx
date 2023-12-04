import {FC} from 'react'
import styles from '../toast.module.scss'

type SuccessToastViewProps = {
  message: string
}
export const SuccessToastView: FC<SuccessToastViewProps> = ({message}) => (
  <>
    <div className={`${styles.toast} ${styles.success}`}>{message}</div>;
  </>
)
