import {FC, useEffect} from 'react'
import {createPortal} from 'react-dom'
import {ErrorToastView} from './error-toast-view/error-toast-view'
import {SuccessToastView} from './success-toast-view/success-toast-view'
import {ToastType} from '../../types/toast'
import {useAppSelector} from '../../redux/hooks/redux-hooks'
import {useDispatch} from 'react-redux'
import {hideToast} from '../../redux/slices/toast'

export const Toast: FC = () => {
  const toast = useAppSelector(state => state.toast)
  const dispatch = useDispatch()

  useEffect(() => {
    if (toast.message) {
      const timerId = setTimeout(() => {
        dispatch(hideToast())
      }, 3000)

      return () => {
        clearTimeout(timerId)
      }
    }
  }, [toast, dispatch])

  return (
    toast.message &&
    createPortal(
      <>
        {toast.type === ToastType.Error && <ErrorToastView message={toast.message} />}
        {toast.type === ToastType.Success && <SuccessToastView message={toast.message} />}
      </>,
      document.body
    )
  )
}
