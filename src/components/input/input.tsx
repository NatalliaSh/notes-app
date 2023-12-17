import styles from './input.module.scss'
import {ChangeEvent, FC, memo, useState} from 'react'
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
  isRequired: boolean
  autofocus?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
  errorMessage?: string
}

const Input: FC<Props> = ({
  label,
  value,
  name,
  type,
  maxLength,
  placeholder,
  isRequired,
  autofocus = false,
  onChange,
  onBlur,
  errorMessage = '',
}) => {
  const [inputType, setInputType] = useState(type)

  return (
    <label
      className={classNames(styles.field, {
        [styles.invalid]: errorMessage,
      })}>
      <p className={styles.title}>{isRequired ? label + '*' : label}</p>
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

export const MemoizedInput = memo(Input, (prevProps, nextProps) => {
  const {value, type, errorMessage} = prevProps
  const {value: nextValue, type: nextType, errorMessage: nextErrorMessage} = nextProps

  return value === nextValue && type === nextType && errorMessage === nextErrorMessage
})
