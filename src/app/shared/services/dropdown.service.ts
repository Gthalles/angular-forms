import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UF } from 'src/assets/data/UF.model';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getUFs():Observable<UF[]> {
    return this.http.get<UF[]>('assets/data/uf.json');
  }
}
