import {createBrowserRouter, redirect} from 'react-router-dom'
import {LoginPage} from '../pages/login-page'
import {PublicNotesPage} from '../pages/public-notes'
import {PersonalNotesPage} from '../pages/personal-notes'
import {ErrorPage} from '../pages/error-page'
import {ProtectedRoute} from './protected-route'
import {ROUTE_PATH} from './routes-paths'
import {Page404} from '../pages/404'
import {ChangePasswordPage} from '../pages/change-password-page'
import {DetailedNotePage} from '../pages/detailed-note-page'

export const router = createBrowserRouter([
  {
    path: ROUTE_PATH.main,
    loader() {
      return redirect(ROUTE_PATH.login)
    },
    errorElement: <ErrorPage />,
  },
  {
    path: ROUTE_PATH.login,
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: ROUTE_PATH['personal-notes'],
        element: <PersonalNotesPage />,
      },
      {
        path: ROUTE_PATH['change-password'],
        element: <ChangePasswordPage />,
      },
      {
        path: ROUTE_PATH['public-notes'],
        element: <PublicNotesPage />,
      },
      {
        path: ROUTE_PATH['detailed-note'],
        element: <DetailedNotePage />,
      },
    ],
  },
  {
    path: ROUTE_PATH.page404,
    element: <Page404 />,
  },
])
