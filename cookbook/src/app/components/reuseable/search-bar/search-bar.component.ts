import {Component} from '@angular/core'; // Import Component from Angular core
import {MatDialog} from "@angular/material/dialog"; // Import MatDialog from Angular Material
import {HttpErrorResponse} from "@angular/common/http"; // Import HttpErrorResponse from Angular common HTTP
import {Recipe} from "../../../services/models/recipe.model"; // Import Recipe model
import {RecipeAddModalComponent} from "../../../modals/recipe-add-modal/recipe-add-modal.component"; // Import RecipeAddModalComponent
import {FormBuilder, FormGroup, Validators} from "@angular/forms"; // Import FormBuilder, FormGroup, and Validators from Angular forms
import {SearchResultsComponent} from "../../../modals/search-results/search-results.component"; // Import SearchResultsComponent
import {UserDetails} from "../../../services/models/user.model"; // Import UserDetails model
import {RecipeService} from "../../../services/services/recipe.service"; // Import RecipeService

@Component({
    selector: 'app-search-bar', // Define the selector for the component
    templateUrl: './search-bar.component.html', // Define the template URL
    styleUrl: './search-bar.component.scss' // Define the style URL
})
export class SearchBarComponent {

    addRecipeText = "Add recipe" // Initialize addRecipeText
    title: string = ""; // Initialize title

    recipe: Recipe = { // Initialize recipe with default values
        recipeId: 0,
        title: "",
        ingredient: "",
        method: "",
        cuisine: "",
        difficulty: "",
        photoUrl: "",
    }

    activeUser: UserDetails = { // Initialize activeUser with default values
        userId: 0,
        username: "",
        name: "",
        email: "",
        password: "",
        role: ""
    };

    searchForm: FormGroup = new FormGroup({}); // Initialize searchForm as an empty FormGroup
    searchResult: Recipe[] = []; // Initialize searchResult as an empty array

    constructor(
        private fb: FormBuilder, // Inject FormBuilder into the component
        private recipeService: RecipeService, // Inject RecipeService into the component
        private dialog: MatDialog, // Inject MatDialog into the component
    ) {
        this.searchForm = this.fb.group({ // Initialize searchForm with FormBuilder
            title: ['', [Validators.required, Validators.minLength(3)]] // Define title field with validators
        })
    }

    ngOnInit() { // Lifecycle hook for initialization
        const userJson = sessionStorage.getItem('activeUser'); // Get activeUser from sessionStorage
        if (userJson) { // Check if userJson exists
            try {
                this.activeUser = JSON.parse(userJson); // Parse userJson and assign to activeUser
            } catch (e) {
                console.error("Error parsing user JSON", e); // Log error if parsing fails
            }
        }
    }

    searchTitle() { // Method to search recipes by title
        console.log("search in was pressed") // Log search action
        this.title = this.searchForm.value.title.trim() // Get and trim title from searchForm
        console.log(this.title) // Log title
        console.log(typeof (this.title)) // Log type of title

        this.recipeService.searchRecipesByTitleContaining(this.title).subscribe({ // Call searchRecipesByTitleContaining method from RecipeService
            next: (searchResponse: Recipe[]) => { // Handle successful response
                this.searchResult = searchResponse; // Assign searchResponse to searchResult
                console.log("received from the back end search results: " + searchResponse) // Log search results

                let dialogRef = this.dialog.open(SearchResultsComponent, { // Open SearchResultsComponent dialog
                    height: 'auto',
                    width: '100vw',
                    data: {
                        searchResult: this.searchResult // Pass searchResult to dialog
                    }
                })
                dialogRef.afterClosed().subscribe(result => { // Handle dialog close event
                    location.reload() // Reload page
                })
            },
            error: (err) => { // Handle error response
                console.error('Error fetching recipes:', err); // Log error
                alert("Recipe you were looking for was not found") // Show alert
            }
        })
    }

    searchIng() { // Method to search recipes by ingredient
        console.log("search in was pressed") // Log search action
        this.title = this.searchForm.value.title.trim() // Get and trim title from searchForm
        console.log(this.title) // Log title
        console.log(typeof (this.title)) // Log type of title

        this.recipeService.searchRecipesByIngredientContaining(this.title).subscribe({ // Call searchRecipesByIngredientContaining method from RecipeService
            next: (searchResponse: Recipe[]) => { // Handle successful response
                this.searchResult = searchResponse; // Assign searchResponse to searchResult
                console.log("received from the back end search results: " + searchResponse) // Log search results

                let dialogRef = this.dialog.open(SearchResultsComponent, { // Open SearchResultsComponent dialog
                    height: 'auto',
                    width: '80vw',
                    data: {
                        searchResult: this.searchResult // Pass searchResult to dialog
                    }
                })
                dialogRef.afterClosed().subscribe(result => { // Handle dialog close event
                    location.reload() // Reload page
                })
            },
            error: (err) => { // Handle error response
                console.error('Error fetching recipes:', err); // Log error
                alert("Recipe you were looking for was not found") // Show alert
            }
        })
    }

    addRecipe() { // Method to add a new recipe
        let dialogRef = this.dialog.open(RecipeAddModalComponent, { // Open RecipeAddModalComponent dialog
            height: 'auto',
            width: '100vw',
            data: {}
        })
        dialogRef.afterClosed().subscribe(result => { // Handle dialog close event

            if (result) { // Check if result exists
                this.recipeService.addRecipe(result).subscribe({ // Call addRecipe method from RecipeService
                    next: (response: Recipe) => { // Handle successful response
                        this.recipe = response; // Assign response to recipe
                        console.log("Response: " + response) // Log response
                        location.reload(); // Reload page
                    }, error: (error: HttpErrorResponse): void => { // Handle error response
                        alert(error.message); // Show alert with error message
                    }
                })
            } else { // If result does not exist
                console.log('Recipe addition cancelled'); // Log cancellation
            }
        })
    }

}
