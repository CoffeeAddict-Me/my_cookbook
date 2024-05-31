import {Injectable} from '@angular/core';
import {NewuserService} from "./newuser.service";
import {RecipeService} from "./recipe.service";


@Injectable({
    providedIn: 'root'
})
export class FavouritesService {

    constructor(
        private recipeService: RecipeService,
        private newUserService: NewuserService,
    ) {
    }

    addToFavourites(userId: number, recipeId: number) {
        this.newUserService.addRecipeToFavourites(userId, recipeId).subscribe({
            next: () => {
                console.log('Recipe added to favorites');
            },
            error: (err) => console.error('Error adding recipe to favorites', err)
        });
    }

    removeFromFavourites(userId: number, recipeId: number) {
        this.newUserService.removeRecipeFromFavourites(userId, recipeId).subscribe({
            next: () => {
                console.log('Recipe removed from favorites');
            },
            error: (err) => console.error('Error removing recipe from favorites', err)
        });

    }
}
