import React from "react"
import {Text as RNText, TextProps as RNTextProps, TextStyle} from "react-native"
import {colors} from "../utils/colors"

export interface TextProps extends RNTextProps {
  children?: React.ReactNode
}

export function Text({children, style, ...rest}: TextProps) {
  return (
    <RNText {...rest} style={[$defaultTextStyle, style]}>
      {children}
    </RNText>
  )
}

const $defaultTextStyle: TextStyle = {
  color: colors.white,
}
