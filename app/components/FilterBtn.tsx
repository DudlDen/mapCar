import * as React from "react"
import {Pressable, TextStyle, ViewStyle} from "react-native"
import {TFilter} from "../screens/CarListScreen"
import {Text} from "./Text"
import {colors} from "../utils/colors"

type FilterBtnProps = {
  filter: TFilter | null
  filterPress: (id: TFilter) => void
  text: string | undefined
  id: TFilter
}

export function FilterBtn({filter, filterPress, text, id}: FilterBtnProps) {
  return (
    <Pressable
      key={id}
      style={[$filterBtn, filter === id && $filterBtnActive]}
      onPress={() => filterPress(id)}
    >
      <Text style={$filterBtnText}>{text}</Text>
    </Pressable>
  )
}

const $filterBtn: ViewStyle = {
  padding: 4,
  borderRadius: 4,
  borderWidth: 1,
  borderColor: colors.lightGreen,
}
const $filterBtnActive: ViewStyle = {
  backgroundColor: colors.green,
}

const $filterBtnText: TextStyle = {}
