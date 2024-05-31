import {Component, Inject} from '@angular/core'; // Import Component and Inject from Angular core
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog"; // Import MAT_DIALOG_DATA and MatDialogRef from Angular Material dialog
import {FormBuilder, FormGroup, Validators} from "@angular/forms"; // Import FormBuilder, FormGroup, and Validators from Angular forms

@Component({
    selector: 'app-recipe-edit-modal', // Define the selector for the component
    templateUrl: './recipe-edit-modal.component.html', // Define the template URL
    styleUrl: './recipe-edit-modal.component.scss' // Define the style URL
})
export class RecipeEditModalComponent {
    recipe: any; // Initialize recipe as any type
    title: string; // Initialize title
    method: string; // Initialize method
    ing: string; // Initialize ing
    photoUrl: string; // Initialize photoUrl
    cuisine: string; // Initialize cuisine
    difficulty: string; // Initialize difficulty
    recipeId: number; // Initialize recipeId

    editForm: FormGroup = new FormGroup({}); // Initialize editForm as an empty FormGroup

    ingDisplay: string = ""; // Initialize ingDisplay
    metDisplay: string = ""; // Initialize metDisplay

    constructor(
        private fb: FormBuilder, // Inject FormBuilder into the component
        public dialogRef: MatDialogRef<RecipeEditModalComponent>, // Inject MatDialogRef into the component
        @Inject(MAT_DIALOG_DATA) public data: any // Inject MAT_DIALOG_DATA into the component
    ) {
        this.recipeId = data.recipeId; // Assign recipeId from data
        console.log("received recipe into child", data.recipeId); // Log recipeId
        this.ing = data.ingredient; // Assign ingredient from data
        this.method = data.method; // Assign method from data
        this.title = data.title; // Assign title from data
        this.photoUrl = data.photoUrl; // Assign photoUrl from data
        this.cuisine = data.cuisine; // Assign cuisine from data
        this.difficulty = data.difficulty; // Assign difficulty from data
        console.log("Method " + this.method + " " + typeof (this.method)); // Log method
        console.log("Ings " + this.ing + " " + typeof (this.ing)); // Log ingredients

        console.log("id " + this.recipeId + " " + typeof (this.recipeId)); // Log recipeId
        this.metDisplay = this.method.replaceAll(";", "\n"); // Replace semicolons with newlines in method
        this.ingDisplay = this.ing.replaceAll(";", "\n"); // Replace semicolons with newlines in ingredient

        this.editForm = this.fb.group({ // Initialize editForm with FormBuilder
            recipeId: this.recipeId, // Define recipeId field
            title: [this.title, [Validators.required]], // Define title field with validator
            ingredient: [this.ingDisplay, [Validators.required]], // Define ingredient field with validator
            method: [this.metDisplay, Validators.required], // Define method field with validator
            cuisine: [this.cuisine], // Define cuisine field
            difficulty: [this.difficulty], // Define difficulty field
            photoUrl: [this.photoUrl], // Define photoUrl field
        });
    }

    editRecipe() { // Method to edit recipe
        console.log("edit button was pressed"); // Log button press
        if (this.editForm.valid) { // Check if editForm is valid
            const formValues = this.editForm.value; // Get form values
            console.log("Form values title " + formValues.title); // Log title
            console.log("Form values ingredient " + formValues.ingredient); // Log ingredient
            console.log("Form values method " + formValues.method); // Log method
            console.log("Form values recipeId " + formValues.recipeId); // Log recipeId
            console.log("Form values photoUrl " + formValues.photoUrl); // Log photoUrl
            console.log("Form values difficulty " + formValues.difficulty); // Log difficulty
            console.log("Form values cuisine " + formValues.cuisine); // Log cuisine
            let convertedIng = formValues.ingredient.replace(/\n/g, ";"); // Replace newlines with semicolons in ingredient
            let convertedMet = formValues.method.replace(/\n/g, ";"); // Replace newlines with semicolons in method
            console.log("Ingredients " + convertedIng); // Log converted ingredient
            formValues.method = convertedMet; // Assign converted method back to formValues
            formValues.ingredient = convertedIng; // Assign converted ingredient back to formValues
            console.log("Form values " + formValues.ingredient + " " + formValues.title); // Log final ingredient and title
            console.log("Do I have id? " + formValues.recipeId); // Log final recipeId
            this.dialogRef.close(formValues); // Close dialog and pass formValues
        }
    }

    //need to combine the recipe methods and ing into strings separated by;
    //I will be passing a string into the database
}
