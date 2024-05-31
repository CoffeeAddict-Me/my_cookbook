import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Recipe} from "../models/recipe.model";
import {UserDetails} from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class NewuserService {
    activeUser: UserDetails | undefined;


    private userApiUrl = 'http://localhost:8080/users';
    private favouritesUrl = 'http://localhost:8080/favourites'


    setUser(user: UserDetails | undefined): void {
        this.activeUser = user;
        sessionStorage.setItem("activeUser", JSON.stringify(this.activeUser))
    }

    constructor(private http: HttpClient) {
    };

    getallUsers(): Observable<UserDetails[]> {
        return this.http.get<UserDetails[]>(`${this.userApiUrl}/all`);
    }


    getCurrentUser(): Observable<UserDetails> {
        return new Observable((subscriber) => {
            const userJson = sessionStorage.getItem('activeUser');
            if (userJson) {
                try {
                    const user: UserDetails = JSON.parse(userJson);
                    subscriber.next(user);
                } catch (error) {
                    subscriber.error('Error parsing user data');
                }
            } else {
                subscriber.next(undefined); // or subscriber.error('No active user');
            }
            subscriber.complete();
        });
    }


    findUserByUsername(username: string): Observable<UserDetails> {
        return this.http.get<UserDetails>(`${this.userApiUrl}/username/${username}`)
    }

    findUserByEmail(email: string): Observable<UserDetails> {
        return this.http.get<UserDetails>(`${this.userApiUrl}/email/${email}`)
    }

    addUser(user: UserDetails): Observable<UserDetails> {
        // sessionStorage.setItem("activeUser", JSON.stringify(this.activeUser))
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.post<UserDetails>(`${this.userApiUrl}/add`, JSON.stringify(user), {headers: headers});
    }

    updateUser(userId: number, user: UserDetails): Observable<UserDetails> {
        return this.http.put<UserDetails>(`${this.userApiUrl}/update/${userId}`, user).pipe(
            tap(updatedUser => {
                // Update activeUser and session storage if the updated user is the active user
                if (this.activeUser && this.activeUser.userId === updatedUser.userId) {
                    this.setUser(updatedUser);
                }
            })
        );
    }

    deleteUser(userId: number): Observable<void> {
        return this.http.delete<void>(`${this.userApiUrl}/delete/${userId}`)
    }

    addRecipeToFavourites(userId: number, recipeId: number): Observable<void> {

        const params = new HttpParams()
            .set('id', userId.toString())
            .set('recipeId', recipeId.toString());

        return this.http.post<void>(`${this.favouritesUrl}/add`, null, {params});
    }


    getAllFavouriteRecipesByUserId(userId: number): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${this.favouritesUrl}/all?userId=${userId}`);
    }

    removeRecipeFromFavourites(userId: number, recipeId: number): Observable<any> {
        const params = new HttpParams()
            .set('userId', userId.toString())
            .set('recipeId', recipeId.toString());

        return this.http.post(`${this.favouritesUrl}/remove`, null, {params});
    }

    removeAllFavouriteRecipesByUserId(userId: number): Observable<void> {
        return this.http.delete<void>(`${this.favouritesUrl}/clear/${userId}`);
    }


    checkForExistingUser(username: string): Observable<string> {
        return this.http.get<string>(`${this.userApiUrl}/check/${username}`, {responseType: 'text' as 'json'})
    }


    authenticateUser(username: string, password: string): Observable<HttpResponse<any>> {
        const credentials = new HttpParams()
            .set('username', username)
            .set('password', password);
        return this.http.post(`${this.userApiUrl}/authenticate`, credentials, {observe: 'response'});
    }

}
