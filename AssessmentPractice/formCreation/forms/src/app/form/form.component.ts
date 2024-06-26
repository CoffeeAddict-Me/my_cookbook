import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrl: './form.component.scss'
})
export class FormComponent {
    inputForm: FormGroup = new FormGroup({})
    userName: string = ""
    email: string = ""
    message: string = ""

    constructor(
        private fb: FormBuilder
    ) {
        this.inputForm = fb.group({
            userName: ["", [Validators.required]],
            email: ["", [Validators.required, Validators.email]],
            message: ["", [Validators.required, Validators.pattern(/^[A-Za-z .,!?':-;1-9]/)]]
        })
    }

    proceed() {
        if (this.inputForm.valid) {
            this.userName = this.inputForm.value.userName
            this.email = this.inputForm.value.email
            this.message = this.inputForm.value.message
        } else {
            alert("Form is not valid")
        }
    }
}
