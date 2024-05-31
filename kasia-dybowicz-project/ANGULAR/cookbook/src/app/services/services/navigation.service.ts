import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    constructor(
        private router: Router = new Router()
    ) {

    }

    buttonsFormatting() {
        if (this.router.url === '/home') {
            //grabbing a button depending on id - used id because they will be unique
            var button = document.getElementById('homeId')
            // just and if statement to check if the element is no null
            if (button !== null)
                //styling - a bottom border line (consistent with the rest of the design)
                button.style.borderBottomColor = "#33c71b"
        }
        if (this.router.url === '/about') {
            var button = document.getElementById('aboutId')
            if (button !== null)
                button.style.borderBottomColor = "#33c71b"
        }
        if (this.router.url === '/fave') {
            var button = document.getElementById('favouritesId')
            if (button !== null)
                button.style.borderBottomColor = "#33c71b"
        }
        if (this.router.url === '/list') {
            var button = document.getElementById('shoppingId')
            if (button !== null)
                button.style.borderBottomColor = "#33c71b"
        }
        if (this.router.url === '/account') {
            var button = document.getElementById('accountId')
            if (button !== null)
                button.style.borderBottomColor = "#33c71b"
        }
        if (this.router.url === '/add') {
            var button = document.getElementById('addtId')
            if (button !== null)
                button.style.borderBottomColor = "#33c71b"
        }
    }
}
