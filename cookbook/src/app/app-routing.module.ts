import {NgModule} from '@angular/core'; // Import NgModule from Angular core
import {RouterModule, Routes} from '@angular/router'; // Import RouterModule and Routes from Angular router
import {LandingPageComponent} from "./components/landing-page/landing-page.component"; // Import LandingPageComponent
import {LoginFormComponent} from "./components/login-form/login-form.component"; // Import LoginFormComponent
import {SignupFormComponent} from "./components/signup-form/signup-form.component"; // Import SignupFormComponent
import {HomePageComponent} from "./components/home-page/home-page.component"; // Import HomePageComponent
import {ListPageComponent} from "./components/list-page/list-page.component"; // Import ListPageComponent
import {NotfoundPageComponent} from "./components/notfound-page/notfound-page.component"; // Import NotfoundPageComponent
import {AboutPageComponent} from "./components/about-page/about-page.component"; // Import AboutPageComponent
import {AccountPageComponent} from "./components/account-page/account-page.component"; // Import AccountPageComponent
import {FavouritePageComponent} from "./components/favourite-page/favourite-page.component"; // Import FavouritePageComponent
import {AuthService} from "./services/services/auth.service"; // Import AuthService

const routes: Routes = [ // Define routes
    {path: '', redirectTo: 'landing', pathMatch: 'full'}, // Redirect root path to 'landing'
    {path: 'landing', component: LandingPageComponent}, // Route for LandingPageComponent
    {path: 'login', component: LoginFormComponent}, // Route for LoginFormComponent
    {path: 'signup', component: SignupFormComponent}, // Route for SignupFormComponent
    {path: 'home', component: HomePageComponent, canActivate: [AuthService]}, // Route for HomePageComponent with AuthService guard
    {path: 'list', component: ListPageComponent, canActivate: [AuthService]}, // Route for ListPageComponent with AuthService guard
    {path: 'lost', component: NotfoundPageComponent}, // Route for NotfoundPageComponent
    {path: 'about', component: AboutPageComponent, canActivate: [AuthService]}, // Route for AboutPageComponent with AuthService guard
    {path: 'account', component: AccountPageComponent, canActivate: [AuthService]}, // Route for AccountPageComponent with AuthService guard
    {path: 'fave', component: FavouritePageComponent, canActivate: [AuthService]}, // Route for FavouritePageComponent with AuthService guard
    {path: '**', redirectTo: 'lost'} // Wildcard route redirects to 'lost'
];

@NgModule({
    imports: [RouterModule.forRoot(routes)], // Import RouterModule and apply routes
    exports: [RouterModule] // Export RouterModule
})
export class AppRoutingModule {}
