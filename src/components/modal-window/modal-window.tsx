import styles from './modal.module.scss'
import {FC, ReactNode} from 'react'
import classNames from 'classnames'

type Props = {
  children: ReactNode
  onCloseModal: () => void
  isForm?: boolean
}

export const ModalWindow: FC<Props> = ({children, onCloseModal, isForm = false}) => (
  <div className={styles.wrapper}>
    <button type="button" className={styles.closer} onClick={onCloseModal}>
      X
    </button>
    <div className={classNames(styles.content, {[styles.form]: isForm, [styles.default]: !isForm})}>
      {children}
    </div>
  </div>
)
