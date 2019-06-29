import {Component, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    constructor(public menuCtrl: MenuController, public authService: AuthService) {
    }

    ngOnInit() {

    }

    ionViewWillEnter() {
        this.menuCtrl.enable(false);

    }
}
