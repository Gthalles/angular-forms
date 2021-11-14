import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { map, tap, distinctUntilChanged, switchMap } from 'rxjs/operators'

import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { DropdownService } from '../shared/services/dropdown.service';
import { CepConsultationService } from '../shared/services/cep-consultation.service';
import { FormValidationService } from '../shared/services/form-validation.service';
import { VerifyEmailService } from './services/verifyEmail.service';
import { UF } from 'src/assets/data/UF.model';

@Component({
  selector: 'app-data-driven',
  templateUrl: './data-driven.component.html',
  styleUrls: ['./data-driven.component.css']
})
export class DataDrivenComponent extends BaseFormComponent implements OnInit {

  // Atributos
  states!: any[];
  cities!: any[];
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
    private verifyEmailService: VerifyEmailService,
  ) {
    super();
  }

  ngOnInit(): void {
    // Populando campos do tipo select (dropdown/combobox)
    this.techs = this.dropdownService.getTechs();
    this.professions = this.dropdownService.getProfession();
    this.dropdownService.getUFs().subscribe((data: any) => this.states = data);
    this.newsletterOp = this.dropdownService.getNewsletter();
    
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: [null, [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")], this.verifyIfEmailExist.bind(this)],
      confirmEmail: [null, [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"), this.formValidationService.equalsTo('email')]],

      techs: [null, [Validators.required]],
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
    this.getField('address.cep')?.statusChanges.pipe(
      distinctUntilChanged(),
      tap((value: any) => console.log('Status do CEP: ' + value)),
      switchMap((status: any) => status === 'VALID' ? this.cepConsultationService.searchCEP(this.form?.get('address.cep')?.value) : EMPTY)
    ).subscribe((data: any) => data ? this.populateForm(data) : {});

    this.getField('address.state')?.valueChanges.pipe(
      tap((uf: string) => console.log('Novo estado: ', uf)),
      map((uf: string) => this.states.filter((v: UF) => v.initials === uf)),
      map((ufs: any) => ufs && ufs.length > 0 ? ufs[0].id : EMPTY ),
      switchMap((stateId: number) => this.dropdownService.getCities(stateId)),
      tap(console.log)
    ).subscribe((cities: any) => this.cities = cities);

  }

  submit() {
    console.log(this.form);

    let valueSubmit = Object.assign({}, this.form?.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((value: any, index: number) => value ? this.frameworks[index] : null)
        .filter((value: any) => value != null)
    });

    console.log(valueSubmit);

    // Método de requisição http para envio do formulário
    this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
      .subscribe((data: any) => {
        console.log(data);
      }, (error: any) => {
        alert(error);
      });
  }

  // Funções referentes ao Endereço(CEP)
  populateForm(data: any): any {
    const addressData: any = {
      address: {
        cep: data.cep,
        complement: data.complemento,
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf
      }
    };

    return this.form.patchValue(addressData);
  }

  clearAddress(): any {
    const nullPatch: any = {
      address: {
        cep: null,
        number: null,
        complement: null,
        street: null,
        neighborhood: null,
        city: null,
        state: null
      }
    };

    return this.form.patchValue(nullPatch);
  }

  // Método para verificar de forma assíncrona se o email já existe 
  verifyIfEmailExist(formControl: FormControl): any {
    
    return this.verifyEmailService.verifyEmail(formControl.value).pipe(
      map((exist: any) => exist ? { UnavailableEmail: true } : console.log('Email disponível!'))
    );
  }

  // Método referente ao campo para frameworks
  buildFrameworks(): any {
    let values = this.frameworks?.map(() => new FormControl(false));

    return this.formBuilder.array(values, this.formValidationService?.requiredMinCheckbox(1));
  }

  // Função para settar checkbox de termos
  setTerms(): any {
    let terms: any = this.form.get('terms');

    return terms.value == true ? terms.setValue(false) : terms.setValue(true);
  }
}