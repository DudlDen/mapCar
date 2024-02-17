import React, {FC, useEffect, useState} from "react"
import {Linking, Pressable, SafeAreaView, TextStyle, View, ViewStyle} from "react-native"
import {AppStackScreenProps} from "../AppNavigator"
import {useLanguage} from "../translations/translations"
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps"
import {TCarData} from "../utils/types"
import {HEIGHT_HEADER, HEIGHT_SCREEN} from "../components/MapCars"
import {colors} from "../utils/colors"
import {Text} from "../components/Text"

const HEIGHT_CAR_INFO = 150

interface CarScreenProps extends AppStackScreenProps<"CarScreen"> {}

export const CarScreen: FC<CarScreenProps> = ({navigation, route}) => {
  const [carData, setCarData] = useState<TCarData | null>(null)
  const {langData, langText} = useLanguage()

  useEffect(() => {
    let data
    if (langData) data = langData.find((item) => item.id === route.params.id)
    if (data) {
      setCarData(data)
      navigation.setOptions({
        headerTitle: `${data.carName}#${data.id}`,
      })
    }
  }, [langData])

  return (
    <SafeAreaView style={$container}>
      {carData && (
        <View
          style={{
            height: HEIGHT_SCREEN - HEIGHT_HEADER - HEIGHT_CAR_INFO - 30,
          }}
        >
          <MapView
            provider={PROVIDER_GOOGLE}
            style={[$map]}
            region={{
              latitude: carData.lat,
              longitude: carData.long,
              latitudeDelta: 0.05,
              longitudeDelta: 0.011,
            }}
            onPress={() => {}}
          >
            <Marker
              coordinate={{
                latitude: carData.lat,
                longitude: carData.long,
              }}
              onPress={() => {}}
              icon={require("../../assets/markerOn.png")}
            />
          </MapView>
          <View style={$mapCarInfoContainer}>
            <Text style={$text}>{carData.carCategory}</Text>
            <Text style={$text}>{carData.driverName}</Text>

            <Text style={$text}>{carData.phone}</Text>
            <View style={$btnContainer}>
              <Pressable
                onPress={() => {
                  Linking.openURL(`tel:${carData.phone}`)
                }}
                style={$btn}
              >
                <Text>{langText?.call}</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  Linking.openURL(`https://wa.me/${carData.phone}?text=${langText?.whatsAppText}`)
                }}
                style={$btn}
              >
                <Text>{langText?.write}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}

const $container: ViewStyle = {
  padding: 12,
  margin: 12,
  marginBottom: 50,
}

const $text: TextStyle = {
  marginBottom: 8,
}
const $map: ViewStyle = {
  zIndex: -1,
  height: "100%",
  width: "100%",
}

const $mapCarInfoContainer: ViewStyle = {
  backgroundColor: colors.green,
  padding: 8,
  zIndex: 10,
  borderWidth: 1,

  borderColor: colors.lightGreen,
  borderBottomRightRadius: 8,
  borderBottomLeftRadius: 8,
}

const $btnContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}
const $btn: ViewStyle = {
  padding: 8,
  borderWidth: 1,
  borderRadius: 4,
  borderColor: colors.lightGreen,
}
