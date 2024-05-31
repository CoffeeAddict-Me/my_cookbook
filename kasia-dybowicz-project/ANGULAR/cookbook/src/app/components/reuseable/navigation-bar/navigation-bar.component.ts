import {Component, OnInit} from '@angular/core'; // Import Component and OnInit from Angular core
import {Router} from "@angular/router"; // Import Router from Angular router
import {UserDetails} from "../../../services/models/user.model"; // Import UserDetails model
import {NavigationService} from "../../../services/services/navigation.service"; // Import NavigationService

@Component({
    selector: 'app-navigation-bar', // Define the selector for the component
    templateUrl: './navigation-bar.component.html', // Define the template URL
    styleUrl: './navigation-bar.component.scss' // Define the style URL
})
export class NavigationBarComponent implements OnInit {

    userName: string | null = ''; // Define userName property
    userImage: string | null = ''; // Define userImage property
    activeUser: UserDetails = { // Initialize activeUser with default values
        userId: 0,
        username: "",
        name: "",
        email: "",
        password: "",
        role: ""
    };

    navigateService: NavigationService = new NavigationService(); // Initialize NavigationService

    constructor(private router: Router, // Inject Router into the component
    ) {
    }

    ngOnInit(): void { // Implement OnInit interface
        const userJson = sessionStorage.getItem('activeUser'); // Get activeUser from sessionStorage
        if (userJson) { // Check if userJson exists
            try {
                this.activeUser = JSON.parse(userJson); // Parse userJson and assign to activeUser
            } catch (e) {
                console.error("Error parsing user JSON", e); // Log error if parsing fails
            }
        }
        this.userName = this.activeUser.name // Set userName from activeUser

        this.navigateService.buttonsFormatting() // Call buttonsFormatting method from NavigationService
    }

    logoutUser() { // Method to log out user
        sessionStorage.clear(); // Clear sessionStorage
        this.router.navigate(['/landing']) // Navigate to landing page
    }

    navigateHome() { // Method to navigate to home page
        this.router.navigate(['/home']) // Navigate to home page
        this.userName = this.activeUser.name // Set userName from activeUser
    }

    navigateAbout() { // Method to navigate to about page
        this.router.navigate(['/about']) // Navigate to about page
        this.userName = this.activeUser.name // Set userName from activeUser
    }

    navigateFavourites() { // Method to navigate to favourites page
        this.router.navigate(['/fave']) // Navigate to favourites page
        this.userName = this.activeUser.name // Set userName from activeUser
    }

    navigateShoppingList() { // Method to navigate to shopping list page
        this.router.navigate(['/list']) // Navigate to shopping list page
        this.userName = this.activeUser.name // Set userName from activeUser
    }

    navigateSingUp() { // Method to navigate to sign-up page
        this.router.navigate(['/add']) // Navigate to sign-up page
        this.userName = this.activeUser.name // Set userName from activeUser
    }

    navigateAccount() { // Method to navigate to account page
        this.router.navigate(['/account']); // Navigate to account page
        this.userName = this.activeUser.name // Set userName from activeUser
    }

}
