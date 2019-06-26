import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-inserat',
  templateUrl: './inserat.page.html',
  styleUrls: ['./inserat.page.scss'],
})
export class InseratPage implements OnInit {

  constructor(public http: HttpClient) {
  }

  ngOnInit() {
  }

  sendPostRequest() {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const postData = {
      'user_id': 1,
      'country': 'Austriaa',
      'city': 'city',
      'description': 'customer004@email.com',
      'roomCount': '0000252525'
    };

    this.http.post('http://127.0.0.1:8080/wohnung/add', postData, {headers: headers})
        .subscribe(data => {
          console.log(data);
        }, error => {
          console.error(error);
        });
  }
}
