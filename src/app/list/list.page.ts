import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {IonItemSliding} from '@ionic/angular';

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
    public items: Array<{ id: string; address: string; city: string; rent: string; note: string; icon: string; description: string }> = [];

    constructor(public http: HttpClient) {
        this.load();

    }

    load() {
        const apiendpoint = 'http://127.0.0.1:8080/wohnung/all';

        return this.http.get(apiendpoint).subscribe(data => {
            this.buildList(data);
        });


    }

    buildList(data) {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            data[i].icon = 'home';
            this.items.push(data[i]);
        }
    }

    // add back when alpha.4 is out
    // navigate(item) {
    //   this.router.navigate(['/list', JSON.stringify(item)]);
    // }
    ngOnInit() {
    }

    favorite(item: { id: string; address: string; city: string; rent: string; note: string; icon: string; description: string }) {
    }

    dropFromList(item) {

        for (let j = 0; j < this.items.length; j++) {

            if (this.items[j] === item) {
                this.items.splice(j, 1);
            }

        }
    }
}
