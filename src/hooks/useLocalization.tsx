import {useContext} from 'react'
import {LocalizationContext} from '../App'

export const useLocalization = () => useContext(LocalizationContext)
