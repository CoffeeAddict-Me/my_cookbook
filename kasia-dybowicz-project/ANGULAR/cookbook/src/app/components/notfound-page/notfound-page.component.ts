import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-notfound-page',
    templateUrl: './notfound-page.component.html',
    styleUrl: './notfound-page.component.scss'
})
export class NotfoundPageComponent {
    constructor(private veryLostRouter: Router) {
    }

    goHome() {
        this.veryLostRouter.navigate(['/home'])

    }

}
