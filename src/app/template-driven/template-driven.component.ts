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

  consultaCEP(cep: string) {

    cep.replace(/\D/g, '');

    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        this.http.get('https://viacep.com.br/ws/' + cep + '/json/')
          .subscribe((data: any) => {
            console.log(data);
            return data;
          }
        );
      }
    }
  }
}
