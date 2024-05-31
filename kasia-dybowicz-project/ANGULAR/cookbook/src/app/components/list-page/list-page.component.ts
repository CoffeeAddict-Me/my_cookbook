import {Component,} from '@angular/core';


@Component({
    selector: 'app-list-page',
    templateUrl: './list-page.component.html',
    styleUrl: './list-page.component.scss'
})
export class ListPageComponent {


    arrayOfStuff = ['']
    buttonGo: string = "GO!"
    buttonReset: string = "Reset"

    //pushing stuff to the array
    parentFunction(stuffToAdd: string) {
        this.arrayOfStuff.push(stuffToAdd);
    }

//print function after done adding the shopping list stuff
    doneAdding() {
// attempt at printing just a div I need rather than the whole window -unsuccessful this far

        let arrayContent = this.arrayOfStuff.join('<br>&#x25a2; '); // Converting array items into a string separated by line breaks
        let printWindow = window.open('', '_blank'); //opening a new window
        printWindow?.document.open();

        //providing how and what I want printed in the template
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
        printWindow?.document.close();
    }

// reset button that clears the array, so we can start a new list
    resetList() {
        this.arrayOfStuff = [];
    }

}
