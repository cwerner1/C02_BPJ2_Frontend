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

    private email: string; // prefil if once logged in
    private password: string;


    constructor(public menuCtrl: MenuController, public authService: AuthService, private router: Router) {
    }

    ngOnInit() {


    }

    ionViewWillEnter() {
        this.menuCtrl.enable(false);
    }

    login(form) {
        this.authService.login(form.value);
    }
}
