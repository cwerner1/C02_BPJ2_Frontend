import {Component, OnInit} from '@angular/core';
import {WohnungService} from '../services/wohnung.service';
import {AuthService} from '../services/auth.service';
import {JsonResponse} from '../class/json-response';
import {json} from "@angular-devkit/core";

@Component({
    selector: 'app-preisvergleich',
    templateUrl: './preisvergleich.page.html',
    styleUrls: ['./preisvergleich.page.scss'],
})
export class PreisvergleichPage implements OnInit {

    city: any;
    cities : any;
    count : any;

    constructor(public wohnungService: WohnungService, public authService: AuthService) {
        this.authService.redirectToLoginIfNotLoggedIn();
    }

    ngOnInit() {
    }

    ionViewCanEnter() {
    }

    returnDurchschnitt(inputValue: any) {
        this.wohnungService.getAverage(inputValue.value.Stadt)
            .subscribe(data => {
                const payload = data as JsonResponse;
                const jsonData = payload.data;
                this.cities = jsonData;
                this.count = jsonData.length;
                return jsonData;
            });

    }

}
