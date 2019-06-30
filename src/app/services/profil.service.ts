import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../auth/user';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProfilService {

    url = 'http://127.0.0.1:8080/user/';

    constructor(private  http: HttpClient) {
    }

    getUserDetailById(id: number): Observable<User> {
        const apiendpoint = 'getByUserID/' + id;

        const result = this.http
            .get(`${this.url}${apiendpoint}`);
        return result;
    }
}
