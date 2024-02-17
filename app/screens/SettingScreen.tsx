import React, {FC, useEffect} from "react"
import {AppStackScreenProps} from "../AppNavigator"
import {SettingItem} from "../components/SettingItem"
import {useLanguage} from "../translations/translations"
import {SafeAreaView} from "react-native"

interface SettingScreenProps extends AppStackScreenProps<"SettingScreen"> {}

export const SettingScreen: FC<SettingScreenProps> = ({navigation}) => {
  const {langText} = useLanguage()

  useEffect(() => {
    navigation.setOptions({
      headerBackTitle: langText?.carList,
    })
  }, [langText])

  return (
    <SafeAreaView>
      <SettingItem text={langText?.russian} id={"ru"} />
      <SettingItem text={langText?.english} id={"en"} />
    </SafeAreaView>
  )
}
