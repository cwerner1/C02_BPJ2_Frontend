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
    private favoriteList: number[] = null;

    private requestIsRunning: boolean = false;

    constructor(public http: HttpClient) {
    }


    getAllFavoriteByUserID(userID: number): any {
        if (this.requestIsRunning) {
            return;
        }
        this.requestIsRunning = true;
        const apiendpoint = 'getAllFavoriteByUserId';
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        this.http.post(`${this.url}${apiendpoint}`, {
            userID,
        }, {headers})
            .subscribe(data => {
                const payload = data as JsonResponse;
                this.favoriteList = [];
                for (let i in payload.data) {
                    this.favoriteList.push(payload.data[i].wohnungID);
                }
                this.requestIsRunning = false;
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

        if (this.favoriteList.indexOf(wohnungID) === -1) {
            this.favoriteList.push(wohnungID);
        }
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
        const pos = this.favoriteList.indexOf(wohnungID);
        if (pos !== -1) {
            this.favoriteList.splice(pos, 1);
        }

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
    };

    isInFavoriteList(wohnungID: string, userID: string): boolean {
        if (this.favoriteList != null) {
            console.log('getPos', this.favoriteList, wohnungID);
            return this.favoriteList.indexOf(Number(wohnungID)) > -1;
        } else {
            console.log('load List');
            this.getAllFavoriteByUserID(Number(userID));
            return false;
        }
    }

}
