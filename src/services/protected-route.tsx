import {Outlet, Navigate} from 'react-router-dom'
import {ROUTE_PATH} from './routes-paths'
import {Header} from '../components/header'
import {useAppSelector} from '../redux/hooks/redux-hooks'

export const ProtectedRoute = () => {
  const {isAuth} = useAppSelector(state => state.user)
  return isAuth ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to={ROUTE_PATH.login} />
  )
}
