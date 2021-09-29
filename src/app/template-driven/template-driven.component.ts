import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.css']
})
export class TemplateDrivenComponent implements OnInit {

  user: any = {};

  onSubmit(f: any) {
    //3 ways to access the value
    console.log(f.value);
    console.log(this.user);
    console.log(f.form.value);

    this.http.post('https://httpbin.org/post', JSON.stringify(f.value))
    .subscribe((data: any) =>  {
      console.log(data);
      return data;
    });
  }

  constructor(private http: HttpClient) { }

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

    cep.replace(/\D/g, '');

    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validateCep = /^[0-9]{8}$/;

      if (validateCep.test(cep)) {
        this.http.get('https://viacep.com.br/ws/' + cep + '/json/')
          .subscribe((data: any) => {
              console.log(data);
              this.clearAddress(form);
              this.populateForm(data, form);
              return data;
          }
        );
      }
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
        cep: data.cep, //postal code
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
    })
  }

}
