import {LocalizationButton} from './components/localization-button'
import {createContext, useState, Dispatch} from 'react'
import {localizationValues} from './localization'
import {RouterProvider} from 'react-router-dom'
import {router} from './services/router'
import {LocalStorageService} from './services/local-storage-service'

export const LocalizationContext = createContext(localizationValues.en)
export const AuthContext = createContext<null | {
  isAuth: boolean
  setIsAuth: Dispatch<React.SetStateAction<boolean>>
}>(null)

export function App() {
  const [localization, setLocalization] = useState(localizationValues.en)
  const [isAuth, setIsAuth] = useState(LocalStorageService.getToken() ? true : false)

  const onChangeLocalization = (localizationName: 'en' | 'ru') => {
    setLocalization(localizationValues[localizationName])
  }

  return (
    <>
      <LocalizationButton onChangeLocalization={onChangeLocalization} />
      <LocalizationContext.Provider value={localization}>
        <AuthContext.Provider value={{isAuth, setIsAuth}}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      </LocalizationContext.Provider>
    </>
  )
}
