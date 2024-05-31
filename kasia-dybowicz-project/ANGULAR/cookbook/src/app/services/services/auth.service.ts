import {Injectable} from '@angular/core';
import {firstValueFrom} from "rxjs";
import {UserDetails} from "../models/user.model";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import {NewuserService} from "./newuser.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService implements CanActivate {
    constructor(private newUserService: NewuserService, private router: Router) {
    }

    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean | UrlTree> {
        try {
            const activeUser: UserDetails = await firstValueFrom(this.newUserService.getCurrentUser());

            // Redirects to another route if currentUser is not available
            if (!activeUser) {
                // If there's no active user, redirect to the login or landing page
                this.router.navigate(['/', 'landing']);
                return false; // Prevent navigation to the initially requested route
            }
// Allow the navigation if there's an active user
            return true;
        } catch (error) {
            console.error('Error fetching currentUser', error);
            this.router.navigate(['/', 'landing']);
            return false;
        }
    }
}
