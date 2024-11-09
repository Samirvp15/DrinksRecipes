import { StateCreator } from "zustand"
import { RecipeType } from "../types"
import { createRecipeSlice, RecipesSliceType } from "./recipeSlice"
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice"



export type FavoritesSliceType = {
    favorites: RecipeType[],
    handleClick: (recipe: RecipeType) => void,
    favoriteExist: (id: RecipeType['idDrink']) => boolean,
    loadFromStorage: () => void
}


export const createFavoritesSlice: StateCreator<FavoritesSliceType & RecipesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handleClick: (recipe) => {

        if (get().favoriteExist(recipe.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter(fav => fav.idDrink !== recipe.idDrink)
            }))

            createNotificationSlice(set,get,api).showNotification({
                text: 'Se elimino de Favoritos',
                error: false
            })
        } else {
            set((state) => ({
                favorites: [...state.favorites, recipe]
            }))
            createNotificationSlice(set,get,api).showNotification({
                text: 'Se agrego a Favoritos',
                error: false
            })
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


