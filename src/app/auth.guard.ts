import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
    constructor(private router: Router, public authService: AuthService) {
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

        const loggedIn = this.authService.isLoggedIn();
        console.log('logged in ', loggedIn);
        if (!loggedIn) {
            this.router.navigate(['/']);
        }

        return loggedIn;
    }

}
