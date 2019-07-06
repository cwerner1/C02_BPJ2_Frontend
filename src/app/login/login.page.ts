import {Component, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    public email: string; // prefil if once logged in
    public password: string;


    constructor(public menuCtrl: MenuController, public authService: AuthService, private router: Router) {
    }

    ngOnInit() {


    }

    ionViewWillEnter() {
        this.menuCtrl.enable(false);
        if (this.authService.toast != null) {
            this.authService.toast.dismiss();
        }
    }

    login(form) {
        this.authService.login(form.value);
    }
}
