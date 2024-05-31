import {Component} from '@angular/core';
import {Router} from "@angular/router";


@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
    logintext: string = "LOG IN"
    signuptext: string = "SIGN UP"

    constructor(
        private readonly awesomeRouter: Router
    ) {
    }

    public loginClicked(): void {
        this.awesomeRouter.navigate(['/login'])
    };

    public signupClicked(): void {
        this.awesomeRouter.navigate(['/signup'])
    };

}
