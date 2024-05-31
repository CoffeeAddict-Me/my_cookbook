import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-green-big-button',
    templateUrl: './green-big-button.component.html',
    styleUrl: './green-big-button.component.scss'
})
export class GreenBigButtonComponent implements OnInit {
    @Input() typeButtonText?: string;

    @Output() buttonOutput: EventEmitter<boolean> = new EventEmitter<boolean>();

    buttonWasPressed() {
        this.buttonOutput.emit();
    }

    ngOnInit() {
        this.typeButtonText = this.typeButtonText ? this.typeButtonText : `no name`
    }

}

// to use the button type as per the example below:
//   <app-green-big-button [typeButtonText]="signuptext" (buttonOutput)="signupClicked()" class ="signupButton"></app-green-big-button>
//   </div>
// where signup button is defined in ts as:
//signuptext:string = "SIGN UP"
//and (buttonOutput) links to a function/method that occurs while the button is clicked
//  public signupClicked(): void {
//     this.awesomeRouter.navigate(['/signup'])
//   };
