import {Component} from '@angular/core'; // Import Component from Angular core
import {FormBuilder, FormGroup, Validators} from "@angular/forms"; // Import FormBuilder, FormGroup, and Validators from Angular forms
import {Router} from "@angular/router"; // Import Router from Angular router
import {UserDetails} from "../../services/models/user.model"; // Import UserDetails model
import {HttpErrorResponse} from "@angular/common/http"; // Import HttpErrorResponse from Angular common HTTP
import {NewuserService} from "../../services/services/newuser.service"; // Import NewuserService

@Component({
    selector: 'app-signup-form', // Define the selector for the component
    templateUrl: './signup-form.component.html', // Define the template URL
    styleUrl: './signup-form.component.scss' // Define the style URL
})
export class SignupFormComponent {
    signupForm: FormGroup = new FormGroup({}); // Initialize signupForm as an empty FormGroup
    userToAdd: UserDetails = { // Initialize userToAdd with default values
        userId: 0,
        name: "",
        username: "",
        email: "",
        password: "",
        role: ""
    }

    constructor(
        private readonly awesomeRouter: Router, // Inject Router into the component
        private fb: FormBuilder, // Inject FormBuilder into the component
        private userService: NewuserService // Inject NewuserService into the component
    ) {
    };

    ngOnInit() { // Lifecycle hook for initialization
        this.signupForm = this.fb.group({ // Initialize signupForm with FormBuilder
            username: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z0-9]+$/)]], // Define username field with validators
            password: ['', [Validators.required, Validators.minLength(2)]], // Define password field with validators
            name: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z-. \s]+$/)]], // Define name field with validators
            email: ['', [Validators.required, Validators.email]], // Define email field with validators
            // image: [null, Validators.required] // Commented out image field
        });
    }

    addUser() { // Method to add user
        console.log(this.signupForm); // Log signupForm
        this.userToAdd = this.signupForm.value; // Assign form values to userToAdd
        this.userService.checkForExistingUser(this.userToAdd.username).subscribe(exists => { // Check if username exists
            if (exists === "Username already taken") { // If username exists
                alert("Username already exists"); // Show alert
            } else {
                this.addUserDetails(); // Call addUserDetails method
            }
        }, error => { // Handle error response
            console.error('Error checking username:', error); // Log error
            alert("Error checking username"); // Show alert
        });
    }

    addUserDetails() { // Method to add user details
        this.userService.addUser(this.userToAdd).subscribe({ // Call addUser method from userService
            next: (response: UserDetails) => { // Handle successful response
                console.log(response); // Log response
                sessionStorage.setItem("activeUser", JSON.stringify(response)); // Store activeUser in sessionStorage
                this.awesomeRouter.navigate(['/home']); // Navigate to home page
            },
            error: (error: HttpErrorResponse) => { // Handle error response
                alert(error.message); // Show alert with error message
            }
        });
    }

    // Uncomment this section if you want to proceed with storing images

    // onFileSelect(event: Event): void { // Method to handle file selection
    //     const input = event.target as HTMLInputElement; // Get input element from event
    //     if(input.files && input.files.length > 0){ // Check if files are selected
    //         const file = input.files[0]; // Get the selected file
    //         this.validateFile(file); // Call validateFile method
    //     }
    // }

    // Method to validate file type and size
    // validateFile(file: File){
    //     const validTypes = ['image/jpeg', 'image/png']; // Define valid file types
    //     const maxSize = 2 * 1024 * 1024; // Define maximum file size (2 MB)
    //     if(!validTypes.includes(file.type)){ // Check if file type is valid
    //         this.invalidFileType = true; // Set invalidFileType to true
    //         console.log('Invalid file type'); // Log invalid file type
    //     } else if (file.size > maxSize) { // Check if file size is within limit
    //         this.fileTooLarge = true; // Set fileTooLarge to true
    //         console.log('File too big'); // Log file too big
    //     } else { // If file is valid
    //         this.invalidFileType = false; // Set invalidFileType to false
    //         this.fileTooLarge = false; // Set fileTooLarge to false
    //         this.signupForm.patchValue({ // Patch file value to signupForm
    //             image: file
    //         })
    //     }
    // }
}
