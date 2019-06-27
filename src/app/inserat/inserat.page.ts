import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {FormBuilder, FormGroup} from '@angular/forms';
import {WohnungService} from '../services/wohnung.service';


@Component({
    selector: 'app-inserat',
    templateUrl: './inserat.page.html',
    styleUrls: ['./inserat.page.scss'],
})

export class InseratPage implements OnInit {
    public wohnung: any = {};
    private ctrl = this;

    constructor(public wohnungService: WohnungService) {
// , private router: Router, public http: HttpClient
    }

    ngOnInit() {
    }

    sendPostRequest(form: any) {
        this.wohnungService.addInserat(form);
    }
}
