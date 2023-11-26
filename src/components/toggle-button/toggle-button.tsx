import styles from './toggle-button.module.scss'
import {FC} from 'react'
import classNames from 'classnames'

type Props = {
  isActive: boolean
  onClick: () => void
}

export const ToggleButton: FC<Props> = ({isActive, onClick}) => (
  <button
    className={classNames(styles.button, {
      [styles.active]: isActive,
    })}
    type="button"
    onClick={onClick}
  />
)
