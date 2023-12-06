import {LocalizationButton} from './components/localization-button'
import {createContext, useState} from 'react'
import {localizationValues} from './localization'
import {RouterProvider} from 'react-router-dom'
import {router} from './services/router'
import {Toast} from './components/toast'

export const LocalizationContext = createContext(localizationValues.en)

export function App() {
  const [localization, setLocalization] = useState(localizationValues.en)

  const onChangeLocalization = (localizationName: 'en' | 'ru') => {
    setLocalization(localizationValues[localizationName])
  }

  return (
    <>
      <Toast />
      <LocalizationButton onChangeLocalization={onChangeLocalization} />
      <LocalizationContext.Provider value={localization}>
        <RouterProvider router={router} />
      </LocalizationContext.Provider>
    </>
  )
}
