import {Component, OnInit} from '@angular/core';
import {WohnungService} from '../services/wohnung.service';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-preisvergleich',
    templateUrl: './preisvergleich.page.html',
    styleUrls: ['./preisvergleich.page.scss'],
})
export class PreisvergleichPage implements OnInit {
    average: any;
    averageSqM: any;
    city: any;

  constructor(public wohnungService: WohnungService, public authService: AuthService) { }

    ngOnInit() {
    }

    ionViewCanEnter() {
        return this.authService.authenticated();
    }

    returnDurchschnitt(inputValue: any) {
        console.log(inputValue);
        this.wohnungService.getAverage(inputValue.value.Stadt).subscribe(data => {
            console.log(data);
            this.average = data.average;
            this.averageSqM = data.averageSqm;
        });
    }

}
