import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-green-big-button', // Component selector
    templateUrl: './green-big-button.component.html', // Path to component template
    styleUrl: './green-big-button.component.scss' // Path to component styles
})
export class GreenBigButtonComponent implements OnInit {
    @Input() typeButtonText?: string; // Input property for button text

    @Output() buttonOutput: EventEmitter<boolean> = new EventEmitter<boolean>(); // Output property to emit events

    // Method to handle button press
    buttonWasPressed() {
        this.buttonOutput.emit(); // Emit event when button is pressed
    }

    // Lifecycle hook to initialize component
    ngOnInit() {
        this.typeButtonText = this.typeButtonText ? this.typeButtonText : `no name`; // Set default button text if not provided
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
