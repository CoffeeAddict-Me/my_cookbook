import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from "@angular/router";
import { UserDetails } from "../../services/models/user.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NewuserService } from "../../services/services/newuser.service";
import { HttpErrorResponse } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../../modals/confirm-dialog/confirm-dialog.component";
import { RecipeService } from "../../services/services/recipe.service";

@Component({
    selector: 'app-account-page',
    templateUrl: './account-page.component.html',
    styleUrl: './account-page.component.scss'
})
export class AccountPageComponent {

    // Strings for initializing HTML bindings
    inputName: string | null = ''
    inputUsername: string | null = ''
    inputEmail: string | null = ''
    blueButtonText = "Edit"

    // Initialize active user with default values
    activeUser: UserDetails = {
        userId: 0,
        username: "",
        name: "",
        email: "",
        password: "",
        role: ""
    };

    // Form group for editing user details
    editForm: FormGroup = new FormGroup({});
    editUserDetails = false;

    // Event emitter for outputting data
    @Output() output = new EventEmitter<boolean>;

    constructor(
        private recipeService: RecipeService,
        private router: Router,
        private fb: FormBuilder,
        private userService: NewuserService,
        private dialog: MatDialog
    ) {}

    // Lifecycle hook to initialize component data
    ngOnInit() {
        const userJson = sessionStorage.getItem('activeUser');
        if (userJson) { // Check for user data in session storage
            try {
                this.activeUser = JSON.parse(userJson);
                this.formWithUserData(); // Initialize form with user data
            } catch (e) {
                console.error("Error parsing user JSON", e);
                // Handle error or initialize activeUser with a default state
            }
        }

        this.inputName = this.activeUser.name;
        this.inputUsername = this.activeUser.username;
        this.inputEmail = this.activeUser.email;
    }

    // Initialize the form with user data
    formWithUserData() {
        this.editForm = this.fb.group({
            name: [this.activeUser.name, [Validators.required, Validators.minLength(2)]],
            email: [this.activeUser.email, [Validators.required, Validators.email]],
        });
    }

    // Method to enable edit mode
    editPlease() {
        this.editUserDetails = true;
    }

    // Method to handle user data update
    editUser() {
        if (this.editForm.valid) {
            // Update only the fields that can change
            const formValues = this.editForm.value;
            const updatedUser: UserDetails = {
                ...this.activeUser, // Spread existing user details
                // Override with new values from form
                name: formValues.name,
                email: formValues.email
            };

            // Call service to update user details
            this.userService.updateUser(this.activeUser.userId, updatedUser).subscribe({
                next: (response: UserDetails) => {
                    // Update session storage with new user details
                    sessionStorage.setItem('activeUser', JSON.stringify(response));
                    // Update activeUser with response
                    this.activeUser = response;
                    console.log(response);
                },
                error: (error: HttpErrorResponse): void => {
                    alert(error.message);
                }
            });
            location.reload(); // Reload the page to reflect changes
        } else {
            console.log('Form is not valid');
        }
    }

    // Method to handle user deletion
    deleteUser() {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            height: '500px'
        });

        dialogRef.afterClosed().subscribe(async (result) => {
            if (result) {
                // Clear user recipes before deletion
                this.clearRecipes();
                setTimeout(() => this.deletion(), 2000); // Delay to ensure recipes are cleared
            } else {
                console.log('User deletion cancelled');
            }
        });
    }

    // Method to clear user's favorite recipes
    clearRecipes() {
        this.userService.removeAllFavouriteRecipesByUserId(this.activeUser.userId).subscribe({
            next: (response) => {
                console.log("All favourites removed", response);
            }
        });
    }

    // Method to delete user
    deletion() {
        this.userService.deleteUser(this.activeUser.userId).subscribe({
            next: (response) => {
                console.log('User deleted successfully', response);
                sessionStorage.clear(); // Clear session storage
                // Navigate to landing page
                this.router.navigate(['/landing']);
            },
            error: (error) => {
                console.error('Failed to delete user', error);
                // Handle errors here
            }
        });
    }
}