//import {LoginPage} from './pages/login-page'
import {PersonalNotesPage} from './pages/personal-notes'
//import {PublicNotesPage} from './pages/public-notes'
import {LocalizationButton} from './components/localization-button'
import {createContext, useState} from 'react'
import {localizationValues} from './localization'

export const LocalizationContext = createContext(localizationValues.en)

export function App() {
  const [localization, setLocalization] = useState(localizationValues.en)

  const onChangeLocalization = (localizationName: 'en' | 'ru') => {
    setLocalization(localizationValues[localizationName])
  }

  return (
    <>
      <LocalizationButton onChangeLocalization={onChangeLocalization} />
      <LocalizationContext.Provider value={localization}>
        <PersonalNotesPage />
      </LocalizationContext.Provider>
    </>
  )
}
