import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-form',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  generatedUsername: string = "username";
  inputForm: FormGroup = new FormGroup({});
  randomNum = 0;
  symbols: string[] = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '?', '+', '~'];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(){
    this.inputForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/[a-zA-Z]+$/)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/[a-zA-Z]+$/)]],
      addSymbol: [false]
    })
  }

  formSubmitted() {
    const first = this.inputForm.value.firstName.toLowerCase();
    const last = this.inputForm.value.lastName.toLowerCase();
    this.randomNum = Math.floor(Math.random() * 9) + 1
    let username = `${first}_${last}_${this.randomNum}`

    if (this.inputForm.value.addSymbol) {
      const randomSymbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
      username += randomSymbol;
    }

    this.generatedUsername = username
  }

}
