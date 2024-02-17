import {TFilter} from "../screens/CarListScreen"

export const filterUtils = (id: TFilter, lang: "ru" | "en") => {
  switch (id) {
    case 1:
      if (lang === "ru") {
        return "Грузовой"
      } else {
        return "Cargo"
      }
    case 2:
      if (lang === "ru") {
        return "Пассажирский"
      } else {
        return "Passenger"
      }
    case 3:
      if (lang === "ru") {
        return "Спецтранспорт"
      } else {
        return "Special transport"
      }
  }
}
