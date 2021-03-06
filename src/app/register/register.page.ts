import {Component, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';
import {AuthService} from '../services/auth.service';
import {User} from '../auth/user';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    constructor(public menuCtrl: MenuController, public authService: AuthService, private router: Router) {
    }

    ionViewCanEnter() {
    }

    ngOnInit() {


    }

    ionViewWillEnter() {
        this.menuCtrl.enable(false);
        if (this.authService.toast != null) {
            this.authService.toast.dismiss();
        }
    }

    register(form) {
        const u: User = {};
        u.email = form.value.email;
        u.password = form.value.password;
        this.authService.register(u);

    }

}
