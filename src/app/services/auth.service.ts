import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {User} from '../auth/user';
import {AuthResponse} from '../auth/auth-response';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})


export class AuthService {

    private AUTH_SERVER_ADDRESS = 'http://localhost:8080/user';
    private authenticationState = new BehaviorSubject(false);

    public toast: HTMLIonToastElement = null;

    constructor(private  httpClient: HttpClient, private router: Router, public storage: Storage, public toastController: ToastController) {
    }


    public register(user: User): Observable<AuthResponse> {
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        if (this.toast != null) {
            this.toast.dismiss();
        }
        this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user, {headers}).subscribe(async res => {
            if (this.setLoggedInState(res)) {
                this.router.navigate(['/home']);
            } else {
                this.toast = await this.toastController.create({
                    message: res.errorMessage,
                });
                this.toast.present();
            }

        }, error => {
            console.error(error);
        });
        return null;

    }

    public login(user: User): Observable<AuthResponse> {
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        if (this.toast != null) {
            this.toast.dismiss();
        }
        this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/login`, user, {headers}).subscribe(async res => {

            if (this.setLoggedInState(res)) {
                this.router.navigate(['/home']);
            } else {
                this.toast = await this.toastController.create({
                    message: res.errorMessage,
                });
                this.toast.present();
                return false;
            }

        }, error => {
            console.error(error);
        });
        return null;
    }


    public async logout() {


    }

    public isLoggedIn() {
        const result = this.authenticationState.value;

        if (result) {
            return true;
        }
        if (this.storage.get('ID').then(value => {
            if (value != null) {
                this.authenticationState.next(true);

            }
        })) {
        }
    }

    public authenticated() {
        return this.authenticationState.value;
    }

    public redirectToLoginIfNotLoggedIn() {
        const result = this.authenticationState.value;
        if (result) {
            return;
        }

        this.storage.get('ID').then(value => {
            if (value != null) {
                this.authenticationState.next(true);
            } else {
                this.router.navigate(['/login']);
            }
        });


    }

    public getUserID() {
        return this.storage.get('ID');
    }

    public setLoggedInState(res: AuthResponse): boolean {
        if (res.success && res.data) {
            this.storage.set('ID', res.data.id);
            //    this.storage.set('ACCESS_TOKEN', res.data.access_token);
            //    this.storage.set('EXPIRES_IN', res.data.expires_in);
            this.authenticationState.next(true);
            return true;
        }
        this.removeLoginStage();
        return false;
    }

    public removeLoginStage() {
        this.storage.remove('ID');
        //    this.storage.remove('ACCESS_TOKEN');
        //    this.storage.remove('EXPIRES_IN');
        this.authenticationState.next(false);
    }

}
