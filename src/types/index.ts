import { z } from "zod";
import { CategoriesAPIResponseSchema } from "../utils/recipes-schema";




export type CategoriesType = z.infer<typeof CategoriesAPIResponseSchema> 