import { StateCreator } from "zustand"
import { getCategories } from "../services/RecipeService"
import { CategoriesType } from "../types"


export type RecipesSliceType = {
    categories: CategoriesType,
    fetchCategories: () => Promise<void>
}


export const createRecipeSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    fetchCategories: async () => {
       const categories = await getCategories()
        set({
            categories
        })

    }
})

