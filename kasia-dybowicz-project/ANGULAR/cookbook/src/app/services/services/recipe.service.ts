import {Injectable} from '@angular/core'; // Import Injectable from Angular core
import {Recipe} from "../models/recipe.model"; // Import Recipe model
import {HttpClient} from "@angular/common/http"; // Import HttpClient from Angular common HTTP
import {Observable} from "rxjs"; // Import Observable from RxJS

@Injectable({
    providedIn: 'root' // Provide this service at the root level
})
export class RecipeService {
    currentRecipe: Recipe | undefined; // Initialize currentRecipe as undefined

    private recipeApiUrl = 'http://localhost:8080/recipes'; // Define API URL for recipes

    constructor(private http: HttpClient) {} // Inject HttpClient

    findRecipeById(id: number): Observable<Recipe> { // Method to find a recipe by ID
        return this.http.get<Recipe>(`${this.recipeApiUrl}/find/${id}`); // Make GET request to recipe API
    }

    getAllRecipes(): Observable<Recipe[]> { // Method to get all recipes
        return this.http.get<Recipe[]>(`${this.recipeApiUrl}/all`); // Make GET request to recipe API
    }

    searchRecipesByTitleContaining(title: string): Observable<Recipe[]> { // Method to search recipes by title
        return this.http.get<Recipe[]>(`${this.recipeApiUrl}/findtitle/${encodeURIComponent(title)}`); // Make GET request to recipe API
    }

    searchRecipesByDifficulty(difficulty: string): Observable<Recipe[]> { // Method to search recipes by difficulty
        return this.http.get<Recipe[]>(`${this.recipeApiUrl}/filterdiff/${encodeURIComponent(difficulty)}`); // Make GET request to recipe API
    }

    searchRecipesByCuisine(cuisine: string): Observable<Recipe[]> { // Method to search recipes by cuisine
        return this.http.get<Recipe[]>(`${this.recipeApiUrl}/filtercuis/${encodeURIComponent(cuisine)}`); // Make GET request to recipe API
    }

    searchRecipesByIngredientContaining(ingredient: string): Observable<Recipe[]> { // Method to search recipes by ingredient
        return this.http.get<Recipe[]>(`${this.recipeApiUrl}/findingredient/${encodeURIComponent(ingredient)}`); // Make GET request to recipe API
    }

    addRecipe(recipe: Recipe): Observable<Recipe> { // Method to add a new recipe
        return this.http.post<Recipe>(`${this.recipeApiUrl}/add`, recipe); // Make POST request to recipe API
    }

    updateRecipe(recipeId: number, recipe: Recipe): Observable<Recipe> { // Method to update a recipe
        return this.http.put<Recipe>(`${this.recipeApiUrl}/${recipeId}`, recipe); // Make PUT request to recipe API
    }

    deleteRecipe(id: number): Observable<void> { // Method to delete a recipe
        return this.http.delete<void>(`${this.recipeApiUrl}/${id}`); // Make DELETE request to recipe API
    }
}
