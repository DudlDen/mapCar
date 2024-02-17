import * as React from "react"
import {Pressable, TextStyle, ViewStyle} from "react-native"
import {useLanguage} from "../translations/translations"
import {Text} from "./Text"
import {colors} from "../utils/colors"

type SettingItemProps = {
  text: string | undefined
  id: "ru" | "en"
}

export function SettingItem({text, id}: SettingItemProps) {
  const {setLang, lang} = useLanguage()

  return (
    <Pressable
      style={$container}
      onPress={() => {
        if (setLang) setLang(id)
      }}
    >
      <Text style={[$text, lang === id && $textActive]}>{text}</Text>
    </Pressable>
  )
}

const $container: ViewStyle = {
  padding: 8,
}
const $text: TextStyle = {
  fontSize: 14,
}

const $textActive: TextStyle = {
  fontWeight: "700",
  fontSize: 20,
  color: colors.white,
}
