import { DrinkType } from "../types"


type DrinkCardProps = {
  drink: DrinkType
}


export default function DrinkCard({drink}: DrinkCardProps) {
  return (
    <h2>{drink.strDrink}</h2>
  )
}
