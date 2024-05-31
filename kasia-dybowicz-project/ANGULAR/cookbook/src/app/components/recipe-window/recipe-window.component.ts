import {Component} from '@angular/core';
import {Recipe} from "../../services/models/recipe.model";
import {RecipeDetailModalComponent} from "../../modals/recipe-detail-modal/recipe-detail-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {RecipeEditModalComponent} from "../../modals/recipe-edit-modal/recipe-edit-modal.component";
import {RecipeDeleteModalComponent} from "../../modals/recipe-delete-modal/recipe-delete-modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {NewuserService} from "../../services/services/newuser.service";
import {UserDetails} from "../../services/models/user.model";
import {FavouritesService} from "../../services/services/favourites.service";
import {RecipeService} from "../../services/services/recipe.service";


@Component({
    selector: 'app-recipe-window',
    templateUrl: './recipe-window.component.html',
    styleUrl: './recipe-window.component.scss'
})
export class RecipeWindowComponent {

    allRecipes: Recipe[] = [];
    splitIngredients: string[] = [];
    splitMethods: string[] = [];
    selectedRecipe?: Recipe;
    recipeToEdit?: Recipe;
    favouriteRecipes: Recipe[] = [];
    userId = 0;

    private updatedRecipe: any;
    isSortedAlphabetically: boolean = false;
    isSortedByType: boolean = false;
    isSortedByDifficulty: boolean = false;

    recipe: Recipe = {
        recipeId: 0,
        title: "",
        ingredient: "",
        method: "",
        cuisine: "",
        difficulty: "",
        photoUrl: "",
    };

    activeUser: UserDetails = {
        userId: 0,
        username: "",
        name: "",
        email: "",
        password: "",
        role: ""
    };

    superuser: boolean = true

    ngOnInit() {
        //getting all recipes from back end
        this.recipeService.getAllRecipes().subscribe({
            next: (response: Recipe[]) => {
                this.allRecipes = response;

                //getting user details from session storage
                const userJson = sessionStorage.getItem('activeUser');
                if (userJson) { // This checks for both null and empty string, but not explicitly for undefined
                    try {
                        this.activeUser = JSON.parse(userJson);
                    } catch (e) {
                        console.error("Error parsing user JSON", e);
                    }
                }
                this.userId = this.activeUser.userId
                console.log("this is my stored id " + this.activeUser.userId);

                //getting all favourite recipes
                this.newUserService.getAllFavouriteRecipesByUserId(this.activeUser.userId).subscribe({
                    next: (response: Recipe[]) => {
                        this.favouriteRecipes = response;
                        //calling method to check if recipes were favourite to style the hearts
                        this.favouriteRecipeCheck(this.recipe.recipeId);
                    }
                });
            }
        });

    }

    constructor(
        private recipeService: RecipeService,
        private newUserService: NewuserService,
        private favouritesService: FavouritesService,
        private dialog: MatDialog,
    ) {
    }

    onSelect(recipe: Recipe) {
        this.selectedRecipe = recipe;
        this.splitIngredients = recipe.ingredient.split(';').map(ingredient => ingredient.trim())
        this.splitMethods = recipe.method.split(';').map(method => method.trim())
        let dialogRef = this.dialog.open(RecipeDetailModalComponent, {
            height: 'auto',
            width: 'auto',
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

    editRecipe(recipe: Recipe) {
        console.log("Opening edit dialog for recipe:", recipe);
        this.recipeToEdit = recipe;
        console.log("reassigning recipe:", this.recipeToEdit);
        // this.splitIngredients = recipe.ingredient.split(';').map(ingredient => ingredient.trim())
        // this.splitMethods = recipe.method.split(';').map(method => method.trim())
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

    deleteRecipe(recipe: Recipe) {
        const dialogRef = this.dialog.open(RecipeDeleteModalComponent, {
            width: '300px',
            height: '500px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.recipeService.deleteRecipe(recipe.recipeId).subscribe({
                    next: (response): void => {
                        console.log('Recipe deleted successfully', response);
                        location.reload();
                    }, error: (error) => {
                        if(error.status === 423) {
                            alert("Cannot delete the recipe because it is in use")
                            console.error('Cannot delete the recipe because it is in use')
                        } else {
                            console.error("Error while deleting a recipe", error)
                            alert("Error while deleting recipe.")
                        }


                    }
                });
            } else {
                console.log('Recipe deletion cancelled')
            }
        })
    }

//FILTER FUNCTION
    filter(value: string) {
        if (value === 'basic') {
            console.log("Basic was selected");
            this.recipeService.searchRecipesByDifficulty('basic').subscribe({
                next: (response: Recipe[]) => {
                    if (response && response.length > 0) { // Check if response is not null and has elements
                        this.allRecipes = response;
                    } else {
                        alert("No recipes found for the selected difficulty.");
                    }
                },
                error: (err) => {
                    console.error('Error fetching recipes:', err);
                    // Optionally handle errors, such as network issues, here
                }
            });


        } else if (value === 'easy') {
            console.log("Easy was selected")
            this.recipeService.searchRecipesByDifficulty('Easy').subscribe({
                next: (response: Recipe []) => {
                    this.allRecipes = response;
                }
            })
        } else if (value === 'intermediate') {
            console.log("Intermediate was selected")
            this.recipeService.searchRecipesByDifficulty('Intermediate').subscribe({
                next: (response: Recipe []) => {
                    this.allRecipes = response;
                }
            })
        } else if (value === 'difficult') {
            console.log("Difficult was selected")
            this.recipeService.searchRecipesByDifficulty('Difficult').subscribe({
                next: (response: Recipe []) => {
                    this.allRecipes = response;
                }
            })
        } else if (value === 'cocktail') {
            console.log("Cocktail was selected")
            this.recipeService.searchRecipesByCuisine('Cocktail').subscribe({
                next: (response: Recipe []) => {
                    this.allRecipes = response;
                }
            })
        } else if (value === 'breakfast') {
            console.log("Breakfast was selected")
            this.recipeService.searchRecipesByCuisine('breakfast').subscribe({
                next: (response: Recipe []) => {
                    this.allRecipes = response;
                }
            })
        } else if (value === 'healthy') {
            console.log("Healthy was selected")
            this.recipeService.searchRecipesByCuisine('healthy').subscribe({
                next: (response: Recipe []) => {
                    this.allRecipes = response;
                }
            })
        } else if (value === 'asian') {
            console.log("Asian was selected")
            this.recipeService.searchRecipesByCuisine('asian').subscribe({
                next: (response: Recipe []) => {
                    this.allRecipes = response;
                }
            })
        } else if (value === 'dinner') {
            console.log("Dinner was selected")
            this.recipeService.searchRecipesByCuisine('dinner').subscribe({
                next: (response: Recipe []) => {
                    this.allRecipes = response;
                }
            })
        } else if (value === 'dessert') {
            console.log("Dessert was selected")
            this.recipeService.searchRecipesByCuisine('dessert').subscribe({
                next: (response: Recipe []) => {
                    this.allRecipes = response;
                }
            })
        }
    }

//clear the filter
    clear() {
        const radios = document.getElementsByName('filter');
        radios.forEach((radio) => {
            if (radio instanceof HTMLInputElement) { // Type assertion
                radio.checked = false;
            }
        });
        this.recipeService.getAllRecipes().subscribe({
            next: (response: Recipe []) => {
                this.allRecipes = response
            }
        })
    }

// FAVOURITES
//   checking if a recipe is already in favourites to style the html element
    favouriteRecipeCheck(recipeId: number): boolean {
        return this.favouriteRecipes.some(favRecipe => favRecipe.recipeId === recipeId);
    }

// add and remove function depending on the checking of the input element in html - moved to service for ease of use
    onCheckboxChange(event: any, recipeId: number) {
        if (event.target.checked) {
            this.favouritesService.addToFavourites(this.activeUser.userId, recipeId)
        } else {
            this.favouritesService.removeFromFavourites(this.activeUser.userId, recipeId)
        }
    }

    sortByTitle(): void {
        if (this.isSortedAlphabetically) {
            // Sort ascending
            this.allRecipes.sort((a, b) => a.title.localeCompare(b.title));
        } else {
            // Sort descending
            this.allRecipes.sort((a, b) => b.title.localeCompare(a.title));
        }
        // Toggle the sort order for next click
        this.isSortedAlphabetically = !this.isSortedAlphabetically;
    }

    sortByType() {
        if (this.isSortedByType) {
            // Sort ascending
            this.allRecipes.sort((a, b) => a.cuisine.localeCompare(b.cuisine));
        } else {
            // Sort descending
            this.allRecipes.sort((a, b) => b.cuisine.localeCompare(a.cuisine));
        }
        // Toggle the sort order for next click
        this.isSortedByType = !this.isSortedByType
    }

    sortByDifficulty() {
        if (this.isSortedByDifficulty) {
            // Sort ascending
            this.allRecipes.sort((a, b) => a.difficulty.localeCompare(b.difficulty));
        } else {
            // Sort descending
            this.allRecipes.sort((a, b) => b.difficulty.localeCompare(a.difficulty));
        }
        // Toggle the sort order for next click
        this.isSortedByDifficulty = !this.isSortedByDifficulty
    }
}
