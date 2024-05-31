import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserDetails} from "../../services/models/user.model";

import {HttpErrorResponse} from "@angular/common/http";
import {NewuserService} from "../../services/services/newuser.service";


@Component({
    selector: 'app-signup-form',
    templateUrl: './signup-form.component.html',
    styleUrl: './signup-form.component.scss'
})
export class SignupFormComponent {
    signupForm: FormGroup = new FormGroup({});
    userToAdd: UserDetails = {
        userId: 0,
        name: "",
        username: "",
        email: "",
        password: "",
        role: ""
    }

    constructor(
        private readonly awesomeRouter: Router,
        private fb: FormBuilder,
        private userService: NewuserService
    ) {
    };

    ngOnInit() {
        this.signupForm = this.fb.group({
            //checking if the values input by the user are valid
            username: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
            password: ['', [Validators.required, Validators.minLength(2)]],
            name: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z-. \s]+$/)]],
            email: ['', [Validators.required, Validators.email]],
            // image: [null, Validators.required]
        });
    }

    //add user function that checks if username exists and if not sends to the back end and navigates home upon completion
    addUser() {
        console.log(this.signupForm);
        this.userToAdd = this.signupForm.value;
        this.userService.checkForExistingUser(this.userToAdd.username).subscribe(exists => {
            if (exists === "Username already taken") {
                alert("Username already exists");
            } else {
                this.addUserDetails();
            }
        }, error => {
            console.error('Error checking username:', error);
            alert("Error checking username");
        });
    }

    addUserDetails() {
        this.userService.addUser(this.userToAdd).subscribe({
            next: (response: UserDetails) => {
                console.log(response);
                sessionStorage.setItem("activeUser", JSON.stringify(response));
                this.awesomeRouter.navigate(['/home']);
            },
            error: (error: HttpErrorResponse) => {
                alert(error.message);
            }
        });
    }

    //IF I WANT TO PROCEED WITH STORING IMAGES

// onFileSelect(event: Event): void {
//     const input = event.target as HTMLInputElement
//     if(input.files && input.files.length>0){
//       const file = input.files[0];
//       this.validateFile(file);
//     }
// }
//VALIDATION OF IMAGES, SHALL I PROCEED WITH THE IDEA
// invalidFileType: boolean = false;
//   fileTooLarge: boolean = false;
// validateFile(file: File){
//     const validTypes = ['image/jpeg', 'image/png'];
//     const maxSize = 2 * 1024 * 1024;
//     if(!validTypes.includes(file.type)){
//
//       //alert maybe here
//       this.invalidFileType = true;
//       console.log('Invalid file type');
//     } else if (file.size > maxSize) {
//       this.fileTooLarge = true;
//       console.log('File too big')
//     } else {
//       this.invalidFileType = false;
//       this.fileTooLarge = false;
//       this.signupForm.patchValue({
//         image: file
//       })
//     }
// }

}





