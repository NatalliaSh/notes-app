import styles from './input.module.scss'
import {ChangeEvent, FC, useState} from 'react'
import classNames from 'classnames'
import EyeClose from '../../assets/password-eye/eye-close.svg?react'
import EyeOpen from '../../assets/password-eye/eye-open.svg?react'

export type Props = {
  label: string
  value: string
  name: string
  type: 'text' | 'number' | 'email' | 'password'
  maxLength: number
  placeholder: string
  autofocus?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
  errorMessage?: string
}

export const Input: FC<Props> = ({
  label,
  value,
  name,
  type,
  maxLength,
  placeholder,
  autofocus = false,
  onChange,
  onBlur,
  errorMessage = '',
}) => {
  const [inputType, setInputType] = useState(type)

  const classes = classNames(styles.field, {
    [styles.invalid]: errorMessage,
  })

  return (
    <label className={classes}>
      <p className={styles.title}>{label}</p>
      <input
        name={name}
        type={inputType}
        autoFocus={autofocus}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e)}
        onBlur={onBlur}
      />
      {type === 'password' &&
        (inputType === 'password' ? (
          <EyeClose onClick={() => setInputType('text')} />
        ) : (
          <EyeOpen onClick={() => setInputType('password')} />
        ))}
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
    </label>
  )
}
