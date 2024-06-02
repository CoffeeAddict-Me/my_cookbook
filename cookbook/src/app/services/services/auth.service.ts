import {Injectable} from '@angular/core'; // Import Injectable from Angular core
import {firstValueFrom} from "rxjs"; // Import firstValueFrom from RxJS
import {UserDetails} from "../models/user.model"; // Import UserDetails model
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router"; // Import necessary modules from Angular router
import {NewuserService} from "./newuser.service"; // Import NewuserService

@Injectable({
    providedIn: 'root' // Provide this service at the root level
})
export class AuthService implements CanActivate { // Implement CanActivate interface
    constructor(private newUserService: NewuserService, private router: Router) {} // Inject NewuserService and Router

    async canActivate(
        route: ActivatedRouteSnapshot, // Activated route snapshot
        state: RouterStateSnapshot // Router state snapshot
    ): Promise<boolean | UrlTree> { // Return type can be boolean or UrlTree
        try {
            const activeUser: UserDetails = await firstValueFrom(this.newUserService.getCurrentUser()); // Get the current user

            if (!activeUser) { // Check if there is no active user
                this.router.navigate(['/', 'landing']); // Redirect to landing page
                return false; // Prevent navigation to the initially requested route
            }

            return true; // Allow navigation if there's an active user
        } catch (error) {
            console.error('Error fetching currentUser', error); // Log error
            this.router.navigate(['/', 'landing']); // Redirect to landing page
            return false; // Prevent navigation to the initially requested route
        }
    }
}
