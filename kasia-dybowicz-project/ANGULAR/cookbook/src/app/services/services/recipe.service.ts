import {Injectable} from '@angular/core';
import {Recipe} from "../models/recipe.model";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    currentRecipe: Recipe | undefined;

    private recipeApiUrl = 'http://localhost:8080/recipes';

    constructor(private http: HttpClient) {
    }

    findRecipeById(id: number): Observable<Recipe> {
        return this.http.get<Recipe>(`${this.recipeApiUrl}/find/${id}`)
    }

    getAllRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${this.recipeApiUrl}/all`)
    }

    // findRecipeByTitle(title: string): Observable<Recipe> {
    //   return this.http.get<Recipe>(`${this.recipeApiUrl}/find/${title}`)
    // }

    searchRecipesByTitleContaining(title: string): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${this.recipeApiUrl}/findtitle/${encodeURIComponent(title)}`)
    }

    searchRecipesByDifficulty(difficulty: string): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${this.recipeApiUrl}/filterdiff/${encodeURIComponent(difficulty)}`)
    }

    searchRecipesByCuisine(cuisine: string): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${this.recipeApiUrl}/filtercuis/${encodeURIComponent(cuisine)}`)
    }

    searchRecipesByIngredientContaining(ingredient: string): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${this.recipeApiUrl}/findingredient/${encodeURIComponent(ingredient)}`)
    }

    addRecipe(recipe: Recipe): Observable<Recipe> {
        return this.http.post<Recipe>(`${this.recipeApiUrl}/add`, recipe);
    }

    updateRecipe(recipeId: number, recipe: Recipe): Observable<Recipe> {
        return this.http.put<Recipe>(`${this.recipeApiUrl}/${recipeId}`, recipe);
    }

    deleteRecipe(id: number): Observable<void> {
        return this.http.delete<void>(`${this.recipeApiUrl}/${id}`)
    }
}
