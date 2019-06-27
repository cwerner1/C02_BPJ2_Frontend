import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {FormBuilder, FormGroup} from '@angular/forms';

interface IWohnungCreated {
    wohnung_id: string;
}

@Component({
    selector: 'app-inserat',
    templateUrl: './inserat.page.html',
    styleUrls: ['./inserat.page.scss'],
})

export class InseratPage implements OnInit {
    public wohnung: any = {};
    private ctrl = this;

    constructor(private formBuilder: FormBuilder, private router: Router, public http: HttpClient) {

    }

    ngOnInit() {
    }

    sendPostRequest(form: any) {
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');


        this.http.post('http://127.0.0.1:8080/wohnung/add', form.value, {headers})
            .subscribe(data => {
                const jsonData = data as IWohnungCreated;
                this.router.navigate(['/wohnung', jsonData.wohnung_id]);

            }, error => {
                console.error(error);
            });
    }
}
