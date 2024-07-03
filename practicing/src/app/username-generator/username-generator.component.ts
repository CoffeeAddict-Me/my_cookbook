import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-username-generator',
    templateUrl: './username-generator.component.html',
    styleUrl: './username-generator.component.scss'
})
export class UsernameGeneratorComponent {
    username: string = ""
    checked: boolean = false
    random: number = Math.floor(Math.random()*9 + 1)
    symbols: string[] = [
        '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '?', '+', '~'
    ]
    randomSymbol: string = ""

    inputForm: FormGroup = new FormGroup({
        first: new FormControl ("", [Validators.required]),
        last: new FormControl("", [Validators.required])
    })

    clicked() {
        if (!this.checked) {
            this.username = this.inputForm.value.first + "_"
                + this.inputForm.value.last + "_"
                + this.random
        } else {
            this.generateRandomSymbol()
            this.username = this.inputForm.value.first
                + "_" + this.inputForm.value.last + "_"
                + this.random + '_'
                + this.randomSymbol
        }
    }

    generateRandomSymbol(){
        let indx: number = Math.floor(Math.random()*this.symbols.length)
        console.log(indx)
        this.randomSymbol = this.symbols[indx];
        console.log(this.randomSymbol)
    }



}
