import {FC} from 'react'
import styles from './submit-button.module.scss'

type SubmitButtonProps = {
  text: string
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  type?: 'button' | 'submit' | 'reset'
}

export const SubmitButton: FC<SubmitButtonProps> = ({text, onClick, type = 'button'}) => {
  return (
    <button className={styles.button} type={type} onClick={e => onClick(e)}>
      {text}
    </button>
  )
}
