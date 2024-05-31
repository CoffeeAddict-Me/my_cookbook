import {Injectable} from '@angular/core'; // Import Injectable from Angular core
import {NewuserService} from "./newuser.service"; // Import NewuserService
import {RecipeService} from "./recipe.service"; // Import RecipeService

@Injectable({
    providedIn: 'root' // Provide this service at the root level
})
export class FavouritesService {

    constructor(
        private recipeService: RecipeService, // Inject RecipeService
        private newUserService: NewuserService, // Inject NewuserService
    ) {}

    addToFavourites(userId: number, recipeId: number) { // Method to add a recipe to favourites
        this.newUserService.addRecipeToFavourites(userId, recipeId).subscribe({ // Call addRecipeToFavourites method from NewuserService
            next: () => { // Handle successful response
                console.log('Recipe added to favorites'); // Log success message
            },
            error: (err) => console.error('Error adding recipe to favorites', err) // Handle error response
        });
    }

    removeFromFavourites(userId: number, recipeId: number) { // Method to remove a recipe from favourites
        this.newUserService.removeRecipeFromFavourites(userId, recipeId).subscribe({ // Call removeRecipeFromFavourites method from NewuserService
            next: () => { // Handle successful response
                console.log('Recipe removed from favorites'); // Log success message
            },
            error: (err) => console.error('Error removing recipe from favorites', err) // Handle error response
        });
    }
}
