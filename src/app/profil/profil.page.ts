import {Component, OnInit} from '@angular/core';
import {Wohnung} from '../class/wohnung';
import {WohnungService} from '../services/wohnung.service';

@Component({
    selector: 'app-list',
    templateUrl: 'profil.page.html',
    styleUrls: ['profil.page.scss']
})
export class ProfilPage implements OnInit {

    public items: Wohnung[] = [];

    constructor(public wohnungService: WohnungService) {
        const id = 1;
        this.wohnungService.listAllByUserID(id).subscribe(data => this.buildList(data));
    }


    buildList(data) {
        this.items = data;
    }

    ngOnInit() {
    }


}
