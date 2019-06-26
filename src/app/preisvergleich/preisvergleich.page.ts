import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-preisvergleich',
  templateUrl: './preisvergleich.page.html',
  styleUrls: ['./preisvergleich.page.scss'],
})
export class PreisvergleichPage implements OnInit {
    inputValue: any;

  constructor(public http: HttpClient) { }

  ngOnInit() {
  }

  returnDurchschnitt(inputValue: any) {
    console.log(inputValue);
  }

  sendPostRequest(form: any) {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');


    this.http.post('http://127.0.0.1:8080/wohnung/add', form.value, {headers})
        .subscribe(data => {
          const jsonData: any = data;
          console.log(jsonData);

        }, error => {
          console.error(error);
        });
  }

}
