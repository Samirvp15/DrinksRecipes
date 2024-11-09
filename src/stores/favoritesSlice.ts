import { StateCreator } from "zustand"
import { RecipeType } from "../types"
import { createRecipeSlice, RecipesSliceType } from "./recipeSlice"



export type FavoritesSliceType = {
    favorites: RecipeType[],
    handleClick: (recipe: RecipeType) => void,
    favoriteExist: (id: RecipeType['idDrink']) => boolean,
    loadFromStorage: () => void
}


export const createFavoritesSlice: StateCreator<FavoritesSliceType & RecipesSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
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

        createRecipeSlice(set, get, api).closeModal()
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExist: (id: RecipeType['idDrink']) => {
        return get().favorites.some(fav => fav.idDrink === id)
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if (storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})


