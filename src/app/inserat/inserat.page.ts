import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {FormBuilder, FormGroup} from '@angular/forms';
import {WohnungService} from '../services/wohnung.service';
import {Wohnung} from '../class/wohnung';
import {AuthService} from '../services/auth.service';


@Component({
    selector: 'app-inserat',
    templateUrl: './inserat.page.html',
    styleUrls: ['./inserat.page.scss'],
})

export class InseratPage implements OnInit {
    public wohnung: Wohnung;
    public ctrl = this;
    public edit = false;
    private userID = null;
    private wohnungID = null;

    constructor(public wohnungService: WohnungService, private route: ActivatedRoute, public authService: AuthService) {
        this.authService.redirectToLoginIfNotLoggedIn();

    }

    ionViewCanEnter() {
    }

    ionViewWillEnter() {
        const wohnungID = this.route.snapshot.paramMap.get('id');
        if (wohnungID != null) {
            this.wohnungService.getDetails(wohnungID).subscribe(data => {
                this.wohnungID = wohnungID;
                this.wohnung = new Wohnung(data);
                this.edit = true;
            });
        }
        this.authService.getUserID().then((userId) => {
            this.userID = userId;
        });
        this.wohnung = null;
    }

    ngOnInit() {

    }

    sendPostRequest(form: any) {
        if (this.edit === false) {
            form.value.userID = this.userID;
            this.wohnungService.addInserat(form);
        } else {
            form.value.id = this.wohnungID;
            form.value.userID = this.userID;
            this.wohnungService.updateInserat(form);
        }
    }
}
