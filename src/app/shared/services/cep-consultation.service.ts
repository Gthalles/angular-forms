import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CepConsultationService {

  constructor(private http: HttpClient) { }

  searchCEP(cep: string) {
    // Verifica se o CEP tem somente dígitos
    cep.replace(/\D/g, '');

    if (cep != "") {
      // Expressão regular para validar o CEP
      var validateCep = /^[0-9]{8}$/;
      if (validateCep.test(cep)) {
        return this.http.get('https://viacep.com.br/ws/' + cep + '/json/');
      }
    }

    return of({});
  }

  
}
