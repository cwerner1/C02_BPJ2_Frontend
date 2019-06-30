import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {User} from '../auth/user';
import {AuthResponse} from '../auth/auth-response';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})


export class AuthService {

    private AUTH_SERVER_ADDRESS = 'http://localhost:8080/user';
    private authenticationState = new BehaviorSubject(false);

    constructor(private  httpClient: HttpClient, private router: Router, public storage: Storage) {
    }


    public register(user: User): Observable<AuthResponse> {
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user, {headers}).subscribe(async res => {
            console.log('res', res);
            if (this.setLoggedInState(res)) {
                this.router.navigate(['/home']);
            } else {
                console.warn('Register Problem');
            }

        }, error => {
            console.error(error);
        });
        return null;
        // return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
        //     tap(async (res: AuthResponse) => {
        //         console.log('register response2', res);
        //         // if (res.user) {
        //         //     await this.storage.set('ACCESS_TOKEN', res.user.access_token);
        //         //     await this.storage.set('EXPIRES_IN', res.user.expires_in);
        //         //     this.authenticationState.next(true);
        //         // }
        //     })
        // );
    }

    public login(user: User): Observable<AuthResponse> {
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/login`, user, {headers}).subscribe(async res => {

            console.log('res', res);
            if (this.setLoggedInState(res)) {
                this.router.navigate(['/']);
            } else {
                console.warn('Login Problem');
            }

        }, error => {
            console.error(error);
        });
        return null;
    }


    public async logout() {


    }

    public isLoggedIn() {
        console.log('is LoggedIn: ', this.authenticationState.value);
        return this.authenticationState.value;
    }

    public authenticated() {
        return this.isLoggedIn();
    }

    public getUserID() {
        return this.storage.get('ID');
    }

    public setLoggedInState(res: AuthResponse): boolean {
        if (res.success && res.data) {
            this.storage.set('ID', res.data.id);
            this.storage.set('ACCESS_TOKEN', res.data.access_token);
            this.storage.set('EXPIRES_IN', res.data.expires_in);
            this.authenticationState.next(true);
            console.log('this.storage', this.storage);
            return true;
        }
        this.removeLoginStage();
        return false;
    }

    public removeLoginStage() {
        this.storage.remove('ID');
        this.storage.remove('ACCESS_TOKEN');
        this.storage.remove('EXPIRES_IN');
        this.authenticationState.next(false);
    }

}
