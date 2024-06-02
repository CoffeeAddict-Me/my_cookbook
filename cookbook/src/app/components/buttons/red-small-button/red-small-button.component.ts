import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-red-small-button', // Component selector
    templateUrl: './red-small-button.component.html', // Path to component template
    styleUrl: './red-small-button.component.scss' // Path to component styles
})
export class RedSmallButtonComponent implements OnInit {
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
