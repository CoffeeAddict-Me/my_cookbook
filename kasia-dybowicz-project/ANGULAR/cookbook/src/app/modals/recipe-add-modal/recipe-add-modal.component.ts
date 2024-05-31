import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-recipe-add-modal',
    templateUrl: './recipe-add-modal.component.html',
    styleUrl: './recipe-add-modal.component.scss'
})
export class RecipeAddModalComponent {
    recipe: any;
    title: string = "";
    method: string = "";
    ing: string = "";
    photoUrl: string = "";
    cuisine: string = "";
    difficulty: string = "";
    recipeId: number = 0;

    addForm: FormGroup = new FormGroup({})

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<RecipeAddModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.addForm = this.fb.group({
            recipeId: 0,
            title: ["", [Validators.required,]],
            ingredient: ["", [Validators.required,]],
            method: ["", Validators.required,],
            cuisine: [""],
            difficulty: [""],
            photoUrl: [""],

        });
    }

    addRecipe() {
        console.log("Add button was pressed")
        if (this.addForm.valid) {
            const formValues = this.addForm.value;
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

}
