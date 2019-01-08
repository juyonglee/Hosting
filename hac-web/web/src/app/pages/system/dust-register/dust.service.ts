import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dust } from './dust.model';
import {DustConfig} from '../../typea/dust-view/dust-view.model';

@Injectable()
export class DustService {
    public url = 'http://localhost:3300/dusts';
    constructor(public http: HttpClient) { }

    getDusts(): Observable<Dust[]> {
        return this.http.get<Dust[]>(this.url);
    }

    addDust(dust: Dust){
        console.log('addDust');
        return this.http.post(this.url, dust);
    }

    updateDust(dust: Dust){
        return this.http.put(this.url + '/' + dust.id, dust);
    }

    deleteDust(id: number) {
        return this.http.delete(this.url + "/" + id);
    }

    addDustConfig(dustConfig: DustConfig){
        console.log('addDustConfig');
        return this.http.post(this.url + '/dust-config', dustConfig);
    }
}
