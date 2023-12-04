import style from './error-page.module.scss'
import {FC} from 'react'
import {useRouteError, isRouteErrorResponse} from 'react-router-dom'

export const ErrorPage: FC = () => {
  const error = useRouteError()

  let errorMessage: string
  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.statusText || error.data?.message
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    console.error(error)
    errorMessage = 'Unknown error'
  }

  return (
    <div className={style.wrapper}>
      <h1>Oops!</h1>
      <p> Sorry, an unexpected error has occured.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  )
}
