import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-blue-medium-button',
    templateUrl: './blue-medium-button.component.html',
    styleUrl: './blue-medium-button.component.scss'
})
export class BlueMediumButtonComponent implements OnInit {
    // Input property to receive the button text from parent component
    @Input() typeButtonText?: string;

    // Output property to emit events to parent component
    @Output() buttonOutput: EventEmitter<boolean> = new EventEmitter<boolean>();

    // Method to handle button press and emit event
    buttonWasPressed() {
        this.buttonOutput.emit(true);
    }

    // Lifecycle hook to initialize component data
    ngOnInit() {
        // Set default button text if not provided
        this.typeButtonText = this.typeButtonText ? this.typeButtonText : 'no name';
    }
}