import {Component, Inject} from '@angular/core'; // Import Component and Inject from Angular core
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog"; // Import MAT_DIALOG_DATA and MatDialogRef from Angular Material dialog
import {MatDialog} from "@angular/material/dialog"; // Import MatDialog from Angular Material dialog
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component"; // Import ConfirmDialogComponent
import {Recipe} from "../../services/models/recipe.model"; // Import Recipe model
import {NewuserService} from "../../services/services/newuser.service"; // Import NewuserService
import {FavouritesService} from "../../services/services/favourites.service"; // Import FavouritesService

@Component({
    selector: 'app-recipe-detail-modal', // Define the selector for the component
    templateUrl: './recipe-detail-modal.component.html', // Define the template URL
    styleUrl: './recipe-detail-modal.component.scss' // Define the style URL
})
export class RecipeDetailModalComponent {
    recipe: Recipe = { // Initialize recipe with default values
        recipeId: 0,
        title: "",
        ingredient: "",
        method: "",
        cuisine: "",
        difficulty: "",
        photoUrl: "",
    };

    title: any; // Initialize title
    method: any; // Initialize method
    ing: any; // Initialize ing
    photoUrl: any; // Initialize photoUrl
    activeUser: any; // Initialize activeUser
    printButton: string = "Print"; // Initialize printButton

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, // Inject MAT_DIALOG_DATA into the component
                private newUserService: NewuserService, // Inject NewuserService into the component
                private favouritesService: FavouritesService) { // Inject FavouritesService into the component
        this.recipe = data.recipe; // Assign recipe from data
        this.ing = data.splitIngredients; // Assign splitIngredients from data
        this.method = data.splitMethods; // Assign splitMethods from data
        this.title = data.title; // Assign title from data
        this.photoUrl = data.photoUrl; // Assign photoUrl from data
        console.log(this.title); // Log title
        console.log(this.photoUrl); // Log photoUrl
        console.log("Ingredients " + Object.values(this.ing)); // Log ingredients
    }

    favouriteRecipeCheck(): boolean { // Method to check if recipe is favourite
        return true; // Return true
    }

    onCheckboxChange(event: any, recipeId: number) { // Method to handle checkbox change
        if (event.target.checked) { // Check if checkbox is checked
            this.favouritesService.addToFavourites(this.activeUser.userId, recipeId); // Add to favourites
        } else { // If checkbox is unchecked
            this.favouritesService.removeFromFavourites(this.activeUser.userId, recipeId); // Remove from favourites
        }
    }

    printRecipe() { // Method to print recipe
        let printWindow = window.open('', '_blank'); // Open new window
        let ingredientsPrint: string = this.ing.join('<br>'); // Join ingredients with line breaks
        let methodsPrint: string = this.method.join('<br>'); // Join methods with line breaks
        let titlePrint: string = this.title; // Assign title to titlePrint
        printWindow?.document.open(); // Open document in print window
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
      </html>`); // Write HTML content for printing
        printWindow?.document.close(); // Close document in print window
    }
}
