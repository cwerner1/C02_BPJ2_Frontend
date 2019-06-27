import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {FormBuilder, FormGroup} from '@angular/forms';
import {WohnungService} from '../services/wohnung.service';
import {Wohnung} from '../class/wohnung';


@Component({
    selector: 'app-inserat',
    templateUrl: './inserat.page.html',
    styleUrls: ['./inserat.page.scss'],
})

export class InseratPage implements OnInit {
    public wohnung: any = {};
    private ctrl = this;
    public edit = false;

    constructor(public wohnungService: WohnungService, private route: ActivatedRoute) {
        const id = this.route.snapshot.paramMap.get('id');
        if (id != null) {
            this.wohnungService.getDetails(id).subscribe(data => {
                this.wohnung = new Wohnung(data);
                this.edit = true;
            });
        }
    }

    ngOnInit() {

    }

    sendPostRequest(form: any) {
        if (this.edit === false) {
            this.wohnungService.addInserat(form);
        } else {
            this.wohnungService.updateInserat(form);
        }
    }
}
