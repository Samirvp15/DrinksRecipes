import { StateCreator } from "zustand"
import { getCategories, getRecipes } from "../services/RecipeService"
import { CategoriesType, DrinksType, SearchFilterType } from "../types"


export type RecipesSliceType = {
    categories: CategoriesType,
    drinks: DrinksType,
    fetchCategories: () => Promise<void>,
    searchRecipes: (searchFilter: SearchFilterType) => Promise<void>,
}


export const createRecipeSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })

    },
    searchRecipes: async (filters) => {
       const drinks = await getRecipes(filters)
       set({
        drinks
       })
    }
})

