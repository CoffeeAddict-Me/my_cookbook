import {Injectable} from '@angular/core'; // Import Injectable from Angular core
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http"; // Import necessary modules from Angular common HTTP
import {Observable, tap} from "rxjs"; // Import Observable and tap from RxJS
import {Recipe} from "../models/recipe.model"; // Import Recipe model
import {UserDetails} from "../models/user.model"; // Import UserDetails model

@Injectable({
    providedIn: 'root' // Provide this service at the root level
})
export class NewuserService {
    activeUser: UserDetails | undefined; // Initialize activeUser as undefined

    private userApiUrl = 'http://localhost:8080/users'; // Define API URL for users
    private favouritesUrl = 'http://localhost:8080/favourites'; // Define API URL for favourites

    setUser(user: UserDetails | undefined): void { // Method to set activeUser
        this.activeUser = user; // Assign user to activeUser
        sessionStorage.setItem("activeUser", JSON.stringify(this.activeUser)); // Store activeUser in sessionStorage
    }

    constructor(private http: HttpClient) {} // Inject HttpClient

    getallUsers(): Observable<UserDetails[]> { // Method to get all users
        return this.http.get<UserDetails[]>(`${this.userApiUrl}/all`); // Make GET request to user API
    }

    getCurrentUser(): Observable<UserDetails> { // Method to get current user
        return new Observable((subscriber) => { // Create new Observable
            const userJson = sessionStorage.getItem('activeUser'); // Get activeUser from sessionStorage
            if (userJson) { // Check if userJson exists
                try {
                    const user: UserDetails = JSON.parse(userJson); // Parse userJson
                    subscriber.next(user); // Emit user
                } catch (error) {
                    subscriber.error('Error parsing user data'); // Emit error
                }
            } else {
                subscriber.next(undefined); // Emit undefined if no active user
            }
            subscriber.complete(); // Complete the Observable
        });
    }

    findUserByUsername(username: string): Observable<UserDetails> { // Method to find user by username
        return this.http.get<UserDetails>(`${this.userApiUrl}/username/${username}`); // Make GET request to user API
    }

    findUserByEmail(email: string): Observable<UserDetails> { // Method to find user by email
        return this.http.get<UserDetails>(`${this.userApiUrl}/email/${email}`); // Make GET request to user API
    }

    addUser(user: UserDetails): Observable<UserDetails> { // Method to add a new user
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.post<UserDetails>(`${this.userApiUrl}/add`, JSON.stringify(user), {headers: headers}); // Make POST request to user API
    }

    updateUser(userId: number, user: UserDetails): Observable<UserDetails> { // Method to update user
        return this.http.put<UserDetails>(`${this.userApiUrl}/update/${userId}`, user).pipe( // Make PUT request to user API
            tap(updatedUser => { // Use tap to update activeUser if necessary
                if (this.activeUser && this.activeUser.userId === updatedUser.userId) { // Check if updated user is active user
                    this.setUser(updatedUser); // Update activeUser and sessionStorage
                }
            })
        );
    }

    deleteUser(userId: number): Observable<void> { // Method to delete user
        return this.http.delete<void>(`${this.userApiUrl}/delete/${userId}`); // Make DELETE request to user API
    }

    addRecipeToFavourites(userId: number, recipeId: number): Observable<void> { // Method to add recipe to favourites
        const params = new HttpParams()
            .set('id', userId.toString())
            .set('recipeId', recipeId.toString());
        return this.http.post<void>(`${this.favouritesUrl}/add`, null, {params}); // Make POST request to favourites API
    }

    getAllFavouriteRecipesByUserId(userId: number): Observable<Recipe[]> { // Method to get all favourite recipes by user ID
        return this.http.get<Recipe[]>(`${this.favouritesUrl}/all?userId=${userId}`); // Make GET request to favourites API
    }

    removeRecipeFromFavourites(userId: number, recipeId: number): Observable<any> { // Method to remove recipe from favourites
        const params = new HttpParams()
            .set('userId', userId.toString())
            .set('recipeId', recipeId.toString());
        return this.http.post(`${this.favouritesUrl}/remove`, null, {params}); // Make POST request to favourites API
    }

    removeAllFavouriteRecipesByUserId(userId: number): Observable<void> { // Method to remove all favourite recipes by user ID
        return this.http.delete<void>(`${this.favouritesUrl}/clear/${userId}`); // Make DELETE request to favourites API
    }

    checkForExistingUser(username: string): Observable<string> { // Method to check for existing user by username
        return this.http.get<string>(`${this.userApiUrl}/check/${username}`, {responseType: 'text' as 'json'}); // Make GET request to user API
    }

    authenticateUser(username: string, password: string): Observable<HttpResponse<any>> { // Method to authenticate user
        const credentials = new HttpParams()
            .set('username', username)
            .set('password', password);
        return this.http.post(`${this.userApiUrl}/authenticate`, credentials, {observe: 'response'}); // Make POST request to user API
    }
}
