import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserDetails} from "../../../services/models/user.model";
import {NavigationService} from "../../../services/services/navigation.service";

@Component({
    selector: 'app-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent implements OnInit {

    userName: string | null = '';
    userImage: string | null = '';
    activeUser: UserDetails = {
        userId: 0,
        username: "",
        name: "",
        email: "",
        password: "",
        role: ""
    };

    navigateService: NavigationService = new NavigationService();

    constructor(private router: Router,
    ) {
    }

    ngOnInit(): void {
        const userJson = sessionStorage.getItem('activeUser');
        if (userJson) {
            try {
                this.activeUser = JSON.parse(userJson);
            } catch (e) {
                console.error("Error parsing user JSON", e);
            }
        }
        this.userName = this.activeUser.name

        this.navigateService.buttonsFormatting()
    }

//logout function that clears the stored session and navigates to landing page
    logoutUser() {
        sessionStorage.clear();
        this.router.navigate(['/landing'])
    }

    //just some routing for the buttons
    navigateHome() {
        this.router.navigate(['/home'])
        this.userName = this.activeUser.name
    }

    navigateAbout() {
        this.router.navigate(['/about'])
        this.userName = this.activeUser.name
    }

    navigateFavourites() {
        this.router.navigate(['/fave'])
        this.userName = this.activeUser.name
    }

    navigateShoppingList() {
        this.router.navigate(['/list'])
        this.userName = this.activeUser.name
    }

    navigateSingUp() {
        this.router.navigate(['/add'])
        this.userName = this.activeUser.name
    }

    navigateAccount() {
        this.router.navigate(['/account']);
        this.userName = this.activeUser.name
    }

}
