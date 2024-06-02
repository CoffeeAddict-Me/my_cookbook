import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'app-notfound-page', // Component selector
    templateUrl: './notfound-page.component.html', // Path to component template
    styleUrl: './notfound-page.component.scss' // Path to component styles
})
export class NotfoundPageComponent {
    constructor(private veryLostRouter: Router) {} // Inject the router for navigation

    // Method to navigate to the home page
    goHome() {
        this.veryLostRouter.navigate(['/home']); // Navigate to the home page
    }
}