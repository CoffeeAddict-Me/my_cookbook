import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Recipe } from "../../services/models/recipe.model";
import { UserDetails } from "../../services/models/user.model";
import { NewuserService } from "../../services/services/newuser.service";
import { MatDialog } from "@angular/material/dialog";
import { RecipeDetailModalComponent } from "../../modals/recipe-detail-modal/recipe-detail-modal.component";
import { RecipeEditModalComponent } from "../../modals/recipe-edit-modal/recipe-edit-modal.component";
import { HttpErrorResponse } from "@angular/common/http";
import { RecipeDeleteModalComponent } from "../../modals/recipe-delete-modal/recipe-delete-modal.component";
import { RecipeService } from "../../services/services/recipe.service";

@Component({
    selector: 'app-favourite-page', // Component selector
    templateUrl: './favourite-page.component.html', // Path to component template
    styleUrl: './favourite-page.component.scss' // Path to component styles
})
export class FavouritePageComponent {
    favouriteRecipes: Recipe[] = []; // Array to store favourite recipes
    splitIngredients: string[] = []; // Array to store split ingredients
    splitMethods: string[] = []; // Array to store split methods
    selectedRecipe?: Recipe; // Selected recipe for detail view
    recipeToEdit?: Recipe; // Recipe to edit

    recipe: Recipe = {
        recipeId: 0,
        title: "",
        ingredient: "",
        method: "",
        cuisine: "",
        difficulty: "",
        photoUrl: "",
    }; // Default recipe object
    activeUser: UserDetails = {
        userId: 0,
        username: "",
        name: "",
        email: "",
        password: "",
        role: ""
    }; // Default user object
    userId = 0; // User ID
    private updatedRecipe: any; // Variable to store updated recipe
    isSortedAlphabetically: boolean = false; // Flag for sorting alphabetically
    isSortedByType: boolean = false; // Flag for sorting by type
    isSortedByDifficulty: boolean = false; // Flag for sorting by difficulty

    // Lifecycle hook to initialize component
    ngOnInit() {
        const userJson = sessionStorage.getItem('activeUser');
        console.log("userId from storage " + this.activeUser.userId)
        if (userJson) { // Check for user data in session storage
            try {
                this.activeUser = JSON.parse(userJson);
            } catch (e) {
                console.error("Error parsing user JSON", e);
            }
        }
        this.userId = this.activeUser.userId
        console.log("userId from storage " + this.activeUser.userId)

        // Fetch favourite recipes for the user
        this.newUserService.getAllFavouriteRecipesByUserId(this.userId).subscribe({
            next: (response: Recipe[]) => {
                console.log("userId is " + this.userId)
                console.log(response)
                this.favouriteRecipes = response;
                console.log("received from back end " + this.favouriteRecipes)
            }
        });
    }

    constructor(
        private randomRouter: Router, // Router for navigation
        private recipeService: RecipeService, // Service for recipe operations
        private newUserService: NewuserService, // Service for user operations
        private dialog: MatDialog, // Dialog service for modals
    ) {}

    // Method to handle recipe selection
    onSelect(recipe: Recipe) {
        this.selectedRecipe = recipe;
        this.splitIngredients = recipe.ingredient.split(';').map(ingredient => ingredient.trim())
        this.splitMethods = recipe.method.split(';').map(method => method.trim())
        let dialogRef = this.dialog.open(RecipeDetailModalComponent, {
            height: 'auto',
            width: '100vw',
            data: {
                selectedRecipe: this.selectedRecipe,
                splitIngredients: this.splitIngredients,
                splitMethods: this.splitMethods,
                title: this.selectedRecipe.title,
                photoUrl: this.selectedRecipe.photoUrl
            }
        })
        console.log("selected recipe: " + this.selectedRecipe.title)
    }

    // Method to handle recipe editing
    editRecipe(recipe: Recipe) {
        console.log("Opening edit dialog for recipe:", recipe);
        this.recipeToEdit = recipe;
        console.log("reassigning recipe:", this.recipeToEdit);
        let dialogRef = this.dialog.open(RecipeEditModalComponent, {
            height: 'auto',
            width: '100vw',
            data: {
                selectedRecipe: this.recipeToEdit,
                recipeId: this.recipeToEdit.recipeId,
                title: this.recipeToEdit.title,
                ingredient: this.recipeToEdit.ingredient,
                method: this.recipeToEdit.method,
                cuisine: this.recipeToEdit.cuisine,
                difficulty: this.recipeToEdit.difficulty,
                photoUrl: this.recipeToEdit.photoUrl,
            }
        })
        dialogRef.afterClosed().subscribe(result => {
            this.updatedRecipe = result
            console.log("Received response " + this.updatedRecipe.title);
            console.log("Updated Recipe ID:", this.updatedRecipe.recipeId);
            if (this.updatedRecipe) {
                this.recipeService.updateRecipe(this.updatedRecipe.recipeId,
                    this.updatedRecipe).subscribe({
                    next: (response: Recipe) => {
                        this.updatedRecipe = response;
                        console.log(response);
                        location.reload();
                    }, error: (error: HttpErrorResponse): void => {
                        alert(error.message);
                    }
                })
            } else {
                console.log('Recipe edit cancelled');
            }
        })
        console.log("Parent id: " + this.recipeToEdit.recipeId + " type " + typeof (this.recipeToEdit.recipeId))
    }

    // Method to handle recipe deletion
    deleteRecipe(recipe: Recipe) {
        const dialogRef = this.dialog.open(RecipeDeleteModalComponent, {
            width: '300px',
            height: '300px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.recipeService.deleteRecipe(recipe.recipeId).subscribe({
                    next: (response): void => {
                        console.log('Recipe deleted successfully', response);
                        location.reload();
                    }, error: (error) => {
                        console.error('Failed to delete recipe')
                    }
                });
            } else {
                console.log('Recipe deletion cancelled')
            }
        })
    }

    // Method to clear filters and reload all recipes
    clear() {
        const radios = document.getElementsByName('filter');
        radios.forEach((radio) => {
            if (radio instanceof HTMLInputElement) { // Type assertion
                radio.checked = false;
            }
        });
        this.recipeService.getAllRecipes().subscribe({
            next: (response: Recipe []) => {
                this.favouriteRecipes = response
            }
        })
    }

    // Method to remove recipe from favourites
    remove(recipe: Recipe): void {
        console.log(recipe.recipeId);

        this.newUserService.removeRecipeFromFavourites(this.userId, recipe.recipeId).subscribe({
            next: () => {
                // Remove the recipe from the local list of favorite recipes
                this.favouriteRecipes = this.favouriteRecipes.filter(favRecipe => favRecipe.recipeId !== recipe.recipeId);
                console.log('Recipe removed from favorites');
            },
            error: (err) => console.error('Error removing recipe from favorites', err)
        });
        location.reload();
    }

    // Method to sort recipes by title
    sortByTitle(): void {
        if (this.isSortedAlphabetically) {
            // Sort ascending
            this.favouriteRecipes.sort((a, b) => a.title.localeCompare(b.title));
        } else {
            // Sort descending
            this.favouriteRecipes.sort((a, b) => b.title.localeCompare(a.title));
        }
        // Toggle the sort order for next click
        this.isSortedAlphabetically = !this.isSortedAlphabetically;
    }

    // Method to sort recipes by cuisine type
    sortByType() {
        if (this.isSortedByType) {
            // Sort ascending
            this.favouriteRecipes.sort((a, b) => a.cuisine.localeCompare(b.cuisine));
        } else {
            // Sort descending
            this.favouriteRecipes.sort((a, b) => b.cuisine.localeCompare(a.cuisine));
        }
        // Toggle the sort order for next click
        this.isSortedByType = !this.isSortedByType
    }

    // Method to sort recipes by difficulty
    sortByDifficulty() {
        if (this.isSortedByDifficulty) {
            // Sort ascending
            this.favouriteRecipes.sort((a, b) => a.difficulty.localeCompare(b.difficulty));
        } else {
            // Sort descending
            this.favouriteRecipes.sort((a, b) => b.difficulty.localeCompare(a.difficulty));
        }
        // Toggle the sort order for next click
        this.isSortedByDifficulty = !this.isSortedByDifficulty
    }
}
