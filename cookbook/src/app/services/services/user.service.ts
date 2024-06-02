import {Injectable} from '@angular/core';
import {UserDetails} from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    user: UserDetails | undefined;

    constructor() {
    }

    setUser(newUser: UserDetails | undefined): void {
        this.user = newUser;
    }
}
