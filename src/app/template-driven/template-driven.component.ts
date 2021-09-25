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

  constructor(private httpClient: HttpClient) { }

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

  validateCep(cep: string) {
    console.log(cep);
    cep = cep.replace(/\D/g, '');

    if(cep != '') {
      var validaCep = /^[0-9]{8}$/;

      if(validaCep.test(cep)) {
        this.httpClient.get("https://viacep.com.br/ws/" + cep + "/json")
        .subscribe(data => {
          console.log(data);
        })
      }
    }
  }


}
