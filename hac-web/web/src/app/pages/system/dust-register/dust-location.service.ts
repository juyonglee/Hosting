import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DustLocation } from './dust-location.model';

@Injectable()
export class DustLocationService {
    public url = 'http://localhost:3300/dustLocation';
    constructor(public http: HttpClient) { }

    getLocations(): Observable<DustLocation[]> {
        console.log('getLocations');
        return this.http.get<DustLocation[]>(this.url);
    }

    addDustLocation(location: DustLocation){
        return this.http.post(this.url, location);
    }

    updateDustLocation(location: DustLocation){
        return this.http.put(this.url + "/" + location.id, location);
    }

    deleteDustLocation(id: number) {
        return this.http.delete(this.url + "/" + id);
    }
}
