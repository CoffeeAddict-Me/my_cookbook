import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {Recipe} from "../../../services/models/recipe.model";
import {RecipeAddModalComponent} from "../../../modals/recipe-add-modal/recipe-add-modal.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SearchResultsComponent} from "../../../modals/search-results/search-results.component";
import {UserDetails} from "../../../services/models/user.model";
import {RecipeService} from "../../../services/services/recipe.service";

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {


    addRecipeText = "Add recipe"
    title: string = "";

    recipe: Recipe = {
        recipeId: 0,
        title: "",
        ingredient: "",
        method: "",
        cuisine: "",
        difficulty: "",
        photoUrl: "",
    }

    activeUser: UserDetails = {
        userId: 0,
        username: "",
        name: "",
        email: "",
        password: "",
        role: ""
    };

    searchForm: FormGroup = new FormGroup({});
    searchResult: Recipe[] = [];

    constructor(
        private fb: FormBuilder,
        private recipeService: RecipeService,
        private dialog: MatDialog,
    ) {
        this.searchForm = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(3)]]
        })
    }

    ngOnInit() {
        const userJson = sessionStorage.getItem('activeUser');
        if (userJson) { // This checks for both null and empty string, but not explicitly for undefined
            try {
                this.activeUser = JSON.parse(userJson);
            } catch (e) {
                console.error("Error parsing user JSON", e);
            }
        }
    }

    searchTitle() {
        console.log("search in was pressed")
        this.title = this.searchForm.value.title.trim()
        console.log(this.title)
        console.log(typeof (this.title))

        this.recipeService.searchRecipesByTitleContaining(this.title).subscribe({
            next: (searchResponse: Recipe[]) => {
                this.searchResult = searchResponse;
                console.log("received from the back end search results: " + searchResponse)

                let dialogRef = this.dialog.open(SearchResultsComponent, {
                    height: 'auto',
                    width: '100vw',
                    data: {
                        searchResult: this.searchResult
                    }
                })
                dialogRef.afterClosed().subscribe(result => {
                    location.reload()
                })
            },
            error: (err) => {
                console.error('Error fetching recipes:', err);
                alert("Recipe you were looking for was not found")
            }
        })

    }

    searchIng() {
        console.log("search in was pressed")
        this.title = this.searchForm.value.title.trim()
        console.log(this.title)
        console.log(typeof (this.title))

        this.recipeService.searchRecipesByIngredientContaining(this.title).subscribe({
            next: (searchResponse: Recipe[]) => {
                this.searchResult = searchResponse;
                console.log("received from the back end search results: " + searchResponse)

                let dialogRef = this.dialog.open(SearchResultsComponent, {
                    height: 'auto',
                    width: '80vw',
                    data: {
                        searchResult: this.searchResult
                    }
                })
                dialogRef.afterClosed().subscribe(result => {
                    location.reload()
                })
            },
            error: (err) => {
                console.error('Error fetching recipes:', err);
                alert("Recipe you were looking for was not found")
            }
        })

    }

    addRecipe() {
        let dialogRef = this.dialog.open(RecipeAddModalComponent, {
            height: 'auto',
            width: '100vw',
            data: {}
        })
        dialogRef.afterClosed().subscribe(result => {

            if (result) {
                this.recipeService.addRecipe(result).subscribe({
                    next: (response: Recipe) => {
                        this.recipe = response;
                        console.log("Response: " + response)
                        location.reload();
                    }, error: (error: HttpErrorResponse): void => {
                        alert(error.message);
                    }
                })
            } else {
                console.log('Recipe addition cancelled');
            }

        })
    }

}
