import {Component, OnInit} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {FormBuilder, FormGroup} from '@angular/forms';
import {WohnungService} from '../services/wohnung.service';
import {Wohnung} from '../class/wohnung';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-wohnung',
    templateUrl: './wohnung.page.html',
    styleUrls: ['./wohnung.page.scss'],
})
export class WohnungPage implements OnInit {
    private wohnung: Wohnung = null;

    constructor(public wohnungService: WohnungService, private route: ActivatedRoute, public authService: AuthService) {
        this.authService.redirectToLoginIfNotLoggedIn();
        this.wohnung = null;
    }

    ionViewCanEnter() {
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.wohnungService.getDetails(id).subscribe(data => {
            this.wohnung = new Wohnung(data);
        });

    }

}
