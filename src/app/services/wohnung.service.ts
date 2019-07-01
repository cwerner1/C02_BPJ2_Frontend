import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {JsonResponse} from '../class/json-response';
import {Wohnung} from '../class/wohnung';
import {ToastController} from '@ionic/angular';

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
    private toast: HTMLIonToastElement = null;


    constructor(public http: HttpClient, private router: Router, private toastController: ToastController) {
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
        if (this.toast != null) {
            this.toast.dismiss();

        }
        this.http.post(`${this.url}${apiendpoint}`, form.value, {headers})
            .subscribe(data => {
                const payload = data as JsonResponse;
                const jsonData = payload.data as IWohnungCreated;

                this.clearCache();
                this.presentMessage('Die Wohnung wurde inseriet', 5000);
                this.router.navigate(['/wohnung', jsonData.wohnungID]);

                // @TODO  ✅ Christian Add Toast on SAve  - erledigt 🎉🥳 🍺🍺🍺

            }, error => {
                this.presentMessage('ein unerwarteter Fehler ist aufgetreten', 5000);
                console.error(error);
            });
    }

    updateInserat(form): void {
        const apiendpoint = 'update';
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        if (this.toast != null) {
            this.toast.dismiss();
        }
        this.http.post(`${this.url}${apiendpoint}`, form.value, {headers})
            .subscribe(data => {
                const payload = data as JsonResponse;
                const jsonData = payload.data as IWohnungCreated;

                this.clearCache();
                this.presentMessage('Die Wohnung wurde gespeichert', 5000);

                this.router.navigate(['/profil']);
                // @TODO  ✅ Christian Add Toast on update   - erledigt 🎉🥳 🍺🍺🍺

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

        const datas = this.http.post(`${this.url}${apiendpoint}`, {city}, {headers});
        return datas;
    }

    removeWohnung(id: string) {
        const apiendpoint = 'remove';


        const wohnungID = Number(id);
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        return this.http.post(`${this.url}${apiendpoint}`, {wohnungID}, {headers});
    }

    async presentMessage(message: string, duration?: number) {

        let options = {} as ToastOptions;
        options.message = message;
        if (duration !== undefined) {
            options.duration = duration;
        }
        console.log(options);
        this.toast = await this.toastController.create(options);
        this.toast.present();
    }

}
