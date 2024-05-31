import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {SignupFormComponent} from "./components/signup-form/signup-form.component";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {ListPageComponent} from "./components/list-page/list-page.component";
import {NotfoundPageComponent} from "./components/notfound-page/notfound-page.component";
import {AboutPageComponent} from "./components/about-page/about-page.component";
import {AccountPageComponent} from "./components/account-page/account-page.component";
import {FavouritePageComponent} from "./components/favourite-page/favourite-page.component";
import {AuthService} from "./services/services/auth.service";

const routes: Routes = [
    {path: '', redirectTo: 'landing', pathMatch: 'full'},
    {path: 'landing', component: LandingPageComponent},
    {path: 'login', component: LoginFormComponent},
    {path: 'signup', component: SignupFormComponent},
    {path: 'home', component: HomePageComponent, canActivate: [AuthService]},
    {path: 'list', component: ListPageComponent, canActivate: [AuthService]},
    {path: 'lost', component: NotfoundPageComponent},
    {path: 'about', component: AboutPageComponent, canActivate: [AuthService]},
    {path: 'account', component: AccountPageComponent, canActivate: [AuthService]},
    {path: 'fave', component: FavouritePageComponent, canActivate: [AuthService]},
    {path: '**', redirectTo: 'lost'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
