import {Component} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {MenuController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    constructor(public menuCtrl: MenuController, public authService: AuthService) {
        this.authService.redirectToLoginIfNotLoggedIn();
    }

    ionViewCanEnter() {
    }

    ionViewWillEnter() {
        this.menuCtrl.enable(true);
    }

}
