import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-online-form',
    templateUrl: './online-form.component.html',
    styleUrl: './online-form.component.scss'
})
export class OnlineFormComponent {
    fullName: string = "";
     age: number = 0;
    colour: string = "";
    hobby: string = "";
    suffix: string = "";
    dob: any;



    inputForm: FormGroup = new FormGroup({
        first: new FormControl("", [Validators.required]),
        last: new FormControl("", [Validators.required]),
        dob: new FormControl("", [Validators.required]),
        colour: new FormControl("", [Validators.required]),
        hobby: new FormControl("", [Validators.required])
    })

    clicked() {
        this.fullName = this.inputForm.value.first + " " + this.inputForm.value.last;
        this.colour = this.inputForm.value.colour;
        this.hobby = this.inputForm.value.hobby;
        this.age = this.calculateAge(this.inputForm.value.dob);
        this.dob = this.inputForm.value.dob;

        this.setColour()

    }

    calculateAge(dob: Date): number {
        const dobDate = new Date(dob)

        let timeDifference = Math.abs(Date.now() - dobDate.getTime());
        return Math.floor((timeDifference / (1000 * 3600 * 24)) / 365.25)
    }

    setColour() {
        const pageWrapper = document.getElementById('outDisplay');
        pageWrapper!.style.backgroundColor = this.colour;
    }

    dateSuffix(date: Date) {
        const dob: Date = new Date(date);
        const day: number = dob.getDate();

        if (day === 1 || day === 21 || day === 31) {
            this.suffix = 'st'
        } else if (day === 2 || day === 22) {
            this.suffix = 'nd'
        } else if (day === 3 || day === 23) {
            this.suffix = 'rd'
        } else {
            this.suffix = 'th'
        }

    }

}
