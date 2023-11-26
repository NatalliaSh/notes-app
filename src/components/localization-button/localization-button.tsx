import style from './localization-button.module.scss'
import {FC, useState} from 'react'

type Props = {
  onChangeLocalization: (localizationName: 'en' | 'ru') => void
}

export const LocalizationButton: FC<Props> = ({onChangeLocalization}) => {
  const [activeButon, setActiveButton] = useState('en')

  return (
    <div className={style.wrapper}>
      <button
        type="button"
        className={style.button}
        disabled={activeButon === 'en'}
        onClick={() => {
          setActiveButton('en')
          onChangeLocalization('en')
        }}>
        EN
      </button>
      <button
        type="button"
        className={style.button}
        disabled={activeButon === 'ru'}
        onClick={() => {
          setActiveButton('ru')
          onChangeLocalization('ru')
        }}>
        RU
      </button>
    </div>
  )
}
