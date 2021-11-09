import { UF } from 'src/assets/data/UF.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { DropdownService } from '../shared/services/dropdown.service';
import { CepConsultationService } from '../shared/services/cep-consultation.service';
import { FormValidationService } from '../shared/services/form-validation.service';
import { VerifyEmailService } from './services/verifyEmail.service';
import { map, tap, distinctUntilChanged, switchMap } from 'rxjs/operators'
import { EMPTY, Observable } from 'rxjs';

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
  techs!: any[];
  newsletterOp!: any[];
  frameworks: any[] = ['Angular', 'Laravel', 'Springboot', 'Ionic'];

  // Métodos
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepConsultationService: CepConsultationService,
    private formValidationService: FormValidationService,
    private verifyEmailService: VerifyEmailService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: [null, [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")], this.verifyIfEmailExist.bind(this)],
      confirmEmail: [null, [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"), this.formValidationService.equalsTo('email')]],
      tech: [null, [Validators.required]],
      profession: [null, [Validators.required]],
      frameworks: this.buildFrameworks(),
      address: this.formBuilder.group({
        cep: [null, [Validators.required, this.formValidationService.cepValidator]],
        number: [null, [Validators.required]],
        complement: [null],
        street: [null, [Validators.required]],
        neighborhood: [null, Validators.required],
        city: [null, [Validators.required]],
        state: [null, [Validators.required]]
      }),
      newsletter: [null],
      terms: [false, [Validators.required, Validators.requiredTrue]]
    });

    // Observable para campo de cep, verificando o status e populando os subcampos de endereço
    this.form.get('address.cep')?.statusChanges.pipe(
      distinctUntilChanged(),
      tap((value: any) => console.log('Status do CEP: ' + value)),
      switchMap((status: any) => status === 'VALID' ? this.cepConsultationService.searchCEP(this.form?.get('address.cep')?.value) : EMPTY)
    ).subscribe((data: any) => data ? this.populateForm(data) : {});

    // Populando campos do tipo select (dropdown/combobox)
    this.professions = this.dropdownService.getProfession();
    this.techs = this.dropdownService.getTechs();
    this.states = this.dropdownService.getUFs();
    this.newsletterOp = this.dropdownService.getNewsletter();    
  }

  // Método referente ao campo para frameworks
  buildFrameworks() {
    let values = this.frameworks?.map(() => new FormControl(false));

    return this.formBuilder.array(values, this.formValidationService?.requiredMinCheckbox(1));
  }

  onSubmit(form: FormGroup): void {

    let valueSubmit = Object.assign({}, this.form?.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((value: any, index: number) => value ? this.frameworks[index] : null)
        .filter((value: any) => value != null) 
    });

    if (this.form.valid) {
      // Método de requisição http para envio do formulário
      this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
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

  // Funções referentes a validação e verificações dos campos
  validInput(inputField: any): boolean {
    if(this.form.get(inputField)?.hasError('invalidCep')){
      return true;
    }
    else {
      return false;
    }
  }

  verifyInput(inputField: any): boolean {
    let field: any = this.form.get(inputField);

    if (field?.invalid && field.untouched) {
      return false;   // Retorna falso mesmo com o campo inválido pois o mesmo ainda não foi focado
    } else if (field?.hasError('required') && field.touched) {
      return true;    // Única possibilidade para mostrar erros: campo inválido e tocado (focado em algum momento)
    }
    else {
      return false;
    }
  }

  verifyEmail(): any {
    let emailField = this.form?.get('email');

    if (emailField?.errors) {
      return emailField?.errors.required && emailField?.touched;
    }
    
    return false;
  }

  verifyDoubleField(inputField: string): boolean {
    return this.form.get(inputField)?.hasError('equalsTo') ? true : false;
  }

  // Função para settar checkbox de termos
  setTerms() {
    let terms: any = this.form.get('terms');

    return terms.value == true ? terms.setValue(false) : terms.setValue(true);
  }

  applyErrorStyle(inputField: any) {
    return {
      'has-error': this.verifyInput(inputField),
      'has-feedback': this.verifyInput(inputField)
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

      if(cep != null && cep !== '') {
        this.cepConsultationService.searchCEP(cep)?.subscribe((data: any) => {
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
      this.form.patchValue({
        name: 'G4 thalles',
        email: 'thalles.garbelotti@g4tech.com.br',
        address: {
          number: '184'
        }
      })
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

  reset() {
    console.log(this.form);
    this.form.reset();
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

  // Método para verificar de forma assíncrona se o email já existe 
  verifyIfEmailExist(formControl: FormControl): any {
    return this.verifyEmailService.verifyEmail(formControl.value).pipe(
      map((exist: any) => exist ? {UnavailableEmail: true} : console.log('Email disponível!'))
    );
  }

  verifyEmailError(email: string): any {
    if(this.form.get('email')?.status === 'VALID' && this.form.get('email')?.touched) {
      return false;
    }
    if(this.form.get('email')?.hasError('UnavailableEmail')) {
      return true;
    }

    return false;
  }

  // Método para retornar o FormControl a ser usado para busca de erros
  showName(fieldName: string): any {
    return this.form?.get(fieldName);
  }
}