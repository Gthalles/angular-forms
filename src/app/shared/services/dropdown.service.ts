import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UF } from 'src/assets/data/UF.model';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getUFs(): Observable<UF[]> {
    return this.http.get<UF[]>('assets/data/uf.json');
  }

  getProfession(): any {
    return [ // Role e Wage utilizados como Cargo e Salário
      {id: '1', role: 'Junior backend developer', wage: '1.800'},
      {id: '2', role: 'Backend developer', wage: '3.000'},
      {id: '3', role: 'Senior backend developer', wage: '10.000'},
      {id: '4', role: 'Junior frontend developer', wage: '1.800'},
      {id: '5', role: 'Frontend developer', wage: '3.000'},
      {id: '6', role: 'Senior frontend developer', wage: '10.000'},
      {id: '7', role: 'Junior full stack developer', wage: '1.800'},
      {id: '8', role: 'Full stack developer', wage: '3.000'},
      {id: '9', role: 'Senior full stack developer', wage: '10.000'},
    ];
  }
}
