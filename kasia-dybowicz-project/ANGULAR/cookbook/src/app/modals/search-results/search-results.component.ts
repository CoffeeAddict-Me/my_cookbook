import {Component, Inject} from '@angular/core';
import {Recipe} from "../../services/models/recipe.model";
import {RecipeDetailModalComponent} from "../recipe-detail-modal/recipe-detail-modal.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RecipeEditModalComponent} from "../recipe-edit-modal/recipe-edit-modal.component";
import {NewuserService} from "../../services/services/newuser.service";
import {UserDetails} from "../../services/models/user.model";
import {FavouritesService} from "../../services/services/favourites.service";


@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent {

    searchResults = this.data.searchResult;
    userId = 0;

    activeUser: UserDetails = {
        userId: 0,
        username: "",
        name: "",
        email: "",
        password: "",
        role: ""
    };

    recipe: Recipe = {
        recipeId: 0,
        title: "",
        ingredient: "",
        method: "",
        cuisine: "",
        difficulty: "",
        photoUrl: "",
    };

    splitIngredients: string[] = [];
    splitMethods: string[] = [];
    selectedRecipe?: Recipe;
    favouriteRecipes: Recipe[] = [];

    ngOnInit() {
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

    constructor(
        private newUserService: NewuserService,
        private favouritesService: FavouritesService,
        private dialog: MatDialog,
        public dialogRef: MatDialogRef<RecipeEditModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }


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
}
