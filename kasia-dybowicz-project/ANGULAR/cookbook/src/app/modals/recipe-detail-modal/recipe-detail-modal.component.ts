import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {Recipe} from "../../services/models/recipe.model";
import {NewuserService} from "../../services/services/newuser.service";
import {FavouritesService} from "../../services/services/favourites.service";

@Component({
    selector: 'app-recipe-detail-modal',
    templateUrl: './recipe-detail-modal.component.html',
    styleUrl: './recipe-detail-modal.component.scss'
})
export class RecipeDetailModalComponent {
    recipe: Recipe = {
        recipeId: 0,
        title: "",
        ingredient: "",
        method: "",
        cuisine: "",
        difficulty: "",
        photoUrl: "",
    };

    title: any;
    method: any;
    ing: any;
    photoUrl: any;
    activeUser: any;
    printButton: string = "Print";

    constructor(@Inject(
                    MAT_DIALOG_DATA) public data: any,
                private newUserService: NewuserService,
                private favouritesService: FavouritesService,) {
        this.recipe = data.recipe;
        this.ing = data.splitIngredients;
        this.method = data.splitMethods;
        this.title = data.title;
        this.photoUrl = data.photoUrl;
        console.log(this.title);
        console.log(this.photoUrl)
        console.log("Ingredients " + Object.values(this.ing))

    }

    favouriteRecipeCheck(): boolean {
        return true
    }

    onCheckboxChange(event: any, recipeId: number) {
        if (event.target.checked) {
            this.favouritesService.addToFavourites(this.activeUser.userId, recipeId)
        } else {
            this.favouritesService.removeFromFavourites(this.activeUser.userId, recipeId)
        }
    }

    //print the recipe logic
    printRecipe() {
        //open new window and print window - because I know how to print a whole window
        let printWindow = window.open('', '_blank');
        // formatting of the details of the recipe
        let ingredientsPrint: string = this.ing.join('<br>')
        let methodsPrint: string = this.method.join('<br>')
        let titlePrint: string = this.title
        printWindow?.document.open();
        //mockup html for the printer so the printed page looks nice with css styling included
        printWindow?.document.write(`<html>
        <head>
          <title>${titlePrint}</title>
        </head>
        <body onload="window.print();">
          <h3 style="font-family: Poppins, sans-serif">${titlePrint}</h3>
          <h4 style="font-family: Poppins, sans-serif">Ingredients</h4>
          <div style="font-family: Poppins, sans-serif">${ingredientsPrint}</div>
          <h4 style="font-family: Poppins, sans-serif">Method</h4>
          <div style="font-family: Poppins, sans-serif">${methodsPrint}</div>
        </body>
      </html>`);
        printWindow?.document.close();

    }
}
