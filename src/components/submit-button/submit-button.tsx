import {FC} from 'react'
import styles from './submit-button.module.scss'
import {ButtonStyleTypes} from './types'
import classNames from 'classnames'
import Spinner from '../../assets/spinner.svg?react'

type SubmitButtonProps = {
  text: string
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  type?: 'button' | 'submit' | 'reset'
  styleType?: ButtonStyleTypes
  isLoad?: boolean
}

export const SubmitButton: FC<SubmitButtonProps> = ({
  text,
  onClick,
  type = 'button',
  styleType = ButtonStyleTypes.Default,
  isLoad = false,
}) => (
  <button
    className={classNames(styles.button, {
      [styles.add]: styleType === ButtonStyleTypes.Add,
      [styles.small]: styleType === ButtonStyleTypes.Small,
      [styles['secondary-small']]: styleType === ButtonStyleTypes.Secondary_small,
    })}
    type={type}
    onClick={e => onClick(e)}>
    {isLoad ? <Spinner /> : text}
  </button>
)
