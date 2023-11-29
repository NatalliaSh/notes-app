import style from './header.module.scss'
import {FC} from 'react'
import {useAuth} from '../../hooks/useAuth'
import {UserIcon} from '../user-icon'
import Login from '../../assets/icons/login.svg?react'
import {useNavigate} from 'react-router-dom'
import {ROUTE_PATH} from '../../services/routes-paths'

export const Header: FC = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  return (
    <div className={style.wrapper}>
      {auth?.isAuth ? (
        <UserIcon />
      ) : (
        <Login
          className={style.login}
          onClick={() => {
            navigate(ROUTE_PATH.login)
          }}
        />
      )}
    </div>
  )
}
