import {FC} from 'react'
import styles from './submit-button.module.scss'
import {ButtonStyleTypes} from './types'
import classNames from 'classnames'

type SubmitButtonProps = {
  text: string
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  type?: 'button' | 'submit' | 'reset'
  styleType?: ButtonStyleTypes
}

export const SubmitButton: FC<SubmitButtonProps> = ({
  text,
  onClick,
  type = 'button',
  styleType = ButtonStyleTypes.Default,
}) => (
  <button
    className={classNames(styles.button, {
      [styles.add]: styleType === ButtonStyleTypes.Add,
      [styles.small]: styleType === ButtonStyleTypes.Small,
      [styles['secondary-small']]: styleType === ButtonStyleTypes.Secondary_small,
    })}
    type={type}
    onClick={e => onClick(e)}
  >
    {text}
  </button>
)
