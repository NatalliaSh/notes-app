import style from './header.module.scss'
import {FC} from 'react'
import Icon from '../../assets/icons/user.svg?react'
import LogoutIcon from '../../assets/icons/logout.svg?react'
import Password from '../../assets/icons/password.svg?react'
import {Popover} from '../popover'
import {ROUTE_PATH} from '../../services/routes-paths'
import {Link, useNavigate} from 'react-router-dom'
import {useLocalization} from '../../hooks/useLocalization'
import {LocalStorageService} from '../../services/local-storage-service'
import {useAppDispatch} from '../../redux/hooks/redux-hooks'
import {logOut} from '../../redux/slices/user'

export const Header: FC = () => {
  const popovertarget = {popovertarget: 'user-menu'}
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const localization = useLocalization()

  const onLogOut = () => {
    LocalStorageService.removeToken()
    dispatch(logOut())
    navigate(ROUTE_PATH.login)
  }

  return (
    <div className={style.wrapper}>
      <button className={style['button-wrapper']} {...popovertarget}>
        <Icon />
      </button>
      <Popover id="user-menu">
        <button {...popovertarget}>
          <Link to={ROUTE_PATH['change-password']}>
            <Password />
            {localization.changePassword}
          </Link>
        </button>
        <button type="button" onClick={onLogOut}>
          <LogoutIcon className={style.icon} />
          {localization.logOut}
        </button>
      </Popover>
    </div>
  )
}
