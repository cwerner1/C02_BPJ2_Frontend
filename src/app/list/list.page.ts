import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {IonItemSliding} from '@ionic/angular';
import {WohnungService} from '../services/wohnung.service';
import {Wohnung} from '../class/wohnung';
import {AuthService} from '../services/auth.service';
import {JsonResponse} from '../class/json-response';


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

    constructor(public wohnungService: WohnungService, public authService: AuthService) {
        this.wohnungService.listAll().subscribe(data => {
            this.items = data;
        });
    }

    ionViewCanEnter() {
        return this.authService.authenticated();
    }

    // add back when alpha.4 is out
    // navigate(item) {
    //   this.router.navigate(['/list', JSON.stringify(item)]);
    // }
    ngOnInit() {
    }

    favorite(item: {
        id: string; address: string; city: string; postalCode: string;
        rent: string; note: string; icon: string; description: string; surfaceArea: string; roomCount: string
    }) {
    }

    dropFromList(item) {
// @TODO Remove Favorites from list
        for (let j = 0; j < this.items.length; j++) {

            if (this.items[j] === item) {
                this.items.splice(j, 1);
            }

        }
    }
}
