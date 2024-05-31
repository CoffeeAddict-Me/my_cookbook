import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserDetails} from "../../services/models/user.model";
import {NewuserService} from "../../services/services/newuser.service";
import {Recipe} from "../../services/models/recipe.model";

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

//Initialize active user
    activeUser: UserDetails = {
        userId: 0,
        username: "",
        name: "",
        email: "",
        password: "",
        role: ""
    };
    favouriteRecipes: Recipe[] = [];
//formGroup for the form control of the login page form
    loginForm: FormGroup = new FormGroup({});
    //userDetails refer to type User or undefined
    loggedUser: UserDetails | undefined;
// need an output for the page to communicate, simple boolean
    @Output() totallyOutput = new EventEmitter<boolean>

    constructor(
        //created my own router because the page will need to redirect user once logged in
        private readonly awesomeRouter: Router,
        // need a formBuilder to create my form
        private fb: FormBuilder,
        private loginService: NewuserService, //adding the service I created with Rick and Morty
    ) {
    };

    // lifecycle initalisation  - will always execute

    ngOnInit() {
        this.loginForm = this.fb.group({
            //checking if the values input by the user are valid
            username: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/[a-zA-Z0-9]+$/)]],
            password: ['', [Validators.required, Validators.minLength(2)]],
        });
    }

//upon clicking of the button this function executes and user details are locally stored
    public login() {
        let username: string = this.loginForm.value.username;
        let password: string = this.loginForm.value.password;

        this.loginService.authenticateUser(username, password).subscribe({
            next: (response) => {
                // Success handling, proceed with login
                this.processLogin(username);
            },
            error: (error) => {
                // Error handling
                if (error.status === 401) {
                    // Specifically handle 401 Unauthorized
                    alert("Incorrect login or password"); // This should now properly show
                    console.log("Login failed with status 401: Incorrect login or password");
                } else {
                    // General error handling
                    console.error("Login error:", error);
                    alert("Login failed, please try again.");
                }
            }
        });
    }

    private processLogin(username: string) {
        this.loginService.findUserByUsername(username).subscribe({
            next: (response: UserDetails) => {
                sessionStorage.setItem('activeUser', JSON.stringify(response));
                this.activeUser = response;
                this.loginService.getAllFavouriteRecipesByUserId(response.userId).subscribe({
                    next: (favourites: Recipe[]) => {
                        this.favouriteRecipes = favourites;
                        sessionStorage.setItem('favourites', JSON.stringify(favourites));
                        this.awesomeRouter.navigate(['/home']);
                    }
                });
            }
        });
    }
}
