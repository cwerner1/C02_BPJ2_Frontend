import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {MenuController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    constructor(public menuCtrl: MenuController, public authService: AuthService) {
    }

    ionViewCanEnter() {
        return this.authService.authenticated();
    }

    ionViewWillEnter() {
        this.menuCtrl.enable(true);
    }

}
