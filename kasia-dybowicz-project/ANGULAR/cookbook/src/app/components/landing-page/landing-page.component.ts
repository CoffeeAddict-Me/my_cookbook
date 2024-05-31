import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'app-landing-page', // Component selector
    templateUrl: './landing-page.component.html', // Path to component template
    styleUrl: './landing-page.component.scss' // Path to component styles
})
export class LandingPageComponent {
    logintext: string = "LOG IN"; // Text for the login button
    signuptext: string = "SIGN UP"; // Text for the signup button

    constructor(
        private readonly awesomeRouter: Router // Inject the router for navigation
    ) {}

    // Method to handle login button click
    public loginClicked(): void {
        this.awesomeRouter.navigate(['/login']); // Navigate to the login page
    }

    // Method to handle signup button click
    public signupClicked(): void {
        this.awesomeRouter.navigate(['/signup']); // Navigate to the signup page
    }
}
