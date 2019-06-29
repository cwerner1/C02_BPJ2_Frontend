import {Component, OnInit} from '@angular/core';
import {Wohnung} from '../class/wohnung';
import {WohnungService} from '../services/wohnung.service';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-list',
    templateUrl: 'profil.page.html',
    styleUrls: ['profil.page.scss']
})
export class ProfilPage implements OnInit {

    public items: Wohnung[] = [];

    constructor(public wohnungService: WohnungService, public authService: AuthService) {
        authService.getUserID().then(id => {
            console.error('@Todo Set user id in Profile Page');
            console.log('ID ', id);
            this.wohnungService.listAllByUserID(id).subscribe(data => {
                this.items = data;
            });
        });
    }

    ionViewCanEnter() {
        return this.authService.authenticated();
    }

    ngOnInit() {
    }


}
