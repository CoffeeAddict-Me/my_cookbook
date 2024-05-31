import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-blue-small-button', // Component selector
    templateUrl: './blue-small-button.component.html', // Path to component template
    styleUrl: './blue-small-button.component.scss' // Path to component styles
})
export class BlueSmallButtonComponent implements OnInit {
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