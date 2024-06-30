import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DataService} from "../../assets/data.service";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  inputForm: any

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private dataService: DataService ) {
    this.inputForm = this.formBuilder.group<any>({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      favColour: ['', [Validators.required]],
      favHobby: ['', [Validators.required]]
    });
  }


  submitForm() {
    if(this.inputForm.valid) {
      this.dataService.setData(this.inputForm.value);
      this.router.navigate(['/output']);
    }
  }

}
