import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";
import {UserDetails} from "../../services/models/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NewuserService} from "../../services/services/newuser.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../modals/confirm-dialog/confirm-dialog.component";
import {RecipeService} from "../../services/services/recipe.service";

@Component({
    selector: 'app-account-page',
    templateUrl: './account-page.component.html',
    styleUrl: './account-page.component.scss'
})
export class AccountPageComponent {

    //strings for the HTML initialization
    inputName: string | null = ''
    inputUsername: string | null = ''
    inputEmail: string | null = ''
    blueButtonText = "Edit"

//Initialize active user
    activeUser: UserDetails = {
        userId: 0,
        username: "",
        name: "",
        email: "",
        password: "",
        role: ""
    };
//form group initialized
    editForm: FormGroup = new FormGroup({});
    editUserDetails = false;


    @Output() output = new EventEmitter<boolean>

    constructor(
        private recipeService: RecipeService,
        private router: Router,
        private fb: FormBuilder,
        private userService: NewuserService,
        private dialog: MatDialog
    ) {
    }

    ngOnInit() {
        const userJson = sessionStorage.getItem('activeUser');
        if (userJson) { // This checks for both null and empty string, but not explicitly for undefined
            try {
                this.activeUser = JSON.parse(userJson);
                this.formWithUserData();
            } catch (e) {
                console.error("Error parsing user JSON", e);
                // Handle error or initialize activeUser with a default state
            }
        }

        this.inputName = this.activeUser.name
        this.inputUsername = this.activeUser.username
        this.inputEmail = this.activeUser.email
    }

    //need to initialize the form with user data
    formWithUserData() {
        this.editForm = this.fb.group({
            name: [this.activeUser.name, [Validators.required, Validators.minLength(2)]],
            email: [this.activeUser.email, [Validators.required, Validators.email]],
        });
    }

    editPlease() {
        this.editUserDetails = true;
    }

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
            location.reload()
        } else {
            console.log('Form is not valid');
        }
    }

    deleteUser() {
        const dialogRef =
            this.dialog.open(ConfirmDialogComponent, {
                width: '300px',
                height: '500px'
            });

        dialogRef.afterClosed().subscribe(async (result) => {
            if (result) {

                this.clearRecipes()
                setTimeout(() => this.deletion(), 2000)


                // const step1 = () => {
                //   return new Promise<void>((resolve, reject) => {
                //     this.clearRecipes();
                //     resolve();
                //     reject(Error("There was an error clearing the recipes"));
                //   })
                // }
                // const step2 = () => {
                //   return new Promise<void>((resolve, reject) => {
                //     this.deletion();
                //     resolve();
                //     reject(Error("There was an error deleting the user"));
                //   })
                // }
                // const steps = async () => {
                //   try {
                //     await step1();
                //     await step2();
                //   } catch (error) {
                //     console.error("Error occurred while deleting user or recipes ", error )
                //   }
                // }
                //
                // steps()

            } else {
                console.log('User deletion cancelled');
            }
        });
    }

    clearRecipes() {
        this.userService.removeAllFavouriteRecipesByUserId(this.activeUser.userId).subscribe({
            next: (response) => {
                console.log("All favourites removed", response)
            }
        })
    }

    deletion() {
        this.userService.deleteUser(this.activeUser.userId).subscribe({
            next: (response) => {
                console.log('User deleted successfully', response);
                sessionStorage.clear();
                // boot deleted user to landing
                this.router.navigate(['/landing']);
            },
            error: (error) => {
                console.error('Failed to delete user', error);
                // Handle errors here
            }
        });
    }
}


