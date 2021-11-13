import { Directive, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Directive()
export abstract class BaseFormComponent implements OnInit {
  form!: FormGroup;

  constructor() { }

  ngOnInit(): void { }

  abstract submit(): void;

  onSubmit() {
    this.form.valid ? this.submit() : this.verifyFormValidations(this.form);
  }

  // Funções referentes a validação e verificações dos campos
  verifyFormValidations(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log('field: ' + field);
      let control = formGroup.get(field);
      control?.markAsDirty();
      control?.markAsTouched();
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.verifyFormValidations(control);
      }
    });
  }

  validInput(inputField: any): boolean {
    return this.getField(inputField).hasError('required') ? true : false;
  }

  verifyInput(inputField: any): boolean {
    if (this.getField(inputField)?.invalid && this.getField(inputField).untouched) {
      return false;   // Retorna falso mesmo com o campo inválido pois o mesmo ainda não foi focado
    }
    if (this.getField(inputField)?.hasError('required') && this.getField(inputField).touched) {
      return true; // Única possibilidade para mostrar erros: campo inválido e tocado (focado em algum momento)
    }

    return false;
  }

  verifyEmailError(email: string): any {
    if(this.getField(email)?.status === 'VALID' && this.form.get(email)?.touched) {
      return false;
    }
    if(this.getField(email)?.hasError('UnavailableEmail')) {
      return  true;
    }

    return false;
  }

  verifyDoubleField(inputField: string): boolean {
    return this.getField(inputField)?.hasError('equalsTo') ? true : false;
  }

  compareObjects(object1: any, object2: any): any {
    return object1 && object2 ? (object1.role === object2.role) : object1 === object2;
  }

  applyErrorStyle(inputField: any) {
    return {
      'has-error': this.verifyInput(inputField),
      'has-feedback': this.verifyInput(inputField)
    }
  }

  reset() {
    this.form.reset();
  }

  // Método para retornar o FormControl a ser usado para busca de erros
  getField(fieldName: string): any {
    return this.form?.get(fieldName);
  }
}