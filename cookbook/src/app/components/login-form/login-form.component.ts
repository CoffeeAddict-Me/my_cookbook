import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserDetails } from "../../services/models/user.model";
import { NewuserService } from "../../services/services/newuser.service";
import { Recipe } from "../../services/models/recipe.model";

@Component({
    selector: 'app-login-form', // Component selector
    templateUrl: './login-form.component.html', // Path to component template
    styleUrl: './login-form.component.scss' // Path to component styles
})
export class LoginFormComponent {
    // Initialize active user
    activeUser: UserDetails = {
        userId: 0,
        username: "",
        name: "",
        email: "",
        password: "",
        role: ""
    };
    
    favouriteRecipes: Recipe[] = []; // Array to store favourite recipes

    // FormGroup for the login form
    loginForm: FormGroup = new FormGroup({});

    // UserDetails refer to type User or undefined
    loggedUser: UserDetails | undefined;

    // Output event emitter for communication, simple boolean
    @Output() totallyOutput = new EventEmitter<boolean>();

    constructor(
        // Router for navigation
        private readonly awesomeRouter: Router,
        // FormBuilder to create the form
        private fb: FormBuilder,
        private loginService: NewuserService, // Service for user authentication and data retrieval
    ) {}

    // Lifecycle initialization - will always execute
    ngOnInit() {
        // Initialize the login form with validators
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/[a-zA-Z0-9]+$/)]],
            password: ['', [Validators.required, Validators.minLength(2)]],
        });
    }

    // Function to handle login when the button is clicked
    public login() {
        let username: string = this.loginForm.value.username;
        let password: string = this.loginForm.value.password;

        // Authenticate user with the provided username and password
        this.loginService.authenticateUser(username, password).subscribe({
            next: (response) => {
                // Success handling, proceed with login
                this.processLogin(username);
            },
            error: (error) => {
                // Error handling
                if (error.status === 401) {
                    // Specifically handle 401 Unauthorized
                    alert("Incorrect login or password");
                    console.log("Login failed with status 401: Incorrect login or password");
                } else {
                    // General error handling
                    console.error("Login error:", error);
                    alert("Login failed, please try again.");
                }
            }
        });
    }

    // Private function to process the login and retrieve user details and favourites
    private processLogin(username: string) {
        // Find user by username
        this.loginService.findUserByUsername(username).subscribe({
            next: (response: UserDetails) => {
                // Store user details in session storage
                sessionStorage.setItem('activeUser', JSON.stringify(response));
                this.activeUser = response;

                // Get all favourite recipes for the user
                this.loginService.getAllFavouriteRecipesByUserId(response.userId).subscribe({
                    next: (favourites: Recipe[]) => {
                        this.favouriteRecipes = favourites;
                        // Store favourite recipes in session storage
                        sessionStorage.setItem('favourites', JSON.stringify(favourites));
                        // Navigate to the home page
                        this.awesomeRouter.navigate(['/home']);
                    }
                });
            }
        });
    }
}
