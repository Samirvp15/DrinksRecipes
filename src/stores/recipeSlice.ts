import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService"
import { CategoriesType, DrinksType, DrinkType, RecipeType, SearchFilterType } from "../types"


export type RecipesSliceType = {
    categories: CategoriesType,
    drinks: DrinksType,
    selectedRecipe: RecipeType,
    modal: boolean,
    fetchCategories: () => Promise<void>,
    searchRecipes: (searchFilter: SearchFilterType) => Promise<void>,
    selectRecipe: (id: DrinkType['idDrink']) => Promise<void>,
    closeModal: ()=> void,
}


export const createRecipeSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as RecipeType,
    modal: false,
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
    },
    selectRecipe: async (id) => {
        const selectedRecipe = await getRecipeById(id)

        set({
            selectedRecipe,
            modal: true
        })
    },
    closeModal: ()=>{
        set({
            modal: false,
            selectedRecipe: {} as RecipeType
        })
    }
})

