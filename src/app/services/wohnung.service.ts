import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Wohnung} from '../class/wohnung';
import {Router} from '@angular/router';

class IWohnungCreated {
    wohnung_id: string;
}

@Injectable({
    providedIn: 'root'
})


export class WohnungService {


    url = 'http://127.0.0.1:8080/wohnung/';
    private data: any = {};
    private wohnungen: any = null;


    constructor(public http: HttpClient, private router: Router) {
    }

    listAll(): Observable<any> {
        const apiendpoint = 'all';
        if (this.wohnungen != null) {
            return this.wohnungen;
        }
        let result = this.http
            .get(`${this.url}${apiendpoint}`);
        this.wohnungen = result;
        return result;
    }


    getDetails(id): Observable<any> {
        const apiendpoint = 'get/' + id;

        if (this.data[id] != null) {
            return this.data[id];
        }
        let result = this.http
            .get(`${this.url}${apiendpoint}`);
        this.data[id] = result;
        return result;
    }

    clearCache(): void {
        this.data = {};
        this.wohnungen = null;
    }

    addInserat(form): void {
        const apiendpoint = 'add';
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        this.http.post(`${this.url}${apiendpoint}`, form.value, {headers})
            .subscribe(data => {
                const jsonData = data as IWohnungCreated;

                this.clearCache();
                this.router.navigate(['/wohnung', jsonData.wohnung_id]);

            }, error => {
                console.error(error);
            });
    }

    updateInserat(form): void {
        const apiendpoint = 'update';
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        this.http.post(`${this.url}${apiendpoint}`, form.value, {headers})
            .subscribe(data => {
                const jsonData = data as IWohnungCreated;

                this.clearCache();
                this.router.navigate(['/profil']);

            }, error => {
                console.error(error);
            });
    }

    listAllByUserID(userId): Observable<any> {
        const apiendpoint = 'getByUserID/' + userId;

        let result = this.http
            .get(`${this.url}${apiendpoint}`);
        return result;
    }

    getAverage(city): Observable<any> {
        const apiendpoint = 'average';
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        let data = this.http.post(`${this.url}${apiendpoint}`, "{\"city\":" + city + "}", {headers})
            .subscribe(data => {
                console.log(data);
                return data;
            });
        const jsonData = data;
        console.log(data);
        return jsonData.data.average;

    }
}
