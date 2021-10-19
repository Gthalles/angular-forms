import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getUFs() {
    return this.http.get('assets/data/uf.json').pipe(
      map((response: any) => console.log(response))
    )
  }
}
