import { z } from "zod";
import { CategoriesAPIResponseSchema, DrinkAPIResponse, DrinksAPIResponse, RecipeAPIResponseSchema, SearchFilterSchema } from "../utils/recipes-schema";




export type CategoriesType = z.infer<typeof CategoriesAPIResponseSchema> 
export type SearchFilterType = z.infer<typeof SearchFilterSchema>
export type DrinksType = z.infer<typeof DrinksAPIResponse>
export type DrinkType = z.infer<typeof DrinkAPIResponse>
export type RecipeType = z.infer<typeof RecipeAPIResponseSchema>


