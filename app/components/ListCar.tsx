import * as React from "react"
import {FlatList} from "react-native"
import {CarListItem} from "./CarListItem"
import {TCarData} from "../utils/types"

type ListCarProps = {
  carData: TCarData[] | null
  carListItemPress: (id: number) => void
}

export function ListCar({carData, carListItemPress}: ListCarProps) {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={carData}
      renderItem={({item}: {item: TCarData}) => (
        <CarListItem onPress={carListItemPress} carData={item} />
      )}
    />
  )
}
