import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {IonItemSliding} from '@ionic/angular';
import {WohnungService} from '../services/wohnung.service';
import {Wohnung} from '../class/wohnung';
import {AuthService} from '../services/auth.service';
import {JsonResponse} from '../class/json-response';
import {FavoriteService} from '../services/favorite.service';


@Injectable()
@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})

export class ListPage implements OnInit {
    private icons = [
        'flask',
        'wifi',
        'beer',
        'football',
        'basketball',
        'paper-plane',
        'american-football',
        'boat',
        'bluetooth',
        'build'
    ];
    public items: Wohnung[] = [];

    constructor(public wohnungService: WohnungService, public authService: AuthService, public favoriteService: FavoriteService) {
        this.authService.redirectToLoginIfNotLoggedIn();
    }

    ionViewCanEnter() {
    }

    ngOnInit() {

    }

    ionViewWillEnter() {
        this.wohnungService.listAll().subscribe(data => {
            this.items = data;
        });
    }


    dropFromList(item) {
        // @TODO Use Case für den Fall ausformulieren - mit dem Ziel
        // Als user möchte ich einen eintrag aus der list entfernen können.
        for (let j = 0; j < this.items.length; j++) {

            if (this.items[j] === item) {
                this.items.splice(j, 1);
            }

        }
    }

    addTofavorite(wohnungID: string) {
        console.log('add To Fav', wohnungID);
        this.authService.getUserID().then(userID => {
            this.favoriteService.addFavorite(userID, Number(wohnungID));
        });
    }
}
