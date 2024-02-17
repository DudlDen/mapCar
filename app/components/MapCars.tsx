import * as React from "react"
import {Dispatch} from "react"
import {Dimensions, Pressable, TextStyle, View, ViewStyle} from "react-native"
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps"
import {TCarData} from "../utils/types"
import {colors} from "../utils/colors"
import {Text} from "./Text"

export const HEIGHT_HEADER = 100
export const HEIGHT_SCREEN = Dimensions.get("window").height

const HEIGHT_CAR_INFO = 100

const mapIcons = {
  icon: require("../../assets/markerOff.png"),
  selectedIcon: require("../../assets/markerOn.png"),
}

type MapCarsProps = {
  tabHeight: number | null
  carData: TCarData[] | null
  carListItemPress: (id: number) => void
  state: {
    carInfo: TCarData | null
    setCarInfo: Dispatch<TCarData | null>
  }
}

export function MapCars({tabHeight, carData, carListItemPress, state}: MapCarsProps) {
  const {carInfo, setCarInfo} = state

  const carInfoPress = () => {
    if (carInfo) carListItemPress(carInfo.id)
  }

  return (
    <View
      style={{
        height: tabHeight
          ? HEIGHT_SCREEN - tabHeight - HEIGHT_HEADER - HEIGHT_CAR_INFO - 30
          : undefined,
      }}
    >
      <MapView
        provider={PROVIDER_GOOGLE}
        style={[$map]}
        region={{
          latitude: 54.725349628989754,
          longitude: 55.943288777822055,
          latitudeDelta: 0.05,
          longitudeDelta: 0.011,
        }}
        onPress={() => {
          setCarInfo(null)
        }}
      >
        {carData?.map((data) => (
          <Marker
            key={data.id}
            coordinate={{
              latitude: data.lat,
              longitude: data.long,
            }}
            onPress={(e) => {
              e.stopPropagation()
              setCarInfo(data)
            }}
            icon={carInfo && carInfo.id === data.id ? mapIcons.selectedIcon : mapIcons.icon}
          />
        ))}
      </MapView>
      <Pressable onPress={carInfoPress} style={$mapCarInfoContainer}>
        {carInfo && <Text style={$text}>{`${carInfo?.carName}#${carInfo?.id}`}</Text>}
        <Text style={$text}>{carInfo?.driverName}</Text>
        <Text style={$text}>{carInfo?.carCategory}</Text>
      </Pressable>
    </View>
  )
}

const $mapCarInfoContainer: ViewStyle = {
  backgroundColor: colors.green,
  padding: 8,
  height: 100,
  zIndex: 10,
  borderWidth: 1,
  borderColor: colors.lightGreen,
  borderBottomRightRadius: 8,
  borderBottomLeftRadius: 8,
}

const $map: ViewStyle = {
  zIndex: -1,
  height: "100%",
  width: "100%",
}

const $text: TextStyle = {
  marginBottom: 8,
}
