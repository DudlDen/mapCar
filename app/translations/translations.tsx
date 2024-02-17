import React, {createContext, Dispatch, ReactNode, useContext, useState} from "react"
import ru, {Translations} from "./ru"
import en from "./en"
import carDataRu from "../../data/cars/cars.ru.json"
import carDataEn from "../../data/cars/cars.en.json"
import {TCarData} from "../components/CarListItem"

const lang = {
  en: {
    text: en,
    data: carDataEn,
  },
  ru: {
    text: ru,
    data: carDataRu,
  },
}

const langDict = (key: "en" | "ru") => lang[key]

const LanguageContext = createContext<{
  langText: Translations | null
  setLang: Dispatch<"en" | "ru"> | null
  langData: TCarData[] | null
  lang: "en" | "ru"
}>({
  langText: null,
  setLang: null,
  langData: null,
  lang: "ru",
})

export function LanguageProvider({
  initialState = "ru",
  children,
}: {
  initialState: "en" | "ru"
  children: ReactNode
}) {
  const [lang, setLang] = useState<"en" | "ru">(initialState)

  return (
    <LanguageContext.Provider
      value={{lang, langText: langDict(lang).text, setLang, langData: langDict(lang).data}}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
