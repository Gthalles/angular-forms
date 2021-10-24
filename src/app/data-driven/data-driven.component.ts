import { UF } from 'src/assets/data/UF.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropdownService } from '../shared/services/dropdown.service';
import { CepConsultationService } from '../shared/services/cep-consultation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-driven',
  templateUrl: './data-driven.component.html',
  styleUrls: ['./data-driven.component.css']
})
export class DataDrivenComponent implements OnInit {
  // Atributos
  form!: FormGroup;
  states!: Observable<UF[]>;
  professions!: any[];

  // Métodos
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepConsultationService: CepConsultationService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: [null, [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
      profession: [null, [Validators.required]],
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

    // Populando select de cargo
    this.professions = this.dropdownService.getProfession();

    // Populando select de estados utilizando serviço de requisição http ao json de estados brasileiros
    this.states = this.dropdownService.getUFs();
  }

  onSubmit(form: FormGroup): void {
    if (this.form.valid) {
      // Método de requisição http para envio do formulário
      this.http.post('https://httpbin.org/post', JSON.stringify(this.form?.value))
        .subscribe((data: any) => {
          console.log(data);
        }, (error: any) => {
          alert('Erro');
        });
    } else {
      console.log('Formulário inválido!');
      this.verifyFormValidations(this.form);
    }
  }

  // Funções referentes a validação dos campos
  validInput(inputField: any) {
    let field: any = this.form.get(inputField);

    if (field?.invalid && field.untouched) {
      return false;   // Retorna falso mesmo com o campo inválido pois o mesmo ainda não foi focado
    }
    else if (field?.invalid && field.touched) {
      return true;    // Única possibilidade para mostrar erros: campo inválido e tocado (focado em algum momento)
    }
    else {
      return false;
    }
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
      'has-error': this.validInput(inputField),
      'has-feedback': this.validInput(inputField)
    }
  }

  verifyFormValidations(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log('field: ' + field);
      let control = formGroup.get(field);
      control?.markAsTouched();
      if (control instanceof FormGroup) {
        this.verifyFormValidations(control);
      }
    });
  }

  // Funções referentes ao Endereço(CEP)
  searchCEP() {
    let cep: string = this.form.get('address.cep')?.value;

    if (cep != null && cep !== '') {
      this.cepConsultationService.searchCEP(cep)?.subscribe((data) => {
        console.log(data);
        this.populateForm(data);
      })
    }
  }

  populateForm(data: any) {
    this.form.patchValue({
      address: {
        cep: data.cep,
        complement: data.complemento,
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf
      }
    })

    // Settando valor caso o cep seja o da minha rua
    if (this.form.get('address.cep')?.value == '18870-003') {
      this.setMyAddress();
    }
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

  // Definindo método para settar meus dados
  setMyAddress(): void {
    this.form.patchValue({
      name: 'Thalles Garbelotti',
      profession: 'Junior full stack developer',
      email: 'thallesgarbelotti@gmail.com',
      address: {
        number: '001'
      }
    });
  }

  // Definindo método para settar profissão
  setProfissionAsJuniorBackendDev(): void {
    const role_1 = {id: '1', role: 'Junior backend developer', wage: '1.800'}
    this.form.get('profession')?.setValue(role_1);
  }

  setProfissionAsSeniorBackendDev(): void {
    const role_2 = {id: '3', role: 'Senior backend developer', wage: '10.000'}
    this.form.get('profession')?.setValue(role_2);
  }

  setProfissionAsJuniorFrontendDev(): void {
    const role_3 = {id: '5', role: 'Junior frontend developer', wage: '1.800'}
    this.form.get('profession')?.setValue(role_3);
  }

  setProfissionAsSeniorFrontendDev(): void {
    const role_4 = {id: '6', role: 'Senior frontend developer', wage: '10.000'}
    this.form.get('profession')?.setValue(role_4);
  }

  // Método para comparar objetos
  compareProfessions(object1: any, object2: any) {
    return object1 && object2 ? (object1.role === object2.role) : object1 === object2;
  }
}