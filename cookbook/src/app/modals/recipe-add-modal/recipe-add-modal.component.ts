import {Component, Inject} from '@angular/core'; // Import Component and Inject from Angular core
import {FormBuilder, FormGroup, Validators} from "@angular/forms"; // Import FormBuilder, FormGroup, and Validators from Angular forms
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog"; // Import MAT_DIALOG_DATA and MatDialogRef from Angular Material dialog

@Component({
    selector: 'app-recipe-add-modal', // Define the selector for the component
    templateUrl: './recipe-add-modal.component.html', // Define the template URL
    styleUrl: './recipe-add-modal.component.scss' // Define the style URL
})
export class RecipeAddModalComponent {
    recipe: any; // Initialize recipe as any type
    title: string = ""; // Initialize title
    method: string = ""; // Initialize method
    ing: string = ""; // Initialize ing
    photoUrl: string = ""; // Initialize photoUrl
    cuisine: string = ""; // Initialize cuisine
    difficulty: string = ""; // Initialize difficulty
    recipeId: number = 0; // Initialize recipeId

    addForm: FormGroup = new FormGroup({}) // Initialize addForm as an empty FormGroup

    constructor(
        private fb: FormBuilder, // Inject FormBuilder into the component
        public dialogRef: MatDialogRef<RecipeAddModalComponent>, // Inject MatDialogRef into the component
        @Inject(MAT_DIALOG_DATA) public data: any // Inject MAT_DIALOG_DATA into the component
    ) {
        this.addForm = this.fb.group({ // Initialize addForm with FormBuilder
            recipeId: 0, // Define recipeId field
            title: ["", [Validators.required]], // Define title field with validator
            ingredient: ["", [Validators.required]], // Define ingredient field with validator
            method: ["", Validators.required], // Define method field with validator
            cuisine: [""], // Define cuisine field
            difficulty: [""], // Define difficulty field
            photoUrl: [""], // Define photoUrl field
        });
    }

    addRecipe() { // Method to add recipe
        console.log("Add button was pressed") // Log button press
        if (this.addForm.valid) { // Check if addForm is valid
            const formValues = this.addForm.value; // Get form values
            console.log("Form values title " + formValues.title) // Log title
            console.log("Form values ingredient " + formValues.ingredient) // Log ingredient
            console.log("Form values method " + formValues.method) // Log method
            console.log("Form values recipeId " + formValues.recipeId) // Log recipeId
            console.log("Form values photoUrl " + formValues.photoUrl) // Log photoUrl
            console.log("Form values difficulty " + formValues.difficulty) // Log difficulty
            console.log("Form values cuisine " + formValues.cuisine) // Log cuisine
            let convertedIng = formValues.ingredient.replace(/\n/g, ";"); // Replace newlines with semicolons in ingredient
            let convertedMet = formValues.method.replace(/\n/g, ";"); // Replace newlines with semicolons in method
            console.log("Ingredients " + convertedIng); // Log converted ingredient
            formValues.method = convertedMet; // Assign converted method back to formValues
            formValues.ingredient = convertedIng; // Assign converted ingredient back to formValues
            console.log("Form values " + formValues.ingredient + " " + formValues.title) // Log final ingredient and title
            console.log("Do I have id? " + formValues.recipeId) // Log final recipeId
            this.dialogRef.close(formValues); // Close dialog and pass formValues
        }
    }

}
