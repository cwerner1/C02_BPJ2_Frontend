import {Injectable} from '@angular/core';
import {Wohnung} from '../class/wohnung';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JsonResponse} from '../class/json-response';
import {Observable, Subscription} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FavoriteService {

    url = 'http://127.0.0.1:8080/favorite/';


    constructor(public http: HttpClient) {
    }


    getAllFavoriteByUserID(userID: number): any {

        const apiendpoint = 'getAllFavoriteByUserId';
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        this.http.post(`${this.url}${apiendpoint}`, {
            userID,
        }, {headers})
            .subscribe(data => {
                const payload = data as JsonResponse;
                return payload.data;
            }, error => {
                console.error(error);
            });
    }

    getAllFavoriteWohnungByUserID(userID: number): Observable<any> {

        const apiendpoint = 'getAllFavoriteWohnungByUserID';
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        return this.http.post(`${this.url}${apiendpoint}`, {
            userID,
        }, {headers});
    }

    addFavorite(userID: number, wohnungID: number): boolean {
        const apiendpoint = 'add';
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');


        const body: { wohnungID: number; userID: number } = {
            userID,
            wohnungID
        };
        this.http.post(`${this.url}${apiendpoint}`, body, {headers})
            .subscribe(data => {
                const payload = data as JsonResponse;
                if (payload.success) {
                    return true;
                } else {
                    return false;
                }

            }, error => {
                console.error(error);
            });

        return true;
    }

    removeFavorite = (userID: number, wohnungID: number) => {
        const apiendpoint = 'removeByUserIDAndWohnungID';
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        return this.http.post(`${this.url}${apiendpoint}`, {
            userID,
            wohnungID
        }, {headers})
            .subscribe(data => {
                const payload = data as JsonResponse;
                if (payload.success) {
                    return true;
                } else {
                    return false;
                }
            }, error => {
                console.error(error);
            });
    }
}
