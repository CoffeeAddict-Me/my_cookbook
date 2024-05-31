import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-list-form', // Component selector
    templateUrl: './list-form.component.html', // Path to component template
    styleUrl: './list-form.component.scss' // Path to component styles
})
export class ListFormComponent {
    buttonAdd: string = "ADD"; // Text for the add button
    stuffToAdd?: string; // Variable to store the item to be added

    @Output() awesomeOutput = new EventEmitter<string>(); // Output event emitter

    // Method to add stuff and emit the value
    addStuff(value: string | undefined) {
        if (this.stuffToAdd?.trim() !== '') { // Check if stuffToAdd is not empty or whitespace
            this.awesomeOutput.emit(this.stuffToAdd); // Emit the value to the parent component
            this.stuffToAdd = ''; // Clear the input field
        }
    }
}
