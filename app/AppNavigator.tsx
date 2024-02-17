import React from "react"
import {NavigationContainer} from "@react-navigation/native"
import {StackScreenProps} from "@react-navigation/stack"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {CarListScreen} from "./screens/CarListScreen"
import {CarScreen} from "./screens/CarScreen"
import {SettingScreen} from "./screens/SettingScreen"
import {useLanguage} from "./translations/translations"
import {colors} from "./utils/colors"

export type AppStackParamList = {
  CarListScreen: undefined
  CarScreen: {id: number}
  SettingScreen: undefined
}

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>

const Stack = createNativeStackNavigator<AppStackParamList>()

export const AppNavigator = () => {
  const {langText} = useLanguage()
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: colors.gray},
          headerStyle: {backgroundColor: colors.grayBlack},
          headerTitleStyle: {color: colors.white},
          headerTintColor: colors.white,
        }}
      >
        <Stack.Screen
          name="CarListScreen"
          component={CarListScreen}
          options={{
            headerTitle: langText?.carList,
          }}
        />
        <Stack.Screen
          name="CarScreen"
          component={CarScreen}
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="SettingScreen"
          component={SettingScreen}
          options={{
            headerTitle: langText?.setting,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
