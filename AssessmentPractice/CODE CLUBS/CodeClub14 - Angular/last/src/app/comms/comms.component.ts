import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Comm} from "../models/comment.model";

@Component({
  selector: 'app-comms',
  templateUrl: './comms.component.html',
  styleUrl: './comms.component.scss'
})
export class CommsComponent {

  inputForm: FormGroup;
  name: string = "";
  body: string = "";

  comment: Comm = {
    name: "",
    body: ""
  };

  allComments: Comm[] = [];

  constructor(private fb: FormBuilder) {
    this.inputForm = this.fb.group({
      name: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  clicked() {
    this.comment = this.inputForm.value;
    this.allComments.push(this.comment)
    sessionStorage.setItem('list', JSON.stringify(this.allComments))

  }

}
