import { Component } from '@angular/core';

@Component({
    selector: 'app-list-page', // Component selector
    templateUrl: './list-page.component.html', // Path to component template
    styleUrl: './list-page.component.scss' // Path to component styles
})
export class ListPageComponent {
    arrayOfStuff = ['']; // Array to store the list items
    buttonGo: string = "GO!"; // Text for the "GO!" button
    buttonReset: string = "Reset"; // Text for the reset button

    // Method to add items to the array
    parentFunction(stuffToAdd: string) {
        this.arrayOfStuff.push(stuffToAdd); // Push the new item to the array
    }

    // Method to print the list
    doneAdding() {
        // Convert array items into a string separated by line breaks
        let arrayContent = this.arrayOfStuff.join('<br>&#x25a2; ');
        // Open a new window for printing
        let printWindow = window.open('', '_blank');
        printWindow?.document.open();

        // Provide HTML content for the print window
        printWindow?.document.write(`
          <html>
            <head>
              <title>Your shopping list</title>
            </head>
            <body onload="window.print();">
              <h3 style="font-family: Poppins, sans-serif">Your shopping list</h3>
              <div style="font-family: Poppins, sans-serif">${arrayContent}</div>
            </body>
          </html>
        `);
        printWindow?.document.close(); // Close the document stream
    }

    // Method to reset the list
    resetList() {
        this.arrayOfStuff = []; // Clear the array to start a new list
    }
}
