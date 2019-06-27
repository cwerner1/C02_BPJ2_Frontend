import {Component, OnInit} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {FormBuilder, FormGroup} from '@angular/forms';
import {WohnungService} from '../services/wohnung.service';
import {Wohnung} from '../class/wohnung';

@Component({
    selector: 'app-wohnung',
    templateUrl: './wohnung.page.html',
    styleUrls: ['./wohnung.page.scss'],
})
export class WohnungPage implements OnInit {
    private wohnung = null;

    constructor(public wohnungService: WohnungService, private route: ActivatedRoute) {
        this.wohnung = null;
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.wohnungService.getDetails(id).subscribe(data => {
            this.wohnung = new Wohnung(data);
        });

    }

}
