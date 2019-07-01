import {Component, OnInit} from '@angular/core';
import {Wohnung} from '../class/wohnung';
import {WohnungService} from '../services/wohnung.service';
import {AuthService} from '../services/auth.service';
import {JsonResponse} from '../class/json-response';
import {ProfilService} from '../services/profil.service';
import {User} from '../auth/user';

@Component({
    selector: 'app-list',
    templateUrl: 'profil.page.html',
    styleUrls: ['profil.page.scss']
})

export class ProfilPage implements OnInit {

    public items: Wohnung[] = [];
    public user: User = null;
    private userID = null;

    constructor(public wohnungService: WohnungService, public authService: AuthService, public profilService: ProfilService) {
        this.authService.redirectToLoginIfNotLoggedIn();

    }

    ionViewCanEnter() {
    }

    ngOnInit() {

    }

    ionViewWillEnter() {

        this.authService.getUserID().then(id => {
            this.userID = id;
            this.profilService.getUserDetailById(id).subscribe(response => {
                const payload = response as JsonResponse;
                this.user = payload.data;
                console.log('User Data:s', payload.data);
            });
            this.wohnungService.listAllByUserID(id).subscribe(response => {
                const payload = response as JsonResponse;
                this.items = payload.data;
                console.log('wohnungen by User:', payload.data);
            });
        });
    }


    deleteWohnung(id: string) {
        this.wohnungService.removeWohnung(id).subscribe(response2 => {
            this.wohnungService.listAllByUserID(this.userID).subscribe(response => {
                const payload = response as JsonResponse;
                this.items = payload.data;
                console.log('wohnungen by User:', payload.data);
            });
        });

    }
}
