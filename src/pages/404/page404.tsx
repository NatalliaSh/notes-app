import style from './page-404.module.scss'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {ROUTE_PATH} from '../../services/routes-paths'
import {useLocalization} from '../../hooks/useLocalization'

export const Page404 = () => {
  const navigate = useNavigate()
  const [counter, setCounter] = useState(3)
  const localization = useLocalization()

  useEffect(() => {
    if (counter === 0) {
      navigate(ROUTE_PATH.main)
      return
    }
    setTimeout(() => {
      setCounter(counter - 1)
    }, 1000)
  }, [counter, navigate])

  return (
    <div className={style.wrapper}>
      <p>{localization.page404.notFound}</p>
      <p>{`${localization.page404.redirect} ${counter} ${localization.page404.sec}...`} </p>
    </div>
  )
}
