import {Component, OnInit} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-wohnung',
    templateUrl: './wohnung.page.html',
    styleUrls: ['./wohnung.page.scss'],
})
export class WohnungPage implements OnInit {
    wohnung: any;

    constructor(public http: HttpClient, private route: ActivatedRoute) {

    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        const id = this.route.snapshot.paramMap.get('id');
        this.wohnung = null;
        this.load(id);
    }

    load(id) {
        const apiendpoint = 'http://127.0.0.1:8080/wohnung/get/' + id;

        return this.http.get(apiendpoint).subscribe(data => {
            this.drawpage(data);
        });


    }

    drawpage(data) {
        console.log(data);
        this.wohnung = data;
    }

}