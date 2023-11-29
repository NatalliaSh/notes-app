import {FC, useEffect, useState} from 'react'
import {createPortal} from 'react-dom'
import {ErrorToastView} from './error-toast-view/error-toast-view'
import {SuccessToastView} from './success-toast-view/success-toast-view'

export enum ToastType {
  Error,
  Success,
}

type Props = {
  type: ToastType
  message: string
}

export const Toast: FC<Props> = ({type, message}) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (isVisible) {
      const timerId = setTimeout(() => {
        setIsVisible(false)
      }, 3000)

      return () => {
        clearTimeout(timerId)
      }
    }
  }, [isVisible])

  return (
    isVisible &&
    createPortal(
      <>
        {type === ToastType.Error && <ErrorToastView message={message} />}
        {type === ToastType.Success && <SuccessToastView message={message} />}
      </>,
      document.body
    )
  )
}
