import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
    private selectedItem: any;
    private icons = [
        'flask',
        'wifi',
        'beer',
        'football',
        'basketball',
        'paper-plane',
        'american-football',
        'boat',
        'bluetooth',
        'build'
    ];
    public items: Array<{ title: string; note: string; icon: string }> = [];

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
                title: 'Item ' + data[i].id + ' ' + data[i].country,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }

    // add back when alpha.4 is out
    // navigate(item) {
    //   this.router.navigate(['/list', JSON.stringify(item)]);
    // }
    ngOnInit() {
    }
}
