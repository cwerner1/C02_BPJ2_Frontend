import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  public items: Array<{ addressTitle: string; note: string; icon: string }> = [];
  constructor(public http: HttpClient) {
    this.load();
  }

  load() {

    const headers = new Headers();

    const apiendpoint = 'http://127.0.0.1:8080/wohnung/all';

    return this.http.get(apiendpoint).subscribe(data => {
      this.buildList(data);
    });
  }

  buildList(data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      this.items.push({
        addressTitle: data[i].address + '; ' + data[i].city,
        note: 'Favorite #' + (i + 1),
        icon: 'heart',
      });
    }
  }

  ngOnInit() {
  }

}
