import {Component, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';
import {AuthService} from '../services/auth.service';
import {User} from '../auth/user';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    constructor(public menuCtrl: MenuController, public authService: AuthService) {
    }

    ionViewCanEnter() {
        return this.authService.authenticated();
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.menuCtrl.enable(false);
    }

    register(form) {
        console.log(form.value);

        const u: User = {};
        u.email = form.value.email;
        u.password = form.value.password;
        this.authService.register(u);

    }

}
