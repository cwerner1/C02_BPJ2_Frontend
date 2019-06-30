import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Wohnung} from '../class/wohnung';
import {FavoriteService} from '../services/favorite.service';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.page.html',
    styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

    public items: Wohnung[] = [];

    constructor(public favoriteService: FavoriteService, public authService: AuthService) {
        this.reloadList();
    }

    ionViewCanEnter() {
        return this.authService.authenticated();
    }

    ngOnInit() {
    }

    reloadList() {
        this.authService.getUserID().then(userID => {
            this.favoriteService.getAllFavoriteWohnungByUserID(userID).subscribe(data => {
                this.items = data;
            });
        });
    }

    deleteFavoriteID(wohnungID) {
        this.authService.getUserID().then(userID => {
            this.favoriteService.removeFavorite(userID, wohnungID).add(data => {
                this.reloadList();
            });

        });

    }
}
