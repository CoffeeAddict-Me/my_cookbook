import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {ListPageComponent} from './components/list-page/list-page.component';
import {NotfoundPageComponent} from './components/notfound-page/notfound-page.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {SignupFormComponent} from './components/signup-form/signup-form.component';
import {ListFormComponent} from './components/list-form/list-form.component';
import {NavigationBarComponent} from './components/reuseable/navigation-bar/navigation-bar.component';
import {SearchBarComponent} from './components/reuseable/search-bar/search-bar.component';
import {AboutPageComponent} from './components/about-page/about-page.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {RecipeWindowComponent} from './components/recipe-window/recipe-window.component';
import {AccountPageComponent} from './components/account-page/account-page.component';
import {NgOptimizedImage} from "@angular/common";
import {GreenBigButtonComponent} from './components/buttons/green-big-button/green-big-button.component';
import {GreenMediumButtonComponent} from './components/buttons/green-medium-button/green-medium-button.component';
import {GreenSmallButtonComponent} from './components/buttons/green-small-button/green-small-button.component';
import {RedSmallButtonComponent} from './components/buttons/red-small-button/red-small-button.component';
import {MatIconModule} from "@angular/material/icon";
import {BlueSmallButtonComponent} from './components/buttons/blue-small-button/blue-small-button.component';
import {BlueMediumButtonComponent} from './components/buttons/blue-medium-button/blue-medium-button.component';
import {FavouritePageComponent} from './components/favourite-page/favourite-page.component';
import {ConfirmDialogComponent} from './modals/confirm-dialog/confirm-dialog.component';
import {MatDialogActions, MatDialogContent} from "@angular/material/dialog";
import {MatDialogModule} from '@angular/material/dialog';
import {RecipeDetailModalComponent} from './modals/recipe-detail-modal/recipe-detail-modal.component';
import {RecipeEditModalComponent} from './modals/recipe-edit-modal/recipe-edit-modal.component';
import {RecipeDeleteModalComponent} from './modals/recipe-delete-modal/recipe-delete-modal.component';
import {RecipeAddModalComponent} from './modals/recipe-add-modal/recipe-add-modal.component';
import {CommonModule} from "@angular/common";
import {SearchResultsComponent} from './modals/search-results/search-results.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        LandingPageComponent,
        ListPageComponent,
        NotfoundPageComponent,
        LoginFormComponent,
        SignupFormComponent,
        ListFormComponent,
        NavigationBarComponent,
        SearchBarComponent,
        AboutPageComponent,
        RecipeWindowComponent,
        AccountPageComponent,
        GreenBigButtonComponent,
        GreenMediumButtonComponent,
        GreenSmallButtonComponent,
        RedSmallButtonComponent,
        BlueSmallButtonComponent,
        BlueMediumButtonComponent,
        FavouritePageComponent,
        ConfirmDialogComponent,
        RecipeDetailModalComponent,
        RecipeEditModalComponent,
        RecipeDeleteModalComponent,
        RecipeAddModalComponent,
        SearchResultsComponent,


    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        NgOptimizedImage,
        MatIconModule,
        MatDialogContent,
        MatDialogActions,
        MatDialogModule,
        MatExpansionModule,
        BrowserAnimationsModule,
    ],

    exports: [
        NavigationBarComponent,
        SearchBarComponent,
        GreenSmallButtonComponent,
        GreenMediumButtonComponent,
        GreenBigButtonComponent,
        BlueSmallButtonComponent,
        BlueMediumButtonComponent,
        RedSmallButtonComponent,
        SearchResultsComponent,
        // Make sure to export it if it's in a shared module
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
