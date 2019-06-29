import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';


const routes: Routes = [
    {
        path: '',
        // change to 'home' for start there
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {path: 'home', loadChildren: './home/home.module#HomePageModule'},
    {path: 'list', loadChildren: './list/list.module#ListPageModule'},
    {path: 'profil', loadChildren: './profil/profil.module#ProfilPageModule'},
    {path: 'inserat', loadChildren: './inserat/inserat.module#InseratPageModule'},
    {path: 'favorites', loadChildren: './favorites/favorites.module#FavoritesPageModule'},
    {path: 'preisvergleich', loadChildren: './preisvergleich/preisvergleich.module#PreisvergleichPageModule'},
    {path: 'login', loadChildren: './login/login.module#LoginPageModule'},
    {path: 'register', loadChildren: './register/register.module#RegisterPageModule'},
    // {path: 'special', component: SpecialPage, canActivate: [AuthGuard]},
    //   {path: 'wohnung', loadChildren: './wohnung/wohnung.module#WohnungPageModule'}
    {path: 'wohnung/:id', loadChildren: './wohnung/wohnung.module#WohnungPageModule'},
    {path: 'wohnung/edit/:id', loadChildren: './inserat/inserat.module#InseratPageModule'},



];

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
