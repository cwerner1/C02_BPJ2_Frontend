import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {JsonResponse} from '../class/json-response';
import {Wohnung} from '../class/wohnung';

class IWohnungCreated {
    wohnungID: string;
}

class IWohnungAverage {
    success: boolean;
    data: any;
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

    listAll(): Observable<Wohnung[]> {
        const apiendpoint = 'all';
        if (this.wohnungen != null) {
            //    return this.wohnungen;
        }
        let result = this.http
            .get(`${this.url}${apiendpoint}`).map(response => {
                const payload = response as JsonResponse;
                this.wohnungen = payload.data as Wohnung[];
                return payload.data;

            });
        return result;
    }


    getDetails(id): Observable<Wohnung> {
        const apiendpoint = 'get/' + id;

        if (this.data[id] != null) {
            //     return this.data[id];
        }
        let result = this.http
            .get(`${this.url}${apiendpoint}`)
            .map(response => {
                const payload = response as JsonResponse;
                this.data[id] = payload.data;
                return payload.data;

            });
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
                const payload = data as JsonResponse;
                const jsonData = payload.data as IWohnungCreated;

                this.clearCache();
                this.router.navigate(['/wohnung', jsonData.wohnungID]);

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
                const payload = data as JsonResponse;
                const jsonData = payload.data as IWohnungCreated;

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

    getAverage(city): any {
        const apiendpoint = 'average';
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        const data = this.http.post(`${this.url}${apiendpoint}`, '{"city":' + city + '}', {headers})
            .map((res: Response) => res.json());
        console.log(data);
        return data;
    }
}
