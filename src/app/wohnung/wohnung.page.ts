import {Component, OnInit} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {FormBuilder, FormGroup} from '@angular/forms';
import {WohnungService} from '../services/wohnung.service';
import {Wohnung} from '../class/wohnung';
import {AuthService} from '../services/auth.service';
import {FavoriteService} from '../services/favorite.service';

@Component({
    selector: 'app-wohnung',
    templateUrl: './wohnung.page.html',
    styleUrls: ['./wohnung.page.scss'],
})
export class WohnungPage implements OnInit {
    public wohnung: Wohnung = null;
    private userID = null;

    constructor(public wohnungService: WohnungService, private route: ActivatedRoute, public authService: AuthService, public favoriteService: FavoriteService) {
        this.authService.redirectToLoginIfNotLoggedIn();
        this.authService.getUserID().then(id => {
            this.userID = id;
        });
    }

    ionViewWillEnter() {
        this.wohnung = null;
        const id = this.route.snapshot.paramMap.get('id');
        this.wohnungService.getDetails(id).subscribe(data => {
            this.wohnung = new Wohnung(data);
        });
    }

    ionViewCanEnter() {
    }

    ngOnInit() {

    }

    addTofavorite(wohnungID: string) {
        this.authService.getUserID().then(userID => {
            this.favoriteService.addFavorite(userID, Number(wohnungID));
        });
    }

    removeFromFavorite(wohnungID: string) {
        this.authService.getUserID().then(userID => {
            this.favoriteService.removeFavorite(userID, Number(wohnungID));
        });
    }

}
