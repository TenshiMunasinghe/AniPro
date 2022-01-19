import { useCallback, useState } from 'react'
import { StaffLanguage } from '../generated/index'

export const useVALanguage = () => {
  const [language, setLanguage] = useState<StaffLanguage>(
    StaffLanguage.Japanese
  )

  const languageOnChange = useCallback((value: string | string[]) => {
    setLanguage(value as StaffLanguage)
  }, [])

  return { language, languageOnChange }
}
