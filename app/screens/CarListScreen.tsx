import React, {FC, useEffect, useState} from "react"
import {Pressable, SafeAreaView, TextStyle, View, ViewStyle} from "react-native"
import {AppStackScreenProps} from "../AppNavigator"
import {useLanguage} from "../translations/translations"
import {FilterBtn} from "../components/FilterBtn"
import Setting from "../../assets/Setting.svg"
import {ListCar} from "../components/ListCar"
import {MapCars} from "../components/MapCars"
import {filterUtils} from "../utils/func"
import {colors} from "../utils/colors"
import {TCarData} from "../utils/types"
import {Text} from "../components/Text"

interface CarListScreenProps extends AppStackScreenProps<"CarListScreen"> {}

export type TFilter = 1 | 2 | 3

export const CarListScreen: FC<CarListScreenProps> = ({navigation}) => {
  const {langText, langData, lang} = useLanguage()
  // состояние массива данных
  const [carData, setCarData] = useState<TCarData[] | null>(null)
  // состояние фильтра
  const [filter, setFilter] = useState<TFilter | null>(null)
  // состояние выбранного таба
  const [tabSelect, setTabSelect] = useState<"map" | "list">("list")
  // состояние информации выбранного на карте маркера
  const [carInfo, setCarInfo] = useState<TCarData | null>(null)
  // состояние высоты шапки
  const [tabHeight, setTabHeight] = useState<number | null>(null)

  useEffect(() => {
    navigation.setOptions({
      headerRight,
    })
  }, [])

  useEffect(() => {
    if (filter) {
      if (langData)
        setCarData(langData.filter((item) => item.carCategory === filterUtils(filter, lang)))
    } else {
      if (langData) setCarData(langData)
    }

    if (carInfo && langData) {
      let info = langData.find((item) => item.id === carInfo.id)
      if (info) setCarInfo(info)
    }
  }, [langData])

  // функция для кнопки настроек
  const headerRight = () => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate("SettingScreen")
        }}
      >
        <Setting />
      </Pressable>
    )
  }

  // функция обработки нажатия на кнопку фильтра
  const filterPress = (id: TFilter) => {
    setFilter(id)
  }

  // функция обработки нажатия на кнопку применения фильтра
  const applyFilterPress = () => {
    let data
    let info
    if (langData && filter)
      data = langData.filter((item) => item.carCategory === filterUtils(filter, lang))
    if (data) setCarData(data)
    if (carInfo && filter && data) {
      info = data.find((item) => item.id === carInfo.id)
      if (info) {
        setCarInfo(info)
      } else {
        setCarInfo(null)
      }
    }
  }

  // функция обработки нажатия на таб
  const tabPress = (tab: "map" | "list") => {
    setTabSelect(tab)
  }

  // функция обработки нажатия на кнопку сброса фильтра
  const resetFilterPress = () => {
    setFilter(null)
    if (langData) setCarData(langData)
  }

  // функция обработки нажатия на карточку
  const carListItemPress = (id: number) => {
    navigation.navigate("CarScreen", {id})
  }

  // объект табов
  const renderObject = {
    list: <ListCar carData={carData} carListItemPress={carListItemPress} />,
    map: (
      <MapCars
        carData={carData}
        carListItemPress={carListItemPress}
        tabHeight={tabHeight}
        state={{
          carInfo,
          setCarInfo,
        }}
      />
    ),
  }

  const isList = tabSelect === "list"

  return (
    <SafeAreaView style={$container}>
      <View
        onLayout={(event) => {
          setTabHeight(event.nativeEvent.layout.height)
        }}
      >
        <View style={$tabContainer}>
          <Pressable
            onPress={() => {
              tabPress("list")
            }}
            style={[$tabBtn, isList && $tabBtnActive]}
          >
            <Text style={[$tabText, isList && $tabTextActive]}>{langText?.list}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              tabPress("map")
            }}
            style={[$tabBtn, !isList && $tabBtnActive]}
          >
            <Text style={[$tabText, !isList && $tabTextActive]}>{langText?.map}</Text>
          </Pressable>
        </View>
        <View style={$filterContainer}>
          <FilterBtn id={1} filter={filter} filterPress={filterPress} text={langText?.cargo} />
          <FilterBtn id={2} filter={filter} filterPress={filterPress} text={langText?.passenger} />
          <FilterBtn
            id={3}
            filter={filter}
            filterPress={filterPress}
            text={langText?.specialTransport}
          />
        </View>
        <View style={$filterContainer}>
          <Pressable onPress={resetFilterPress}>
            <Text>{langText?.reset}</Text>
          </Pressable>
          <Pressable onPress={applyFilterPress}>
            <Text>{langText?.apply}</Text>
          </Pressable>
        </View>
      </View>
      {renderObject[tabSelect]}
    </SafeAreaView>
  )
}

const $container: ViewStyle = {
  padding: 12,
  margin: 12,
  marginBottom: 90,
  backgroundColor: colors.gray,
}
const $tabContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
}

const $tabBtn: ViewStyle = {
  width: "50%",
  alignItems: "center",
  padding: 8,
  borderBottomWidth: 2,
  borderBottomColor: "#8d8d8d",
}

const $tabBtnActive: ViewStyle = {
  borderBottomColor: colors.white,
}

const $tabText: TextStyle = {
  fontWeight: "700",
}
const $tabTextActive: TextStyle = {
  color: colors.white,
}

const $filterContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 8,
}
