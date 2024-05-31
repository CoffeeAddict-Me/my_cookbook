import {Component, Inject} from '@angular/core'; // Import Component and Inject from Angular core
import {Recipe} from "../../services/models/recipe.model"; // Import Recipe model
import {RecipeDetailModalComponent} from "../recipe-detail-modal/recipe-detail-modal.component"; // Import RecipeDetailModalComponent
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog"; // Import MAT_DIALOG_DATA, MatDialog, and MatDialogRef from Angular Material dialog
import {RecipeEditModalComponent} from "../recipe-edit-modal/recipe-edit-modal.component"; // Import RecipeEditModalComponent
import {NewuserService} from "../../services/services/newuser.service"; // Import NewuserService
import {UserDetails} from "../../services/models/user.model"; // Import UserDetails model
import {FavouritesService} from "../../services/services/favourites.service"; // Import FavouritesService

@Component({
    selector: 'app-search-results', // Define the selector for the component
    templateUrl: './search-results.component.html', // Define the template URL
    styleUrl: './search-results.component.scss' // Define the style URL
})
export class SearchResultsComponent {

    searchResults = this.data.searchResult; // Initialize searchResults from data
    userId = 0; // Initialize userId

    activeUser: UserDetails = { // Initialize activeUser with default values
        userId: 0,
        username: "",
        name: "",
        email: "",
        password: "",
        role: ""
    };

    recipe: Recipe = { // Initialize recipe with default values
        recipeId: 0,
        title: "",
        ingredient: "",
        method: "",
        cuisine: "",
        difficulty: "",
        photoUrl: "",
    };

    splitIngredients: string[] = []; // Initialize splitIngredients as an empty array
    splitMethods: string[] = []; // Initialize splitMethods as an empty array
    selectedRecipe?: Recipe; // Initialize selectedRecipe as optional Recipe
    favouriteRecipes: Recipe[] = []; // Initialize favouriteRecipes as an empty array

    ngOnInit() { // Lifecycle hook for initialization
        const userJson = sessionStorage.getItem('activeUser'); // Get activeUser from sessionStorage
        if (userJson) { // Check if userJson exists
            try {
                this.activeUser = JSON.parse(userJson); // Parse userJson and assign to activeUser
            } catch (e) {
                console.error("Error parsing user JSON", e); // Log error if parsing fails
            }
        }
        this.userId = this.activeUser.userId; // Assign userId from activeUser
        console.log("this is my stored id " + this.activeUser.userId); // Log userId
        this.newUserService.getAllFavouriteRecipesByUserId(this.activeUser.userId).subscribe({ // Get all favourite recipes by userId
            next: (response: Recipe[]) => { // Handle successful response
                this.favouriteRecipes = response; // Assign response to favouriteRecipes
                this.favouriteRecipeCheck(this.recipe.recipeId); // Call favouriteRecipeCheck method
            }
        });
    }

    constructor(
        private newUserService: NewuserService, // Inject NewuserService into the component
        private favouritesService: FavouritesService, // Inject FavouritesService into the component
        private dialog: MatDialog, // Inject MatDialog into the component
        public dialogRef: MatDialogRef<RecipeEditModalComponent>, // Inject MatDialogRef into the component
        @Inject(MAT_DIALOG_DATA) public data: any // Inject MAT_DIALOG_DATA into the component
    ) {}

    onSelect(recipe: Recipe) { // Method to select a recipe
        this.selectedRecipe = recipe; // Assign selected recipe
        this.splitIngredients = recipe.ingredient.split(';').map(ingredient => ingredient.trim()); // Split and trim ingredients
        this.splitMethods = recipe.method.split(';').map(method => method.trim()); // Split and trim methods
        let dialogRef = this.dialog.open(RecipeDetailModalComponent, { // Open RecipeDetailModalComponent dialog
            height: 'auto',
            width: '100vw',
            data: {
                selectedRecipe: this.selectedRecipe, // Pass selectedRecipe to dialog
                splitIngredients: this.splitIngredients, // Pass splitIngredients to dialog
                splitMethods: this.splitMethods, // Pass splitMethods to dialog
                title: this.selectedRecipe.title, // Pass title to dialog
                photoUrl: this.selectedRecipe.photoUrl // Pass photoUrl to dialog
            }
        });
        console.log("selected recipe: " + this.selectedRecipe.title); // Log selected recipe title
    }

    favouriteRecipeCheck(recipeId: number): boolean { // Method to check if recipe is favourite
        return this.favouriteRecipes.some(favRecipe => favRecipe.recipeId === recipeId); // Return true if recipe is in favouriteRecipes
    }

    onCheckboxChange(event: any, recipeId: number) { // Method to handle checkbox change
        if (event.target.checked) { // Check if checkbox is checked
            this.favouritesService.addToFavourites(this.activeUser.userId, recipeId); // Add to favourites
        } else { // If checkbox is unchecked
            this.favouritesService.removeFromFavourites(this.activeUser.userId, recipeId); // Remove from favourites
        }
    }
}
