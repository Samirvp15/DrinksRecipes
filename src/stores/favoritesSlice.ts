import { StateCreator } from "zustand"
import { RecipeType } from "../types"



export type FavoritesSliceType = {
    favorites: RecipeType[],
    handleClick: (recipe: RecipeType) => void,
    favoriteExist: (id: RecipeType['idDrink']) => boolean
}


export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (set, get) => ({
    favorites: [],
    handleClick: (recipe) => {

        if (get().favoriteExist(recipe.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter(fav => fav.idDrink !== recipe.idDrink)
            }))
        } else {
            set((state) => ({
                favorites: [...state.favorites, recipe]
            }))

        }
    },
    favoriteExist: (id: RecipeType['idDrink']) => {
        return get().favorites.some(fav => fav.idDrink === id)
    }
})


