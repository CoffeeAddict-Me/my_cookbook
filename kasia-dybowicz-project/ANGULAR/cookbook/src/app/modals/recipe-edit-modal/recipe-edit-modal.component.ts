import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
    selector: 'app-recipe-edit-modal',
    templateUrl: './recipe-edit-modal.component.html',
    styleUrl: './recipe-edit-modal.component.scss'
})
export class RecipeEditModalComponent {
    recipe: any;
    title: string;
    method: string;
    ing: string;
    photoUrl: string;
    cuisine: string;
    difficulty: string;
    recipeId: number;

    editForm: FormGroup = new FormGroup({});

    //I'm adding breaks so the text displays nicely in text area
    ingDisplay: string = ""
    metDisplay: string = ""

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<RecipeEditModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        // this.recipe = data.recipe;
        this.recipeId = data.recipeId;
        console.log("received recipe into child", data.recipeId)
        this.ing = data.ingredient;
        this.method = data.method;
        this.title = data.title;
        this.photoUrl = data.photoUrl;
        this.cuisine = data.cuisine;
        this.difficulty = data.difficulty;
        console.log("Method " + this.method + " " + typeof (this.method))
        console.log("Ings " + this.ing + " " + typeof (this.ing))

        console.log("id " + this.recipeId + " " + typeof (this.recipeId))
        this.metDisplay = this.method.replaceAll(";", "\n");
        this.ingDisplay = this.ing.replaceAll(";", "\n");

        this.editForm = this.fb.group({
            recipeId: this.recipeId,
            title: [this.title, [Validators.required]],
            ingredient: [this.ingDisplay, [Validators.required]],
            method: [this.metDisplay, Validators.required],
            cuisine: [this.cuisine],
            difficulty: [this.difficulty],
            photoUrl: [this.photoUrl],
        });
    }

    editRecipe() {
        console.log("edit button was pressed")
        if (this.editForm.valid) {
            const formValues = this.editForm.value;
            console.log("Form values title " + formValues.title)
            console.log("Form values ingredient " + formValues.ingredient)
            console.log("Form values method " + formValues.method)
            console.log("Form values recipeId " + formValues.recipeId)
            console.log("Form values photoUrl " + formValues.photoUrl)
            console.log("Form values difficulty " + formValues.difficulty)
            console.log("Form values cuisine " + formValues.cuisine)
            let convertedIng = formValues.ingredient.replace(/\n/g, ";");
            let convertedMet = formValues.method.replace(/\n/g, ";");
            console.log("Ingredients " + convertedIng);
            formValues.method = convertedMet;
            formValues.ingredient = convertedIng;
            console.log("Form values " + formValues.ingredient + " " + formValues.title)
            console.log("Do I have id? " + formValues.recipeId)
            this.dialogRef.close(formValues);
        }
    }

    //need to combine the recipe methods and ing into strings separated by;
//I will be passing a string into the database
}
