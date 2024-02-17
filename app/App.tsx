import React from "react"
import {AppNavigator} from "./AppNavigator"
import {LanguageProvider} from "./translations/translations"

const App = () => {
  return (
    <LanguageProvider initialState={"ru"}>
      <AppNavigator />
    </LanguageProvider>
  )
}

export default App
