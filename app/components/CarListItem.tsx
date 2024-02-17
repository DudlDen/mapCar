import * as React from "react"
import {Pressable, TextStyle, ViewStyle} from "react-native"
import {Text} from "./Text"
import {colors} from "../utils/colors"
import {TCarData} from "../utils/types"

type CarListItemProps = {
  carData: TCarData
  onPress: (id: number) => void
}

export function CarListItem({carData, onPress}: CarListItemProps) {
  return (
    <Pressable
      onPress={() => {
        onPress(carData.id)
      }}
      style={$container}
    >
      <Text style={$text}>{`${carData.carName}#${carData.id}`}</Text>
      <Text style={$text}>{carData.driverName}</Text>
      <Text style={$text}>{carData.carCategory}</Text>
    </Pressable>
  )
}

const $container: ViewStyle = {
  padding: 12,
  marginBottom: 12,
  borderWidth: 1,
  borderRadius: 8,
  borderColor: colors.lightGreen,
  backgroundColor: colors.green,
}

const $text: TextStyle = {
  marginBottom: 8,
}
