import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CepConsultationService } from '../shared/services/cep-consultation.service';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.css']
})
export class TemplateDrivenComponent implements OnInit {
  // Atributos
  user: any = {};

  // Métodos
  constructor(
    private http: HttpClient,
    private cepConsultationService: CepConsultationService
  ) { }

  onSubmit(f: any) {
    //Três formas de acessar os valores do form
    console.log(f.value);
    console.log(this.user);
    console.log(f.form.value);

    // Método de requisição http para envio do formulário
    this.http.post('https://httpbin.org/post', JSON.stringify(f.value))
    .subscribe((data: any) =>  {
      console.log(data);
      return data;
    });
  }

  ngOnInit(): void {
  }

  validAndTouched(campo: any) {
    return campo.invalid && campo.touched;
  }

  applyErrorStyle(campo: any) {
    return {
      'has-error': this.validAndTouched(campo),
      'has-feedback': this.validAndTouched(campo)
    }
  }

  searchCEP(cep: string, form: any) {
    cep = cep.replace(/\D/g, '');

    if(cep != null && cep !== '') {
      this.cepConsultationService.searchCEP(cep)?.subscribe((data) => {
        console.log(data);
        return this.populateForm(data, form);
      })
    }
  }

  populateForm(data: any, form: any) {
    /*
    form.setValue({
      name: form.value.name,
      email: form.value.email,
      address: {
        cep: data.cep, //postal code
        number: '',
        complement: data.complemento,
        street: data.logradouro,
        neighborhood: data.bairro ,
        city: data.localidade,
        state: data.uf
      }
    })
    console.log(form.value);
  */
    form.form.patchValue({
      address: {
        cep: data.cep,   // postal code
        complement: data.complemento,
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf
      }
    })
  }

  clearAddress(form: any) {
    form.form.patchValue({
      address: {
        cep: null,
        number: null,
        complement: null,
        street: null,
        neighborhood: null,
        city: null,
        state: null
      }
    });
  }

}
