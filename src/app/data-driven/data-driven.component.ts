import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-driven',
  templateUrl: './data-driven.component.html',
  styleUrls: ['./data-driven.component.css']
})
export class DataDrivenComponent implements OnInit {
  form!: FormGroup;

  validAndTouched(inputField: any) {
    let field: any = this.form.get(inputField);

    if (field?.invalid && field.untouched) // Retorna falso mesmo com o campo inválido pois o mesmo ainda não foi focado
      return false;
    else if (field?.invalid && field.touched) // Única possibilidade para mostrar erros: campo inválido e tocado (focado em algum momento)
      return true;
    else
      return false;
  }

  verifyEmail() {
    let emailField = this.form?.get('email');

    if (emailField?.errors) {
      return emailField?.errors.required && emailField?.touched;
    }
    return false;
  }

  applyErrorStyle(inputField: any) {
    return {
      'has-error': this.validAndTouched(inputField),
      'has-feedback': this.validAndTouched(inputField)
    }
  }

  reset() {
    this.form?.reset();
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    /*
    this.form? = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null),
    });
    */
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: [null, [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
      address: this.formBuilder.group({
        cep: [null, [Validators.required]],
        number: [null, [Validators.required]],
        complement: [null],
        street: [null, [Validators.required]],
        neighborhood: [null, Validators.required],
        city: [null, [Validators.required]],
        state: [null, [Validators.required]]
      })
    });
  }

  onSubmit(form: FormGroup) {
    console.log(this.form);

    this.http.post('https://httpbin.org/post', JSON.stringify(this.form?.value))
      .subscribe((data: any) => {
        console.log(data);
      },
        (error: any) => {
          alert("Erro");
        })
  }

  // FUNÇÕES REFERENTES AO ENDEREÇO/CEP
  searchCEP() {
    let cep: string = this.form.get('address.cep')?.value;
    cep.replace(/\D/g, '');

    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validateCep = /^[0-9]{8}$/;

      if (validateCep.test(cep)) {
        this.http.get('https://viacep.com.br/ws/' + cep + '/json/')
          .subscribe((data: any) => {
              console.log(data);
              this.clearAddress();
              this.populateForm(data);
              return data;
          }
        );
      }
    }
  }

  populateForm(data: any) {
    this.form.patchValue({
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

  clearAddress() {
    this.form.patchValue({
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
