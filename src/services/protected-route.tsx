import {Outlet, Navigate} from 'react-router-dom'
import {ROUTE_PATH} from './routes-paths'
import {useAuth} from '../hooks/useAuth'
import {Header} from '../components/header'

export const ProtectedRoute = () => {
  const auth = useAuth()
  return auth?.isAuth ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to={ROUTE_PATH.login} />
  )
}
