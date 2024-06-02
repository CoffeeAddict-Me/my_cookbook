import {Injectable} from '@angular/core'; // Import Injectable from Angular core
import {Router} from "@angular/router"; // Import Router from Angular router

@Injectable({
    providedIn: 'root' // Provide this service at the root level
})
export class NavigationService {

    constructor(
        private router: Router = new Router() // Inject Router
    ) {}

    buttonsFormatting() { // Method to format buttons based on the current URL
        if (this.router.url === '/home') { // Check if the current URL is '/home'
            var button = document.getElementById('homeId'); // Get the button by ID
            if (button !== null) // Check if the button is not null
                button.style.borderBottomColor = "#33c71b"; // Set the bottom border color
        }
        if (this.router.url === '/about') { // Check if the current URL is '/about'
            var button = document.getElementById('aboutId'); // Get the button by ID
            if (button !== null) // Check if the button is not null
                button.style.borderBottomColor = "#33c71b"; // Set the bottom border color
        }
        if (this.router.url === '/fave') { // Check if the current URL is '/fave'
            var button = document.getElementById('favouritesId'); // Get the button by ID
            if (button !== null) // Check if the button is not null
                button.style.borderBottomColor = "#33c71b"; // Set the bottom border color
        }
        if (this.router.url === '/list') { // Check if the current URL is '/list'
            var button = document.getElementById('shoppingId'); // Get the button by ID
            if (button !== null) // Check if the button is not null
                button.style.borderBottomColor = "#33c71b"; // Set the bottom border color
        }
        if (this.router.url === '/account') { // Check if the current URL is '/account'
            var button = document.getElementById('accountId'); // Get the button by ID
            if (button !== null) // Check if the button is not null
                button.style.borderBottomColor = "#33c71b"; // Set the bottom border color
        }
        if (this.router.url === '/add') { // Check if the current URL is '/add'
            var button = document.getElementById('addtId'); // Get the button by ID
            if (button !== null) // Check if the button is not null
                button.style.borderBottomColor = "#33c71b"; // Set the bottom border color
        }
    }
}
